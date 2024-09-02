// Importación de los módulos necesarios de Angular y Nebular.
import { Component } from '@angular/core';
import { NbIconLibraries  } from '@nebular/theme'; // Servicio para registrar y manejar librerías de iconos en Nebular.


// Decorador Component que marca la clase siguiente como un componente de Angular, con su metadata.
@Component({
  selector: 'app-menu-list', // Selector CSS para usar este componente en templates HTML.
  templateUrl: './menu-list.component.html', // La ubicación del archivo HTML que define la vista del componente.
  styleUrls: ['./menu-list.component.scss'] // Ubicación de los estilos específicos del componente.
})
export class MenuListComponent {
  // Autor: Gilberto García (gilberto.garcia@seekop.com)

  // Define un arreglo de objetos, donde cada objeto representa un ítem del menú.
  // Cada ítem incluye el título, el enlace y el nombre del icono asociado.
  menuItems = [
    {
      title: 'Users',  // Nombre visible en el menú.
      link: '/#', // Ruta o enlace del ítem del menú. '#' es un placeholder en este ejemplo.
      icon: 'mdi-megamenu', // Nombre del icono personalizado registrado en Nebular.

    },
    {
      title: 'Autenticación Redes Sociales',  // Nombre visible en el menú.
      link: '/social-auth', // Ruta o enlace del ítem del menú. '#' es un placeholder en este ejemplo.
      icon: 'mdi-account-group-primary',  // Nombre del icono personalizado registrado en Nebular.
    },
    {
      title: 'KPIs',  // Nombre visible en el menú.
      link: '/redessociales-kpis', // Ruta o enlace del ítem del menú. '#' es un placeholder en este ejemplo.
      icon: 'finance-primary',  // Nombre del icono personalizado registrado en Nebular.

    },
    {
      title: 'Calendario Publicaciones',  // Nombre visible en el menú.
      link: '/calendariopublicaciones', // Ruta o enlace del ítem del menú. '#' es un placeholder en este ejemplo.
      icon: 'calendar-text-outline',  // Nombre del icono personalizado registrado en Nebular.

    },
    {
      title: 'Publicaciones',  // Nombre visible en el menú.
      link: '/publicaciones', // Ruta o enlace del ítem del menú. '#' es un placeholder en este ejemplo.
      icon: 'mdi-cloud-upload-outline',  // Nombre del icono personalizado registrado en Nebular.

    },
    {
      title: 'Conversaciones',  // Nombre visible en el menú.
      link: '/conversaciones', // Ruta o enlace del ítem del menú. '#' es un placeholder en este ejemplo.
      icon: 'comment-send',  // Nombre del icono personalizado registrado en Nebular.

    },
    {
      title: 'Redes Sociales',  // Nombre visible en el menú.
      link: '/redes-sociales', // Ruta o enlace del ítem del menú. '#' es un placeholder en este ejemplo.
      icon: 'text-box-plus-outline-success',  // Nombre del icono personalizado registrado en Nebular.

    },
  ];

  // Inyección del servicio NbIconLibraries a través del constructor para manejar librerías de iconos.
  constructor(private iconLibraries: NbIconLibraries) { }

  // Hook ngOnInit se ejecuta después de la creación del componente.
  ngOnInit() {
    // Establece 'seekop' como el paquete de iconos predeterminado para este componente.
    // Esto significa que los nombres de iconos usados en 'menuItems' se buscarán en este paquete.
    this.iconLibraries.setDefaultPack('seekop');
  }


}
