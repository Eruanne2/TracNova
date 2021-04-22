const { Seeder } = require('mongoose-data-seed');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

let data;

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('password', salt, (err, hash) => {
    if (err) throw err;
    data = [{
      username: 'demo',
      email: 'demo@example.com',
      password: hash,
    }];
  })
});


class UsersSeeder extends Seeder {

  async shouldRun() {
    return User.countDocuments().exec().then(count => count === 0);
  }

  run() {
    return User.create(data);
  }
}

module.exports = UsersSeeder;