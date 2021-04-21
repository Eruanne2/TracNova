const { Seeder } = require('mongoose-data-seed');
const { Variable } = require('../models/Variable');
const { User } = require('../models/User');

class VariablesSeeder extends Seeder {
  async beforeRun() {
    this.users = await User.find({}).exec();
    this.variablesData = this._generateVariables();
  }

  async shouldRun() {
    return Variable.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Variable.create(this.variablesData);
  }

  _generateVariables() {
    return [
      {
        user: this.users[0]._id,
        name: 'Water drank',
        unit: 'oz',
        dailylogs: { 
          '04/02/2021': 10,
          '04/01/2021': 14,
          '04/03/2021': 16,
          '04/04/2021': 15,
          '04/05/2021': 16,
          '04/06/2021': 18,
          '04/07/2021': 12,
          '04/08/2021': 11,
          '04/09/2021': 21,
          '04/11/2021': 18,
          '04/12/2021': 20,
          '04/13/2021': 22,
          '04/14/2021': 21,
          '04/15/2021': 26,
          '04/16/2021': 22,
          '04/17/2021': 29,
          '04/18/2021': 24,
          '04/19/2021': 22,
        }
      },
      {
        user: this.users[0]._id,
        name: 'code written',
        unit: 'lines',
        dailylogs: {
          '04/01/2021': 35,
          '04/02/2021': 0,
          '04/03/2021': 13,
          '04/04/2021': 124,
          '04/05/2021': 283,
          '04/06/2021': 72,
          '04/07/2021': 82,
          '04/08/2021': 15,
          '04/09/2021': 113,
          '04/10/2021': 154,
          '04/11/2021': 102,
          '04/12/2021': 93,
          '04/14/2021': 37,
          '04/15/2021': 62,
          '04/16/2021': 152,
          '04/17/2021': 0,
          '04/18/2021': 25,
          '04/19/2021': 164,
        }
      },
      {
        user: this.users[0]._id,
        name: 'Gym',
        unit: 'binary',
        dailylogs: { 
          '04/01/2021': 1,
          '04/02/2021': 1,
          '04/03/2021': 0,
          '04/04/2021': 0,
          '04/06/2021': 1,
          '04/07/2021': 1,
          '04/08/2021': 0,
          '04/09/2021': 1,
          '04/10/2021': 1,
          '04/12/2021': 1,
          '04/13/2021': 0,
          '04/14/2021': 1,
          '04/15/2021': 0,
          '04/16/2021': 0,
          '04/17/2021': 1,
          '04/19/2021': 1,
          '04/20/2021': 0,
        }
      },
      {
        user: this.users[0]._id,
        name: 'drink soda',
        unit: 'binary',
        dailylogs: { 
          '04/01/2021': 0,
          '04/02/2021': 0,
          '04/03/2021': 0,
          '04/04/2021': 1,
          '04/06/2021': 1,
          '04/07/2021': 0,
          '04/08/2021': 0,
          '04/09/2021': 0,
          '04/10/2021': 1,
          '04/12/2021': 0,
          '04/13/2021': 1,
          '04/14/2021': 1,
          '04/15/2021': 1,
          '04/16/2021': 0,
          '04/17/2021': 1,
          '04/19/2021': 0,
          '04/20/2021': 0,
        }
      }
    ];
  }

}

module.exports = VariablesSeeder;
