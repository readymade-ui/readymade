import { RdRouter, routing } from './app/routing';

window['clientRouter'] = new RdRouter('#root', routing);

export * from './app';