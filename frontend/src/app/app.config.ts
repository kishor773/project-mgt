import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import { definePreset } from '@primeuix/themes';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
// import { provideStoreDevtools } from '@ngrx/store-devtools';

// 1. Define your custom preset
const MyCustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{cyan.50}',
      100: '{cyan.100}',
      200: '{cyan.200}',
      300: '{cyan.300}',
      400: '{cyan.400}',
      500: '{cyan.500}',
      600: '{cyan.600}',
      700: '{cyan.700}',
      800: '{cyan.800}',
      900: '{cyan.900}',
      950: '{cyan.950}'
    },
    colorScheme: {
      dark: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
        }
      }
    }
  }
});


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // provideAnimationsAsync(),
    provideHttpClient(),
    // provideAnimations(),
    provideStore(),
    provideEffects(),
    // provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: MyCustomPreset,
        options: {
          // Set to 'system' to follow OS, or a class like '.my-app-dark' to toggle manually
          darkModeSelector: '.my-app-dark',
          cssLayer: false
        }
        // preset: Aura
        // preset: Lara
      }
    })
  ]
};
