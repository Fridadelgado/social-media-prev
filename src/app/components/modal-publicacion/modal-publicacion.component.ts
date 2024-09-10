import { Component, ChangeDetectorRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { PublicacionesService, Publicacion } from '../../services/publicaciones.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { Campanias, CampaniasBody, GenericResponse } from 'src/app/interfaces/campanias.interface';
import { DynamicComponentService } from '../../services/dynamic-component-service.service';
import { ResponseRedesSociales } from 'src/app/interfaces/redes-sociales.interface';
import {TipoPublicacionInterface} from "./interfaces/tipo-publicacion.interface";
import {UploadFileService} from "./services/upload-file.service";

@Component({
  selector: 'app-modal-publicacion',
  templateUrl: './modal-publicacion.component.html',
  styleUrls: [
    './modal-publicacion-general.component.scss',       // Estilos generales del modal
  ]
})
export class ModalPublicacionComponent {
  esProgramada: boolean = false;
  fechaProgramada: Date | null = null;
  esFechaValidaFlag: boolean = true;
  vistaPrevia: 'desktop' | 'mobile' = 'desktop'; // Vista previa actual, ya sea desktop o mobile
  campanias: Campanias[] = [];
  redesSociales: any[] = [];
  selectedSocialMedia: string[] = []; // Agregado para controlar las redes sociales seleccionadas
  redSocialPreviaSeleccionada : string = ""

    publicacion: Publicacion = {
    redSocial: [],
    titulo: '',
    descripcion: '',
    subcampanas: [],
    imagen: '',
    link: '',
    video: '',
    tipoPublicacion: '',
    vistaPrevia: 'mobile',
    enlace: '',
    hashtags: '',
    tags: '',
    miniatura: '',
    playlist: '',
    categoria: '',
    privacidad: '',
    descripcionTikTok: '',
    enlaceTikTok: '',
    enlaceLinkedIn: '',
    textoHistoriaLinkedIn: '',
    descripcionPinterest: '',
    enlacePinterest: '',
    tablero: '',
    mediaBase64: '',
    enlaceTwitter: '',
    hashtagsTwitter: '',
    musica: '',
    tituloVideo: '',
    descripcionVideo: '',
    ubicacion: '',
    etiquetas: '',
    altText: '',
    stickers: '',
    subtitulos: '',
  };
  fileType: string = "";
  imagenPrevisualizacion: string | ArrayBuffer | null = '';
  submitted = false;
  minDate: Date;

  constructor(
    protected ref: NbDialogRef<ModalPublicacionComponent>,
    private publicacionesService: PublicacionesService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private dynamicComponentService: DynamicComponentService,
    private uploadFileService: UploadFileService,
  ) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  }

  ngOnInit(): void {
    this.loadRedesSociales();
  }

  esFechaValida(): boolean {
    if (!this.fechaProgramada) {
      this.esFechaValidaFlag = true;
      return true;
    }

    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);

    this.esFechaValidaFlag = this.fechaProgramada >= fechaHoy;
    return this.esFechaValidaFlag;
  }

  loadRedesSociales(): void {
    this.publicacionesService.getRedesSociales().subscribe((redesSociales: ResponseRedesSociales) => {
      if (redesSociales && redesSociales.length > 0) {
        this.redesSociales = redesSociales
          .filter(redSocial => !['mercado libre', 'meta'].includes(redSocial.nombre.toLowerCase())) // Excluir Mercado Libre y Meta
          .map(redSocial => {
            switch (redSocial.nombre.toLowerCase()) {
              case 'facebook':
                return { ...redSocial, tipoPublicacion: ['post', 'reel', 'story'] };
              case 'instagram':
                return { ...redSocial, tipoPublicacion: ['post', 'reel', 'story'] };
              case 'youtube':
                return { ...redSocial, tipoPublicacion: ['video', 'short'] };
              case 'pinterest':
              case 'tiktok':
              case 'twitter':
                return { ...redSocial, tipoPublicacion: [] };
              default:
                return { ...redSocial, tipoPublicacion: [] };
            }
          });
        console.log(this.redesSociales);
      }
    }, error => {
      console.error('Error al obtener las redes sociales:', error);
    });
  }


  toggleRedSocial(): void {
    this.uploadFileService.updateDropZoneMessage(this.publicacion.redSocial, this.redesSociales);
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  selectTipoPublicacion(tipoPublicacion: TipoPublicacionInterface): void {
    this.seleccionarRedSocialPrevia(tipoPublicacion.redSocial); // Forzar la actualización de la vista previa cuando cambia el tipo de publicación
  }

  definirAudiencia(): void {
    // Lógica para definir la audiencia de la publicación.
  }

  agregarPublicacion(): void {
    this.submitted = true;

    if (this.publicacion.redSocial.length === 0 || !this.publicacion.titulo || !this.publicacion.descripcion || !this.imagenPrevisualizacion) {
      console.error('Hay campos obligatorios que están vacíos.');
      return;
    }

    if (this.fechaProgramada && this.fechaProgramada instanceof Date) {
      if (!this.esFechaValida()) {
        console.error('La fecha programada no es válida.');
        this.submitted = true;
        return;
      }
    }

    this.dynamicComponentService.showBodyLoading();

    this.publicacionesService.agregarPublicacion(this.publicacion).subscribe(
      () => {
        console.log('Publicación agregada con éxito.');
        this.dynamicComponentService.destroyBodyLoading();
        this.ref.close();
      },
      (error: any) => {
        console.error('Error al agregar la publicación:', error);
        this.dynamicComponentService.destroyBodyLoading();
      }
    );
  }

  calendarizar(): void {
    // Lógica para calendarizar la publicación.
  }

  cancelar(): void {
    this.ref.close();
  }

  getSocialMediaIcon(red: string): string {
    if (this.publicacion.redSocial && this.publicacion.redSocial.length > 0) {
      const socialMedia = this.redesSociales.find(media => media.nombre.toLowerCase() === red.toLowerCase());
      return socialMedia ? socialMedia.icon : 'default-icon';
    }
    return '';
  }



  closeModal(): void {
    this.ref.close();
  }

  seleccionarRedSocialPrevia(nombre: string): void {
    this.redSocialPreviaSeleccionada = nombre;
    this.updatePreviewStyle(); // Método adicional para manejar estilos específicos si lo deseas
  }


  alternarVistaPrevia(vista: 'desktop' | 'mobile'): void {
    this.vistaPrevia = vista;
    this.cdr.detectChanges(); // Asegura que se detecten los cambios
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
