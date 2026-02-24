import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);
        localStorage.setItem('usuarioNombre', res.nombre);
        localStorage.setItem('user_id', res.user_id);
        alert('Login exitoso');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = 'Usuario o contraseña incorrectos';
        console.error(err);
      },
    });
  }
}
