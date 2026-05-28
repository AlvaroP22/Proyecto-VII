const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

// GET all
router.get('/', auth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM usuarios ORDER BY id ASC'
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      'SELECT * FROM usuarios WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'usuario no encontrado'
      });
    }

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// POST
router.post('/', auth, async (req, res) => {
  try {
    const {
      nombre,
      email,
      password,
      rol,
      direccion,
      contacto
    } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      `
      INSERT INTO usuarios
      (nombre, email, password, rol, direccion, contacto)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        nombre,
        email,
        hashedPassword,
        rol || 'guest',
        direccion,
        contacto
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// PUT
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      nombre,
      email,
      password,
      rol,
      direccion,
      contacto
    } = req.body;

    let hashedPassword = password;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const result = await db.query(
      `
      UPDATE usuarios
      SET
        nombre = $1,
        email = $2,
        password = $3,
        rol = $4,
        direccion = $5,
        contacto = $6
      WHERE id = $7
      RETURNING *
      `,
      [
        nombre,
        email,
        hashedPassword,
        rol,
        direccion,
        contacto,
        req.params.id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'usuario no encontrado'
      });
    }

    res.json({
      mensaje: 'Usuario eliminado correctamente'
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;