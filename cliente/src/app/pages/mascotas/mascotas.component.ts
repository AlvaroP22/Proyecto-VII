import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MascotaService } from "../../services/mascotas/mascotas.service";
import { Router, ActivatedRoute, RouterLink } from "@angular/router";
import { Mascota } from "../../models/mascota";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
import { AdopcionStateService } from "../../services/adopciones/adopcion-state.service";
import { UsuarioService } from "../../services/usuarios/usuarios.service";

@Component({
  selector: "app-mascotas",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./mascotas.component.html",
  styleUrl: "./mascotas.component.scss",
})
export class MascotasComponent implements OnInit {
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
    private adopcionState: AdopcionStateService,
    private usuarioService: UsuarioService
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
    this.data
      .getMascotas({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (data) => {
          this.mascotas = data;
        },
        error: (err) => {
          console.error("Error al cargar mascotas:", err);
        },
      });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  navigateToDetail(id: number): void {
    this.router.navigate(["/mascota-detail", id]);
  }

  deleteMascota(id: number): void {
    const confirmed = window.confirm("¿Estás seguro de borrar la mascota?");
    if (confirmed) {
      this.data.deleteMascota(id).subscribe(
        () => {
          this.mascotas = this.mascotas.filter((mascota) => mascota.id !== id);
          this.router.navigate(["/mascotas"]);
        },
        (error: any) => {
          console.error("Error al borrar", error);
        }
      );
    }
  }

  editMascota(mascota: Mascota): void {
    this.newMascota = { ...mascota };
  }

  cancelEdit(): void {
    this.newMascota = {
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
    this.router.navigate(["/mascotas"]);
  }

  onSubmit(): void {
    if (!this.newMascota) return;

    if (this.newMascota.id) {
      this.data.updateMascota(this.newMascota.id, this.newMascota).subscribe(
        () => {
          const index = this.mascotas.findIndex(
            (m) => m.id === this.newMascota.id
          );
          if (index !== -1) {
            this.mascotas[index] = { ...this.newMascota };
          }
          this.newMascota = {
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
          this.router.navigate(["/mascotas"]);
        },
        (error: any) => {
          console.error("Error al actualizar la mascota", error);
        }
      );
    } else {
      this.data
        .addMascota(this.newMascota, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .subscribe({
          next: (data: any) => {
            this.mascotas.push(data);
            this.newMascota = {
              id: 0,
              foto: "",
              nombre: "",
              sexo: "",
              talla: "",
              edad: 0,
              estado_salud: "",
              descripcion: "",
              status: "",
            };
            this.router.navigate(["/mascotas"]);
          },
          error: (error: any) => {
            console.error("Error al añadir la mascota", error);
          },
        });
    }
  }
}
