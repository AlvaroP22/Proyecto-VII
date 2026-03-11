import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotaService } from '../../services/mascotas/mascotas.service';
import { Mascota } from '../../models/mascota';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuarios/usuarios.service';
import { AdopcionStateService } from '../../services/adopciones/adopcion-state.service';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-mascota-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './mascota-detail.component.html',
  styleUrl: './mascota-detail.component.scss'
})
export class MascotaDetailComponent implements OnInit {

  mascotas: any[] = [];

  newMascota: {
    id: number;
    foto: string;
    nombre: string;
    talla: string;
    sexo: string;
    edad: number;
    estado_salud: string;
    descripcion: string;
    status: string;
  } = {
    id: 0,
    foto: "",
    nombre: "",
    talla: "",
    sexo: "",
    edad: 0,
    estado_salud: "",
    descripcion: "",
    status: "",
  };

  usuarios: any[] = [];

  newUsuario: {
    id: number;
    nombre: string;
    email: string;
    password: string;
    rol: string;
    direccion: string;
    contacto: string;
  } = {
    id: 0,
    nombre: "",
    email: "",
    password: "",
    rol: "",
    direccion: "",
    contacto: "",
  };

  constructor(
    public data: MascotaService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private adopcionState: AdopcionStateService
  ) {
    this.route.data.subscribe((data) => {
      const mascota = data["mascota"];
      if (mascota) {
        this.newMascota = mascota;
      }
    });
    this.route.data.subscribe((dataUsuario) => {
      const usuario = dataUsuario["usuario"];
      if (usuario) {
        this.newUsuario = usuario;
      }
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.data.getMascotaById(id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).subscribe((mascota) => {
      this.newMascota = mascota;
    });

    this.route.data.subscribe((data) => {
      const mascota = data["mascota"];
      if (mascota) {
        this.newMascota = mascota;
      }
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  showModal(user: any): void {
    const modalElement = document.getElementById("incompleteDataModal");
    if (modalElement) {
      this.newUsuario = { ...user };
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  adoptarMascota(mascota: Mascota): void {
    if (this.isAuthenticated()) {
      this.usuarioService.getCurrentUser().subscribe((user) => {
        const userId = user ? user.id : null;

        if (userId) {
          if (user.direccion && user.contacto !== "") {
            this.adopcionState.setIds(mascota.id, userId);
            this.router.navigate(["/adopciones"]);
          } else {
            this.showModal(user);
          }
        } else {
          this.router.navigate(["/login"]);
          alert("Debes iniciar sesión para adoptar una mascota.");
        }
      });
    } else {
      this.router.navigate(["/login"]);
      alert("Debes iniciar sesión para adoptar una mascota.");
    }
  }

  onSubmitModal(): void {
    if (!this.newUsuario) return;

    if (this.newUsuario.id) {
      this.usuarioService
        .updateUsuario(this.newUsuario.id, this.newUsuario)
        .subscribe(
          () => {
            const index = this.usuarios.findIndex(
              (m) => m.id === this.newUsuario.id
            );
            if (index !== -1) {
              this.usuarios[index] = { ...this.newUsuario };
            }

            alert("Datos actualizados correctamente");

            this.newUsuario = {
              id: 0,
              nombre: "",
              email: "",
              password: "",
              rol: "",
              direccion: "",
              contacto: "",
            };
            this.router.navigate(["/mascotas"]);
          },
          (error: any) => {
            console.error("Error al actualizar la usuario", error);
          }
        );
    }
  }
}
