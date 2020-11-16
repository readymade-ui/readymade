import { Router, routing } from './app/routing';

window['clientRouter'] = new Router('#root', routing);

export { TemplateRepeater, Repeater } from './../modules/dom/repeatr';
export * from './app';
