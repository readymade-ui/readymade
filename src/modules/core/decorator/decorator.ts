import { compileTemplate } from './../element/element.js';
import { EventDispatcher } from './../event/event.js';

export type EventHandler = ()  => void;

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

function Component(attributes: ElementMeta) {
  if (!attributes) {
    console.error('Component must include ElementMeta to compile');
    return;
  }
  return (target: any) => {
    compileTemplate(attributes, target);
    return target;
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
  Emitter,
  Listen,
  html,
  css,
  noop,
};
