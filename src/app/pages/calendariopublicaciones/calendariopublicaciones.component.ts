import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // Importa las opciones de configuración de FullCalendar.
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin para la vista de cuadrícula por días.
import timeGridPlugin from '@fullcalendar/timegrid'; // Plugin para la vista de cuadrícula por tiempos/horas.
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'; // Localización en español.
import enLocale from '@fullcalendar/core/locales/en-gb'; // Localización en inglés (Reino Unido).
import { Subscription } from 'rxjs'; // Importa Subscription de RxJS para manejar la desuscripción.
import { LanguageService } from '../../../app/services/translate-service.service'; // Servicio personalizado para la gestión del idioma.
import { NbDialogService } from '@nebular/theme';
// En tu archivo calendariopublicaciones.component.ts
import { ModalPublicacionComponent } from '../../components/modal-publicacion/modal-publicacion.component';


@Component({
  selector: 'app-calendariopublicaciones', // Selector CSS del componente.
  templateUrl: './calendariopublicaciones.component.html', // Plantilla HTML del componente.
  styleUrls: ['./calendariopublicaciones.component.scss'] // Estilos específicos del componente.
})


export class CalendariopublicacionesComponent implements OnInit, OnDestroy {
  calendarOptions?: CalendarOptions; // Define las opciones de configuración para FullCalendar.
  private langChangeSubscription?: Subscription; // Suscripción al cambio de idioma.

  constructor(private languageService: LanguageService, private dialogService: NbDialogService) { } // Inyecta el LanguageService.

  ngOnInit() {
    this.initializeCalendar(); // Inicializa el calendario.
    // Se suscribe al observable de cambio de idioma y actualiza la localización del calendario según el idioma.
    this.langChangeSubscription = this.languageService.onLangChange.subscribe((event) => {
      this.updateCalendarLocale(event.lang);
    });
  }

  ngOnDestroy() {
    // Al destruir el componente, cancela la suscripción para prevenir fugas de memoria.
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  initializeCalendar() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      dateClick: this.handleDateClick.bind(this),
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      weekends: false,
      locale: this.languageService.getCurrentLanguage() === 'es' ? esLocale : enLocale,
      events: [
        { title: 'Facebook Kia YouTubeee',    url: 'https://www.facebook.com/profile.php?id=100070798044341', },
        { title: 'Facebook Toyota Facebook', start: '2024-04-10',  url: 'https://www.facebook.com/profile.php?id=100070798044341'},
        { title: 'Facebook Kia YouTube', start: '2024-04-11', end:  '2024-04-17', url: 'https://www.facebook.com/profile.php?id=100070798044341'}
      ],
      // Manejador para el evento de clic en una fecha.
      // Asegura que `this` dentro de handleDateClick se refiera al componente.
    };
  }

  // Método manejador del evento dateClick de FullCalendar.
  handleDateClick(arg:any) {
    this.abrirModalConFecha(arg.date);
  }

  abrirModalConFecha(fecha: Date) {
    this.dialogService.open(ModalPublicacionComponent, {
      context: { fechaProgramada: fecha } // Pasas la fecha al modal
    });
  }


  updateCalendarLocale(lang: string) {
    // Actualiza la localización del calendario cuando el idioma cambia.
    this.calendarOptions = { ...this.calendarOptions, locale: lang === 'es' ? esLocale : enLocale };
  }
}
