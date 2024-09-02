import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SocialMediaKpi } from '../interfaces/redessociales-kpis.interface';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
    providedIn: 'root'
})
export class InstagramService {

    constructor(private http: HttpClient) { }

    getKpis() {
        return this.http.get(GlobalConstants.urlApiKpisInstagram).pipe(
            map((response: any) => {
                // Extraer el campo `body` que contiene los datos reales
                const kpisData: SocialMediaKpi[] = response.body;
                return kpisData;
            }),
            catchError(error => {
                console.error('Error fetching data from Lambda function', error);
                return throwError('Error fetching data from Lambda function');
            })
        );
    }
}