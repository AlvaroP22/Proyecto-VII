import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdopcionService } from "../../services/adopciones/adopciones.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Adopcion } from "../../models/adopcion";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
import { AdopcionStateService } from "../../services/adopciones/adopcion-state.service";

@Component({
    selector: "app-adopciones",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./adopciones.component.html",
    styleUrl: "./adopciones.component.scss",
})
export class AdopcionesComponent implements OnInit {
    adopciones: any[] = [];

    newAdopcion: {
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
    } = {
        id: 0,
        id_mascota: 0,
        nombre_mascota: "",
        id_adoptante: 0,
        nombre_adoptante: "",
        fecha_solicitud: "",
        motivos: "",
        fecha_adopcion: "",
        observaciones: "",
        status: "",
    };

    constructor(
        public data: AdopcionService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private adopcionState: AdopcionStateService
    ) {
        this.route.data.subscribe((data) => {
            const adopcion = data["adopcion"];
            if (adopcion) {
                this.newAdopcion = adopcion;
            }
        });
    }

    isFromAdoptButton = false;

  ngOnInit(): void {
        // Subscribe to mascotaId changes
        this.adopcionState.mascotaId$.subscribe(id => {
            if (id) {
                this.newAdopcion.id_mascota = id;
            }
        });

        // Subscribe to userId changes
        this.adopcionState.userId$.subscribe(id => {
            if (id) {
                this.newAdopcion.id_adoptante = id;
            }
        });

        // Subscribe to isFromAdoptButton changes
        this.adopcionState.isFromAdoptButton$.subscribe(isFromButton => {
            this.isFromAdoptButton = isFromButton;
        });
        const token = localStorage.getItem("token");
        this.data
            .getAdopciones({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .subscribe({
                next: (data) => {
                    this.adopciones = data;
                },
                error: (err) => {
                    console.error("Error al cargar adopciones:", err);
                },
            });
    }

    isAdmin(): boolean {
    return this.authService.isAdmin();
  }

    deleteAdopcion(id: number): void {
        const confirmed = window.confirm(
            "¿Estás seguro de borrar la adopcion?"
        );
        if (confirmed) {
            this.data.deleteAdopcion(id).subscribe(
                () => {
                    this.adopciones = this.adopciones.filter(
                        (adopcion) => adopcion.id !== id
                    );
                    this.router.navigate(["/adopciones"]);
                },
                (error: any) => {
                    console.error("Error al borrar", error);
                }
            );
        }
    }

    editAdopcion(adopcion: Adopcion): void {
        this.newAdopcion = { ...adopcion };
    }

    cancelEdit(): void {
        this.adopcionState.clearIds();
        if (this.isAdmin()) {
            this.newAdopcion = {
              id: 0,
              id_mascota: 0,
              nombre_mascota: "",
              id_adoptante: 0,
              nombre_adoptante: "",
              fecha_solicitud: "",
              motivos: "",
              fecha_adopcion: "",
              observaciones: "",
              status: "",
            };
            this.router.navigate(['/adopciones']);
          }
          else {
          this.router.navigate(['/mascotas']);
        }
    }

    onSubmit(): void {
        if (!this.newAdopcion) return;

        if (this.newAdopcion.id) {
            this.data
                .updateAdopcion(this.newAdopcion.id, this.newAdopcion)
                .subscribe(
                    () => {
                        const index = this.adopciones.findIndex(
                            (m) => m.id === this.newAdopcion.id
                        );
                        if (index !== -1) {
                            this.adopciones[index] = { ...this.newAdopcion };
                        }
                        this.adopcionState.clearIds();
                        this.newAdopcion = {
                          id: 0,
                          id_mascota: 0,
                          nombre_mascota: "",
                          id_adoptante: 0,
                          nombre_adoptante: "",
                          fecha_solicitud: "",
                          motivos: "",
                          fecha_adopcion: "",
                          observaciones: "",
                          status: "",
                        };
                        this.router.navigate(["/adopciones"]);
                    },
                    (error: any) => {
                        console.error(
                            "Error al actualizar la adopcion",
                            error
                        );
                    }
                );
        } else {
            this.data
                .addAdopcion(this.newAdopcion, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .subscribe({
                    next: (data: any) => {
                        this.adopciones.push(data);
                        this.adopcionState.clearIds();
                        this.newAdopcion = {
                          id: 0,
                          id_mascota: 0,
                          nombre_mascota: "",
                          id_adoptante: 0,
                          nombre_adoptante: "",
                          fecha_solicitud: "",
                          motivos: "",
                          fecha_adopcion: "",
                          observaciones: "",
                          status: "",
                        };
                        if (this.isAdmin()) {
                            this.router.navigate(['/adopciones']);
                        }
                        else {
                            alert('Solicitud enviada exitosamente');
                            this.router.navigate(['/mascotas']);
                        }
                    },
                    error: (error: any) => {
                        console.error("Error al añadir la adopcion", error);
                    },
                });
        }
    }
}
