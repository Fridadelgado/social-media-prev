// Autor: Gilberto García (gilberto.garcia@seekop.com)
// sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// El decorador @Injectable permite definir este servicio como inyectable,
// lo que significa que Angular puede inyectarlo como una dependencia en otros componentes o servicios.
// La propiedad providedIn: 'root' indica que este servicio está disponible de forma global en la aplicación.
@Injectable({
  providedIn: 'root',
})

export class SidebarService {
  // _isCollapsed es una instancia privada de BehaviorSubject que maneja el estado de colapsado de la barra lateral.
  // BehaviorSubject necesita un valor inicial, en este caso, false, indicando que la barra lateral inicia sin estar colapsada.
  private _isCollapsed = new BehaviorSubject(false);

  // isCollapsed$ es un observable público que otros componentes o servicios pueden suscribirse para escuchar cambios
  // en el estado de colapsado de la barra lateral. asObservable() asegura que los consumidores del observable
  // no puedan emitir nuevos valores (solo pueden escuchar los cambios).
  isCollapsed$ = this._isCollapsed.asObservable();

  // toggleCollapsed es una función que cambia el estado actual de _isCollapsed.
  // Si está colapsado, lo expande y viceversa. Esto se logra invirtiendo el valor actual de _isCollapsed.
  toggleCollapsed() {
    this._isCollapsed.next(!this._isCollapsed.value);
  }
}
