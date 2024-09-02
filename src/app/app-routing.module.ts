// Importaciones necesarias de Angular Core y Router para configurar el enrutamiento.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importaciones de componentes específicos que se utilizarán en las rutas.
// Cada uno de estos componentes representa una vista o página distinta en la aplicación.
import { DashboardKpisComponent } from './pages/dashboard-kpis/dashboard-kpis.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { CalendariopublicacionesComponent } from './pages/calendariopublicaciones/calendariopublicaciones.component';
import { PublicacionesComponent } from './pages/publicaciones/publicaciones.component';
import { ConversacionesComponent } from './pages/conversaciones/conversaciones.component';
import { DistribuidoresAsignadosComponent } from './pages/distribuidores-asignados/distribuidores-asignados.component';
import { RedesSocialesComponent } from './pages/redes-sociales/redes-sociales.component';
import { SocialAuthComponent } from './pages/social-auth/social-auth.component'; // Asegúrate de importar el nuevo componente

// Importaciones de componentes de autenticación proporcionados por Nebular para manejar login, registro, etc.
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  // Rutas para el sistema de autenticación de Nebular.
  {
    path: 'auth',
    component: NbAuthComponent, // Contenedor principal para las páginas de autenticación.
    children: [ // Rutas hijas para las diferentes páginas de autenticación.
      { path: '', component: NbLoginComponent },
      { path: 'login', component: NbLoginComponent },
      { path: 'register', component: NbRegisterComponent },
      { path: 'logout', component: NbLogoutComponent },
      { path: 'request-password', component: NbRequestPasswordComponent },
      { path: 'reset-password', component: NbResetPasswordComponent },
    ],
  },
  // Ruta principal que usa AuthLayoutComponent como contenedor para otras rutas relacionadas con la aplicación autenticada.
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      // Rutas hijas para cada página principal de la aplicación.
      // Cada ruta carga un componente diferente como vista.
      { path: 'redessociales-kpis', component: DashboardKpisComponent },
      { path: 'users', component: UsersComponent },
      { path: 'calendariopublicaciones', component: CalendariopublicacionesComponent },
      { path: 'publicaciones', component: PublicacionesComponent },
      { path: 'conversaciones', component: ConversacionesComponent },
      { path: 'redes-sociales', component: RedesSocialesComponent },
      { path: 'distribuidores-asignados', component: DistribuidoresAsignadosComponent },
      { path: 'social-auth', component: SocialAuthComponent }, 
      { path: '**', component: PageNotFoundComponent }
      // ... más rutas autenticadas ...
    ]
  },
  // Ruta de redirección por defecto. Si la ruta está vacía, redirige a '/redessociales-kpis'.
  { path: '', redirectTo: '/redessociales-kpis', pathMatch: 'full' }
];

// Decorador @NgModule que registra el arreglo de rutas en el RouterModule,
// haciendo que las rutas definidas estén disponibles en toda la aplicación.
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura el router basándose en las rutas definidas anteriormente.
  exports: [RouterModule] // Exporta RouterModule para que esté disponible en toda la aplicación.
})
export class AppRoutingModule { }
