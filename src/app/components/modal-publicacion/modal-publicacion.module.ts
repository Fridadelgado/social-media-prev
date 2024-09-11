import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  NbAccordionModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbOptionModule,
  NbSelectModule
} from "@nebular/theme";
import {TranslateModule} from "@ngx-translate/core";
import {NgxFileDropModule} from "ngx-file-drop";
import { SocialNetworksComponent } from './components/social-networks/social-networks.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { AcordeonComponent } from './components/acordeon/acordeon.component';
import { VistaPreviaComponent } from './components/vista-previa/vista-previa.component';
import { FacebookFormComponent } from './components/acordeon/forms/facebook-form/facebook-form.component';
import { InstagramFormComponent } from './components/acordeon/forms/instagram-form/instagram-form.component';
import { YoutubeFormComponent } from './components/acordeon/forms/youtube-form/youtube-form.component';
import { TiktokFormComponent } from './components/acordeon/forms/tiktok-form/tiktok-form.component';
import { LinkedinFormComponent } from './components/acordeon/forms/linkedin-form/linkedin-form.component';
import { PinterestFormComponent } from './components/acordeon/forms/pinterest-form/pinterest-form.component';
import { TwitterFormComponent } from './components/acordeon/forms/twitter-form/twitter-form.component';

@NgModule({
  declarations: [
    SocialNetworksComponent,
    MainFormComponent,
    AcordeonComponent,
    VistaPreviaComponent,
    FacebookFormComponent,
    InstagramFormComponent,
    YoutubeFormComponent,
    TiktokFormComponent,
    LinkedinFormComponent,
    PinterestFormComponent,
    TwitterFormComponent
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
    NbButtonModule,
    ReactiveFormsModule,
  ],
  exports: [
    SocialNetworksComponent,
    MainFormComponent,
    AcordeonComponent,
    VistaPreviaComponent,
  ]
})
export class ModalPublicacionModule { }
