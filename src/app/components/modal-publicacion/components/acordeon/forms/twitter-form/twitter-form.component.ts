import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Publicacion} from "../../../../../../services/publicaciones.service";

@Component({
  selector: 'modal-publicacion-acordeon-forms-twitter-form',
  templateUrl: './twitter-form.component.html',
  styleUrl: './twitter-form.component.scss'
})
export class TwitterFormComponent {
  @Input() redSocial!:string;
  @Input() publicacion!:Publicacion;
  @Input() twitterForm!: FormGroup;


}
