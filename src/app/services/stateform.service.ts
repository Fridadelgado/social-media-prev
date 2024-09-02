import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateformService {
  private formDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  formData$: Observable<any> = this.formDataSubject.asObservable();

  private previewDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  previewData$: Observable<any> = this.previewDataSubject.asObservable();
  constructor() { }



  setFormData(data: any): void {
    this.formDataSubject.next(data);
  }

  setPreviewData(data: any): void {
    this.previewDataSubject.next(data);
  }
}
