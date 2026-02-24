import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donacion } from '../../models/donacion';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonacionesService {

  private apiUrl = `${environment.apiUrl}/donaciones`;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  getDonaciones(headers: any): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(this.apiUrl); 
  }

  addDonacion(donacion: {
    id:number, 
    id_donador:number,
    nombre_donador:string,
    fecha_donacion:string,
    monto_donacion:number,
    forma_donacion:string,
  }, 
    headers: any): Observable<any> {
    return this.http.post(this.apiUrl, donacion);
  }

  updateDonacion(id: number, donacion: Donacion): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, donacion);
  }

  deleteDonacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
