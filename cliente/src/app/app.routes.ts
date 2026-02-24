import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { authGuard } from './shared/auth/auth.guard';
import { AdopcionesComponent } from './pages/adopciones/adopciones.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AdminGuard } from './shared/admin/admin.guard';
import { DonarComponent } from './pages/donar/donar.component';
import { DonacionesComponent } from './pages/donaciones-admin/donaciones-admin.component';
import { FaqComponent } from './pages/faq/faq.component';
import { loginGuard } from './shared/login/login.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'registro', component: RegisterFormComponent },
    { path: 'mascotas', component: MascotasComponent },
    { path: 'donar', component: DonarComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'login', component: LoginComponent, canActivate: [loginGuard]},
    { path: 'adopciones', component: AdopcionesComponent, canActivate: [authGuard] },
    { path: 'donaciones', component: DonacionesComponent, canActivate: [authGuard, AdminGuard] },
    { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard, AdminGuard]},
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
