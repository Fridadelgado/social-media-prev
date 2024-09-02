import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseRedesSociales, RedesSociales } from 'src/app/interfaces/redes-sociales.interface';
import { RedSocialLogin } from 'src/app/interfaces/red-social-login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthRedsocialService {
  private apiUrl = 'https://w1wkukayhl.execute-api.us-west-1.amazonaws.com/dev';
  private apiSocialMediaUrl = 'https://ti3pwepc47.execute-api.us-west-1.amazonaws.com/dev';

  constructor(private http: HttpClient) { }

  getRedesSociales(): Observable<ResponseRedesSociales> {
    return this.http.get<ResponseRedesSociales>(`${this.apiSocialMediaUrl}/redessociales`);
  }

  getDistribuidores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiSocialMediaUrl}/grupos`);
  }

  iniciarAutenticacion(email: string, idred: number, distribuidor: string, nombre_cuenta: string): Observable<any> {
    const params = { email, idred, distribuidor, nombre_cuenta };
    return this.http.get<any>(`${this.apiUrl}/autenticacion`, { params });
  }

  obtenerLogueos(email?: string, idred?: number, distribuidor?: string): Observable<RedSocialLogin[]> {
    let params = new HttpParams();
    if (email) params = params.set('email', email);
    if (idred) params = params.set('idred', idred.toString());
    if (distribuidor) params = params.set('distribuidor', distribuidor);

    return this.http.get<{ statusCode: number, body: RedSocialLogin[] }>(`${this.apiUrl}/obtenerLogins`, { params })
      .pipe(
        map(response => response.body)  // Desanidar los datos de la respuesta
      );
  }

  desvincularCuenta(email: string, idred: number, distribuidor: string): Observable<any> {
    const params = { email, idred, distribuidor };
    return this.http.get<any>(`${this.apiUrl}/desvincular`, { params });
  }
}
