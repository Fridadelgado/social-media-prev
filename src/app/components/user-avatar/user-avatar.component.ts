// Importa el decorador Component desde el paquete @angular/core,
// el cual es necesario para crear un componente en Angular.
import { Component } from '@angular/core';

// El decorador @Component permite definir metadatos para el componente UserAvatarComponent.
@Component({
  // El selector 'app-user-avatar' define el nombre de la etiqueta HTML
  // que se utilizará para invocar este componente dentro de una plantilla Angular.
  selector: 'app-user-avatar',

  // La propiedad templateUrl especifica la ruta al archivo HTML que contiene
  // la plantilla del componente. Este archivo deberá contener la estructura HTML
  // que representa el avatar del usuario.
  templateUrl: './user-avatar.component.html',

  // La propiedad styleUrls es un arreglo que contiene las rutas a los archivos CSS
  // que estilizan este componente. Los estilos definidos aquí se aplicarán solamente
  // a este componente, gracias al encapsulamiento de estilos de Angular.
  styleUrls: ['./user-avatar.component.scss']
})
// La clase UserAvatarComponent es donde se definiría la lógica del componente,
// como manipulación de datos, interacciones, etc. Actualmente, está vacía, lo que indica
// que este componente se utiliza principalmente para fines de presentación.
export class UserAvatarComponent {
  // Aquí podrías añadir propiedades, métodos y otros decoradores
  // para gestionar el comportamiento y los datos del avatar del usuario.
}
