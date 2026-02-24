import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonacionesService } from '../../services/donaciones/donaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Donacion } from '../../models/donacion';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donaciones-admin.component.html',
  styleUrl: './donaciones-admin.component.scss'
})
export class DonacionesComponent implements OnInit {

  donaciones: any[] = [];

  newDonacion: {
    id: number,
    id_donador: number,
    nombre_donador: string,
    fecha_donacion: string,
    monto_donacion: number,
    forma_donacion: string,
  } = {
    id: 0,
    id_donador: 0,
    nombre_donador: '',
    fecha_donacion: '',
    monto_donacion: 0,
    forma_donacion: '',
  };

  constructor(public data: DonacionesService, private router: Router, private route: ActivatedRoute) {
      this.route.data.subscribe(data => {
      const donacion = data['donacion'];
      if (donacion) {
        this.newDonacion = donacion;
      }  
    });
  }
 
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.data.getDonaciones({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        this.donaciones = data;
      },
      error: (err) => {
        console.error('Error al cargar donaciones:', err);
      }
    });
  }

  deleteDonacion(id: number): void {
    const confirmed = window.confirm('¿Estás seguro de borrar la donacion?');
    if (confirmed) {
      this.data.deleteDonacion(id).subscribe(
        () => {
          this.donaciones = this.donaciones.filter(donacion => donacion.id !== id);
          this.router.navigate(['/donaciones']);
        },
        (error: any) => {
          console.error('Error al borrar', error);
        }
      );
    }
  }

  editDonacion(donacion: Donacion): void {
    this.newDonacion = { ...donacion };
  }

  cancelEdit(): void {
    this.newDonacion = {
      id: 0,
      id_donador: 0,
      nombre_donador: '',
      fecha_donacion: '',
      monto_donacion: 0,
      forma_donacion: '',
    };
    this.router.navigate(['/donaciones']);
  }

  onSubmit(): void {
        if (!this.newDonacion) return;

        if (this.newDonacion.id) {
            this.data
                .updateDonacion(this.newDonacion.id, this.newDonacion)
                .subscribe(
                    () => {
                        const index = this.donaciones.findIndex(
                            (m) => m.id === this.newDonacion.id
                        );
                        if (index !== -1) {
                            this.donaciones[index] = { ...this.newDonacion };
                        }
                        this.newDonacion = {
                          id: 0,
                          id_donador: 0,
                          nombre_donador: '',
                          fecha_donacion: '',
                          monto_donacion: 0,
                          forma_donacion: '',
                        };
                        this.router.navigate(["/donaciones"]);
                    },
                    (error: any) => {
                        console.error(
                            "Error al actualizar la donacion",
                            error
                        );
                    }
                );
        } else {
            this.data
                .addDonacion(this.newDonacion, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .subscribe({
                    next: (data: any) => {
                        this.donaciones.push(data);
                        this.newDonacion = {
                          id: 0,
                          id_donador: 0,
                          nombre_donador: '',
                          fecha_donacion: '',
                          monto_donacion: 0,
                          forma_donacion: '',
                        };
                        this.router.navigate(["/donaciones"]);
                    },
                    error: (error: any) => {
                        console.error("Error al añadir la donacion", error);
                    },
                });
        }
    }
}