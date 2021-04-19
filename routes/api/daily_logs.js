const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateDLInput = require('../../validations/daily_logs');

const DailyLog = require('../../models/DailyLog');

router.get('/:id', (req, res) => {
  DailyLog.findById(req.params.id)
    .then(dlog => res.json(dlog))
    .catch(err =>
      res.status(404).json({nologfound: "We can't seem to find the Daily Log you are looking for."})
    );
});

router.get('/user/:user_id', (req, res) => {
  DailyLog.find({user: req.params.user_id})
    .sort({date: -1})
    .then(dlogs => res.json(dlogs))
    .catch(err => 
      res.status(404).json({nologfound: "No Daily Logs Found from this user"})
    );
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  // above line gave req a user key
  (req, res) => {
    const {errors, isValid} = validateDLInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newLog = new DailyLog({
      user: req.user.id,
      variables: req.body.variables
    });

    newLog.save().then(dlog => res.json(dlog));
  }
);



module.exports = router;