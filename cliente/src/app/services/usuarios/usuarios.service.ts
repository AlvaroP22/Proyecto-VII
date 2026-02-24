import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   private apiUrl = `${environment.apiUrl}/usuarios`;
  
    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}
  
    getUsuarios(headers: any): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.apiUrl); 
    }

    getUsuario(id: number): Observable<Usuario> { 
      return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    getCurrentUser(): Observable<Usuario> {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('No user ID found in localStorage');
      }
      return this.http.get<Usuario>(`${this.apiUrl}/${userId}`);
    }
  
    addUsuario(usuario: {
      id:number, 
      nombre:string, 
      email:string, 
      password:string,
      rol: string,
      direccion: string,
      contacto: string,
    }): Observable<any> {
      return this.http.post(this.apiUrl, usuario);
    }
  
    updateUsuario(id: number, usuario: Usuario): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, usuario);
    }
  
    deleteUsuario(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
