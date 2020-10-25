import { RdRouter, routing } from './app/routing';

window['clientRouter'] = new RdRouter('#root', routing);

export { Repeater, TemplateRepeater } from './../modules/dom/repeatr';
export * from './app';
