const { Seeder } = require('mongoose-data-seed');
const Variable = require('../models/Variable');
const User = require('../models/User');

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
        name: 'Water Drank',
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
        name: 'Code Written',
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
        name: 'Go to the Gym',
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
        name: 'Consume Soda',
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
      },
      {
        user: this.users[0]._id,
        name: 'Mood',
        unit: 'rating',
        dailylogs: {
          '03/03/2021': Math.floor(Math.random() * 5) + 1,
          '01/11/2021': Math.floor(Math.random() * 5) + 1,
          '02/26/2021': Math.floor(Math.random() * 5) + 1,
          '02/17/2021': Math.floor(Math.random() * 5) + 1,
          '02/28/2021': Math.floor(Math.random() * 5) + 1,
          '01/31/2021': Math.floor(Math.random() * 5) + 1,
          '03/18/2021': Math.floor(Math.random() * 5) + 1,
          '03/21/2021': Math.floor(Math.random() * 5) + 1,
          '03/30/2021': Math.floor(Math.random() * 5) + 1,
          '02/09/2021': Math.floor(Math.random() * 5) + 1,
          '01/11/2021': Math.floor(Math.random() * 5) + 1,
          '03/16/2021': Math.floor(Math.random() * 5) + 1,
          '04/22/2021': Math.floor(Math.random() * 5) + 1,
          '01/07/2021': Math.floor(Math.random() * 5) + 1,
          '03/20/2021': Math.floor(Math.random() * 5) + 1,
          '03/20/2021': Math.floor(Math.random() * 5) + 1,
          '03/28/2021': Math.floor(Math.random() * 5) + 1,
          '02/22/2021': Math.floor(Math.random() * 5) + 1,
          '03/17/2021': Math.floor(Math.random() * 5) + 1,
          '03/09/2021': Math.floor(Math.random() * 5) + 1,
          '02/09/2021': Math.floor(Math.random() * 5) + 1,
          '01/21/2021': Math.floor(Math.random() * 5) + 1,
          '01/03/2021': Math.floor(Math.random() * 5) + 1,
          '03/04/2021': Math.floor(Math.random() * 5) + 1,
          '03/28/2021': Math.floor(Math.random() * 5) + 1,
          '02/11/2021': Math.floor(Math.random() * 5) + 1,
          '01/16/2021': Math.floor(Math.random() * 5) + 1,
          '04/12/2021': Math.floor(Math.random() * 5) + 1,
          '01/26/2021': Math.floor(Math.random() * 5) + 1,
          '01/31/2021': Math.floor(Math.random() * 5) + 1,
          '01/11/2021': Math.floor(Math.random() * 5) + 1,
          '02/01/2021': Math.floor(Math.random() * 5) + 1,
          '03/30/2021': Math.floor(Math.random() * 5) + 1,
          '01/26/2021': Math.floor(Math.random() * 5) + 1,
          '04/15/2021': Math.floor(Math.random() * 5) + 1,
          '02/09/2021': Math.floor(Math.random() * 5) + 1,
          '04/04/2021': Math.floor(Math.random() * 5) + 1,
          '01/05/2021': Math.floor(Math.random() * 5) + 1,
          '02/28/2021': Math.floor(Math.random() * 5) + 1,
          '03/27/2021': Math.floor(Math.random() * 5) + 1,
          '01/28/2021': Math.floor(Math.random() * 5) + 1,
          '03/21/2021': Math.floor(Math.random() * 5) + 1,
          '01/08/2021': Math.floor(Math.random() * 5) + 1,
          '02/06/2021': Math.floor(Math.random() * 5) + 1,
          '03/07/2021': Math.floor(Math.random() * 5) + 1,
          '04/20/2021': Math.floor(Math.random() * 5) + 1,
          '02/25/2021': Math.floor(Math.random() * 5) + 1,
          '01/29/2021': Math.floor(Math.random() * 5) + 1,
          '01/14/2021': Math.floor(Math.random() * 5) + 1,
          '03/09/2021': Math.floor(Math.random() * 5) + 1,
          '03/12/2021': Math.floor(Math.random() * 5) + 1,
          '01/12/2021': Math.floor(Math.random() * 5) + 1,
          '04/07/2021': Math.floor(Math.random() * 5) + 1,
          '04/04/2021': Math.floor(Math.random() * 5) + 1,
          '01/18/2021': Math.floor(Math.random() * 5) + 1,
          '02/25/2021': Math.floor(Math.random() * 5) + 1,
          '03/02/2021': Math.floor(Math.random() * 5) + 1,
          '04/14/2021': Math.floor(Math.random() * 5) + 1,
          '04/09/2021': Math.floor(Math.random() * 5) + 1,
          '03/09/2021': Math.floor(Math.random() * 5) + 1,
          '03/16/2021': Math.floor(Math.random() * 5) + 1,
          '04/07/2021': Math.floor(Math.random() * 5) + 1,
          '02/20/2021': Math.floor(Math.random() * 5) + 1,
          '03/20/2021': Math.floor(Math.random() * 5) + 1,
          '03/31/2021': Math.floor(Math.random() * 5) + 1,
          '02/16/2021': Math.floor(Math.random() * 5) + 1,
          '02/15/2021': Math.floor(Math.random() * 5) + 1,
          '03/04/2021': Math.floor(Math.random() * 5) + 1,
          '04/22/2021': Math.floor(Math.random() * 5) + 1,
          '04/08/2021': Math.floor(Math.random() * 5) + 1,
          '01/22/2021': Math.floor(Math.random() * 5) + 1,
          '04/23/2021': Math.floor(Math.random() * 5) + 1,
          '02/20/2021': Math.floor(Math.random() * 5) + 1,
          '03/12/2021': Math.floor(Math.random() * 5) + 1,
          '03/28/2021': Math.floor(Math.random() * 5) + 1,
          '03/02/2021': Math.floor(Math.random() * 5) + 1,
          '01/21/2021': Math.floor(Math.random() * 5) + 1,
          '03/21/2021': Math.floor(Math.random() * 5) + 1,
          '03/31/2021': Math.floor(Math.random() * 5) + 1,
          '04/06/2021': Math.floor(Math.random() * 5) + 1,
          '02/07/2021': Math.floor(Math.random() * 5) + 1,
          '03/14/2021': Math.floor(Math.random() * 5) + 1,
          '03/25/2021': Math.floor(Math.random() * 5) + 1,
          '01/17/2021': Math.floor(Math.random() * 5) + 1,
          '03/10/2021': Math.floor(Math.random() * 5) + 1,
          '04/15/2021': Math.floor(Math.random() * 5) + 1,
          '03/21/2021': Math.floor(Math.random() * 5) + 1,
          '02/12/2021': Math.floor(Math.random() * 5) + 1,
          '03/02/2021': Math.floor(Math.random() * 5) + 1,
          '02/18/2021': Math.floor(Math.random() * 5) + 1,
          '03/26/2021': Math.floor(Math.random() * 5) + 1,
          '02/12/2021': Math.floor(Math.random() * 5) + 1,
          '03/21/2021': Math.floor(Math.random() * 5) + 1,
          '01/20/2021': Math.floor(Math.random() * 5) + 1,
          '03/16/2021': Math.floor(Math.random() * 5) + 1,
          '02/11/2021': Math.floor(Math.random() * 5) + 1,
          '02/15/2021': Math.floor(Math.random() * 5) + 1,
          '01/03/2021': Math.floor(Math.random() * 5) + 1,
          '01/05/2021': Math.floor(Math.random() * 5) + 1,
          '02/08/2021': Math.floor(Math.random() * 5) + 1,
        }
      },
      {
        user: this.users[0]._id,
        name: 'Ice Cream Eaten',
        unit: 'gallons',
        dailylogs: {
          '03/03/2021': Math.floor(Math.random() * 7),
          '01/11/2021': Math.floor(Math.random() * 7),
          '02/26/2021': Math.floor(Math.random() * 7),
          '02/17/2021': Math.floor(Math.random() * 7),
          '02/28/2021': Math.floor(Math.random() * 7),
          '01/31/2021': Math.floor(Math.random() * 7),
          '03/18/2021': Math.floor(Math.random() * 7),
          '03/21/2021': Math.floor(Math.random() * 7),
          '03/30/2021': Math.floor(Math.random() * 7),
          '02/09/2021': Math.floor(Math.random() * 7),
          '01/11/2021': Math.floor(Math.random() * 7),
          '03/16/2021': Math.floor(Math.random() * 7),
          '04/22/2021': Math.floor(Math.random() * 7),
          '01/07/2021': Math.floor(Math.random() * 7),
          '03/20/2021': Math.floor(Math.random() * 7),
          '03/20/2021': Math.floor(Math.random() * 7),
          '03/28/2021': Math.floor(Math.random() * 7),
          '02/22/2021': Math.floor(Math.random() * 7),
          '03/17/2021': Math.floor(Math.random() * 7),
          '03/09/2021': Math.floor(Math.random() * 7),
          '02/09/2021': Math.floor(Math.random() * 7),
          '01/21/2021': Math.floor(Math.random() * 7),
          '01/03/2021': Math.floor(Math.random() * 7),
          '03/04/2021': Math.floor(Math.random() * 7),
          '03/28/2021': Math.floor(Math.random() * 7),
          '02/11/2021': Math.floor(Math.random() * 7),
          '01/16/2021': Math.floor(Math.random() * 7),
          '04/12/2021': Math.floor(Math.random() * 7),
          '01/26/2021': Math.floor(Math.random() * 7),
          '01/31/2021': Math.floor(Math.random() * 7),
          '01/11/2021': Math.floor(Math.random() * 7),
          '02/01/2021': Math.floor(Math.random() * 7),
          '03/30/2021': Math.floor(Math.random() * 7),
          '01/26/2021': Math.floor(Math.random() * 7),
          '04/15/2021': Math.floor(Math.random() * 7),
          '02/09/2021': Math.floor(Math.random() * 7),
          '04/04/2021': Math.floor(Math.random() * 7),
          '01/05/2021': Math.floor(Math.random() * 7),
          '02/28/2021': Math.floor(Math.random() * 7),
          '03/27/2021': Math.floor(Math.random() * 7),
          '01/28/2021': Math.floor(Math.random() * 7),
          '03/21/2021': Math.floor(Math.random() * 7),
          '01/08/2021': Math.floor(Math.random() * 7),
          '02/06/2021': Math.floor(Math.random() * 7),
          '03/07/2021': Math.floor(Math.random() * 7),
          '04/20/2021': Math.floor(Math.random() * 7),
          '02/25/2021': Math.floor(Math.random() * 7),
          '01/29/2021': Math.floor(Math.random() * 7),
          '01/14/2021': Math.floor(Math.random() * 7),
          '03/09/2021': Math.floor(Math.random() * 7),
          '03/12/2021': Math.floor(Math.random() * 7),
          '01/12/2021': Math.floor(Math.random() * 7),
          '04/07/2021': Math.floor(Math.random() * 7),
          '04/04/2021': Math.floor(Math.random() * 7),
          '01/18/2021': Math.floor(Math.random() * 7),
          '02/25/2021': Math.floor(Math.random() * 7),
          '03/02/2021': Math.floor(Math.random() * 7),
          '04/14/2021': Math.floor(Math.random() * 7),
          '04/09/2021': Math.floor(Math.random() * 7),
          '03/09/2021': Math.floor(Math.random() * 7),
          '03/16/2021': Math.floor(Math.random() * 7),
          '04/07/2021': Math.floor(Math.random() * 7),
          '02/20/2021': Math.floor(Math.random() * 7),
          '03/20/2021': Math.floor(Math.random() * 7),
          '03/31/2021': Math.floor(Math.random() * 7),
          '02/16/2021': Math.floor(Math.random() * 7),
          '02/15/2021': Math.floor(Math.random() * 7),
          '03/04/2021': Math.floor(Math.random() * 7),
          '04/22/2021': Math.floor(Math.random() * 7),
          '04/08/2021': Math.floor(Math.random() * 7),
          '01/22/2021': Math.floor(Math.random() * 7),
          '04/23/2021': Math.floor(Math.random() * 7),
          '02/20/2021': Math.floor(Math.random() * 7),
          '03/12/2021': Math.floor(Math.random() * 7),
          '03/28/2021': Math.floor(Math.random() * 7),
          '03/02/2021': Math.floor(Math.random() * 7),
          '01/21/2021': Math.floor(Math.random() * 7),
          '03/21/2021': Math.floor(Math.random() * 7),
          '03/31/2021': Math.floor(Math.random() * 7),
          '04/06/2021': Math.floor(Math.random() * 7),
          '02/07/2021': Math.floor(Math.random() * 7),
          '03/14/2021': Math.floor(Math.random() * 7),
          '03/25/2021': Math.floor(Math.random() * 7),
          '01/17/2021': Math.floor(Math.random() * 7),
          '03/10/2021': Math.floor(Math.random() * 7),
          '04/15/2021': Math.floor(Math.random() * 7),
          '03/21/2021': Math.floor(Math.random() * 7),
          '02/12/2021': Math.floor(Math.random() * 7),
          '03/02/2021': Math.floor(Math.random() * 7),
          '02/18/2021': Math.floor(Math.random() * 7),
          '03/26/2021': Math.floor(Math.random() * 7),
          '02/12/2021': Math.floor(Math.random() * 7),
          '03/21/2021': Math.floor(Math.random() * 7),
          '01/20/2021': Math.floor(Math.random() * 7),
          '03/16/2021': Math.floor(Math.random() * 7),
          '02/11/2021': Math.floor(Math.random() * 7),
          '02/15/2021': Math.floor(Math.random() * 7),
          '01/03/2021': Math.floor(Math.random() * 7),
          '01/05/2021': Math.floor(Math.random() * 7),
          '02/08/2021': Math.floor(Math.random() * 7),
        }
      },
      {
        user: this.users[0]._id,
        name: 'Length of Walker\'s Lecture',
        unit: 'minutes',
        dailylogs: {
          '03/02/2021': 58,
          '02/18/2021': 175,
          '03/26/2021': 201,
          '02/12/2021': 79,
          '03/21/2021': 139,
          '01/20/2021': 115,
          '03/16/2021': 88,
          '02/11/2021': 152,
          '02/15/2021': 169,
          '04/03/2021': 420,
          '04/05/2021': 53,
          '02/08/2021': 242,
        }
      },
      {
        user: this.users[0]._id,
        name: 'Times Walker\'s Cats Meowed',
        unit: 'meows',
        dailylogs: {
          '03/02/2021': 2,
          '02/18/2021': 6,
          '03/26/2021': 9,
          '02/12/2021': 3,
          '03/21/2021': 5,
          '01/20/2021': 5,
          '03/16/2021': 4,
          '02/11/2021': 6,
          '02/15/2021': 6,
          '04/03/2021': 23,
          '04/05/2021': 1,
          '02/08/2021': 10,
        }
      },
      {
        user: this.users[0]._id,
        name: 'Mike Wore Beanie',
        unit: 'binary',
        dailylogs: {
          '01/11/2021': 1,
          '02/01/2021': 1,
          '03/30/2021': 1,
          '01/26/2021': 1,
          '04/15/2021': 1,
          '02/09/2021': 1,
          '04/04/2021': 1,
          '01/05/2021': 1,
          '02/28/2021': 1,
          '03/27/2021': 1,
          '01/28/2021': 1,
          '03/21/2021': 1,
          '01/08/2021': 1,
          '02/06/2021': 1,
          '03/07/2021': 1,
          '04/20/2021': 1,
          '02/25/2021': 1,
          '01/29/2021': 1,
          '01/14/2021': 1,
          '03/09/2021': 1,
          '03/12/2021': 1,
          '01/12/2021': 1,
          '04/07/2021': 1,
          '04/04/2021': 1,
          '01/18/2021': 1,
          '02/25/2021': 1,
          '03/02/2021': 1,
          '04/14/2021': 1,
          '04/09/2021': 1,
          '03/09/2021': 1,
          '03/16/2021': 1,
          '04/07/2021': 1,
          '02/20/2021': 1,
          '03/20/2021': 1,
          '03/31/2021': 1,
          '02/16/2021': 1,
          '02/15/2021': 1,
          '03/04/2021': 1,
          '04/22/2021': 1,
          '04/08/2021': 1,
          '01/22/2021': 0,
          '04/23/2021': 0,
          '02/20/2021': 0,
          '03/12/2021': 0,
          '03/28/2021': 0,
          '03/02/2021': 0,
          '01/21/2021': 0,
          '03/21/2021': 0,
          '03/31/2021': 0,
          '04/06/2021': 0,
          '02/07/2021': 0,
          '03/14/2021': 0,
          '03/25/2021': 0,
          '01/17/2021': 0,
          '03/10/2021': 0,
          '04/15/2021': 0,
          '03/21/2021': 0,
          '02/12/2021': 0,
          '03/02/2021': 0,
          '02/18/2021': 0,
          '03/26/2021': 0,
          '02/12/2021': 0,
          '03/21/2021': 0,
          '01/20/2021': 0,
          '03/16/2021': 0,
          '02/11/2021': 0,
          '02/15/2021': 0,
          '01/03/2021': 0,
          '01/05/2021': 0,
          '02/08/2021': 0,
        }
      },
      {
        user: this.users[0]._id,
        name: 'Bugs Encountered',
        unit: 'bugs',
        dailylogs: {
          '01/11/2021': Math.floor(Math.random() * 19) + 1,
          '02/01/2021': Math.floor(Math.random() * 19) + 1,
          '03/30/2021': Math.floor(Math.random() * 19) + 1,
          '01/26/2021': Math.floor(Math.random() * 19) + 1,
          '04/15/2021': Math.floor(Math.random() * 19) + 1,
          '02/09/2021': Math.floor(Math.random() * 19) + 1,
          '04/04/2021': Math.floor(Math.random() * 19) + 1,
          '01/05/2021': Math.floor(Math.random() * 19) + 1,
          '02/28/2021': Math.floor(Math.random() * 19) + 1,
          '03/27/2021': Math.floor(Math.random() * 19) + 1,
          '01/28/2021': Math.floor(Math.random() * 19) + 1,
          '03/21/2021': Math.floor(Math.random() * 19) + 1,
          '01/08/2021': Math.floor(Math.random() * 19) + 1,
          '02/06/2021': Math.floor(Math.random() * 19) + 1,
          '03/07/2021': Math.floor(Math.random() * 19) + 1,
          '04/20/2021': Math.floor(Math.random() * 19) + 1,
          '02/25/2021': Math.floor(Math.random() * 19) + 1,
          '01/29/2021': Math.floor(Math.random() * 19) + 1,
          '01/14/2021': Math.floor(Math.random() * 19) + 1,
          '03/09/2021': Math.floor(Math.random() * 19) + 1,
          '03/12/2021': Math.floor(Math.random() * 19) + 1,
          '01/12/2021': Math.floor(Math.random() * 19) + 1,
          '04/07/2021': Math.floor(Math.random() * 19) + 1,
          '04/04/2021': Math.floor(Math.random() * 19) + 1,
          '01/18/2021': Math.floor(Math.random() * 19) + 1,
          '02/25/2021': Math.floor(Math.random() * 19) + 1,
          '03/02/2021': Math.floor(Math.random() * 19) + 1,
          '04/14/2021': Math.floor(Math.random() * 19) + 1,
          '04/09/2021': Math.floor(Math.random() * 19) + 1,
          '03/09/2021': Math.floor(Math.random() * 19) + 1,
          '03/16/2021': Math.floor(Math.random() * 19) + 1,
          '04/07/2021': Math.floor(Math.random() * 19) + 1,
          '02/20/2021': Math.floor(Math.random() * 19) + 1,
          '03/20/2021': Math.floor(Math.random() * 19) + 1,
          '03/31/2021': Math.floor(Math.random() * 19) + 1,
          '02/16/2021': Math.floor(Math.random() * 19) + 1,
          '02/15/2021': Math.floor(Math.random() * 19) + 1,
          '03/04/2021': Math.floor(Math.random() * 19) + 1,
          '04/22/2021': Math.floor(Math.random() * 19) + 1,
          '04/08/2021': Math.floor(Math.random() * 19) + 1,
          '01/22/2021': Math.floor(Math.random() * 200) + 50,
          '04/23/2021': Math.floor(Math.random() * 200) + 50,
          '02/20/2021': Math.floor(Math.random() * 200) + 50,
          '03/12/2021': Math.floor(Math.random() * 200) + 50,
          '03/28/2021': Math.floor(Math.random() * 200) + 50,
          '03/02/2021': Math.floor(Math.random() * 200) + 50,
          '01/21/2021': Math.floor(Math.random() * 200) + 50,
          '03/21/2021': Math.floor(Math.random() * 200) + 50,
          '03/31/2021': Math.floor(Math.random() * 200) + 50,
          '04/06/2021': Math.floor(Math.random() * 200) + 50,
          '02/07/2021': Math.floor(Math.random() * 200) + 50,
          '03/14/2021': Math.floor(Math.random() * 200) + 50,
          '03/25/2021': Math.floor(Math.random() * 200) + 50,
          '01/17/2021': Math.floor(Math.random() * 200) + 50,
          '03/10/2021': Math.floor(Math.random() * 200) + 50,
          '04/15/2021': Math.floor(Math.random() * 200) + 50,
          '03/21/2021': Math.floor(Math.random() * 200) + 50,
          '02/12/2021': Math.floor(Math.random() * 200) + 50,
          '03/02/2021': Math.floor(Math.random() * 200) + 50,
          '02/18/2021': Math.floor(Math.random() * 200) + 50,
          '03/26/2021': Math.floor(Math.random() * 200) + 50,
          '02/12/2021': Math.floor(Math.random() * 200) + 50,
          '03/21/2021': Math.floor(Math.random() * 200) + 50,
          '01/20/2021': Math.floor(Math.random() * 200) + 50,
          '03/16/2021': Math.floor(Math.random() * 200) + 50,
          '02/11/2021': Math.floor(Math.random() * 200) + 50,
          '02/15/2021': Math.floor(Math.random() * 200) + 50,
          '01/03/2021': Math.floor(Math.random() * 200) + 50,
          '01/05/2021': Math.floor(Math.random() * 200) + 50,
          '02/08/2021': Math.floor(Math.random() * 200) + 50,
        }
      },
      {
        user: this.users[0]._id,
        name: 'Stress Level',
        unit: 'rating',
        dailylogs: {
          '01/11/2021': Math.floor(Math.random() * 2) + 1,
          '02/01/2021': Math.floor(Math.random() * 2) + 1,
          '03/30/2021': Math.floor(Math.random() * 2) + 1,
          '01/26/2021': Math.floor(Math.random() * 2) + 1,
          '04/15/2021': Math.floor(Math.random() * 2) + 1,
          '02/09/2021': Math.floor(Math.random() * 2) + 1,
          '04/04/2021': Math.floor(Math.random() * 2) + 1,
          '01/05/2021': Math.floor(Math.random() * 2) + 1,
          '02/28/2021': Math.floor(Math.random() * 2) + 1,
          '03/27/2021': Math.floor(Math.random() * 2) + 1,
          '01/28/2021': Math.floor(Math.random() * 2) + 1,
          '03/21/2021': Math.floor(Math.random() * 2) + 1,
          '01/08/2021': Math.floor(Math.random() * 2) + 1,
          '02/06/2021': Math.floor(Math.random() * 2) + 1,
          '03/07/2021': Math.floor(Math.random() * 2) + 1,
          '04/20/2021': Math.floor(Math.random() * 2) + 1,
          '02/25/2021': Math.floor(Math.random() * 2) + 1,
          '01/29/2021': Math.floor(Math.random() * 2) + 1,
          '01/14/2021': Math.floor(Math.random() * 2) + 1,
          '03/09/2021': Math.floor(Math.random() * 2) + 1,
          '03/12/2021': Math.floor(Math.random() * 2) + 1,
          '01/12/2021': Math.floor(Math.random() * 2) + 1,
          '04/07/2021': Math.floor(Math.random() * 2) + 1,
          '04/04/2021': Math.floor(Math.random() * 3) + 2,
          '01/18/2021': Math.floor(Math.random() * 3) + 2,
          '02/25/2021': Math.floor(Math.random() * 3) + 2,
          '03/02/2021': Math.floor(Math.random() * 3) + 2,
          '05/15/2021': Math.floor(Math.random() * 3) + 2,
          '05/09/2021': Math.floor(Math.random() * 3) + 2,
          '03/09/2021': Math.floor(Math.random() * 3) + 2,
          '03/16/2021': Math.floor(Math.random() * 3) + 2,
          '05/07/2021': Math.floor(Math.random() * 3) + 2,
          '02/20/2021': Math.floor(Math.random() * 3) + 2,
          '03/20/2021': Math.floor(Math.random() * 3) + 2,
          '03/31/2021': Math.floor(Math.random() * 3) + 2,
          '02/16/2021': Math.floor(Math.random() * 3) + 2,
          '02/15/2021': Math.floor(Math.random() * 3) + 2,
          '03/05/2021': Math.floor(Math.random() * 3) + 2,
          '05/22/2021': Math.floor(Math.random() * 3) + 2,
          '05/08/2021': Math.floor(Math.random() * 3) + 2,
          '01/22/2021': Math.floor(Math.random() * 3) + 2,
          '05/23/2021': Math.floor(Math.random() * 3) + 2,
          '02/20/2021': Math.floor(Math.random() * 3) + 2,
          '03/12/2021': Math.floor(Math.random() * 3) + 2,
          '03/28/2021': Math.floor(Math.random() * 3) + 2,
          '03/02/2021': Math.floor(Math.random() * 3) + 2,
          '01/21/2021': Math.floor(Math.random() * 3) + 2,
          '03/21/2021': Math.floor(Math.random() * 3) + 2,
          '03/31/2021': Math.floor(Math.random() * 3) + 2,
          '05/06/2021': Math.floor(Math.random() * 2) + 3,
          '02/07/2021': Math.floor(Math.random() * 2) + 3,
          '03/14/2021': Math.floor(Math.random() * 2) + 3,
          '03/25/2021': Math.floor(Math.random() * 2) + 3,
          '01/17/2021': Math.floor(Math.random() * 2) + 3,
          '03/10/2021': Math.floor(Math.random() * 2) + 3,
          '04/15/2021': Math.floor(Math.random() * 2) + 3,
          '03/21/2021': Math.floor(Math.random() * 2) + 3,
          '02/12/2021': Math.floor(Math.random() * 2) + 3,
          '03/02/2021': Math.floor(Math.random() * 2) + 3,
          '02/18/2021': Math.floor(Math.random() * 2) + 3,
          '03/26/2021': Math.floor(Math.random() * 2) + 3,
          '02/12/2021': Math.floor(Math.random() * 2) + 3,
          '03/21/2021': Math.floor(Math.random() * 2) + 3,
          '01/20/2021': Math.floor(Math.random() * 2) + 3,
          '03/16/2021': Math.floor(Math.random() * 2) + 3,
          '02/11/2021': Math.floor(Math.random() * 2) + 3,
          '02/15/2021': Math.floor(Math.random() * 2) + 3,
          '01/03/2021': Math.floor(Math.random() * 2) + 3,
          '01/05/2021': Math.floor(Math.random() * 2) + 3,
          '02/08/2021': Math.floor(Math.random() * 2) + 3,
        }
      }
    ];
  }

}

module.exports = VariablesSeeder;
