import {
  BIND_SUFFIX,
  BoundHandler,
  BoundNode,
  HANDLER_KEY,
  NODE_KEY,
  setState,
} from '../element/src/compile';
import { compileTemplate } from './../element';
import { EventDispatcher, ReadymadeEventTarget } from './../event';

export type EventHandler = () => void;
export const EMIT_KEY = '$emit';
export const LISTEN_KEY = '$listen';

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
  eventMap?: { [key: string]: EventMeta };
  mode?: 'closed' | 'open';
  selector: string;
  style?: string | any[];
  template?: string | any[];
}

export const html = (...args) => {
  return args;
};

export const css = (...args) => {
  return args;
};

export const noop = () => {};

// Decorators

export function Component(meta: ElementMeta) {
  if (!meta) {
    console.error('Component must include ElementMeta to compile');
    return;
  }

  return (target: any) => {
    compileTemplate(meta, target);
    if (meta.autoDefine === undefined) {
      meta.autoDefine = true;
    }
    if (
      meta.autoDefine === true &&
      customElements.get(meta.selector) === undefined
    ) {
      if (meta.selector && !meta.custom) {
        customElements.define(meta.selector, target);
      } else if (meta.selector && meta.custom) {
        customElements.define(meta.selector, target, meta.custom);
      } else {
        customElements.define(meta.selector, target);
      }
    }
    return target;
  };
}

export function State() {
  return function decorator(target: any, key: string | symbol) {
    async function bindState() {
      this.$state = this[key]();
      this.ɵɵstate = {};
      this.ɵɵstate[HANDLER_KEY] = new BoundHandler(this);
      this.ɵɵstate[NODE_KEY] = new BoundNode(
        this.shadowRoot ? this.shadowRoot : this,
      );
      this.ɵɵstate.$changes = new ReadymadeEventTarget();
      this.ɵstate = new Proxy(
        this.$state,
        this.ɵɵstate['handler' + BIND_SUFFIX],
      );
      for (const prop in this.$state) {
        this.ɵstate[prop] = this.$state[prop];
      }
    }
    target.setState = setState;
    target.bindState = function onBind() {
      bindState.call(this);
    };
  };
}

export function Emitter(
  eventName: string,
  options?: any,
  channelName?: string,
) {
  return function decorator(
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const channel = channelName ? channelName : 'default';

    if (eventName) {
      propertyKey = EMIT_KEY + channel + eventName;
    } else {
      propertyKey = EMIT_KEY + channel;
    }

    function addEvent(name?: string, chan?: string) {
      if (!this.emitter) {
        this.emitter = new EventDispatcher(this, chan);
      }
      if (name) {
        this.emitter.set(name, new CustomEvent(name, options ? options : {}));
      }
      if (chan && !this.emitter.channels[chan]) {
        this.emitter.setChannel(chan);
      }
    }

    function bindEmitters() {
      for (const property in this) {
        if (property.includes(EMIT_KEY)) {
          this[property].call(this);
        }
      }
    }

    if (!target[propertyKey]) {
      target[propertyKey] = function () {
        addEvent.call(this, eventName, channelName, descriptor);
      };
    }

    target.bindEmitters = function onEmitterInit() {
      bindEmitters.call(this);
    };
  };
}

export function Listen(eventName: string, channelName?: string) {
  return function decorator(
    target: any,
    key: string | number,
    descriptor: PropertyDescriptor,
  ) {
    const symbolHandler = Symbol(key);

    let prop: string = '';

    if (channelName) {
      prop = LISTEN_KEY + eventName + channelName;
    } else {
      prop = LISTEN_KEY + eventName;
    }

    function addListener(name: string, chan: string) {
      const handler = (this[symbolHandler] = (...args) => {
        descriptor.value.apply(this, args);
      });
      if (!this.emitter) {
        this.emitter = new EventDispatcher(this, chan ? chan : null);
      }
      if (!this.elementMeta) {
        this.elementMeta = {
          eventMap: {},
        };
      }
      if (!this.elementMeta.eventMap) {
        this.elementMeta.eventMap = {};
      }
      if (this.elementMeta) {
        this.elementMeta.eventMap[prop] = {
          key: name,
          handler: key,
        };
      }
      if (this.addEventListener) {
        this.addEventListener(name, handler);
      }
    }

    function removeListener() {
      if (this.removeEventListener) {
        this.removeEventListener(eventName, this[symbolHandler]);
      }
    }

    function addListeners() {
      for (const property in this) {
        if (property.includes(LISTEN_KEY)) {
          this[property].onListener.call(this);
        }
      }
    }

    if (!target[prop]) {
      target[prop] = {};
      target[prop].onListener = function onInitWrapper() {
        addListener.call(this, eventName, channelName);
      };
      target[prop].onDestroyListener = function onDestroyWrapper() {
        removeListener.call(this, eventName, channelName);
      };
    }

    target.bindListeners = function onListenerInit() {
      addListeners.call(this);
    };
  };
}
