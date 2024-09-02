import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Campanias, CampaniasBody, GenericResponse } from '../interfaces/campanias.interface';
import { GlobalConstants } from '../common/global-constants';
import { ResponseRedesSociales } from '../interfaces/redes-sociales.interface';
import { BasePayload, FacebookPayload, InstagramPayload, MediaPayload, PinterestPayload, TikTokPayload, TwitterPayload, YouTubePayload } from '../interfaces/red-social-payload.interface';

export interface Publicacion {
  redSocial: string[];
  titulo: string;
  descripcion: string;
  subcampanas: string[];
  imagen: string;
  video: string;
  link: string;
  thumbnail?: string;
  mediaBase64?: string;
  tipoPublicacion?: string;
  vistaPrevia: 'desktop' | 'mobile';
  miniatura: string;
  subtitulos: string;
  redSocialPreviaSeleccionada?: string;
  // Nuevos campos
  enlace: string;
  hashtags: string;
  tags: string;
  playlist: string;
  categoria: string;
  privacidad: string;
  descripcionTikTok: string;
  enlaceTikTok: string;
  enlaceLinkedIn: string;
  textoHistoriaLinkedIn: string;
  descripcionPinterest: string;
  enlacePinterest: string;
  tablero: string;
  enlaceTwitter: string;
  hashtagsTwitter: string;
  musica:string;
  tituloVideo:string;
  descripcionVideo:string;
  ubicacion:string;
  etiquetas:string;
  altText:string;
  stickers:string;
}


@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  private _publicaciones = new BehaviorSubject<Publicacion[]>([]);
  private readonly STORAGE_KEY = 'redesSocialesCache';

  constructor(private http: HttpClient) { }

  get publicaciones(): Observable<Publicacion[]> {
    return this._publicaciones.asObservable();
  }

  private getPayloadAndUrl(publicacion: Publicacion, red: string): { payload: BasePayload | MediaPayload, url: string } {
    console.log(red);

    const basePayload: BasePayload = {
      email: 'default.pruebas@seekop.com',
      distribuidor: '104425'
    };

    switch (red.toLowerCase()) {
      case 'twitter':
        return {
          payload: { ...basePayload, text: publicacion.titulo, mediaBase64: publicacion.imagen } as TwitterPayload,
          url: `${GlobalConstants.urlApiPublicar}publicarentwitter`
        };
      case 'facebook':
        return {
          payload: { ...basePayload, text: publicacion.titulo, mediaBase64: publicacion.imagen, tipoPublicacion: publicacion.tipoPublicacion } as FacebookPayload,
          url: `${GlobalConstants.urlApiPublicar}publicarenfacebook`
        };
      case 'youtube':
        return {
          payload: { ...basePayload, text: publicacion.titulo, mediaBase64: publicacion.imagen, tipoPublicacion: publicacion.tipoPublicacion } as YouTubePayload,
          url: `${GlobalConstants.urlApiPublicar}publicarenyoutube`
        };
      case 'instagram':
        return {
          payload: { ...basePayload, text: publicacion.titulo, mediaBase64: publicacion.imagen, tipoPublicacion: publicacion.tipoPublicacion } as InstagramPayload,
          url: `${GlobalConstants.urlApiPublicar}publicareninstagram`
        };
      case 'tiktok':
        return {
          payload: { ...basePayload, text: publicacion.titulo,mediaBase64: publicacion.imagen,  tipoPublicacion: publicacion.tipoPublicacion } as TikTokPayload,
          url: `${GlobalConstants.urlApiPublicar}publicarentiktok`
        };
      case 'pinterest':
        return {
          payload: { ...basePayload, title: publicacion.titulo, alt_text: publicacion.titulo, description: publicacion.descripcion } as PinterestPayload,
          url: `${GlobalConstants.urlApiPublicar}publicarenpinterest`
        };
      default:
        throw new Error(`Red social no soportada: ${red}`);
    }
  }

  private async publicarEnRedSocial(publicacion: Publicacion, red: string): Promise<any> {
    const { payload, url } = this.getPayloadAndUrl(publicacion, red);
    console.log(payload);

    try {
      const response = await this.http.post(url, payload).toPromise();
      return response;
    } catch (error) {
      console.error(`Error al publicar en ${red}:`, error);
      throw error;
    }
  }

  agregarPublicacion(publicacion: Publicacion): Observable<any> {
    const requests = publicacion.redSocial.map(red => this.publicarEnRedSocial(publicacion, red));

    return new Observable(observer => {
      Promise.all(requests)
        .then(responses => {
          console.log("Este es el response:", responses);

          const youtubeResponse = responses.find(response =>
            response.statusCode === 200 && response.body && response.body.data && response.body.data.kind === 'youtube#video'
          );

          if (youtubeResponse && youtubeResponse.body.data.snippet.thumbnails) {
            publicacion.thumbnail = youtubeResponse.body.data.snippet.thumbnails.high.url;
            publicacion.link = `https://www.youtube.com/watch?v=${youtubeResponse.body.data.id}`;
          }

          this.actualizarPublicaciones(publicacion);
          observer.next(responses);
          observer.complete();
        })
        .catch(error => {
          console.error('Error al publicar en redes sociales:', error);
          observer.error(error);
        });
    });
  }

  private actualizarPublicaciones(publicacion: Publicacion) {
    const currentValue = this._publicaciones.value;
    console.log("Publicación guardada:", publicacion);  // Agrega esto aquí
    this._publicaciones.next([...currentValue, publicacion]);
  }


  getCampanias(): Observable<GenericResponse<CampaniasBody>> {
    return this.http.get<GenericResponse<CampaniasBody>>(GlobalConstants.urlApiCampanias);
  }

  setNuevaCampania(registroNuevaCampania: Campanias): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(GlobalConstants.urlApiCampanias, registroNuevaCampania);
  }

  getRedesSociales(): Observable<ResponseRedesSociales> {
    return this.http.get<ResponseRedesSociales>(GlobalConstants.urlApiRedesSociales).pipe(
      tap(data => sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(data)))
    );
  }

  getRedesSocialesFromSessionStorage(): Observable<ResponseRedesSociales> {
    const cachedData = sessionStorage.getItem(this.STORAGE_KEY);
    if (cachedData) {
      return of(JSON.parse(cachedData));
    } else {
      return this.getRedesSociales();
    }
  }
}
