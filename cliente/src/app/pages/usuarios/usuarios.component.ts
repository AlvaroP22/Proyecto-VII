import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  
    usuarios: any[] = [];
    
      newUsuario: {
        id: number,
        nombre: string,
        email: string,
        password: string,
        rol: string
        direccion: string,
        contacto: string,
      } = {
        id: 0,
        nombre: '',
        email: '',
        password: '',
        rol: '',
        direccion: '',
        contacto: '',
      };

      confirmPassword = '';
      passwordError = '';
    
      constructor(public data: UsuarioService, private router: Router, private route: ActivatedRoute) {
          this.route.data.subscribe(data => {
          const usuario = data['usuario'];
          if (usuario) {
            this.newUsuario = usuario;
          }  
        });
      }
  
      ngOnInit(): void {
       const token = localStorage.getItem('token');
        this.data.getUsuarios({
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).subscribe({
          next: (data) => {
            this.usuarios = data;
          },
          error: (err) => {
            console.error('Error al cargar usuarios:', err);
          }
        });
      }

      deleteUsuario(id: number): void {
        const confirmed = window.confirm('¿Estás seguro de borrar la usuario?');
        if (confirmed) {
          this.data.deleteUsuario(id).subscribe(
            () => {
              this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
              this.router.navigate(['/usuarios']);
            },
            (error: any) => {
              console.error('Error al borrar', error);
            }
          );
        }
      }
    
      editUsuario(usuario: Usuario): void {
        this.newUsuario = { ...usuario };
      }

      getUsuarioById(id: number): void {
        const token = localStorage.getItem('token');
        this.data.getUsuario(id).subscribe({
          next: (usuario) => {
            console.log('Usuario encontrado:', usuario);
            return usuario;
          },
          error: (error) => {
            console.error('Error al obtener usuario:', error);
            return null;
          }
        });
      }
    
      cancelEdit(): void {
          this.newUsuario = {
            id: 0,
            nombre: '',
            email: '',
            password: '',
            rol: '',
            direccion: '',
            contacto: '',
          };
          this.router.navigate(['/usuarios']);
    }
  
      onSubmit(): void {
        if (!this.newUsuario) return;
        
        if (this.newUsuario.id) {
          this.data.updateUsuario(this.newUsuario.id, this.newUsuario).subscribe(
            () => {
              const index = this.usuarios.findIndex(m => m.id === this.newUsuario.id);
              if (index !== -1) {
                this.usuarios[index] = {...this.newUsuario};
              }
              this.newUsuario = {
                id: 0,
                nombre: '',
                email: '',
                password: '',
                rol: '',
                direccion: '',
                contacto: '',
              };
              this.router.navigate(['/usuarios']);
            },
            (error: any) => {
              console.error('Error al actualizar la usuario', error);
            }
          );
        }
        else {
          this.data.addUsuario(this.newUsuario).subscribe({
            next: (data: any) => {
              this.usuarios.push(data);
              this.newUsuario = {
                id: 0,
                nombre: '',
                email: '',
                password: '',
                rol: '',
                direccion: '',
                contacto: '',
              };
              this.router.navigate(['/usuarios']);
            },
            error: (error: any) => {
              console.error('Error al añadir la usuario', error);
            }
          });
        }
        
      } 
  }
