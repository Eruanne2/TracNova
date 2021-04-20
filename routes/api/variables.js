const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateVariableInput = require('../../validations/variables');

const Variable = require('../../models/Variable');

router.get('/:id', (req, res) => {
  Variable.findById(req.params.id)
    .then(variable => res.json(variable))
    .catch(err =>
      res.status(404).json({novarfound: "We can't seem to find the Variable you are looking for."})
    );
});

router.get('/user/:user_id', (req, res) => {
  Variable.find({user: req.params.user_id})
    .sort({date: -1})
    .then(variables => res.json(variables))
    .catch(err => 
      res.status(404).json({novarfound: "No Variables Found from this user"})
    );
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  // above line gave req a user key
  (req, res) => {
    const {errors, isValid} = validateVariableInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Variable.findOne({user: req.user.id, name: req.body.name})
      .then(variable => {
        if (variable) return res.status(400).json({name: "Variable already exists for this user"});
        else {
          const newVar = new Variable({
            user: req.user.id,
            name: req.body.name,
            unit: req.body.unit,
            dailylogs: req.body.dailylogs
          });
          newVar.save().then(variable => res.send(variable)).catch(err => res.send(err));
        }
      });
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  // above line gave req a user key
  (req, res) => {
    const {errors, isValid} = validateVariableInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Variable.findByIdAndUpdate(req.params.id, update, () => {
        dailylogs[req.body.date] = req.body.count})
      .then(variable => res.send(variable))
      .catch(err =>
        res.status(404).json({novarfound: "We can't seem to find the Variable you are looking for."})
      );
  }
);



module.exports = router;