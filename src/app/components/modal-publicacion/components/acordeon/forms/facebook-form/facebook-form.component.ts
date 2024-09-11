import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Publicacion} from "../../../../../../services/publicaciones.service";

@Component({
  selector: 'modal-publicacion-acordeon-forms-facebook-form',
  templateUrl: './facebook-form.component.html',
  styleUrl: './facebook-form.component.scss'
})
export class FacebookFormComponent {
  @Input() redSocial!:string;
  @Input() publicacion!:Publicacion;
  @Input() facebookForm!: FormGroup;

}
