import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Publicacion} from "../../../../services/publicaciones.service";
import {FileSelectInterface} from "../../interfaces/file-select.interface";

@Component({
  selector: 'modal-publicacion-acordeon',
  templateUrl: './acordeon.component.html',
  styleUrl: './acordeon.component.scss'
})
export class AcordeonComponent {
  @Input() publicacion!: Publicacion;
  @Input() facebookForm!: FormGroup;
  @Input() instagramForm!: FormGroup;
  @Input() linkedinForm!: FormGroup;
  @Input() pinterestForm!: FormGroup;
  @Input() tiktokForm!: FormGroup;
  @Input() twitterForm!: FormGroup;
  @Input() youtubeForm!: FormGroup;

  @Output() emitFileSelectEvent:EventEmitter<FileSelectInterface> = new EventEmitter<FileSelectInterface>();
  tipoPubliacion = {
    'enlace': '',
    'ubicacion': '',
    'etiquetas': '',
    'customText': ''
  }

  constructor(private fb: FormBuilder) {
  }

  onFileSelect(event: any, type: string = 'imagen') {
    const fileSelectInterface: FileSelectInterface = { event, type };
    this.emitFileSelectEvent.emit(fileSelectInterface)
  }
}
