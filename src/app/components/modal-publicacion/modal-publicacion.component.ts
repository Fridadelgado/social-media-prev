import { Component, ChangeDetectorRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { PublicacionesService, Publicacion } from '../../services/publicaciones.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { Campanias, CampaniasBody, GenericResponse } from 'src/app/interfaces/campanias.interface';
import { DynamicComponentService } from '../../services/dynamic-component-service.service';
import { ResponseRedesSociales } from 'src/app/interfaces/redes-sociales.interface';

@Component({
  selector: 'app-modal-publicacion',
  templateUrl: './modal-publicacion.component.html',
  styleUrls: [
    './modal-publicacion-general.component.scss',       // Estilos generales del modal
    './modal-publicacion-facebook.component.scss',  // Estilos específicos de Facebook
    './modal-publicacion-instagram.component.scss', // Estilos específicos de Instagram
    './modal-publicacion-tiktok.component.scss',    // Estilos específicos de TikTok
    './modal-publicacion-youtube.component.scss',   // Estilos específicos de YouTube
    './modal-publicacion-linkedin.component.scss',  // Estilos específicos de LinkedIn
    './modal-publicacion-twitter-x.component.scss',  // Estilos específicos de Twitter y X
    './modal-publicacion-pinterest.component.scss'  // Estilos específicos de Pinteres

  ]
})
export class ModalPublicacionComponent {
  esProgramada: boolean = false;
  fechaProgramada: Date | null = null;
  esFechaValidaFlag: boolean = true;
  tipoArchivo: string = '';
  imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;
  videoExtensions = /\.(mp4|avi|mov|mkv|flv|wmv)$/i;
  campanias: Campanias[] = [];
  redesSociales: any[] = [];
  selectedSocialMedia: string[] = []; // Agregado para controlar las redes sociales seleccionadas
  redSocialPreviaSeleccionada: string = ''; // Red social seleccionada para la previsualización
  vistaPrevia: 'desktop' | 'mobile' = 'desktop'; // Vista previa actual, ya sea desktop o mobile

  publicacionDefault = {
    titulo: 'Título Predeterminado',
    descripcion: 'Descripción predeterminada... Este coche no es solo un medio de transporte; es tu próximo compañero de aventuras. Con su elegante diseño, confort inigualable y rendimiento excepcional, está listo para convertirse en parte de tu vida y llevarte a nuevos destinos.',
    redSocial: ['facebook', 'twitter'],
  };

  defaultPreviewImage: string = '../../../assets/images/defaultcar.png';
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
  imagenPrevisualizacion: string | ArrayBuffer | null = '';

  submitted = false;
  dropZoneMessage: string = "";
  isValidFile: boolean = false;
  minDate: Date;
  fileType: string = "";

  constructor(
    protected ref: NbDialogRef<ModalPublicacionComponent>,
    private publicacionesService: PublicacionesService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private dynamicComponentService: DynamicComponentService
  ) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  }

  ngOnInit(): void {
    this.getCampanias();
    this.loadRedesSociales();
    this.translate.get('components.modal-publicacion.dropZoneDefault').subscribe((res: string) => {
      this.dropZoneMessage = res;
    });
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

  isRedSocialSelected(nombre: string): boolean {
    return this.publicacion.redSocial.map(rs => rs.toLowerCase()).includes(nombre.toLowerCase());
  }

  toggleRedSocial(nombre: string): void {
    const lowerCaseName = nombre.toLowerCase();
    const index = this.publicacion.redSocial.findIndex(rs => rs.toLowerCase() === lowerCaseName);
    if (index > -1) {
      this.publicacion.redSocial.splice(index, 1);
      this.selectedSocialMedia = this.selectedSocialMedia.filter(red => red.toLowerCase() !== lowerCaseName);
    } else {
      this.publicacion.redSocial.push(nombre);
      this.selectedSocialMedia.push(nombre);
    }
    this.updateDropZoneMessage(this.publicacion.redSocial);
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  selectTipoPublicacion(redSocial: string, tipo: string): void {
    this.publicacion.tipoPublicacion = tipo;
    this.seleccionarRedSocialPrevia(redSocial); // Forzar la actualización de la vista previa cuando cambia el tipo de publicación
  }

  updateDropZoneMessage(event: string[]): void {
    const selectedRedSocialName = event[0];
    const selectedRedSocial = this.redesSociales.find(rs => rs.nombre === selectedRedSocialName);

    if (selectedRedSocial) {
      switch (selectedRedSocial.tipoPublicacion) {
        case 'imagen':
          this.dropZoneMessage = 'Arrastra tu imagen aquí o haz clic para seleccionar';
          break;
        case 'video':
          this.dropZoneMessage = 'Arrastra tu video aquí o haz clic para seleccionar';
          break;
        case 'both':
        default:
          this.dropZoneMessage = 'Arrastra tu imagen o video aquí o haz clic para seleccionar';
          break;
      }
    } else {
      this.dropZoneMessage = 'Arrastra y suelta tu archivo aquí';
    }
  }

  onFileDrop(files: NgxFileDropEntry[]): void {
    this.submitted = true;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.processFile(file, 'imagen'); // Proporciona un tipo predeterminado
        });
        break;
      }
    }
    this.isValidFile = this.validateFile(files[0].fileEntry.name);
    if (this.isValidFile) {
      this.translate.get('components.modal-publicacion.dropZoneSuccess').subscribe((res: string) => {
        this.dropZoneMessage = res;
      });
    } else {
      this.translate.get('components.modal-publicacion.dropZoneValidacion').subscribe((res: string) => {
        this.dropZoneMessage = res;
      });
    }
  }

  onFileSelect(event: any, type: string = 'imagen'): void {
    this.submitted = true;
    const file = event.target.files[0];
    if (file) {
      this.isValidFile = this.validateFile(file.name);
      const translationKey = this.isValidFile ? 'components.modal-publicacion.dropZoneSuccess' : 'components.modal-publicacion.dropZoneValidacion';
      this.translate.get(translationKey).subscribe((res: string) => {
        this.dropZoneMessage = res;
      });

      if (this.isValidFile) {
        this.processFile(file, type);
      }
    }
  }

  validateFile(fileName: string): boolean {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.mp4|\.avi|\.mov|\.mkv|\.flv|\.wmv)$/i;
    return allowedExtensions.exec(fileName) ? true : false;
  }

  detectFileType(dataUri: string | ArrayBuffer): string {
    const fileTypeRegex = /^data:(image|video)\/([a-zA-Z0-9]+);base64,/;
    const match = dataUri.toString().match(fileTypeRegex);
    if (match) {
      this.fileType = match[1];
      return this.fileType;
    } else {
      return 'unknown';
    }
  }

  processFile(file: File, type: string): void {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.detectFileType(reader.result);
        if (type === 'miniatura') {
          this.publicacion.miniatura = reader.result.toString();
        } else if (type === 'subtitulos') {
          this.publicacion.subtitulos = reader.result.toString();
        } else {
          this.publicacion.imagen = reader.result.toString();
          this.publicacion.video = reader.result.toString();
          this.imagenPrevisualizacion = reader.result;
        }
      } else {
        console.error('Error al leer el archivo');
      }
    };

    reader.onerror = (error) => {
      console.error('Error al cargar el archivo: ', error);
    };

    reader.readAsDataURL(file);
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

  getCampanias(): void {
    this.publicacionesService.getCampanias()
      .subscribe((response: GenericResponse<CampaniasBody>) => {
        if (response)
          this.campanias = response.body.data;
      },
        (error) => {
          console.error('Error al obtener las campañas:', error);
        }
      );
  }

  agregarNuevaCampania(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const nuevaSubcampania = inputElement.value.trim();
    let nuevaCampania: Campanias = { idsubcampanas: 0, nombrecampana: '', status: 0, idredsocial: 0, idpublicacion: 0, idusuario: 0, iddistribuidor: 0, fechainicio: '', fechafin: '' };
    nuevaCampania.nombrecampana = nuevaSubcampania;
    this.publicacionesService.setNuevaCampania(nuevaCampania).subscribe((response: GenericResponse<string>) => {
      if (response) {
        inputElement.value = '';
        this.getCampanias();
      }
    },
      (error) => {
        console.error('Error al obtener las campañas:', error);
      }
    );
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
