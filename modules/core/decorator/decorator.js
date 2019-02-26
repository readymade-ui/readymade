import { compileTemplate } from './../element/element.js';
import { EventDispatcher } from './../event/event.js';
const html = (...args) => {
    return args;
};
const css = (...args) => {
    return args;
};
// tslint:disable-next-line
const noop = () => { };
// Decorators
function Component(attributes) {
    if (!attributes) {
        console.error('Component must include ElementMeta to compile');
        return;
    }
    return (target) => {
        compileTemplate(attributes, target);
        return target;
    };
}
function Emitter(eventName, options, channelName) {
    return function decorator(target, key, descriptor) {
        const channel = channelName ? channelName : 'default';
        let prop = '';
        if (eventName) {
            prop = '$emit' + channel + eventName;
        }
        else {
            prop = '$emit' + channel;
        }
        function addEvent(name, chan) {
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
function Listen(eventName, channelName) {
    return function decorator(target, key, descriptor) {
        const symbolHandler = Symbol(key);
        let prop = '';
        if (channelName) {
            prop = '$listen' + eventName + channelName;
        }
        else {
            prop = '$listen' + eventName;
        }
        function addListener(name, chan) {
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
export { Component, Emitter, Listen, html, css, noop, };
