

import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { singleSpaAngular } from 'single-spa-angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps: any) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic().bootstrapModule(AppModule);
  },
  template: '<mf-angular-root />',
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
export const update = props =>  {
  singleSpaPropsSubject.next(props);
  return Promise.resolve();
};
