// Importaciones esenciales de Angular para el módulo raíz.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; // Gestión de rutas de la aplicación.
import { RouterModule } from '@angular/router'; // Sistema de enrutamiento de Angular.
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Módulo para realizar peticiones HTTP.
import { AppComponent } from './app.component'; // Componente raíz de la aplicación.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';

// Importación del módulo CoreModule que contiene servicios e iconos personalizados.
import { CoreModule } from '../app/core-module/core-module.module';


// Importaciones de Nebular, un conjunto de bibliotecas de UI para Angular, para usar sus componentes.
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbMenuModule, NbDatepickerModule, NbToggleModule, NbInputModule,NbCheckboxModule, NbTooltipModule, NbDialogModule, NbActionsModule, NbCardModule, NbUserModule, NbIconModule, NbAlertModule, NbSelectModule, NbOptionModule, NbListModule, NbAccordionModule, NbTagModule, NbSearchModule} from '@nebular/theme';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth'; // Módulos de autenticación de Nebular.
import { NbEvaIconsModule } from '@nebular/eva-icons'; // Módulo de íconos de Eva.


// Importaciones para ngx-translate, una biblioteca para internacionalización.
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// Librería para manejo de drag and drop de archivos.
import { NgxFileDropModule } from 'ngx-file-drop';

// loader
import { BodyLoadingComponent } from './components/body-loading/body-loading.component';
import { DynamicComponentService } from './services/dynamic-component-service.service';


// Charts



// Components
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { ActionsComponent } from './components/actions/actions.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { ModalPublicacionComponent } from './components/modal-publicacion/modal-publicacion.component';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { DashboardKpisComponent } from './pages/dashboard-kpis/dashboard-kpis.component';

// Pages
import { RedesSocialesKpisComponent } from './pages/redessociales-kpis/redessociales-kpis.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { PublicacionesComponent } from './pages/publicaciones/publicaciones.component';
import { CalendariopublicacionesComponent } from './pages/calendariopublicaciones/calendariopublicaciones.component';
import { ConversacionesComponent } from './pages/conversaciones/conversaciones.component';
import { DistribuidoresAsignadosComponent } from './pages/distribuidores-asignados/distribuidores-asignados.component';
import { RedesSocialesComponent } from './pages/redes-sociales/redes-sociales.component';
import { SocialAuthComponent } from './pages/social-auth/social-auth.component';
import { SocialAuthModalComponent } from './components/social-auth-modal/social-auth-modal.component';

// Módulo para implementar un calendario interactivo.
import { FullCalendarModule } from '@fullcalendar/angular';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AnyChartComponent } from './components/any-chart/any-chart.component';
import { TableKpiComponent } from './components/table-kpi/table-kpi.component';
import { GenericFormRedSocialComponent } from './components/generic-form-red-social/generic-form-red-social.component';
import { ModalPublicacionRedComponent } from './components/modal-publicacion-red/modal-publicacion-red.component';
import { GenericPrevPublicacionComponent } from './components/generic-prev-publicacion/generic-prev-publicacion.component';
import { NgApexchartsModule } from 'ng-apexcharts';

// Función para configurar el cargador de traducciones, que indica cómo cargar los archivos de traducción.
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    // Componentes que pertenecen a este módulo.
    // Aquí se listan todos los componentes, directivas y pipes que se crearán y pertenecerán a este módulo.
    AppComponent,
    SocialAuthModalComponent,
    SocialAuthComponent,
    BodyLoadingComponent,
    KpiCardComponent,
    MenuListComponent,
    DistribuidoresAsignadosComponent,
    RedesSocialesComponent,
    CalendariopublicacionesComponent,
    ModalPublicacionComponent,
    ActionsComponent,
    UserAvatarComponent,
    RedesSocialesKpisComponent,
    UsersComponent,
    ConversacionesComponent,
    LoginComponent,
    AuthLayoutComponent,
    PublicacionesComponent,
    DashboardKpisComponent,
    AnyChartComponent,
    TableKpiComponent,
    GenericFormRedSocialComponent,
    ModalPublicacionRedComponent,
    GenericPrevPublicacionComponent
  ],
  imports: [
    // Otros módulos cuyas clases exportadas son necesarias para las plantillas de componentes declarados en este módulo.
    // Nebular, ngx-translate, y otras librerías de terceros son configuradas aquí.
    CoreModule,
    NbListModule,
    NbAccordionModule,
    BrowserAnimationsModule,
    NbTooltipModule,
    FullCalendarModule,
    NgxFileDropModule,
    NbCheckboxModule,
    BrowserModule,
    NbSelectModule,
    NbOptionModule,
    AppRoutingModule,
    FormsModule,
    NbLayoutModule,
    NbDatepickerModule.forRoot(),
    NbToggleModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbThemeModule.forRoot({ name: 'seekop' }),
    NbEvaIconsModule,
    NbIconModule,
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbCardModule,
    NbUserModule,
    HttpClientModule,
    NbInputModule,
    NbAccordionModule,
    NbDialogModule.forRoot(),
    NbAlertModule,
    NgChartsModule,
    NgxChartsModule,
    NbTagModule,
    NbSearchModule,
    NgApexchartsModule,




    NbAuthModule.forRoot({
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'email',
          delay: 3000, // Simula un retraso para la respuesta de la autenticación
        }),
      ],
      forms: {}, // Aquí puedes personalizar las formas de login, registro, etc., si lo necesitas
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    DynamicComponentService
    ,{
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent] // Componente raíz que Angular crea e inserta en el index.html host. Define la vista raíz de la aplicación.
})
export class AppModule { }
