'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class EventDispatcher {
<<<<<<< HEAD
    constructor(context) {
        this.target = context;
        this.channels = {
            'default': new BroadcastChannel('default')
        };
=======
    constructor(context, channelName) {
        this.target = context;
        this.channels = {
            default: new BroadcastChannel('default'),
        };
        if (channelName) {
            this.setChannel(channelName);
        }
>>>>>>> dev
        this.events = {};
    }
    get(eventName) {
        return this.events[eventName];
    }
    set(eventName, ev) {
        this.events[eventName] = ev;
        return this.get(eventName);
    }
    emit(ev) {
<<<<<<< HEAD
        if (typeof ev === 'string')
            ev = this.events[ev];
        this.target.dispatchEvent(ev);
    }
    broadcast(ev, name) {
        if (typeof ev === 'string')
            ev = this.events[ev];
        this.target.dispatchEvent(ev);
        if (!ev.detail) {
            ev = { type: ev.type };
        }
        else {
            ev = { type: ev.type, detail: ev.detail };
        }
        (name) ? this.channels[name].postMessage(ev) : this.channels['default'].postMessage(ev);
    }
    setChannel(name) {
        this.channels[name] = new BroadcastChannel(name);
=======
        if (typeof ev === 'string') {
            ev = this.events[ev];
        }
        this.target.dispatchEvent(ev);
    }
    broadcast(ev, name) {
        if (typeof ev === 'string') {
            ev = this.events[ev];
        }
        this.target.dispatchEvent(ev);
        const evt = {
            bubbles: ev.bubbles,
            cancelBubble: ev.cancelBubble,
            cancelable: ev.cancelable,
            defaultPrevented: ev.defaultPrevented,
            detail: ev.detail,
            timeStamp: ev.timeStamp,
            type: ev.type,
        };
        (name) ? this.channels[name].postMessage(evt) : this.channels.default.postMessage(evt);
    }
    setChannel(name) {
        this.channels[name] = new BroadcastChannel(name);
        this.channels[name].onmessage = (ev) => {
            for (const prop in this.target.elementMeta.eventMap) {
                if (prop.includes(name) && prop.includes(ev.data.type)) {
                    this.target[this.target.elementMeta.eventMap[prop].handler](ev.data);
                }
            }
        };
>>>>>>> dev
    }
    removeChannel(name) {
        this.channels[name].close();
        delete this.channels[name];
    }
}

function attachShadow(instance, options) {
    const shadowRoot = instance.attachShadow(options || {});
    const t = document.createElement('template');
    t.innerHTML = instance.template;
    shadowRoot.appendChild(t.content.cloneNode(true));
    instance.bindTemplate();
}
function attachDOM(instance, options) {
    const t = document.createElement('template');
    t.innerHTML = instance.elementMeta.template;
    instance.appendChild(t.content.cloneNode(true));
    instance.bindTemplate();
}
function attachStyle(instance, options) {
    const id = `${instance.elementMeta.selector}`;
    if (!document.getElementById(`${id}-x`)) {
        const t = document.createElement('style');
        t.setAttribute('id', `${id}-x`);
        t.innerText = instance.elementMeta.style;
        t.innerText = t.innerText.replace(/:host/gi, `[is=${id}]`);
        document.head.appendChild(t);
    }
}

<<<<<<< HEAD
function getParent(el) {
    return el.parentNode;
}
function getChildNodes(template) {
    const _elem = template ? template : this;
    if (!_elem)
        return [];
    function getChildren(node, path = [], result = []) {
        if (!node.children.length)
            result.push(path.concat(node));
        for (const child of node.children)
            getChildren(child, path.concat(child), result);
        return result;
    }
    const nodes = getChildren(_elem, []).reduce((nodes, curr) => {
        return nodes.concat(curr);
    }, []);
    return nodes.filter((item, index) => { return nodes.indexOf(item) >= index; });
}
function getSiblings(el) {
    return Array.from(getParent(el).children).filter((elem) => {
        return elem.tagName !== 'TEXT' && elem.tagName !== 'STYLE';
    });
}
function querySelector(selector) {
    return document.querySelector(selector);
}
function querySelectorAll(selector) {
    return Array.from(document.querySelectorAll(selector));
}
function getElementIndex(el) {
    return getSiblings(el).indexOf(el);
}

