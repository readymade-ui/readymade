export declare type EventHandler = () => void;
interface EventMeta {
    key: string;
    handler: EventHandler;
}
interface ElementMeta {
    selector: string;
    style?: string | any[];
    template?: string | any[];
    eventMap?: {
        [key: string]: EventMeta;
    };
    boundState?: any;
}
declare const html: (...args: any[]) => any[];
declare const css: (...args: any[]) => any[];
declare const noop: () => void;
declare function Component(attributes: ElementMeta): (target: any) => any;
declare function State(property?: string): (target: any, key: string | symbol, descriptor: PropertyDescriptor) => void;
declare function Emitter(eventName?: string, options?: any, channelName?: string): (target: any, key: string | symbol, descriptor: PropertyDescriptor) => void;
declare function Listen(eventName: string, channelName?: string): (target: any, key: string | number, descriptor: PropertyDescriptor) => void;
export { EventMeta, ElementMeta, Component, State, Emitter, Listen, html, css, noop, };
