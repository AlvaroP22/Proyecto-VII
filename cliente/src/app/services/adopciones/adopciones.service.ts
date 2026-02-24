import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adopcion } from '../../models/adopcion';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {

  private apiUrl = `${environment.apiUrl}/adopciones`;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  getAdopciones(headers: any): Observable<Adopcion[]> {
    return this.http.get<Adopcion[]>(this.apiUrl); 
  }

  addAdopcion(adopcion: {
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
    }, 
    headers: any): Observable<any> {
    return this.http.post(this.apiUrl, adopcion);
  }

  updateAdopcion(id: number, adopcion: Adopcion): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, adopcion);
  }

  deleteAdopcion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