const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
const BIND_SUFFIX = ' __state';
Object.byString = function (o, s) {
    if (!s)
        return o;
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        }
        else {
            return;
        }
    }
    return o;
};
function setTemplate(elem, html) {
    elem.innerHTML = html;
    return elem;
}
class BoundNode {
    constructor(node) {
        this.template = document.createElement('div');
        this.template.innerHTML = node.innerHTML;
        this.node = node;
    }
    update(data, target) {
        this.node = setTemplate(this.node, this.template.innerHTML.replace(TEMPLATE_BIND_REGEX, (match, variable) => {
            if (match === undefined || match === null)
                match = '';
            return Object.byString(data, /\{\{(\s*)(.*?)(\s*)\}\}/.exec(match)[2]) || '';
        }));
=======
const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
const BIND_SUFFIX = ' __state';
function templateId() {
    let str = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    while (str.length < 3) {
        str += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return str;
}
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(24);
    });
}
class NodeTree {
    constructor(parentNode) {
        this.$flatMap = {};
        this.$parent = parentNode;
        this.$flatMap = {};
        this.$parentId = templateId();
        this.create();
    }
    setNode(node, key, value) {
        const id = this.$parentId + '-' + uuidv4().slice(0, 6);
        const clone = node.cloneNode(true);
        node.setAttribute(id, '');
        clone.setAttribute(id, '');
        if (!this.$flatMap[id]) {
            this.$flatMap[id] = {
                id,
                node: clone,
            };
            if (key && value) {
                this.updateNode(node, key, value);
            }
        }
    }
    updateNode(node, key, value) {
        const regex = new RegExp(`\{\{(\s*)(${key})(\s*)\}\}`, 'gi');
        const attrId = this.getElementByAttribute(node)[0].nodeName;
        const protoNode = this.$flatMap[attrId].node;
        let attr;
        for (const attribute of protoNode.attributes) {
            attr = attribute.nodeName;
            if (attr.includes('attr.') && !protoNode.getAttribute(attribute.nodeName.replace('attr.', ''))) {
                attr = attribute.nodeName.replace('attr.', '');
                protoNode.setAttribute(attr, attribute.nodeValue.replace(TEMPLATE_BIND_REGEX, ''));
                node.removeAttribute(attribute.nodeName);
            }
            if (attribute.nodeValue.match(regex, 'gi')) {
                node.setAttribute(attr, attribute.nodeValue.replace(regex, value));
            }
            if (attribute.nodeName.includes('attr.')) {
                node.removeAttribute(attribute.nodeName);
            }
        }
        if (protoNode.textContent.match(regex)) {
            node.textContent = protoNode.textContent.replace(regex, value);
        }
    }
    create() {
        const walk = document.createTreeWalker(this.$parent, NodeFilter.SHOW_ELEMENT, { acceptNode(node) { return NodeFilter.FILTER_ACCEPT; } }, false);
        while (walk.nextNode()) {
            this.setNode(walk.currentNode);
        }
    }
    getElementByAttribute(node) {
        return Array.from(node.attributes).filter((attr) => {
            return /[A-Za-z0-9]{3}-[A-Za-z0-9]{6}/gm.test(attr.nodeName);
        });
    }
    update(key, value) {
        const walk = document.createTreeWalker(this.$parent, NodeFilter.SHOW_ELEMENT, { acceptNode(node) { return NodeFilter.FILTER_ACCEPT; } }, false);
        while (walk.nextNode()) {
            if (this.getElementByAttribute(walk.currentNode).length > 0) {
                this.updateNode(walk.currentNode, key, value);
            }
            else {
                this.setNode(walk.currentNode, key, value);
            }
        }
        return this.$parent;
    }
}
class BoundNode {
    constructor(parent) {
        this.$parent = parent;
        this.$tree = new NodeTree(this.$parent);
    }
    update(key, value) {
        this.$tree.update(key, value);
        if (this.$parent.onUpdate) {
            this.$parent.onUpdate();
        }
>>>>>>> dev
    }
}
class BoundHandler {
    constructor(obj) {
<<<<<<< HEAD
        this.model = obj;
=======
        this.$parent = obj;
>>>>>>> dev
    }
    set(target, key, value) {
        const change = {
            [key]: {
                previousValue: target[key],
<<<<<<< HEAD
                newValue: value
            }
        };
        target[key] = value;
        this.model.elementMeta.boundState['node' + BIND_SUFFIX].update(this.model, target);
        if (target.onStateChange)
            target.onStateChange(change);
        return true;
    }
}
function bindTemplate() {
    if (!this.elementMeta)
        this.elementMeta = {};
    this.elementMeta.templateRegex = TEMPLATE_BIND_REGEX;
    this.elementMeta.boundState = {
        ['node' + BIND_SUFFIX]: new BoundNode(this.shadowRoot ? this.shadowRoot : this),
        ['handler' + BIND_SUFFIX]: new BoundHandler(this)
    };
    this.state = new Proxy(this, this.elementMeta.boundState['handler' + BIND_SUFFIX]);
}
function bindTemplateNodes() {
    if (!this.elementMeta)
        this.elementMeta = {};
    this.elementMeta.boundNodes = this.getChildNodes()
        .map((node) => {
        if (!node.elementMeta)
            node.elementMeta = {};
        node.elementMeta.templateRegex = TEMPLATE_BIND_REGEX;
        node.elementMeta.boundState = {
            ['node' + BIND_SUFFIX]: new BoundNode(node),
            ['handler' + BIND_SUFFIX]: new BoundHandler(node)
        };
        node.state = new Proxy(node, node.elementMeta.boundState['handler' + BIND_SUFFIX]);
        return node;
    });
}
function setState$1(prop, model) {
    this.state[prop] = model;
}
function compileTemplate(elementMeta, target) {
    target.prototype.elementMeta = Object.assign({}, elementMeta);
    target.prototype.elementMeta.eventMap = {};
    target.prototype.template = document.createElement('template');
    target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
    target.prototype.getChildNodes = getChildNodes;
    target.prototype.bindTemplateNodes = bindTemplateNodes;
    target.prototype.bindTemplate = bindTemplate;
    target.prototype.setState = setState$1;
=======
                newValue: value,
            },
        };
        target[key] = value;
        this.$parent.$state['node' + BIND_SUFFIX].update(key, target[key]);
        if (target.onStateChange) {
            target.onStateChange(change);
        }
        return true;
    }
}
function setState(prop, model) {
    this.state[prop] = model;
}
function compileTemplate(elementMeta, target) {
    target.prototype.elementMeta = Object.assign(target.elementMeta ? target.elementMeta : {}, elementMeta);
    target.prototype.elementMeta.eventMap = {};
    target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
    target.prototype.bindTemplate = bindTemplate;
    target.prototype.setState = setState;
}
function bindTemplate() {
    this.$state = {};
    this.$state['handler' + BIND_SUFFIX] = new BoundHandler(this);
    this.$state['node' + BIND_SUFFIX] = new BoundNode(this.shadowRoot ? this.shadowRoot : this);
    this.state = new Proxy(this, this.$state['handler' + BIND_SUFFIX]);
}

