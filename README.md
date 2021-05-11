# TracNova
[TracNova](https://trac-nova.herokuapp.com/#/) is a habit tracker app that offers more than just a history of how well you've stuck to your goals - it gives you a quantifiable measurement of why you should stick to them.

We all know that what gets measured gets improved. Like any other habit tracker, TracNova provides a place to record measurements of various habits you wish to cultivate, whether hours slept, money earned from sales, or calories eaten. However, with TracNova you are able to investigate the correlation between any two habits. Simply choose the two variables you want to compare, and TracNova will run the appropriate statistical test to find the correlation coefficient between them and indicate the nature of their interaction. The more often you log, the more accurate it becomes.

Does drinking water really help you lose weight? Does waking up earlier really make you more productive? Find out for yourself.

![splash page](https://github.com/Eruanne2/TracNova/blob/readme/assets/readme_img/splash.gif)

# Table of Contents
* [Technologies Used](#technologies-used)
  * [Stack](#stack)
  * [Notable Dependencies](#notable-dependencies)
* [Features](#features)
  * [User Auth](#user-auth)
  * [Variables](#variables)
  * [Correlations](#correlations)
  * [Statistics](#statistics)
  * [Graphs](#graphs)
* [Features In Progress](#features-in-progress)
  * [Multi-Variable Correlations](#multi-variable-correlations)
  * [Mobile Design](#mobile-design)
* [Lessons Learned](#lessons-learned)
  * [Database Design](#database-design)

# Technologies Used
## Stack
* MongoDB
* Express
* React
* Node.js
## Notable Dependencies
* Statistics.js
* ReCharts
* mongoose-data-seed

# Features
## User Auth
User is able to Create an account, Login and Logout. When creating an account, the back-end express router first check for existing email to avoid duplicates. The password input is then combined with a salt, hashed using bcrypt, and saved into the database. 
```javascript
User.findOne({email: req.body.email})
.then(user => {
  if (user) return res.status(400).json({email: "Email already used."})
  else {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => res.send(user)).catch(err => res.send(err));
      })
    })
  }
})
```
When logging in, the password input is checked for matches in the database, then a json web token is assigned to the user that expires in one hour or when the user logs out.
```javascript
bcrypt.compare(password, user.password)
.then(isMatch => {
  if (isMatch) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    }
    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: 3600 },
      (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      }
    )
  }
  else return res.status(400).json({password: "Incorrect password"});
})
```
## Factors
User can create, read, update and delete factors that they choose to keep track of.

## Records in Factors
User can create, read, update and delete quantified daily records within each factor. (Details of frontend code). An daily entry dropdown menu is located on the top of every page for convenience of the user and to remind users to log today's entry as they are using the app. Daily entry's datatype includes continuous spectrum and discrete spectrum.

![daily entry form](https://github.com/Eruanne2/TracNova/blob/readme/assets/readme_img/entry_form2.gif)

## Correlations and Significance
(Details of Math) is used to create correlation coefficient that ranges from 1 to -1. 1 represents absolute positive correlation; -1 represents absolute negative correlation; 0 represents no correlation.

![correlation coefficient](https://github.com/Eruanne2/TracNova/blob/readme/assets/readme_img/correlation_coef2.png)

## Graphs
(Wenchong's Magic)

![drag to chart](https://github.com/Eruanne2/TracNova/blob/readme/assets/readme_img/drag2chart.gif)

# Features In Progress
## Multi-Variable Correlations

# Lessons Learned
## Database Design
* To update a nested object value of the field in a document, simply making changes to the nested object by mutating it will not persist in the database when the document is saved. The nested object value needs to be duplicated, updated, then reassigned to the field before saving the document.
## Work Delegation
* Learned to allocate time for group meeting to avoid design and styling conflict among parallel branches.