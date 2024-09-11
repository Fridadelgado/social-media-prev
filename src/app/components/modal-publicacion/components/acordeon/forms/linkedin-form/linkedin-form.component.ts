import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Publicacion} from "../../../../../../services/publicaciones.service";

@Component({
  selector: 'modal-publicacion-acordeon-forms-linkedin-form',
  templateUrl: './linkedin-form.component.html',
  styleUrl: './linkedin-form.component.scss'
})
export class LinkedinFormComponent {
  @Input() redSocial!:string;
  @Input() publicacion!:Publicacion;
  @Input() linkedinForm!: FormGroup;



}
