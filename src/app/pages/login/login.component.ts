// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NbAuthResult } from '@nebular/auth'; // Importa el tipo NbAuthResult

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (_) => {
        // Si no necesitas usar el resultado directamente, puedes ignorarlo
        // Navegar a otra página o actualizar el estado de la UI
      },
      error: (error: any) => {
        this.errorMessage = 'Error de autenticación. Por favor, verifica tus credenciales.';
        // Manejo adecuado del error
      }
    });
  }
}
