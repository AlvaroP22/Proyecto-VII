export interface Adopcion {
    id: number;
    id_mascota: number;
    nombre_mascota: string;
    id_adoptante: number;
    nombre_adoptante: string;
    fecha_solicitud: string;
    motivos: string;
    fecha_adopcion: string;
    observaciones: string;
    status: string;
  }