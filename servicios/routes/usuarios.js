const express = require('express');
const router = express.Router();
const db = require('../models/initDB');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

// GET all
router.get('/', auth, (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// GET by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db.get(`SELECT * FROM usuarios WHERE id = ?`, [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'usuario no encontrado' });
      res.json(row);
    });
  });

// POST
router.post('/', auth, async (req, res) => {
  const { nombre, email, password, rol, direccion, contacto } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO usuarios (nombre, email, password, rol, direccion, contacto) VALUES (?, ?, ?, ?, ?, ?)`,
    [ nombre, email, hashedPassword, rol, direccion, contacto],
    function (err) {
      if (err) return res.status(500).send(err.message);
      db.get(
        `SELECT * FROM usuarios WHERE id = ?`,
        [this.lastID],
        (err, row) => {
          if (err) return res.status(500).send(err.message);
          res.status(201).json(row);
        }
      );
    }
  );
});

// PUT
router.put('/:id', auth, (req, res) => {
  const { nombre, email, password, rol, direccion, contacto } = req.body;
  db.run(
    `UPDATE usuarios SET nombre=?, email=?, password=?, rol=?, direccion=?, contacto=? WHERE id=?`,
    [nombre, email, password, rol, direccion, contacto, req.params.id, req.params.email, req.params.password, req.params.rol, req.params.direccion, req.params.contacto],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.json({ changes: this.changes });
    }
  );
});

// DELETE
router.delete('/:id', auth, (req, res) => {
  db.run(`DELETE FROM usuarios WHERE id=?`, [req.params.id], function (err) {
    if (err) return res.status(500).send(err.message);
    res.json({ changes: this.changes });
  });
});

module.exports = router;
