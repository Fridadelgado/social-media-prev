import {Component, Input} from '@angular/core';
import {Publicacion} from "../../../../services/publicaciones.service";

@Component({
  selector: 'modal-publicacion-vista-previa',
  templateUrl: './vista-previa.component.html',
  styleUrls: [
    './vista-previa.component.scss',
    './cssPersonalizado/modal-publicacion-facebook.component.scss',  // Estilos específicos de Facebook
    './cssPersonalizado/modal-publicacion-instagram.component.scss', // Estilos específicos de Instagram
    './cssPersonalizado/modal-publicacion-tiktok.component.scss',    // Estilos específicos de TikTok
    './cssPersonalizado/modal-publicacion-youtube.component.scss',   // Estilos específicos de YouTube
    './cssPersonalizado/modal-publicacion-linkedin.component.scss',  // Estilos específicos de LinkedIn
    './cssPersonalizado/modal-publicacion-twitter-x.component.scss',  // Estilos específicos de Twitter y X
    './cssPersonalizado/modal-publicacion-pinterest.component.scss'  // Estilos específicos de Pinteres
  ]
})
export class VistaPreviaComponent {
  @Input() publicacion!: Publicacion;
  @Input() fileType!: string;
  redSocialPreviaSeleccionada: string = ''; // Red social seleccionada para la previsualización
  vistaPrevia: 'desktop' | 'mobile' = 'desktop'; // Vista previa actual, ya sea desktop o mobile
  defaultPreviewImage: string = '../../../assets/images/defaultcar.png';
  imagenPrevisualizacion: string | ArrayBuffer | null = '';
  publicacionDefault = {
    titulo: 'Título Predeterminado',
    descripcion: 'Descripción predeterminada... Este coche no es solo un medio de transporte; es tu próximo compañero de aventuras. Con su elegante diseño, confort inigualable y rendimiento excepcional, está listo para convertirse en parte de tu vida y llevarte a nuevos destinos.',
    redSocial: ['facebook', 'twitter'],
  };


  alternarVistaPrevia(vista: 'desktop' | 'mobile'): void {
    this.vistaPrevia = vista;
    //TODO: FIX detectChanges
    //this.cdr.detectChanges(); // Asegura que se detecten los cambios
  }

  // Método opcional para personalizar aún más el estilo de la previsualización
  updatePreviewStyle(): void {
    switch (this.redSocialPreviaSeleccionada.toLowerCase()) {
      case 'facebook':
        // Lógica adicional para Facebook
        break;
      case 'instagram':
        // Lógica adicional para Instagram
        break;
      case 'twitter':
        // Lógica adicional para Twitter
        break;
      // Otros casos para diferentes redes sociales
    }
  }


}
