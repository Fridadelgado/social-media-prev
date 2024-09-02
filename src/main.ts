// Importa la función platformBrowserDynamic desde @angular/platform-browser-dynamic.
// Esta función es utilizada para arrancar la aplicación en un entorno con capacidad de manipular DOM,
// ideal para aplicaciones web que corren en el navegador.
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Importa AppModule, el módulo raíz de la aplicación Angular.
// AppModule es el primer módulo que se carga en la aplicación y generalmente contiene la configuración global y el componente raíz.
import { AppModule } from './app/app.module';

// Utiliza platformBrowserDynamic para arrancar (bootstrap) el módulo AppModule.
// Esto inicia la aplicación Angular, compilando los componentes y servicios del módulo raíz antes de ejecutar la aplicación en el navegador.
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err)); // Captura y registra cualquier error que ocurra durante el arranque de la aplicación.

// Notas:
// Este proceso de arranque es específico para aplicaciones que se ejecutan en navegadores web.
// Angular también ofrece otras opciones para arrancar aplicaciones en diferentes entornos, como por ejemplo, en el servidor (Server Side Rendering) o en Web Workers.
