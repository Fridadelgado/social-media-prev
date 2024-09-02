import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';
import { SocialMediaKpi } from '../interfaces/redessociales-kpis.interface';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor(private http: HttpClient) { }

  getKpis() {
    return this.http.get(GlobalConstants.urlApiKpis + `facebook`).pipe(
      map((response: any) => {
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
