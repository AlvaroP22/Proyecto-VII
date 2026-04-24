CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre TEXT,
    email TEXT UNIQUE,
    password TEXT,
    direccion TEXT,
    contacto TEXT,
    rol TEXT
      CHECK (rol IN ('admin','guest'))
      DEFAULT 'guest'
);


CREATE TABLE IF NOT EXISTS mascotas (
    id SERIAL PRIMARY KEY,
    foto TEXT,
    nombre TEXT,
    sexo TEXT
      CHECK (sexo IN ('macho','hembra')),
    talla TEXT,
    edad INTEGER,
    estado_salud TEXT,
    descripcion TEXT,
    status TEXT
      CHECK (status IN ('disponible','adoptado'))
      DEFAULT 'disponible'
);


CREATE TABLE IF NOT EXISTS adopciones (
    id SERIAL PRIMARY KEY,

    id_mascota INTEGER,
    id_adoptante INTEGER,

    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    motivos TEXT,

    status TEXT
      CHECK(status IN ('pendiente','aceptada','rechazada'))
      DEFAULT 'pendiente',

    fecha_adopcion TIMESTAMP,

    observaciones TEXT,

    CONSTRAINT fk_mascota
      FOREIGN KEY(id_mascota)
      REFERENCES mascotas(id),

    CONSTRAINT fk_adoptante
      FOREIGN KEY(id_adoptante)
      REFERENCES usuarios(id)
);


CREATE TABLE IF NOT EXISTS donaciones (
    id SERIAL PRIMARY KEY,

    id_donador INTEGER,

    fecha_donacion TIMESTAMP,

    monto_donacion INTEGER,

    forma_donacion TEXT,

    CONSTRAINT fk_donador
      FOREIGN KEY(id_donador)
      REFERENCES usuarios(id)
);