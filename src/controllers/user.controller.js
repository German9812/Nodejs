const userQueries = require('../db/queries');
const UserModel = require('../models/user');
const events = require('../websocket/events');
const { emitEvent } = require('../websocket/websocket');

exports.getAllUsers = async (req, res) => {
  try {
    const results = await userQueries.getAllUsers();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await userQueries.getUserById(id);
    if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const validation = UserModel.validateCreateData(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ errors: validation.errors });
  }

  try {
    const result = await userQueries.createUser(req.body);
    const newUser = { id: result.insertId, ...req.body };

    emitEvent(events.USER_CREATED, newUser);
    res.status(201).json({ newUser});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const validation = UserModel.validateUpdateData(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ errors: validation.errors });
  }

  try {
    const result = await userQueries.updateUser(id, req.body);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    const updateUser = { id: parseInt(id), ...req.body };
    emitEvent(events.USER_UPDATED, updateUser);
    res.json({ updateUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userQueries.deleteUser(id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    const deletedUser = { id: parseInt(id) };
    emitEvent(events.USER_DELETED, deletedUser);
    res.json({ deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};