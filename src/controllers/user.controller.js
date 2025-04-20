const userQueries = require('../db/queries');


exports.getAllUsers = (req, res) => {
  userQueries.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  userQueries.getUserById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(results[0]);
  });
};

exports.createUser = (req, res) => {
  userQueries.createUser(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  userQueries.updateUser(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ id: parseInt(id), ...req.body });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  userQueries.deleteUser(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  });
};