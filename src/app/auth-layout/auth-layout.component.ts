import { Component } from '@angular/core';
import { SidebarService } from '../../app/services/sidebar.service'; // Servicio para manejar la barra lateral.
import { LanguageService } from '../../app/services/translate-service.service'; // Servicio para manejar la traducción e internacionalización.


// Metadatos del componente proporcionados por el decorador @Component.
@Component({
  selector: 'app-root', // Selector que se usa para instanciar el componente en el HTML.
  templateUrl: './auth-layout.component.html', // Archivo HTML que define la vista del componente.
  styleUrls: ['./auth-layout.component.scss'] // Archivo SCSS para los estilos específicos del componente.
})

export class AuthLayoutComponent {
  // Variables del componente para manejar el título, URLs de logotipos, estado del sidebar y selección de idioma.
  title = 'BI-ADMIN-INTERFACES-PADRE';
  public logoUrl = '../assets/images/logo-blanco.png';
  public logoUrl2 = '../assets/images/seekop-imagotipo.png';

  public isCollapsed = true; // Estado inicial de la barra lateral: true para colapsada.

  public selectedLanguage: string; // Idioma seleccionado actualmente.

  public languageNames: any = { // Mapeo de códigos de idioma a nombres legibles.
    'es': 'Español',
    'en': 'English',
    // Añade más idiomas según sea necesario
  };

  // Constructor que inyecta servicios para la barra lateral y el manejo de idiomas.
  constructor(
    private sidebarService: SidebarService,
    private languageService: LanguageService // Inyecta el servicio de idioma aquí
  ) {
    // Suscripción al observable del estado de la barra lateral.
    this.sidebarService.isCollapsed$.subscribe(value => {
      this.isCollapsed = true;
    });
    this.selectedLanguage = 'es'; // Establece por defecto el idioma español.
    // Cambia el idioma inicial en el servicio de idioma a español.
    this.languageService.changeLanguage(this.selectedLanguage);
  }

  // Método para alternar el estado de la barra lateral entre expandido y colapsado.
  public toggleSidebar(): void {
    this.sidebarService.toggleCollapsed();
  }

  // Método para cambiar el idioma de la aplicación, invocado al seleccionar un nuevo idioma.
  changeLanguage() {
    this.languageService.changeLanguage(this.selectedLanguage);
  }


  // Método para obtener el idioma actual de la aplicación desde el servicio de idiomas.
  getCurrentLanguage() {
    return this.languageService.getCurrentLanguage();
  }

}
