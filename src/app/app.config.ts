import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { API_BASE_URL } from './core/api/api.config';
import { authInterceptor } from './core/auth/auth.interceptor';
import { apiErrorInterceptor } from './core/api/api-error.interceptor';

const FitnessLinkPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e9f7f4',
      100: '#c8ebe3',
      200: '#a3dfd1',
      300: '#7dd3bf',
      400: '#2cc49f',
      500: '#23AF8D',
      600: '#1e967a',
      700: '#197d66',
      800: '#146453',
      900: '#0f4b3f',
      950: '#0a322b',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#23AF8D',
          inverseColor: '#ffffff',
          hoverColor: '#1e967a',
          activeColor: '#197d66',
        },
        surface: {
          0: '#ffffff',
          50: '#f8fafb',
          100: '#F0F4F5',
          200: '#EFF4FA',
          300: '#e0e5eb',
          400: '#9ca3af',
          500: '#7C7B81',
          600: '#595757',
          700: '#3f3f46',
          800: '#27272a',
          900: '#222B45',
          950: '#18181b',
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    provideHttpClient(
      withInterceptors([authInterceptor, apiErrorInterceptor]),
    ),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    providePrimeNG({
      theme: {
        preset: FitnessLinkPreset,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    }),
    MessageService,
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
  ],
};