function getParent(el) {
    return el.parentNode;
}
function getChildNodes(template) {
    const elem = template ? template : this;
    if (!elem) {
        return [];
    }
    function getChildren(node, path = [], result = []) {
        if (!node.children.length) {
            result.push(path.concat(node));
        }
        for (const child of node.children) {
            getChildren(child, path.concat(child), result);
        }
        return result;
    }
    const nodes = getChildren(elem, []).reduce((nd, curr) => {
        return nd.concat(curr);
    }, []);
    return nodes.filter((item, index) => nodes.indexOf(item) >= index);
}
function getSiblings(el) {
    return Array.from(getParent(el).children).filter((elem) => {
        return elem.tagName !== 'TEXT' && elem.tagName !== 'STYLE';
    });
}
function querySelector(selector) {
    return document.querySelector(selector);
}
function querySelectorAll(selector) {
    return Array.from(document.querySelectorAll(selector));
}
function getElementIndex(el) {
    return getSiblings(el).indexOf(el);
>>>>>>> dev
}

const html = (...args) => {
    return args;
};
const css = (...args) => {
    return args;
};
const noop = () => { };
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
<<<<<<< HEAD
function Emitter(eventName, options) {
    return function decorator(target, key, descriptor) {
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
=======
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
>>>>>>> dev
        };
    };
}
function Listen(eventName, channelName) {
    return function decorator(target, key, descriptor) {
<<<<<<< HEAD
        const { onInit = noop, onDestroy = noop } = target;
        const symbolHandler = Symbol(key);
        function addListener() {
=======
        const symbolHandler = Symbol(key);
        let prop = '';
        if (channelName) {
            prop = '$listen' + eventName + channelName;
        }
        else {
            prop = '$listen' + eventName;
        }
        function addListener(name, chan) {
>>>>>>> dev
            const handler = this[symbolHandler] = (...args) => {
                descriptor.value.apply(this, args);
            };
            if (!this.emitter) {
<<<<<<< HEAD
                this.emitter = new EventDispatcher(this);
                if (channelName) {
                    this.elementMeta.eventMap[eventName] = {
                        key: eventName,
                        handler: key
                    };
                    this.emitter.channels[channelName].onmessage = (ev) => {
                        this[this.elementMeta.eventMap[eventName].handler](ev.data);
                    };
                }
            }
            this.addEventListener(eventName, handler);
=======
                this.emitter = new EventDispatcher(this, chan ? chan : null);
            }
            this.elementMeta.eventMap[prop] = {
                key: name,
                handler: key,
            };
            this.addEventListener(name, handler);
>>>>>>> dev
        }
        function removeListener() {
            this.removeEventListener(eventName, this[symbolHandler]);
        }
<<<<<<< HEAD
        target.onInit = function onInitWrapper() {
            onInit.call(this);
            addListener.call(this);
        };
        target.onDestroy = function onDestroyWrapper() {
            onDestroy.call(this);
            removeListener.call(this);
=======
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
>>>>>>> dev
        };
    };
}

