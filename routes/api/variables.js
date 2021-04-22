const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateVariableInput = require('../../validations/variables');
const validateVariableUpdate = require('../../validations/variables_update');

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

// add entry (takes in an id, a date, and a count)
router.patch('/:id/entry',
  passport.authenticate('jwt', { session: false }),
  // above line gave req a user key
  function (req, res) {
    if (!req.params.id) return res.json({success: false, error: 'No id provided'});

    const {errors, isValid} = validateVariableUpdate(req.body);
    
    if (!isValid) {
      return res.status(400).json(errors);
    }

    let formattedDate = req.body.date;
    if (formattedDate.length < 10) {
      if (formattedDate.indexOf('/') === 1) formattedDate = '0' + formattedDate;
      if (formattedDate.indexOf('/', 3) === 4) formattedDate = formattedDate.slice(0,3) + '0' + formattedDate.slice(3)
    }

    Variable.findById(req.params.id, function(err, v) {
      // let newV = Object.assign(v.dailylogs, {[req.body.date]: parseFloat(req.body.count)})
      if (req.body.date !== undefined) {
        v.dailylogs = { ...v.dailylogs, [formattedDate]: parseFloat(req.body.count)};
      } else {
        v.dailylogs = {[formattedDate]: parseInt(req.body.count, 10)};
      }
      if (req.body.unit !== undefined) {
        v.unit = req.body.unit;
      }
      if (req.body.name !== undefined) {
        v.name = req.body.name;
      }
      v.save().then(v => res.json(v)).catch(err => res.send(err))
    })
    .catch(err => res.status(404).json({novarfound: "No var found"}));
  }
  
);

// update variable (takes in variable)
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  // above line gave req a user key
  function (req, res) {
    if (!req.params.id) return res.json({success: false, error: 'No id provided'});

    const {errors, isValid} = validateVariableInput(req.body);
    
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Variable.findById(req.params._id, function(err, v) {

      const updatedVariable = {
        name: req.body.name,
        unit: req.body.unit,
        dailylogs: req.body.dailylogs
      }
    
      Variable.findOneAndUpdate({'_id': req.body['_id']}, {$set: updatedVariable}, {new: true})
    
      .then(variable => res.json(variable))
      .catch(err => console.log(err));
    })
    .catch(err => res.status(404).json({novarfound: "No var found"}));
  }
  
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    if (!req.params.id) return res.json({success: false, error: 'No id provided'});
    Variable.findOneAndDelete({_id: req.params.id}, (err, v) => {
      if (!v) return res.json({success: false, error: "Var not found"});
      return res.json({success: true, v});
    });
  }

)



module.exports = router;