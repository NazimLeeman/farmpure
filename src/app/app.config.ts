import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorHandlerService, httpErrorInterceptor } from '@app/core';
import { authTokenInterceptor, OIDC_CONFIG_TOKEN } from 'ng-oidc';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { oidcConfig } from '@app/core/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([httpErrorInterceptor, authTokenInterceptor]),
    ),
		importProvidersFrom(MatSnackBarModule),
		{
			provide: ErrorHandler,
			useClass: ErrorHandlerService,
		},
		{
			provide: OIDC_CONFIG_TOKEN,
			useValue: oidcConfig,
		},
  ]
};
