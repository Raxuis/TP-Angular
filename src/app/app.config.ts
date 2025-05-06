import {ApplicationConfig, provideExperimentalZonelessChangeDetection, LOCALE_ID} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import fr from "@angular/common/locales/fr";
import {registerLocaleData} from '@angular/common';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {AuthInterceptor} from '@/interceptors/auth/auth.interceptor';
import {provideToastr, ToastrModule} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';
// import {ApiInterceptor} from '@/interceptors/api/api.interceptor';

registerLocaleData(fr);
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),
    provideToastr(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([
        AuthInterceptor,
        // ApiInterceptor
      ])
    ),
    {
      provide: LOCALE_ID,
      useValue: "fr-FR"
    }
  ]
};
