import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent {

  contactData = {
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  };

  // NUEVO: DATOS DE VOLUNTARIO
  volunteerData = {
    nombre: '',
    edad: '',
    email: '',
    disponibilidad: '',
    motivo: ''
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  // FORMULARIO CONTACTO (YA EXISTENTE)
  onSubmit() {
    const mensajes = JSON.parse(localStorage.getItem('mensajes') || '[]');
    mensajes.push(this.contactData);
    localStorage.setItem('mensajes', JSON.stringify(mensajes));

    alert('Recibimos tu mensaje, te responderemos lo antes posible');

    this.contactData = {
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    };

    this.router.navigate(['/contacto']);
  }

  // NUEVO: FORMULARIO VOLUNTARIO
  onVolunteerSubmit() {
    const voluntarios = JSON.parse(localStorage.getItem('voluntarios') || '[]');
    voluntarios.push(this.volunteerData);
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));

    alert('¡Gracias por registrarte como voluntario!);

    this.volunteerData = {
      nombre: '',
      edad: '',
      email: '',
      disponibilidad: '',
      motivo: ''
    };
  }
}
