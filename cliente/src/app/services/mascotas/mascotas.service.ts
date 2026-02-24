import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../../models/mascota';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private apiUrl = `${environment.apiUrl}/mascotas`;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  getMascotas(headers: any): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.apiUrl); 
  }

  addMascota(mascota: {
    id:number, 
    foto:string,
    nombre:string, 
    talla:string, 
    sexo:string, 
    edad:number, 
    estado_salud:string, 
    descripcion:string,
    status:string,
  }, 
    headers: any): Observable<any> {
    return this.http.post(this.apiUrl, mascota);
  }

  updateMascota(id: number, mascota: Mascota): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, mascota);
  }

  deleteMascota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
