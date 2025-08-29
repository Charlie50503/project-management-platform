import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeZhTw from '@angular/common/locales/zh-Hant';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { routes } from './app.routes';

registerLocaleData(localeZhTw);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'zh-TW' },
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' }
  ]
};
