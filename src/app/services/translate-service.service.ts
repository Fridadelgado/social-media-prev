// Autor: Gilberto García (gilberto.garcia@seekop.com)

import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'; // Importaciones para el servicio de traducción.
import { Observable } from 'rxjs'; // Para manejar observables, utilizados aquí para detectar cambios en el idioma.

// Decorador Injectable que permite a Angular saber que esta clase puede ser inyectada como dependencia en otro lugar.
@Injectable({
  providedIn: 'root', // Especifica que este servicio debe estar disponible en el root de la aplicación, haciéndolo un singleton.
})
export class LanguageService {
  // Constructor del servicio.
  // Inyecta el TranslateService de @ngx-translate/core para manejar las traducciones y el cambio de idioma.
  constructor(private translate: TranslateService) {
    // Establece el idioma por defecto en 'es' (español).
    this.translate.setDefaultLang('es');
    // Cambia al idioma español inmediatamente para su uso en la aplicación.
    this.translate.use('es');
  }

  // Método para cambiar el idioma de la aplicación.
  // Recibe un string 'lang' que representa el nuevo idioma a utilizar.
  changeLanguage(lang: string): void {
    this.translate.use(lang); // Cambia el idioma de la aplicación al especificado.
  }

  // Método para obtener el idioma actual de la aplicación.
  getCurrentLanguage(): string {
    return this.translate.currentLang; // Retorna el idioma actualmente activo.
  }

  // Propiedad que expone el observable de cambio de idioma del servicio TranslateService.
  // Esto permite a los componentes suscribirse y reaccionar a cambios de idioma.
  get onLangChange(): Observable<LangChangeEvent> {
    return this.translate.onLangChange;
  }
}
