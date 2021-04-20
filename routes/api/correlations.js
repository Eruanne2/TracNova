const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateCorrelationInput = require('../../validations/correlations');

const Correlation = require('../../models/Correlation');

router.get('/:id', (req, res) => {
  Correlation.findById(req.params.id)
    .then(corr => res.json(corr))
    .catch(err =>
      res.status(404).json({nocorrfound: "We can't seem to find the Correlation you are looking for."})
    );
});

router.get('/user/:user_id', (req, res) => {
  Correlation.find({user: req.params.user_id})
    .sort({date: -1})
    .then(variables => res.json(variables))
    .catch(err => 
      res.status(404).json({nocorrfound: "No Correlations Found from this user"})
    );
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  // above line gave req a user key
  (req, res) => {
    const {errors, isValid} = validateCorrelationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newCorr = new Correlation({
      user: req.user.id,
      variables: req.body.variables
    });
    newCorr.save().then(corr => res.send(corr)).catch(err => res.send(err));
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  // above line gave req a user key
  function (req, res) {
    if (!req.params.id) return res.json({success: false, error: 'No id provided'});

    const {errors, isValid} = validateCorrelationInput(req.body);
    
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Correlation.findById(req.params.id, function(err, corr) {
      corr.variables = req.body.variables;
      corr.save().then(corr => res.json(corr)).catch(err => res.send(err))
    })
    .catch(err => res.status(404).json({novarfound: "No Correlation found"}));
  }
  
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    if (!req.params.id) return res.json({success: false, error: 'No id provided'});
    Correlation.findOneAndDelete({_id: req.params.id}, (err, v) => {
      if (!v) return res.json({success: false, error: "Correlation not found"});
      return res.json({success: true, v});
    });
  }

)



module.exports = router;