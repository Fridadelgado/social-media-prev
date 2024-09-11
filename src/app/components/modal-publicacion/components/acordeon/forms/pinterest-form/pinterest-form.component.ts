import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Publicacion} from "../../../../../../services/publicaciones.service";

@Component({
  selector: 'modal-publicacion-acordeon-forms-pinterest-form',
  templateUrl: './pinterest-form.component.html',
  styleUrl: './pinterest-form.component.scss'
})
export class PinterestFormComponent {
  @Input() redSocial!:string;
  @Input() publicacion!:Publicacion;
  @Input() pinterestForm!: FormGroup;



}
