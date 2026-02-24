const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/proyecto7.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT UNIQUE,
    password TEXT,
    direccion TEXT,
    contacto TEXT,
    rol TEXT CHECK(rol IN ('admin', 'guest')) DEFAULT 'guest'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS mascotas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    foto TEXT,
    nombre TEXT,
    sexo TEXT CHECK(sexo IN ('macho', 'hembra')),
    talla TEXT,
    edad INTEGER,
    estado_salud TEXT,
    descripcion TEXT,
    status TEXT CHECK(status IN ('disponible', 'adoptado')) DEFAULT 'disponible'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS adopciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_mascota INTEGER,
    id_adoptante INTEGER,
    fecha_solicitud TEXT DEFAULT (datetime('now', 'localtime')),
    motivos TEXT,
    status TEXT CHECK(status IN ('pendiente', 'aceptada', 'rechazada')) DEFAULT 'pendiente',
    fecha_adopcion TEXT,
    observaciones TEXT,
    FOREIGN KEY(id_mascota) REFERENCES mascotas(id),
    FOREIGN KEY(id_adoptante) REFERENCES adoptantes(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS donaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_donador INTEGER,
    fecha_donacion TEXT,
    monto_donacion INTEGER,
    forma_donacion TEXT,    
    FOREIGN KEY(id_donador) REFERENCES donadores(id)
  )`);

});

module.exports = db;
