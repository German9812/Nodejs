const db = require('../config/db');

const authQueries = {
  findUserByUsername: (username) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM auth_users WHERE username = ?', [username], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); 
      });
    });
  }
};

module.exports = authQueries;
