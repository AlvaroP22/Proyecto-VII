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
      CHECK (sexo IN ('Macho','Hembra')),
    talla TEXT
      CHECK (talla IN ('Pequeña','Mediana','Grande')),
    edad INTEGER,
    estado_salud TEXT,
      CHECK (estado_salud IN ('Saludable','Necesita tratamiento','Lesionado')),
    descripcion TEXT,
    status TEXT
      CHECK (status IN ('Disponible','Adoptado'))
      DEFAULT 'Disponible'
);


CREATE TABLE IF NOT EXISTS adopciones (
    id SERIAL PRIMARY KEY,

    id_mascota INTEGER,
    id_adoptante INTEGER,

    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    motivos TEXT,

    status TEXT
      CHECK(status IN ('Pendiente','Aceptada','Rechazada'))
      DEFAULT 'Pendiente',

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
      CHECK (forma_donacion IN ('Efectivo','Transferencia','Especie')),

    CONSTRAINT fk_donador
      FOREIGN KEY(id_donador)
      REFERENCES usuarios(id)
);