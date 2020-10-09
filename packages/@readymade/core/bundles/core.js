'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class EventDispatcher {
    constructor(context, channelName) {
        this.target = context;
        this.channels = {
            default: new BroadcastChannel('default'),
        };
        if (channelName) {
            this.setChannel(channelName);
        }
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

const STRING_VALUE_REGEX = /\[(\w+)\]/g;
const STRING_DOT_REGEX = /^\./;
const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
const BRACKET_START_REGEX = new RegExp(`\\[`, 'gi');
const BRACKET_END_REGEX = new RegExp(`\\]`, 'gi');
const BIND_SUFFIX = ' __state';
const NODE_KEY = 'node' + BIND_SUFFIX;
const HANDLER_KEY = 'handler' + BIND_SUFFIX;
const isObject = function (val) {
    if (val === null) {
        return false;
    }
    return ((typeof val === 'function') || (typeof val === 'object'));
};
const findValueByString = function (o, s) {
    s = s.replace(STRING_VALUE_REGEX, '.$1');
    s = s.replace(STRING_DOT_REGEX, '');
    const a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
        const k = a[i];
        if (k in o) {
            o = o[k];
        }
        else {
            return;
        }
    }
    return o;
};
function setValueByString(obj, path, value) {
    const pList = path.split('.');
    const len = pList.length;
    for (let i = 0; i < len - 1; i++) {
        const elem = pList[i];
        if (!obj[elem]) {
            obj[elem] = {};
        }
        obj = obj[elem];
    }
    obj[pList[len - 1]] = value;
}
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
    }
    setNode(node, key, value) {
        const id = this.$parentId + '-' + uuidv4().slice(0, 6);
        const clone = node.cloneNode(true);
        if (!node.setAttribute) {
            node.setAttribute = function (i, v) { };
        }
        node.setAttribute(id, '');
        if (!clone.setAttribute) {
            clone.setAttribute = function (i, v) { };
        }
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
        node.$init = true;
    }
    changeNode(node, key, value) {
        key = key.replace(BRACKET_START_REGEX, `\\[`);
        key = key.replace(BRACKET_END_REGEX, `\\]`);
        const regex = new RegExp(`\{\{(\s*)(${key})(\s*)\}\}`, 'gi');
        const attrId = this.getElementByAttribute(node)[0].nodeName || this.getElementByAttribute(node)[0].name;
        const protoNode = this.$flatMap[attrId].node;
        if (protoNode.textContent.match(regex)) {
            node.textContent = protoNode.textContent.replace(regex, value);
        }
        if (protoNode.attributes.length === 1) {
            return;
        }
        let attr;
        for (const attribute of protoNode.attributes) {
            attr = attribute.nodeName || attribute.name;
            if (attr.includes('attr.') && !protoNode.getAttribute(attr.replace('attr.', ''))) {
                if (attribute.nodeName) {
                    attr = attribute.nodeName.replace('attr.', '');
                }
                else if (attribute.name) {
                    attr = attribute.name.replace('attr.', '');
                }
                if (!protoNode.setAttribute) {
                    protoNode.setAttribute = function (i, v) { };
                }
                protoNode.setAttribute(attr, attribute.nodeValue.replace(TEMPLATE_BIND_REGEX, ''));
                const remove = attribute.nodeName || attribute.name;
                node.removeAttribute(remove);
            }
            const attributeValue = attribute.nodeValue || attribute.value;
            if (attributeValue.match(regex, 'gi')) {
                if (!node.setAttribute) {
                    node.setAttribute = function (i, v) { };
                }
                node.setAttribute(attr, attributeValue.replace(regex, value));
            }
            const check = attribute.nodeName || attribute.name;
            if (check.includes('attr.')) {
                node.removeAttribute(check);
            }
        }
    }
    updateNode(node, key, value) {
        if (this.getElementByAttribute(node).length === 0) {
            return;
        }
        if (Array.isArray(value)) {
            for (let index = 0; index < value.length; index++) {
                this.changeNode(node, `${key}[${index}]`, value[index]);
            }
        }
        else if (isObject(value)) {
            for (const prop in value) {
                if (value.hasOwnProperty(prop)) {
                    this.changeNode(node, `${key}.${prop}`, value[prop]);
                }
            }
        }
        else {
            this.changeNode(node, key, value);
        }
    }
    getElementByAttribute(node) {
        if (!node.attributes) {
            return [];
        }
        for (let i = 0; i < node.attributes.length; i++) {
            if (/[A-Za-z0-9]{3}-[A-Za-z0-9]{6}/gm.test(node.attributes[i].nodeName || node.attributes[i].name)) {
                return [node.attributes[i]];
            }
        }
    }
    update(key, value) {
        const walk = document.createTreeWalker(this.$parent, NodeFilter.SHOW_ELEMENT, { acceptNode(node) { return NodeFilter.FILTER_ACCEPT; } }, false);
        while (walk.nextNode()) {
            if (walk.currentNode.$init === true) {
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
    }
}
class BoundHandler {
    constructor(obj) {
        this.$parent = obj;
    }
    set(target, key, value) {
        const ex = new RegExp(TEMPLATE_BIND_REGEX).exec(value);
        const capturedGroup = (ex && ex[2]) ? ex[2] : false;
        const change = {
            [key]: {
                previousValue: target[key],
                newValue: value,
            },
        };
        if (capturedGroup && target.parentNode && target.parentNode.host && target.parentNode.mode === 'open') {
            target[key] = findValueByString(target.parentNode.host, capturedGroup);
        }
        else if (capturedGroup && target.parentNode) {
            target[key] = findValueByString(target.parentNode, capturedGroup);
        }
        else {
            target[key] = value;
        }
        this.$parent.$$state[NODE_KEY].update(key, target[key]);
        if (target.onStateChange) {
            target.onStateChange(change);
        }
        return true;
    }
}
function bindTemplate() {
    if (this.bindState) {
        this.bindState();
    }
}
function setState(prop, model) {
    setValueByString(this.$state, prop, model);
}
function compileTemplate(elementMeta, target) {
    if (!elementMeta.style) {
        elementMeta.style = '';
    }
    if (!elementMeta.template) {
        elementMeta.template = '';
    }
    target.prototype.elementMeta = Object.assign(target.elementMeta ? target.elementMeta : {}, elementMeta);
    target.prototype.elementMeta.eventMap = {};
    target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
    target.prototype.bindTemplate = bindTemplate;
    target.prototype.setState = setState;
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
}

const EMIT_KEY = '$emit';
const LISTEN_KEY = '$listen';
const html = (...args) => {
    return args;
};
const css = (...args) => {
    return args;
};
const noop = () => { };
function Component(meta) {
    if (!meta) {
        console.error('Component must include ElementMeta to compile');
        return;
    }
    return (target) => {
        compileTemplate(meta, target);
        if (meta.autoDefine === undefined) {
            meta.autoDefine = true;
        }
        if (meta.autoDefine === true) {
            if (meta.selector && !meta.custom) {
                customElements.define(meta.selector, target);
            }
            else if (meta.selector && meta.custom) {
                customElements.define(meta.selector, target, meta.custom);
            }
            else {
                customElements.define(meta.selector, target);
            }
        }
        return target;
    };
}
function State(property) {
    return function decorator(target, key, descriptor) {
        function bindState() {
            this.$$state = this[key]();
            this.$$state[HANDLER_KEY] = new BoundHandler(this);
            this.$$state[NODE_KEY] = new BoundNode(this.shadowRoot ? this.shadowRoot : this);
            this.$state = Object.assign(new Proxy(this, this.$$state[HANDLER_KEY]), this[key]());
        }
        target.bindState = function onBind() {
            bindState.call(this);
        };
    };
}
function Emitter(eventName, options, channelName) {
    return function decorator(target, key, descriptor) {
        const channel = channelName ? channelName : 'default';
        let prop = '';
        if (eventName) {
            prop = EMIT_KEY + channel + eventName;
        }
        else {
            prop = EMIT_KEY + channel;
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
                if (property.includes(EMIT_KEY)) {
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
            prop = LISTEN_KEY + eventName + channelName;
        }
        else {
            prop = LISTEN_KEY + eventName;
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

class StructuralElement extends HTMLElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class CustomElement extends HTMLElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class AllCollectionComponent extends HTMLAllCollection {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class AreaComponent extends HTMLAreaElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class AudioComponent extends HTMLAudioElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class BRComponent extends HTMLBRElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class BodyComponent extends HTMLBodyElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class CanvasComponent extends HTMLCanvasElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class CollectionComponent extends HTMLCollection {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DataComponent extends HTMLDataElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DivComponent extends HTMLDivElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class EmbedComponent extends HTMLEmbedElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class FieldSetComponent extends HTMLFieldSetElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class FormControlsComponent extends HTMLFormControlsCollection {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class FormComponent extends HTMLFormElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class HRComponent extends HTMLHRElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ImageComponent extends HTMLImageElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class InputComponent extends HTMLInputElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class LegendComponent extends HTMLLegendElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class LinkComponent extends HTMLLinkElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MediaComponent extends HTMLMediaElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MenuComponent extends HTMLMenuElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MetaComponent extends HTMLMetaElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MeterComponent extends HTMLMeterElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ModComponent extends HTMLModElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ObjectComponent extends HTMLObjectElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OptGroupComponent extends HTMLOptGroupElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OptionComponent extends HTMLOptionElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OptionsCollectionComponent extends HTMLOptionsCollection {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OutputComponent extends HTMLOutputElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ParagraphComponent extends HTMLParagraphElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ParamComponent extends HTMLParamElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class PictureComponent extends HTMLPictureElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class PreComponent extends HTMLPreElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ProgressComponent extends HTMLProgressElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class QuoteComponent extends HTMLQuoteElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ScriptComponent extends HTMLScriptElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class SelectComponent extends HTMLSelectElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class SlotComponent extends HTMLSlotElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class SourceComponent extends HTMLSourceElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class SpanComponent extends HTMLSpanElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class StyleComponent extends HTMLStyleElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableCaptionComponent extends HTMLTableCaptionElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableCellComponent extends HTMLTableCellElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableColComponent extends HTMLTableColElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TemplateComponent extends HTMLTemplateElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TimeComponent extends HTMLTimeElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TitleComponent extends HTMLTitleElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TrackComponent extends HTMLTrackElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
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
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class UnknownComponent extends HTMLUnknownElement {
    constructor() {
        super();
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}
class VideoComponent extends HTMLVideoElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.bindEmitters) {
            this.bindEmitters();
        }
        if (this.bindListeners) {
            this.bindListeners();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
}

exports.AllCollectionComponent = AllCollectionComponent;
exports.AnchorComponent = AnchorComponent;
exports.AreaComponent = AreaComponent;
exports.AudioComponent = AudioComponent;
exports.BRComponent = BRComponent;
exports.BodyComponent = BodyComponent;
exports.ButtonComponent = ButtonComponent;
exports.CanvasComponent = CanvasComponent;
exports.CollectionComponent = CollectionComponent;
exports.Component = Component;
exports.CustomElement = CustomElement;
exports.DListComponent = DListComponent;
exports.DataComponent = DataComponent;
exports.DetailsComponent = DetailsComponent;
exports.DivComponent = DivComponent;
exports.EMIT_KEY = EMIT_KEY;
exports.EmbedComponent = EmbedComponent;
exports.Emitter = Emitter;
exports.EventDispatcher = EventDispatcher;
exports.FieldSetComponent = FieldSetComponent;
exports.FormComponent = FormComponent;
exports.FormControlsComponent = FormControlsComponent;
exports.HRComponent = HRComponent;
exports.HeadComponent = HeadComponent;
exports.HeadingComponent = HeadingComponent;
exports.HtmlComponent = HtmlComponent;
exports.IFrameComponent = IFrameComponent;
exports.ImageComponent = ImageComponent;
exports.InputComponent = InputComponent;
exports.LIComponent = LIComponent;
exports.LISTEN_KEY = LISTEN_KEY;
exports.LabelComponent = LabelComponent;
exports.LegendComponent = LegendComponent;
exports.LinkComponent = LinkComponent;
exports.Listen = Listen;
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
exports.PseudoElement = PseudoElement;
exports.QuoteComponent = QuoteComponent;
exports.ScriptComponent = ScriptComponent;
exports.SelectComponent = SelectComponent;
exports.SlotComponent = SlotComponent;
exports.SourceComponent = SourceComponent;
exports.SpanComponent = SpanComponent;
exports.State = State;
exports.StructuralElement = StructuralElement;
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
exports.attachDOM = attachDOM;
exports.attachShadow = attachShadow;
exports.attachStyle = attachStyle;
exports.bindTemplate = bindTemplate;
exports.compileTemplate = compileTemplate;
exports.css = css;
exports.getChildNodes = getChildNodes;
exports.getElementIndex = getElementIndex;
exports.getParent = getParent;
exports.getSiblings = getSiblings;
exports.html = html;
exports.noop = noop;
exports.querySelector = querySelector;
exports.querySelectorAll = querySelectorAll;
