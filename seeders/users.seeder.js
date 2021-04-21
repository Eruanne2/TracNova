const { Seeder } = require('mongoose-data-seed');
const User = require('../models/User');

const data = [{
    username: 'demo',
    email: 'demo@example.com',
    password: 'password'
}];

class UsersSeeder extends Seeder {

  async shouldRun() {
    return User.countDocuments().exec().then(count => count === 0);
    // const count = await User.countDocuments().exec();
    // return count === 0;
  }

  async run() {
    return User.create(data);
  }
}

module.exports = UsersSeeder;
