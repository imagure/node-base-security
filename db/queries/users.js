const knex = require('../connections');

function getAllUsers() {
  return knex('users')
  .select('*');
}

function getUserName(id) {
  return knex('users')
  .select('name')
  .where('id', id);
}

function getUserPwd(name) {
  return knex('users')
  .select('password')
  .where('name', name);
}

module.exports = {
  getAllUsers: getAllUsers, 
  getUserName: getUserName,
  getUserPwd: getUserPwd
};
