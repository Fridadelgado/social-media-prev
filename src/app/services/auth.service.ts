// Autor: Gilberto García (gilberto.garcia@seekop.com)
// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
// Importa NbAuthService y NbAuthResult de la biblioteca de autenticación de Nebular.
// NbAuthService proporciona métodos para autenticar usuarios,
// mientras que NbAuthResult es un objeto que encapsula el resultado de una solicitud de autenticación.
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { Observable } from 'rxjs';

// El decorador @Injectable permite que este servicio sea inyectado como dependencia en otros componentes o servicios.
// La opción providedIn: 'root' hace que el servicio esté disponible en toda la aplicación.
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Inyecta el servicio NbAuthService para utilizar sus métodos de autenticación.
  constructor(private nbAuthService: NbAuthService) {}

  // Método para iniciar sesión. Recibe un email y una contraseña,
  // y utiliza el método authenticate de NbAuthService para realizar la autenticación.
  // El parámetro 'email' indica que se utiliza la estrategia de autenticación basada en email.
  // Retorna un Observable de NbAuthResult, permitiendo a los componentes suscribirse al resultado de la autenticación.
  login(email: string, password: string): Observable<NbAuthResult> {
    return this.nbAuthService.authenticate('email', { email, password });
  }
}
