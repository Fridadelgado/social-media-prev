import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NbAccordionModule, NbIconModule, NbInputModule, NbOptionModule, NbSelectModule} from "@nebular/theme";
import {TranslateModule} from "@ngx-translate/core";
import {NgxFileDropModule} from "ngx-file-drop";
import { SocialNetworksComponent } from './components/social-networks/social-networks.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { AcordeonComponent } from './components/acordeon/acordeon.component';
import { VistaPreviaComponent } from './components/vista-previa/vista-previa.component';

@NgModule({
  declarations: [
    SocialNetworksComponent,
    MainFormComponent,
    AcordeonComponent,
    VistaPreviaComponent
  ],
  imports: [
    CommonModule,
    NbIconModule,
    NbOptionModule,
    NbSelectModule,
    FormsModule,
    NbInputModule,
    NgxFileDropModule,
    TranslateModule,
    NbAccordionModule,
  ],
  exports: [
    SocialNetworksComponent,
    MainFormComponent,
    AcordeonComponent,
    VistaPreviaComponent,
  ]
})
export class ModalPublicacionModule { }
