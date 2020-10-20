import { RdRouter, routing } from './app/routing';

window['clientRouter'] = new RdRouter('#root', routing);

export { Repeater } from './../modules/core/component/template';
export * from './app';
