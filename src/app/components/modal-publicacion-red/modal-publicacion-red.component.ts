import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { FacebookPayload, InstagramPayload, PinterestPayload, TikTokPayload, TwitterPayload, YouTubePayload } from 'src/app/interfaces/red-social-payload.interface';
import { ResponseRedesSociales, Root, SelectedRedesSociales, SocialMediaPayload } from 'src/app/interfaces/redes-sociales.interface';
import { DynamicComponentService } from 'src/app/services/dynamic-component-service.service';
import { PublicacionesService, Publicacion } from 'src/app/services/publicaciones.service';
import { RedesSocialesService } from 'src/app/services/redes-sociales.service';
import { StateformService } from 'src/app/services/stateform.service';

@Component({
  selector: 'app-modal-publicacion-red',
  templateUrl: './modal-publicacion-red.component.html',
  styleUrl: './modal-publicacion-red.component.scss'
})
export class ModalPublicacionRedComponent {

  dropZoneMessage: string = "";
  redesSociales: ResponseRedesSociales = [];
  selectedRedesSociales: SelectedRedesSociales[] = [];
  root: Root = {
    selectedRedesSociales: []
  };
  dataForDisable:any;
  constructor(
    protected ref: NbDialogRef<ModalPublicacionRedComponent>,
    private translate: TranslateService,
    private redesSocialesService: RedesSocialesService,
    private stateformService: StateformService,
    private publicacionesService: PublicacionesService,
    private dynamicComponentService: DynamicComponentService

  ) { }


  ngOnInit(): void {
    // Obtiene el mensaje predeterminado para la zona de arrastre.
    //this.fechaProgramada = this.ref;
    // this.getCampanias();
    console.log(this.selectedRedesSociales)
    this.getRedesSociales();
    this.translate.get('components.modal-publicacion.dropZoneDefault').subscribe((res: string) => {
      this.dropZoneMessage = res;
    });
  }

  getRedesSociales() {
    this.redesSocialesService.getRedesSociales()
      .subscribe((redesSociales: ResponseRedesSociales) => {
        this.redesSociales = redesSociales;
      },
        (error) => {
          console.error('Error al obtener las redes sociales:', error);
          // HandleError
        }
      );
  }


  onRedSocialChange(selectedRedes: string[]): void {
    // Limpia las redes sociales que no están en la selección actual
    this.root.selectedRedesSociales = this.root.selectedRedesSociales.filter(item =>
      selectedRedes.includes(item.nombreRedSocial)
    );

    // Añade las nuevas redes sociales seleccionadas
    selectedRedes.forEach(red => {
      if (!this.root.selectedRedesSociales.some(item => item.nombreRedSocial === red)) {
        const newPayload = this.createPayload(red);
        this.root.selectedRedesSociales.push({
          nombreRedSocial: red.toLowerCase(),
          iconoRedSocial: 'icon', // Asegúrate de tener una función para obtener el icono
          formularioRedSocial: newPayload
        });

      }
    });
    console.log('Current selectedRedesSociales:', this.root.selectedRedesSociales);
  }


  onSubmit() {
    const publicacion: Publicacion = {
      redSocial: this.root.selectedRedesSociales.map(red => red.nombreRedSocial),
      titulo: 'Título predeterminado',
      descripcion: 'Descripción predeterminada',
      subcampanas: [],
      imagen: '',
      link: '',
      video: '',
      tipoPublicacion: '',
      vistaPrevia: 'mobile',
      enlace: '',
      hashtags: '',
      mediaBase64: '',
      miniatura: '', // Incluye todas las propiedades requeridas por la interfaz
      subtitulos: '',
      tags: '',
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
      enlaceTwitter: '',
      hashtagsTwitter: '',
      musica: '',
      tituloVideo: '',
      descripcionVideo: '',
      ubicacion: '',
      etiquetas: '',
      altText: '',
      stickers: ''
    };

    this.publicacionesService.agregarPublicacion(publicacion).subscribe(
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



  createPayload(red: string): SocialMediaPayload {
    switch (red.toLowerCase()) {
      case 'facebook':
        return {
          text: '',
          mediaBase64: '',
          email: '',
          distribuidor: '',
        } as FacebookPayload;
      case 'tikTok':
        return {
          text: '',
          email: '',
          mediaBase64: '',
          distribuidor: ''
        } as TikTokPayload;
      case 'instagram':
        return {
          text: '',
          mediaBase64: '',
          email: '',
          distribuidor: ''
        } as InstagramPayload;
      case 'twitter':
        return {
          text: '',
          mediaBase64: '',
          email: '',
          distribuidor: ''
        } as TwitterPayload;
      case 'youtube':
        return {
          text: '',
          mediaBase64: '',
          email: '',
          distribuidor: ''
        } as YouTubePayload;
      case 'pinterest':
        return {
          title: '',
          alt_text: '',
          email: '',
          distribuidor: ''
        } as PinterestPayload;
      default:
        return {} as SocialMediaPayload;
    }
  }

  closeModal() {
    this.ref.close();
  }
}
