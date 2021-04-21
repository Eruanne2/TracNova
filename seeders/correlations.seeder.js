import { Seeder } from 'mongoose-data-seed';
import { Correlation } from './models/Correlations';
import { Variable } from './models/Variables';
import { User } from './models/Users';


class CorrelationsSeeder extends Seeder {
  async beforeRun() {
    this.users = await User.find({}).exec();
    this.variables = await Variable.find({}).exec();
    this.correlationData = this._generateCorrelations();
  }

  async shouldRun() {
    return Correlation.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Correlation.create(this.correlationData);
  }

  _generateCorrelations() {
    return [
      {
        user: this.users[0]._id,
        variables: [this.variables[0]._id, this.variables[1]._id]
      },
      {
        user: this.users[0]._id,
        variables: [this.variables[1]._id, this.variables[2]._id]
      },
      {
        user: this.users[0]._id,
        variables: [this.variables[2]._id, this.variables[3]._id]
      }
    ];
  }
  
}

export default CorrelationsSeeder;