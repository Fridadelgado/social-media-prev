// Importación del decorador Component desde el paquete @angular/core.
// Este decorador es fundamental para definir una clase como un componente en Angular.
import { Component } from '@angular/core';

// Importación de LanguageService, un servicio personalizado creado para manejar las operaciones relacionadas con la traducción.
import { LanguageService } from './services/translate-service.service';

// Decorador @Component que marca a la clase siguiente como un componente Angular y proporciona metadatos de configuración.
@Component({
  selector: 'app-root', // El selector CSS que se utiliza en el HTML para instanciar este componente.
  templateUrl: './app.component.html', // La ruta al archivo HTML que define la vista del componente.
  styleUrls: ['./app.component.scss'], // Las rutas a los archivos de estilo específicos del componente.
})
export class AppComponent {
  // Constructor del componente donde se inyecta el servicio LanguageService.
  // La inyección de dependencias permite acceder a las funcionalidades del servicio dentro de este componente.
  constructor(private languageService: LanguageService) {}

  // Aquí puedes añadir métodos, propiedades y eventos adicionales que tu componente necesite.
}
