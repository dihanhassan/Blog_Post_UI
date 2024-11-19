import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtInterceptor } from './shared/interceptor/jwt.interceptor';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { AppState } from './store';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
     provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    provideClientHydration(),
  
    provideHttpClient(withFetch()),
    provideStore(AppState, {
      developmentMode: true
    }, withNgxsStoragePlugin({
      keys: '*'
    }))
  
  ]
};
