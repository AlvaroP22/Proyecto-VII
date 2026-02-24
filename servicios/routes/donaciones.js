const express = require("express");
const router = express.Router();
const db = require("../models/initDB");
const auth = require("../middleware/auth");

// GET all
router.get("/", auth, (req, res) => {
  db.all(
    `SELECT a.id, a.id_donador, ad.nombre AS nombre_donador,
            a.fecha_donacion, a.monto_donacion, a.forma_donacion
     FROM donaciones a
     JOIN usuarios ad ON a.id_donador = ad.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// GET by id
router.get("/:id", auth, (req, res) => {
  const { id } = req.params;

  db.get(
    `SELECT a.id, a.id_donador, ad.nombre AS nombre_donador,
            a.fecha_donacion, a.monto_donacion, a.forma_donacion
     FROM donaciones a
     JOIN usuarios ad ON a.id_donador = ad.id
     WHERE a.id = ?`,
    [id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Donación no encontrada" });
      res.json(row);
    }
  );
});

// POST
router.post("/", auth, (req, res) => {
  const { id_donador, fecha_donacion, monto_donacion, forma_donacion } = req.body;

  if (!id_donador || !fecha_donacion || !monto_donacion || !forma_donacion) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  db.run(
    `INSERT INTO donaciones (id_donador, fecha_donacion, monto_donacion, forma_donacion)
     VALUES (?, ?, ?, ?)`,
    [id_donador, fecha_donacion, monto_donacion, forma_donacion],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      db.get(
        `SELECT a.id, a.id_donador, ad.nombre AS nombre_donador,
                a.fecha_donacion, a.monto_donacion, a.forma_donacion
         FROM donaciones a
         JOIN usuarios ad ON a.id_donador = ad.id
         WHERE a.id = ?`,
        [this.lastID],
        (err, row) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json(row);
        }
      );
    }
  );
});

// PUT
router.put("/:id", auth, (req, res) => {
  const { id_donador, fecha_donacion, monto_donacion, forma_donacion } = req.body;
  const { id } = req.params;

  db.run(
    `UPDATE donaciones SET
      id_donador = ?,
      fecha_donacion = ?,
      monto_donacion = ?,
      forma_donacion = ?
     WHERE id = ?`,
    [id_donador, fecha_donacion, monto_donacion, forma_donacion, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Donación no encontrada" });
      res.json({ mensaje: "Donación actualizada correctamente" });
    }
  );
});

// DELETE
router.delete("/:id", auth, (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM donaciones WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: "Donación no encontrada" });
    res.json({ mensaje: "Donación eliminada correctamente" });
  });
});

module.exports = router;
