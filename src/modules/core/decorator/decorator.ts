import { BIND_SUFFIX, BoundHandler, BoundNode } from '../element/src/compile.js';
import { compileTemplate } from './../element/element.js';
import { EventDispatcher } from './../event/event.js';

export type EventHandler = () => void;

interface EventMeta {
  key: string;
  handler: EventHandler;
}

interface ElementMeta {
  selector: string;
  style?: string | any[];
  template?: string | any[];
  eventMap?: { [key: string]: EventMeta };
  boundState?: any;
  custom?: {
    extends: string;
  };
  autoDefine?: boolean;
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
  return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {

    function bindState() {
      this.$$state = this[key]();
      this.$$state['handler' + BIND_SUFFIX] = new BoundHandler(this);
      this.$$state['node' + BIND_SUFFIX] = new BoundNode(this.shadowRoot ? this.shadowRoot : this);
      this.$state = new Proxy(this, this.$$state['handler' + BIND_SUFFIX]);
      for (const prop in this.$$state) {
        if (this.$$state[prop] && !prop.includes('__state')) {
          this.$state[prop] = this.$$state[prop];
        }
      }
    }

    target.bindState = function onBind() {
      bindState.call(this);
    };
  };
}

function Emitter(eventName?: string, options?: any, channelName?: string) {
  return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {

    const channel = channelName ? channelName : 'default';
    let prop: string = '';

    if (eventName) {
      prop = '$emit' + channel + eventName;
    } else {
      prop = '$emit' + channel;
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
        if (property.includes('$emit')) {
          this[property].call(this);
        }
      }
    }

    if (!target[prop]) {
      target[prop] = function () {
        addEvent.call(this, eventName, channelName);
      };
    }

    target.bindEmitters = function onEmitterInit() {
      bindEmitters.call(this);
    };

  };
}

function Listen(eventName: string, channelName?: string) {
  return function decorator(target: any, key: string | number, descriptor: PropertyDescriptor) {

    const symbolHandler = Symbol(key);

    let prop: string = '';

    if (channelName) {
      prop = '$listen' + eventName + channelName;
    } else {
      prop = '$listen' + eventName;
    }

    function addListener(name: string, chan: string) {

      const handler = this[symbolHandler] = (...args) => {
        descriptor.value.apply(this, args);
      };

      if (!this.emitter) {
        this.emitter = new EventDispatcher(this, chan ? chan : null);
      }

      this.elementMeta.eventMap[prop] = {
        key: name,
        handler: key,
      };

      this.addEventListener(name, handler);

    }

    function removeListener() {
      this.removeEventListener(eventName, this[symbolHandler]);
    }

    function addListeners() {
      for (const property in this) {
        if (property.includes('$listen')) {
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
  noop,
};
