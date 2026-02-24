const express = require('express');
const router = express.Router();
const db = require('../models/initDB');
const auth = require('../middleware/auth');

// GET all
router.get('/', auth, (req, res) => {
  db.all('SELECT * FROM mascotas', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// GET by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db.get(`SELECT * FROM mascotas WHERE id = ?`, [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'mascota no encontrado' });
      res.json(row);
    });
  });

// POST
router.post('/', auth, (req, res) => {
  const { foto, nombre, sexo, talla, edad, estado_salud, descripcion, status } = req.body;

  db.run(
    `INSERT INTO mascotas (foto, nombre, sexo, talla, edad, estado_salud, descripcion, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [foto, nombre, , sexo, talla, edad, estado_salud, descripcion, status],
    function (err) {
      if (err) return res.status(500).send(err.message);
      db.get(
        `SELECT * FROM mascotas WHERE id = ?`,
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
  const { foto, nombre, sexo, talla, edad, estado_salud, descripcion, status } = req.body;
  db.run(
    `UPDATE mascotas SET foto=?, nombre=?, sexo=?, talla=?, edad=?, estado_salud=?, descripcion=?, status=? WHERE id=?`,
    [foto,nombre, sexo, talla, edad, estado_salud, descripcion, status, req.params.id],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.json({ changes: this.changes });
    }
  );
});

// DELETE
router.delete('/:id', auth, (req, res) => {
  db.run(`DELETE FROM mascotas WHERE id=?`, [req.params.id], function (err) {
    if (err) return res.status(500).send(err.message);
    res.json({ changes: this.changes });
  });
});

module.exports = router;
