import { Component, OnInit } from '@angular/core';
import { NbDialogService  } from '@nebular/theme';
import { PublicacionesService, Publicacion } from '../../services/publicaciones.service';
import { ModalPublicacionComponent } from '../../components/modal-publicacion/modal-publicacion.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent implements OnInit {
  publicaciones: Publicacion[] = [];

  constructor(
    private publicacionesService: PublicacionesService,
    private dialogService: NbDialogService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.publicacionesService.publicaciones.subscribe(publicaciones => {
      this.publicaciones = publicaciones.map(publicacion => {
        if (publicacion.redSocial.length > 0 && !publicacion.redSocialPreviaSeleccionada) {
          // Selecciona la primera red social por defecto
          publicacion.redSocialPreviaSeleccionada = publicacion.redSocial[0].toLowerCase();
        }
        return publicacion;
      });
    });
  }


  openModal() {
    this.dialogService.open(ModalPublicacionComponent, {
      context: {},
      dialogClass: 'custom-modal-full',
      closeOnBackdropClick: false,
    });
  }

  getSocialMediaIcon(red: string): string {
    const iconsMap: { [key: string]: string } = {
      facebook: 'facebook-icon',
      twitter: 'twitter-icon',
      instagram: 'instagram-icon',
      linkedin: 'linkedin-icon',
      tiktok: 'tiktok-icon',
      pinterest: 'pinterest-icon',
      youtube: 'youtube-icon'
    };

    const redLower = red.toLowerCase();  // Convertir a minúsculas
    return iconsMap[redLower] || 'default-icon';
  }

  alternarVistaPrevia(vista: 'desktop' | 'mobile'): void {
    this.publicaciones.forEach(publicacion => {
      publicacion.vistaPrevia = vista;
    });
    this.cdr.detectChanges(); // Asegura que se detecten los cambios
  }


  isVideo(url: string): boolean {
    const videoExtensions = /\.(mp4|avi|mov|mkv|flv|wmv)$/i;
    return videoExtensions.test(url);
  }

  cambiarVistaPrevia(red: string): void {
    const redLower = red.toLowerCase();
    this.publicaciones.forEach(publicacion => {
      if (publicacion.redSocial.includes(red)) {
        publicacion.redSocialPreviaSeleccionada = redLower; // Ajuste aquí
      }
    });
    this.cdr.detectChanges(); // Asegúrate de que los cambios se reflejen en la vista
  }


}
