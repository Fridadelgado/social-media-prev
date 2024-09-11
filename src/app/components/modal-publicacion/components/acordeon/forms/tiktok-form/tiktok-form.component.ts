import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Publicacion} from "../../../../../../services/publicaciones.service";

@Component({
  selector: 'modal-publicacion-acordeon-forms-tiktok-form',
  templateUrl: './tiktok-form.component.html',
  styleUrl: './tiktok-form.component.scss'
})
export class TiktokFormComponent {
  @Input() redSocial!:string;
  @Input() publicacion!:Publicacion;
  @Input() tiktokForm!: FormGroup;
}
