import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Publicacion} from "../../../../../../services/publicaciones.service";

@Component({
  selector: 'modal-publicacion-acordeon-forms-youtube-form',
  templateUrl: './youtube-form.component.html',
  styleUrl: './youtube-form.component.scss'
})
export class YoutubeFormComponent {
  @Input() redSocial!:string;
  @Input() publicacion!:Publicacion;
  @Input() youtubeForm!: FormGroup;

  onFileSelect(event: Event, type: string) {

  }
}
