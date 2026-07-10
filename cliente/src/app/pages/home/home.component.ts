import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, CommonModule, FormsModule, HttpClientModule, RouterLink],
  providers: [HttpClient],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
