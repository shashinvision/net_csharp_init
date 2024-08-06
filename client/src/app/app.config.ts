import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations'

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './_interceptors/error.interceptor';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
  provideRouter(routes),
  provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor])), // using own interceptor
  provideAnimations(), // To use dropdown menu with animations globally
  provideToastr({
    positionClass: 'toast-bottom-right',
  })
  ]
};
