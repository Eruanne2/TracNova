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
const seedersList = {
  Users, 
  Variables,
  Correlations
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
const dropdb = async () => mongoose.connection.db.dropDatabase();

module.exports = { seedersList, connect, dropdb };
