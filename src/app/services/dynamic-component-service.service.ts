import {
  ComponentFactoryResolver,
  Injectable,
  Injector,
  ApplicationRef,
  EmbeddedViewRef,
  ComponentRef,
} from '@angular/core';
import { BodyLoadingComponent } from '../components/body-loading/body-loading.component';
// import { AppAlertComponent } from '../so-dynamic-alert/so-dynamic-alert'; // Asegúrate de que esta ruta es correcta
import { Subject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  private bodyLoadingComponentRef?: ComponentRef<BodyLoadingComponent>;
  // private alertComponentRef?: ComponentRef<AppAlertComponent>;
  public confirmationSource = new Subject<boolean>();
  confirmation$ = this.confirmationSource.asObservable();
  private prospectExistSubscription: Subscription | undefined;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  showBodyLoading(): void {
    if (!this.bodyLoadingComponentRef) {
      const domElement = this.createDomElement(BodyLoadingComponent);
      document.body.appendChild(domElement);
    }
  }

  destroyBodyLoading(): void {
    if (this.bodyLoadingComponentRef) {
      this.appRef.detachView(this.bodyLoadingComponentRef.hostView);
      this.bodyLoadingComponentRef.destroy();
      this.bodyLoadingComponentRef = undefined;
    }
  }

  // showAlert(options: AlertOptions): Observable<boolean> {
  //   if (!this.alertComponentRef) {
  //     const domElement = this.createDomElement(AppAlertComponent, options);
  //     document.body.appendChild(domElement);
  //     if (options.autohide) {
  //       setTimeout(() => {
  //         if (this.alertComponentRef) {
  //           this.destroyAlert();
  //         }
  //       }, 6000);
  //     }
  //   }
  //   return this.confirmation$;
  // }

  // destroyAlert(): void {
  //   if (this.alertComponentRef) {
  //     this.appRef.detachView(this.alertComponentRef.hostView);
  //     this.alertComponentRef.destroy();
  //     this.alertComponentRef = undefined;
  //   }
  // }

  private createDomElement(component: any, options?: any): any {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(component);
    let componentRef: any;
    if (component === BodyLoadingComponent) {
      componentRef = componentFactory.create(this.injector);
      this.bodyLoadingComponentRef = componentRef;
    }
    // else if (component === AppAlertComponent) {
    //   componentRef = componentFactory.create(this.injector);
    //   const alertInstance = componentRef.instance as AppAlertComponent;
    //   alertInstance.title = options?.title || '';
    //   alertInstance.message = options?.message || '';
    //   alertInstance.htmlContent = options?.htmlContent || '';
    //   alertInstance.alertType = options?.alertType;
    //   alertInstance.textSuccessButton = options?.textSuccessButton || '';
    //   alertInstance.textCancelButton = options?.textCancelButton || '';
    //   alertInstance.animate = options?.animate;
    //   alertInstance.autohide = options?.autohide;
    //   alertInstance.width = options?.width;
    //   this.alertComponentRef = componentRef;
    // }
    if (componentRef) {
      this.appRef.attachView(componentRef.hostView);
      return (componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
    }
  }
  ngOnDestroy() {
    if (this.prospectExistSubscription) {
      this.prospectExistSubscription.unsubscribe();
    }
  }
}

export enum AlertType {
  success = 'success',
  error = 'error',
  warning = 'warning',
}

interface AlertOptions {
  title?: string;
  message?: string;
  htmlContent?: string;
  alertType?: AlertType;
  textCancelButton?: string;
  textSuccessButton?: string;
  autohide?: boolean;
  animate?: boolean;
  width?: string;
}
