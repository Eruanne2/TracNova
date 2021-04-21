const mongoose = require('mongoose');
const Users = require('./seeders/users.seeder');
const Variables = require('./seeders/variables.seeder');
const Correlations = require('./seeders/correlations.seeder');

const mongoURL = process.env.MONGO_URL || 'mongodb+srv://admin:76wu3TZ3iO91Bclq@mern.jp1cw.mongodb.net/TracNova?retryWrites=true&w=majority';

/**
 * Seeders List
 * order is important
 *  * @type {Object}
 */
module.exports = seedersList = {
  Users, 
  Variables,
  Correlations
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
module.exports = connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
module.exports = dropdb = async () => mongoose.connection.db.dropDatabase();
