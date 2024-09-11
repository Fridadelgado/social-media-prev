import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Publicacion} from "../../../../../../services/publicaciones.service";

@Component({
  selector: 'modal-publicacion-acordeon-forms-instagram-form',
  templateUrl: './instagram-form.component.html',
  styleUrl: './instagram-form.component.scss'
})
export class InstagramFormComponent {
  @Input() redSocial!:string;
  @Input() publicacion!:Publicacion;
  @Input() instagramForm!: FormGroup;

}
