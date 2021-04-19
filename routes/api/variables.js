const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateVariableInput = require('../../validations/daily_logs');

const Variable = require('../../models/Variable');

router.get('/:id', (req, res) => {
  Variable.findById(req.params.id)
    .then(dlog => res.json(dlog))
    .catch(err =>
      res.status(404).json({nologfound: "We can't seem to find the Variable you are looking for."})
    );
});

router.get('/user/:user_id', (req, res) => {
  Variable.find({user: req.params.user_id})
    .sort({date: -1})
    .then(dlogs => res.json(dlogs))
    .catch(err => 
      res.status(404).json({notwotsfound: "No Variables Found from this user"})
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
            count: req.body.count,
            variables: req.body.dailylogs
          });
          newVar.save().then(variable => res.send(variable)).catch(err => res.send(err));
        }
      })
  }
);



module.exports = router;