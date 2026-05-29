const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// REGISTER
router.post('/new', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const rolFinal = rol && rol === 'admin' ? 'admin' : 'guest';
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id`,
      [nombre, email, hashedPassword, rolFinal]
    );

    res.status(201).json({
      mensaje: 'Usuario registrado',
      id: result.rows[0].id,
      rol: rolFinal
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: user.nombre,
      rol: user.rol,
      user_id: user.id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
