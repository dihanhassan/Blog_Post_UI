import { Injectable, NgModule } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Store } from "@ngxs/store";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private store: Store,
    private spinner: NgxSpinnerService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinner.show();
    console.log('Request started');


    const MINIMUM_SPINNER_TIME = 300;
    const startTime = Date.now();

    return next.handle(request).pipe(
      finalize(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = MINIMUM_SPINNER_TIME - elapsedTime;

        if (remainingTime > 0) {
          setTimeout(() => {
            this.spinner.hide();
          }, remainingTime);
        } else {
          this.spinner.hide();
        }
      })
    );
  }
}
