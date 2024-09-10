import {Component, Input} from '@angular/core';
import {Publicacion} from "../../../../services/publicaciones.service";

@Component({
  selector: 'modal-publicacion-acordeon',
  templateUrl: './acordeon.component.html',
  styleUrl: './acordeon.component.scss'
})
export class AcordeonComponent {
  @Input() publicacion!: Publicacion;

tipoPubliacion = {
  'enlace': '',
  'ubicacion': '',
  'etiquetas': '',
  'customText': ''
}


  onFileSelect(event: any, type: string = 'imagen') {

  }
}
