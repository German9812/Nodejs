const db = require('../config/db');

const userQueries = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  createUser: ({ name, email }) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  updateUser: (id, { name, email }) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  emailExists: async (email, excludeId = null) => {
    let sql = 'SELECT id FROM users WHERE email = ?';
    let params = [email];

    if (excludeId) {
      sql += ' AND id != ?';
      params.push(excludeId);
    }

    const [results] = await db.promise().query(sql, params);
    return results.length > 0;
  },
};

module.exports = userQueries;
