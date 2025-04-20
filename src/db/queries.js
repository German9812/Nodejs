const db = require('../config/db');

const userQueries = {
  getAllUsers: (callback) => {
    db.query('SELECT * FROM users', callback);
  },

  getUserById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },

  createUser: (userData, callback) => {
    const { name, email } = userData;
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], callback);
  },

  updateUser: (id, userData, callback) => {
    const { name, email } = userData;
    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], callback);
  },

  deleteUser: (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
  }
};

module.exports = userQueries;