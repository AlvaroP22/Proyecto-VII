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

  constructor(private router: Router, private route: ActivatedRoute) {}

  onSubmit() {

    // Guardar datos en localStorage
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
}
