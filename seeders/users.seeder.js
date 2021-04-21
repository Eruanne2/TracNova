import { Seeder } from 'mongoose-data-seed';
import { User } from './models/Users';

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

export default UsersSeeder;
