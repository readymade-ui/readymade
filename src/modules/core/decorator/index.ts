import { compileTemplate } from './../element/index';
import { EventDispatcher } from './../event/index';

interface EventMeta {
  key: string;
  handler: Function;
};

interface ElementMeta {
  selector: string;
  style?: string;
  template?: string;
  eventMap?: any;
};

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

function Emitter(eventName: string, options: Event) {
  return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
      const { onInit = noop } = target;

      function addEvent() {
        if (!this.emitter) {
          this.emitter = new EventDispatcher(this);
        }
        this.emitter.set(eventName, new CustomEvent(eventName, options ? options : {}));
      }

      target.onInit = function onInitWrapper() {
        onInit.call(this);
        addEvent.call(this);
      };
  };
}

function Listen(eventName: string, channelName?: string) {
  return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
      const { onInit = noop, onDestroy = noop } = target;
      const symbolHandler = Symbol(key);

      function addListener() {
        const handler = this[symbolHandler] = (...args) => {
          descriptor.value.apply(this, args);
        };
        if (!this.emitter) {
          this.emitter = new EventDispatcher(this);
          if (channelName) {
            this.elementMeta.eventMap[eventName] = {
              key: eventName,
              handler: key
            }
            this.emitter.channels[channelName].onmessage = (ev) => {
              this[this.elementMeta.eventMap[eventName].handler](ev.data);
            }
          }
        }
        this.addEventListener(eventName, handler);
      }

      function removeListener() {
        this.removeEventListener(eventName, this[symbolHandler]);
      }

      target.onInit = function onInitWrapper() {
        onInit.call(this);
        addListener.call(this);
      };

      target.onDestroy = function onDestroyWrapper() {
        onDestroy.call(this);
        removeListener.call(this);
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
  noop
};
