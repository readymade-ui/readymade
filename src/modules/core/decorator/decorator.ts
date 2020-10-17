import {
  BIND_SUFFIX,
  NODE_KEY,
  HANDLER_KEY,
  BoundHandler,
  BoundNode
} from '../element/src/compile';
import { compileTemplate } from './../element/element';
import { EventDispatcher } from './../event/event';

export type EventHandler = () => void;
export const EMIT_KEY = '$emit';
export const LISTEN_KEY = '$listen';

interface EventMeta {
  key: string;
  handler: EventHandler;
}

interface ElementMeta {
  autoDefine?: boolean;
  boundState?: any;
  custom?: {
    extends: string;
  };
  eventMap?: { [key: string]: EventMeta };
  mode?: 'closed' | 'open';
  selector: string;
  style?: string | any[];
  template?: string | any[];
}

const html = (...args) => {
  return args;
};

const css = (...args) => {
  return args;
};

// tslint:disable-next-line
const noop = () => {};

// Decorators

function Component(meta: ElementMeta) {
  if (!meta) {
    console.error('Component must include ElementMeta to compile');
    return;
  }
  return (target: any) => {
    compileTemplate(meta, target);
    if (meta.autoDefine === undefined) {
      meta.autoDefine = true;
    }
    if (meta.autoDefine === true) {
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

function State(property?: string) {
  return function decorator(
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    async function bindState() {
      this.$state = this[key]();
      this.ɵɵstate = {};
      this.ɵɵstate[HANDLER_KEY] = new BoundHandler(this);
      this.ɵɵstate[NODE_KEY] = new BoundNode(
        this.shadowRoot ? this.shadowRoot : this
      );
      this.ɵstate = new Proxy(this.$state, this.ɵɵstate['handler' + BIND_SUFFIX]);
      for (const prop in this.$state) {
        this.ɵstate[prop] = this.$state[prop];
      }
    }

    target.bindState = function onBind() {
      bindState.call(this);
    };
  };
}

function Emitter(eventName?: string, options?: any, channelName?: string) {
  return function decorator(
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const channel = channelName ? channelName : 'default';
    let prop: string = '';

    if (eventName) {
      prop = EMIT_KEY + channel + eventName;
    } else {
      prop = EMIT_KEY + channel;
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

    if (!target[prop]) {
      target[prop] = function() {
        addEvent.call(this, eventName, channelName);
      };
    }

    target.bindEmitters = function onEmitterInit() {
      bindEmitters.call(this);
    };
  };
}

function Listen(eventName: string, channelName?: string) {
  return function decorator(
    target: any,
    key: string | number,
    descriptor: PropertyDescriptor
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

      this.elementMeta.eventMap[prop] = {
        key: name,
        handler: key
      };

      this.addEventListener(name, handler);
    }

    function removeListener() {
      this.removeEventListener(eventName, this[symbolHandler]);
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

export {
  EventMeta,
  ElementMeta,
  Component,
  State,
  Emitter,
  Listen,
  html,
  css,
  noop
};
