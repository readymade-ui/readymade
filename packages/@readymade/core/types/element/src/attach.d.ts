import { ElementMeta } from './../../decorator/decorator';
declare function attachShadow(instance: any, options?: any): void;
declare function attachDOM(instance: any, options?: any): void;
declare function attachStyle(instance: any, options?: any): void;
declare function define(instance: any, meta: ElementMeta): void;
export { attachDOM, attachStyle, attachShadow, define };
