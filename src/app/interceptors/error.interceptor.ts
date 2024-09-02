import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        // Aquí puedes mostrar un mensaje de error o manejarlo de otra forma
        console.error(errorMessage);

        // También puedes redirigir al usuario a una página de error, mostrar una notificación, etc.

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
