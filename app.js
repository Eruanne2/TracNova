const path = require('path');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

// Routes imports:
const users = require('./routes/api/users');

// Model imports:
const User = require('./models/User');

const passport = require('passport');

app.use(passport.initialize());
require('./config/passport')(passport);

mongoose
 .connect(db, {useNewUrlParser: true})
 .then(() => console.log("Connected to mongoDB"))
 .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies


// Configure app
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Express routes:
// app.use('/api/users', users);


// Port:
const port = process.env.PORT || 5000;
app.listen(port, () => {console.log(`Listening on port ${port}`)});