class StructuralElement extends HTMLElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class PseudoElement extends HTMLElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class CustomElement extends HTMLElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class AllCollectionComponent extends HTMLAllCollection {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class AnchorComponent extends HTMLAnchorElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class AreaComponent extends HTMLAreaElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class AudioComponent extends HTMLAudioElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class BRComponent extends HTMLBRElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class BodyComponent extends HTMLBodyElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ButtonComponent extends HTMLButtonElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class CanvasComponent extends HTMLCanvasElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class CollectionComponent extends HTMLCollection {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DListComponent extends HTMLDListElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DataComponent extends HTMLDataElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DataListComponent extends HTMLDataListElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DetailsComponent extends HTMLDetailsElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DialogComponent extends HTMLDialogElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DivComponent extends HTMLDivElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class EmbedComponent extends HTMLEmbedElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class FieldSetComponent extends HTMLFieldSetElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class FormControlsComponent extends HTMLFormControlsCollection {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class FormComponent extends HTMLFormElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class HRComponent extends HTMLHRElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class HeadComponent extends HTMLHeadElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class HeadingComponent extends HTMLHeadingElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class HtmlComponent extends HTMLHtmlElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class IFrameComponent extends HTMLIFrameElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ImageComponent extends HTMLImageElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class InputComponent extends HTMLInputElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class LIComponent extends HTMLLIElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class LabelComponent extends HTMLLabelElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class LegendComponent extends HTMLLegendElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class LinkComponent extends HTMLLinkElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MapComponent extends HTMLMapElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MediaComponent extends HTMLMediaElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MenuComponent extends HTMLMenuElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MetaComponent extends HTMLMetaElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MeterComponent extends HTMLMeterElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ModComponent extends HTMLModElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OListComponent extends HTMLOListElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ObjectComponent extends HTMLObjectElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OptGroupComponent extends HTMLOptGroupElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OptionComponent extends HTMLOptionElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OptionsCollectionComponent extends HTMLOptionsCollection {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OutputComponent extends HTMLOutputElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ParagraphComponent extends HTMLParagraphElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ParamComponent extends HTMLParamElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class PictureComponent extends HTMLPictureElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class PreComponent extends HTMLPreElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        attachDOM(this);
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ProgressComponent extends HTMLProgressElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class QuoteComponent extends HTMLQuoteElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ScriptComponent extends HTMLScriptElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class SelectComponent extends HTMLSelectElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class SlotComponent extends HTMLSlotElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class SourceComponent extends HTMLSourceElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class SpanComponent extends HTMLSpanElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class StyleComponent extends HTMLStyleElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableCaptionComponent extends HTMLTableCaptionElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableCellComponent extends HTMLTableCellElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableColComponent extends HTMLTableColElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableComponent extends HTMLTableElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableRowComponent extends HTMLTableRowElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableSectionComponent extends HTMLTableSectionElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TemplateComponent extends HTMLTemplateElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TimeComponent extends HTMLTimeElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TitleComponent extends HTMLTitleElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TrackComponent extends HTMLTrackElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class UListComponent extends HTMLUListElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class UnknownComponent extends HTMLUnknownElement {
    constructor() {
        super();
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}
class VideoComponent extends HTMLVideoElement {
    constructor() {
        super();
        attachStyle(this);
<<<<<<< HEAD
=======
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
>>>>>>> dev
        if (this.onInit) {
            this.onInit();
        }
    }
}

exports.EventDispatcher = EventDispatcher;
exports.attachDOM = attachDOM;
exports.attachShadow = attachShadow;
exports.attachStyle = attachStyle;
exports.bindTemplate = bindTemplate;
<<<<<<< HEAD
exports.bindTemplateNodes = bindTemplateNodes;
=======
>>>>>>> dev
exports.compileTemplate = compileTemplate;
exports.getSiblings = getSiblings;
exports.getElementIndex = getElementIndex;
exports.getParent = getParent;
exports.querySelector = querySelector;
exports.querySelectorAll = querySelectorAll;
exports.getChildNodes = getChildNodes;
exports.Component = Component;
exports.Emitter = Emitter;
exports.Listen = Listen;
exports.html = html;
exports.css = css;
exports.noop = noop;
exports.StructuralElement = StructuralElement;
exports.PseudoElement = PseudoElement;
exports.CustomElement = CustomElement;
exports.AllCollectionComponent = AllCollectionComponent;
exports.AnchorComponent = AnchorComponent;
exports.AreaComponent = AreaComponent;
exports.AudioComponent = AudioComponent;
exports.BRComponent = BRComponent;
exports.BodyComponent = BodyComponent;
exports.ButtonComponent = ButtonComponent;
exports.CanvasComponent = CanvasComponent;
exports.CollectionComponent = CollectionComponent;
exports.DListComponent = DListComponent;
exports.DataComponent = DataComponent;
exports.DataListComponent = DataListComponent;
exports.DetailsComponent = DetailsComponent;
<<<<<<< HEAD
exports.DialogComponent = DialogComponent;
=======
>>>>>>> dev
exports.DivComponent = DivComponent;
exports.EmbedComponent = EmbedComponent;
exports.FieldSetComponent = FieldSetComponent;
exports.FormControlsComponent = FormControlsComponent;
exports.FormComponent = FormComponent;
exports.HRComponent = HRComponent;
exports.HeadComponent = HeadComponent;
exports.HeadingComponent = HeadingComponent;
exports.HtmlComponent = HtmlComponent;
exports.IFrameComponent = IFrameComponent;
exports.ImageComponent = ImageComponent;
exports.InputComponent = InputComponent;
exports.LIComponent = LIComponent;
exports.LabelComponent = LabelComponent;
exports.LegendComponent = LegendComponent;
exports.LinkComponent = LinkComponent;
exports.MapComponent = MapComponent;
exports.MediaComponent = MediaComponent;
exports.MenuComponent = MenuComponent;
exports.MetaComponent = MetaComponent;
exports.MeterComponent = MeterComponent;
exports.ModComponent = ModComponent;
exports.OListComponent = OListComponent;
exports.ObjectComponent = ObjectComponent;
exports.OptGroupComponent = OptGroupComponent;
exports.OptionComponent = OptionComponent;
exports.OptionsCollectionComponent = OptionsCollectionComponent;
exports.OutputComponent = OutputComponent;
exports.ParagraphComponent = ParagraphComponent;
exports.ParamComponent = ParamComponent;
exports.PictureComponent = PictureComponent;
exports.PreComponent = PreComponent;
exports.ProgressComponent = ProgressComponent;
exports.QuoteComponent = QuoteComponent;
exports.ScriptComponent = ScriptComponent;
exports.SelectComponent = SelectComponent;
exports.SlotComponent = SlotComponent;
exports.SourceComponent = SourceComponent;
exports.SpanComponent = SpanComponent;
exports.StyleComponent = StyleComponent;
exports.TableCaptionComponent = TableCaptionComponent;
exports.TableCellComponent = TableCellComponent;
exports.TableColComponent = TableColComponent;
exports.TableComponent = TableComponent;
exports.TableRowComponent = TableRowComponent;
exports.TableSectionComponent = TableSectionComponent;
exports.TemplateComponent = TemplateComponent;
exports.TimeComponent = TimeComponent;
exports.TitleComponent = TitleComponent;
exports.TrackComponent = TrackComponent;
exports.UListComponent = UListComponent;
exports.UnknownComponent = UnknownComponent;
exports.VideoComponent = VideoComponent;
