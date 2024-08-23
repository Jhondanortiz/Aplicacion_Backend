const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET - Obtener todos los elementos
router.get('/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST - Crear un nuevo elemento
router.post('/items', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO items (name) VALUES (?)', [name], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, name });
  });
});

// PUT - Actualizar un elemento
router.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query('UPDATE items SET name = ? WHERE id = ?', [name, id], (err, results) => {
    if (err) throw err;
    res.json({ id, name });
  });
});

// DELETE - Eliminar un elemento
router.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM items WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ id });
  });
});

module.exports = router;
