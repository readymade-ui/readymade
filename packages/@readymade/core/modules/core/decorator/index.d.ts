interface EventMeta {
    key: string;
    handler: Function;
}
interface ElementMeta {
    selector: string;
    style?: string | any[];
    template?: string | any[];
    eventMap?: any;
}
declare const html: (...args: any[]) => any[];
declare const css: (...args: any[]) => any[];
declare const noop: () => void;
declare function Component(attributes: ElementMeta): (target: any) => any;
declare function Emitter(eventName: string, options: Event): (target: any, key: string | symbol, descriptor: PropertyDescriptor) => void;
declare function Listen(eventName: string, channelName?: string): (target: any, key: string | number, descriptor: PropertyDescriptor) => void;
export { EventMeta, ElementMeta, Component, Emitter, Listen, html, css, noop };
