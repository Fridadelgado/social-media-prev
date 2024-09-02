import { Component } from '@angular/core';
// Importa DomSanitizer y SafeResourceUrl desde @angular/platform-browser.
// DomSanitizer ayuda a prevenir ataques XSS al sanitizar valores para ser seguros para usar en diferentes contextos del DOM.
// SafeResourceUrl es un tipo que representa URLs seguras.
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// El decorador @Component identifica la clase inmediatamente debajo de él como un componente,
// y proporciona la metadata de configuración que determina cómo el componente debe ser procesado, instanciado y utilizado en tiempo de ejecución.
@Component({
  selector: 'app-conversaciones', // El selector CSS que representa este componente en la plantilla HTML.
  templateUrl: './conversaciones.component.html', // La ubicación de la plantilla HTML del componente.
  styleUrls: ['./conversaciones.component.scss']  // La ubicación de los estilos específicos del componente.
})
export class ConversacionesComponent {
  urlSegura: SafeResourceUrl;  // Declara una propiedad para almacenar la URL sanitizada.

  constructor(private sanitizer: DomSanitizer) { // Inyecta DomSanitizer en el componente.
    const url = "https://socialmedia.sicopweb.net/?tab=conversaciones"; // La URL que se quiere incrustar de manera segura.
    // Utiliza DomSanitizer para sanitizar la URL y asignarla a urlSegura, marcándola como segura para ser usada en el contexto de recurso.
    this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
