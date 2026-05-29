const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

const SELECT_DONACION = `
  SELECT a.id, a.id_donador, ad.nombre AS nombre_donador,
         a.fecha_donacion, a.monto_donacion, a.forma_donacion
  FROM donaciones a
  JOIN usuarios ad ON a.id_donador = ad.id
`;

// GET all
router.get("/", auth, async (req, res) => {
  try {
    const result = await pool.query(SELECT_DONACION);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by id
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `${SELECT_DONACION} WHERE a.id = $1`,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Donación no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post("/", auth, async (req, res) => {
  try {
    const { id_donador, fecha_donacion, monto_donacion, forma_donacion } = req.body;

    if (!id_donador || !fecha_donacion || !monto_donacion || !forma_donacion) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const insertResult = await pool.query(
      `INSERT INTO donaciones (id_donador, fecha_donacion, monto_donacion, forma_donacion)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [id_donador, fecha_donacion, monto_donacion, forma_donacion]
    );

    const result = await pool.query(
      `${SELECT_DONACION} WHERE a.id = $1`,
      [insertResult.rows[0].id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT
router.put("/:id", auth, async (req, res) => {
  try {
    const { id_donador, fecha_donacion, monto_donacion, forma_donacion } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE donaciones SET
         id_donador = $1,
         fecha_donacion = $2,
         monto_donacion = $3,
         forma_donacion = $4
       WHERE id = $5`,
      [id_donador, fecha_donacion, monto_donacion, forma_donacion, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Donación no encontrada" });
    }

    res.json({ mensaje: "Donación actualizada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM donaciones WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Donación no encontrada" });
    }

    res.json({ mensaje: "Donación eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
