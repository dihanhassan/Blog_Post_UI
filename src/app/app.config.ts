import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { AppState } from './store';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './shared/interceptors/loding.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    importProvidersFrom(NgxSpinnerModule),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    provideClientHydration(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideToastr({
      countDuplicates: true
    }),
    provideHttpClient(withFetch()),
    provideStore(AppState, {
      developmentMode: true
    }, withNgxsStoragePlugin({
      keys: '*'
    }))
  
  ]
};
