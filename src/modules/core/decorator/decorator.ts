import { compileTemplate } from './../element/element.js';
import { EventDispatcher } from './../event/event.js';

export interface EventHandler {
    () : void;
}

interface EventMeta {
  key: string;
  handler: EventHandler;
};

interface ElementMeta {
  selector: string;
  style?: string | any[];
  template?: string | any[];
  eventMap?: { [key:string]: EventMeta };
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

function Emitter(eventName?: string, options?: any, channelName?: string) {
  return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {

      const channel = channelName ? channelName : 'default';
      let prop : string = '';

      if (eventName) {
        prop = '$emit'+channel+eventName;
      } else {
        prop = '$emit'+channel;
      }

      function addEvent(eventName?: string, channelName?: string) {
        if (!this.emitter) {
          this.emitter = new EventDispatcher(this, channelName);
        }
        if (eventName) {
           this.emitter.set(eventName, new CustomEvent(eventName, options ? options : {}));
        }
        if (channelName && !this.emitter.channels[channelName]) {
          this.emitter.setChannel(channelName);
        }
      }

      function bindEmitters() {

        for (let prop in this) {
          if (prop.includes('$emit')) {
            this[prop].call(this);
          }
        }
      }

      if (!target[prop]) {
        target[prop] = function() {
          addEvent.call(this, eventName, channelName);
        }
      }

      target.bindEmitters = function onEmitterInit() {
        bindEmitters.call(this);
      }

  };
}

function Listen(eventName: string, channelName?: string) {
  return function decorator(target: any, key: string | number, descriptor: PropertyDescriptor) {

      const symbolHandler = Symbol(key);

      let prop : string = '';

      if (channelName) {
        prop = '$listen'+eventName+channelName;
      } else {
        prop = '$listen'+eventName;
      }

      function addListener(eventName: string, channelName: string) {

        const handler = this[symbolHandler] = (...args) => {
          descriptor.value.apply(this, args);
        };

        if (!this.emitter) {
          this.emitter = new EventDispatcher(this, channelName ? channelName : null);
        }

        this.elementMeta.eventMap[prop] = {
            key: eventName,
            handler: key
        }

        this.addEventListener(eventName, handler);

      }

      function removeListener() {
        this.removeEventListener(eventName, this[symbolHandler]);
      }

      function addListeners() {
        for (let prop in this) {
          if (prop.includes('$listen')) {
            this[prop].onListener.call(this);
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
      }
  }
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
