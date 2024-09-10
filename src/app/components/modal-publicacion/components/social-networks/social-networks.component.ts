import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Publicacion} from "../../../../services/publicaciones.service";
import {TipoPublicacionInterface} from "../../interfaces/tipo-publicacion.interface";

@Component({
  selector: 'modal-publicacion-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrl: './social-networks.component.scss'
})
export class SocialNetworksComponent {
  @Input() submitted!: boolean;
  @Input() redesSociales!: any[];
  @Input() publicacion!: Publicacion;

  @Output() emitSelectedSocialMedia:EventEmitter<void> = new EventEmitter<void>();
  @Output() emitSelectTipoPublicacion:EventEmitter<TipoPublicacionInterface> = new EventEmitter<TipoPublicacionInterface>();

  selectedSocialMedia: string[] = [];

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
    this.emitSelectedSocialMedia.emit()
  }

  isRedSocialSelected(nombre: string): boolean {
    return this.publicacion.redSocial.map(rs => rs.toLowerCase()).includes(nombre.toLowerCase());
  }

  selectTipoPublicacion(redSocial: string, tipo: string): void {
    this.publicacion.tipoPublicacion = tipo;
    let tipoPublicacion: TipoPublicacionInterface = {redSocial: redSocial, tipo: tipo};
    this.emitSelectTipoPublicacion.emit(tipoPublicacion);
  }

}
