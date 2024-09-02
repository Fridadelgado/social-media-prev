import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseRedesSociales } from '../interfaces/redes-sociales.interface';
import { Observable, of, tap } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class RedesSocialesService {
  private readonly STORAGE_KEY = 'redesSocialesCache';


  constructor(private http: HttpClient) { }
  getRedesSociales(): Observable<ResponseRedesSociales> {
    return this.http.get<ResponseRedesSociales>(GlobalConstants.urlApiRedesSociales).pipe(
      tap(data => sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(data)))
    );

  }

   getRedesSocialesFromSessionStorage(): Observable<ResponseRedesSociales> {
    const cachedData = sessionStorage.getItem(this.STORAGE_KEY);
    if (cachedData) {
      return of(JSON.parse(cachedData));
    } else {
      return this.getRedesSociales();
    }
  }
}
