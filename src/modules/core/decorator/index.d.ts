export type EventHandler = () => void;
export declare const EMIT_KEY = '$emit';
export declare const LISTEN_KEY = '$listen';
export interface EventMeta {
  key: string;
  handler: EventHandler;
}
export interface ElementMeta {
  autoDefine?: boolean;
  custom?: {
    extends: string;
  };
  delegatesFocus?: boolean;
  eventMap?: {
    [key: string]: EventMeta;
  };
  mode?: 'closed' | 'open';
  selector: string;
  style?: string | any[];
  template?: string | any[];
}
export declare const html: (...args: any[]) => any[];
export declare const css: (...args: any[]) => any[];
export declare const noop: () => void;
export declare function Component(meta: ElementMeta): (target: any) => any;
export declare function State(): (target: any, key: string | symbol) => void;
export declare function Emitter(
  eventName?: string,
  options?: any,
  channelName?: string,
): (target: any) => void;
export declare function Listen(
  eventName: string,
  channelName?: string,
): (target: any, key: string | number, descriptor: PropertyDescriptor) => void;
