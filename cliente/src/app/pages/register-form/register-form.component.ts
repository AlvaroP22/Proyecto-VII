import { CommonModule} from '@angular/common';
import { Component} from '@angular/core';
import { RegistrosService } from '../../services/registros/registros.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  registros: any[] = [];
  
    newRegistro: {
      id: number,
      nombre: string,
      email: string,
      password: string,
      rol: string,
      
    } = {
      id: 0,
      nombre: '',
      email: '',
      password: '',
      rol: '',
    };

    confirmPassword = '';
    passwordError = '';
  
    constructor(public data: RegistrosService, public router: Router, public route: ActivatedRoute) {
        this.route.data.subscribe(data => {
        const registro = data['registro'];
        if (registro) {
          this.newRegistro = registro;
        }  
      });
    }

    onSubmit(): void {
      if (!this.newRegistro) return;

      if (this.newRegistro.password !== this.confirmPassword) {
      this.passwordError = 'Las contraseñas no coinciden';
      return;
    }

      this.passwordError = '';
      
      this.data.addRegistro(this.newRegistro).subscribe({
        next: (data: any) => {
          this.registros.push(data);
          this.newRegistro = {
            id: 0,
            nombre: '',
            email: '',
            password: '',
            rol: '',
          };
          alert('Registrado con éxito');
          this.router.navigate(['/login']);
        },
        
        error: (error: any) => {
          console.error('Error al añadir el registro', error);
        }
      });
    }
}
