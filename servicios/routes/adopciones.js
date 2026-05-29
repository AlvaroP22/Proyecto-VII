const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

const SELECT_ADOPCION = `
  SELECT a.id, a.id_mascota, m.nombre AS nombre_mascota,
         a.id_adoptante, a.fecha_solicitud, a.motivos,
         ad.nombre AS nombre_adoptante,
         a.fecha_adopcion, a.observaciones, a.status
  FROM adopciones a
  JOIN mascotas m ON a.id_mascota = m.id
  JOIN usuarios ad ON a.id_adoptante = ad.id
`;

// GET all
router.get("/", auth, async (req, res) => {
  try {
    const result = await pool.query(SELECT_ADOPCION);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `${SELECT_ADOPCION} WHERE a.id = $1`,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Adopción no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const { id_mascota, id_adoptante, motivos } = req.body;

    if (!id_mascota || !id_adoptante || !motivos) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const insertResult = await pool.query(
      `INSERT INTO adopciones (id_mascota, id_adoptante, motivos)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [id_mascota, id_adoptante, motivos]
    );

    const result = await pool.query(
      `${SELECT_ADOPCION} WHERE a.id = $1`,
      [insertResult.rows[0].id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const { id_mascota, id_adoptante, fecha_solicitud, motivos, fecha_adopcion, observaciones, status } =
      req.body;
    const { id } = req.params;

    await pool.query(
      `UPDATE adopciones SET
         id_mascota = $1,
         id_adoptante = $2,
         fecha_solicitud = $3,
         motivos = $4,
         fecha_adopcion = $5,
         observaciones = $6,
         status = $7
       WHERE id = $8`,
      [id_mascota, id_adoptante, fecha_solicitud, motivos, fecha_adopcion, observaciones, status, id]
    );

    res.json({ mensaje: "Adopción actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM adopciones WHERE id = $1", [id]);

    res.json({ mensaje: "Adopción eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
