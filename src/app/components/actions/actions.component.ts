// Importa el decorador Component desde el paquete @angular/core, que es esencial para crear componentes en Angular.
import { Component } from '@angular/core';

// El decorador @Component proporciona la configuración necesaria para describir cómo se debe crear y utilizar el componente.
@Component({
  selector: 'app-actions', // Define el selector del componente, que es un identificador único utilizado en los templates HTML para instanciar el componente.
  templateUrl: './actions.component.html', // Ruta al archivo HTML que contiene la plantilla del componente.
  styleUrls: ['./actions.component.scss'] // Ruta al archivo SCSS que contiene los estilos específicos del componente.
})
export class ActionsComponent {
  // La clase ActionsComponent actualmente está vacía, pero aquí es donde iría la lógica del componente,
  // como propiedades para almacenar datos y métodos para manejar eventos o interacciones del usuario.
}
