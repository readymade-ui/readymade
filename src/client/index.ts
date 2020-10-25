import { Router, routing } from './app/routing';

window['clientRouter'] = new Router('#root', routing);

export { Repeater, TemplateRepeater } from './../modules/dom/repeatr';
export * from './app';
