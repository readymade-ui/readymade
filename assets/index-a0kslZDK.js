class ReadymadeEventTarget extends EventTarget {
}
class EventDispatcher {
  constructor(context, channelName) {
    this.target = context;
    this.channels = {
      default: new BroadcastChannel("default")
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
    if (typeof ev === "string") {
      ev = this.events[ev];
    }
    this.target.dispatchEvent(ev);
  }
  broadcast(ev, name) {
    if (typeof ev === "string") {
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
      type: ev.type
    };
    if (name) {
      this.channels[name].postMessage(evt);
    } else {
      this.channels.default.postMessage(evt);
    }
  }
  setChannel(name) {
    this.channels[name] = new BroadcastChannel(name);
    this.channels[name].onmessage = (ev) => {
      var _a, _b;
      for (const prop in (_a = this.target.elementMeta) == null ? void 0 : _a.eventMap) {
        if (prop.includes(name) && prop.includes(ev.data.type)) {
          this.target[(_b = this.target.elementMeta) == null ? void 0 : _b.eventMap[prop].handler](
            ev.data
          );
        }
      }
    };
  }
  removeChannel(name) {
    this.channels[name].close();
    delete this.channels[name];
  }
}
function closestRoot(base) {
  function __closestFrom(el) {
    if (el.getRootNode()) {
      return el.getRootNode();
    } else {
      return document.head;
    }
  }
  return __closestFrom(base);
}
function attachShadow(instance, options) {
  if (!instance.template) {
    return;
  }
  if (!instance.shadowRoot) {
    const shadowRoot = instance.attachShadow(options || {});
    const t = document.createElement("template");
    t.innerHTML = instance.template;
    shadowRoot.appendChild(t.content.cloneNode(true));
  }
  instance.bindTemplate();
}
function attachDOM(instance) {
  if (!instance.elementMeta) {
    return;
  }
  const t = document.createElement("template");
  t.innerHTML = instance.elementMeta.template;
  instance.appendChild(t.content.cloneNode(true));
  instance.bindTemplate();
}
function attachStyle(instance) {
  if (!instance.elementMeta) {
    return;
  }
  const id = `${instance.elementMeta.selector}`;
  const closest = closestRoot(instance);
  if (closest.tagName === "HEAD" && document.getElementById(`${id}-x`)) {
    return;
  }
  if (closest.getElementById && closest.getElementById(`${id}-x`)) {
    return;
  }
  const t = document.createElement("style");
  t.setAttribute("id", `${id}-x`);
  t.innerText = instance.elementMeta.style;
  t.innerText = t.innerText.replace(/:host/gi, `[is=${id}]`);
  closest.appendChild(t);
}
function getParent(el) {
  return el.parentNode;
}
function getSiblings(el) {
  return Array.from(getParent(el).children).filter((elem) => {
    return elem.tagName !== "TEXT" && elem.tagName !== "STYLE";
  });
}
function getElementIndex(el) {
  return getSiblings(el).indexOf(el);
}
const isNode = typeof process === "object" && String(process) === "[object process]";
const STRING_VALUE_REGEX = /\[(\w+)\]/g;
const STRING_DOT_REGEX = /^\./;
const DOT_BRACKET_NOTATION_REGEX = /\.|\[[0-9]*\]|(?:\['|'\])/g;
const TEMPLATE_BIND_REGEX = /\{\{\s*(.*?)\s*\}\}/g;
const BRACKET_START_REGEX = /\[/g;
const BRACKET_END_REGEX = /\]/g;
const TEMPLATE_START_REGEX = /\{\{\s?/g;
const TEMPLATE_END_REGEX = /\s?\}\}/g;
const BIND_SUFFIX = "__state";
const NODE_KEY = "node" + BIND_SUFFIX;
const HANDLER_KEY = "handler" + BIND_SUFFIX;
const isObject = function(val) {
  if (val === null) {
    return false;
  }
  return typeof val === "function" || typeof val === "object";
};
const findValueByString = function(o, s) {
  s = s.replace(STRING_VALUE_REGEX, ".$1");
  s = s.replace(STRING_DOT_REGEX, "");
  const a = s.split(DOT_BRACKET_NOTATION_REGEX).filter((s2) => s2.length > 0);
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};
function setValueByString(obj, path, value) {
  const pList = path.split(DOT_BRACKET_NOTATION_REGEX);
  const len = pList.length;
  for (let i = 0; i < len - 1; i++) {
    const elem = pList[i];
    if (!obj[elem]) {
      obj[elem] = {};
    }
    obj = obj[elem];
  }
  obj[pList[len - 1]] = value;
  return obj;
}
function filter(fn, a) {
  const f = [];
  for (let i = 0; i < a.length; i++) {
    if (fn(a[i])) {
      f.push(a[i]);
    }
  }
  return f;
}
function templateId() {
  let str = "";
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  while (str.length < 3) {
    str += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return str;
}
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
    return v.toString(24);
  });
}
function stripKey(key) {
  key = key.replace(BRACKET_START_REGEX, `\\[`);
  key = key.replace(BRACKET_END_REGEX, `\\]`);
  return key;
}
function stripTemplateString(key) {
  key = key.replace(TEMPLATE_START_REGEX, ``);
  key = key.replace(TEMPLATE_END_REGEX, ``);
  return key;
}
function templateRegExp(key) {
  return new RegExp(`\\{\\{\\s*(${key})\\s*\\}\\}`, "g");
}
function getTextNodesByContent(node, key) {
  if (!node.childNodes) {
    return [];
  }
  const nodes = [];
  for (const child of node.childNodes) {
    if (child.nodeType === Node.TEXT_NODE && templateRegExp(key).exec(child.textContent)) {
      nodes.push(child);
    }
  }
  return nodes;
}
function getElementByAttribute(node) {
  if (!node.attributes) {
    return [];
  }
  const matches = [];
  for (let i = 0; i < node.attributes.length; i++) {
    if (/[A-Za-z0-9]{3}-[A-Za-z0-9]{6}/gm.test(
      node.attributes[i].nodeName || node.attributes[i].name
    )) {
      matches.push(node.attributes[i]);
    }
  }
  return matches;
}
class NodeTree {
  constructor(parentNode) {
    this.$flatMap = {};
    this.$parent = parentNode;
    this.$flatMap = {};
    this.$parentId = templateId();
  }
  setNode(node, key, value, attrID) {
    if (this.$flatMap[attrID]) {
      return this.$flatMap[attrID];
    }
    const id = attrID ? attrID : this.$parentId + "-" + uuidv4().slice(0, 6);
    const clone = node.cloneNode(true);
    if (!node.setAttribute) {
      node.setAttribute = function() {
      };
    }
    node.setAttribute(id, "");
    if (!clone.setAttribute) {
      clone.setAttribute = function() {
      };
    }
    clone.setAttribute(id, "");
    this.$flatMap[id] = {
      id,
      node: clone
    };
    node.$init = true;
    return this.$flatMap[id];
  }
  changeNode(node, key, value, protoNode) {
    key = stripKey(key);
    const regex = templateRegExp(key);
    const nodes = getTextNodesByContent(protoNode, key);
    if (nodes.length) {
      for (const textNode of nodes) {
        if (textNode.parentNode === protoNode) {
          node.textContent = protoNode.textContent.replace(
            regex,
            value
          );
        }
      }
    }
    if (protoNode.attributes.length === 1) {
      return;
    }
    let attr = "";
    for (const attribute of protoNode.attributes) {
      attr = attribute.nodeName || attribute.name;
      if (attr.includes("attr.")) {
        if (!protoNode.getAttribute(attr.replace("attr.", ""))) {
          if (attribute.nodeName) {
            attr = attribute.nodeName.replace("attr.", "");
          } else if (attribute.name) {
            attr = attribute.name.replace("attr.", "");
          }
          if (!protoNode.setAttribute) {
            protoNode.setAttribute = function() {
            };
          }
          protoNode.setAttribute(
            attr,
            attribute.nodeValue.replace(TEMPLATE_BIND_REGEX, "")
          );
          const remove = attribute.nodeName || attribute.name;
          node.removeAttribute(remove);
        }
      }
      const attributeValue = attribute.nodeValue || attribute.value;
      if (attributeValue.match(regex, "gi")) {
        if (node.getAttribute(attr) !== value) {
          if (!node.setAttribute) {
            node.setAttribute = function() {
            };
          }
          node.setAttribute(
            attr,
            attributeValue.replace(regex, value)
          );
        }
      }
      const check = attribute.nodeName || attribute.name;
      if (check.includes("attr.")) {
        node.removeAttribute(check);
      }
    }
  }
  updateNode(node, key, value) {
    const attr = getElementByAttribute(node)[0];
    const attrId = attr ? attr.nodeName || attr.name : null;
    const entry = this.setNode(node, key, value, attrId);
    const protoNode = entry.node;
    let templateStrings = null;
    if (protoNode.outerHTML) {
      templateStrings = protoNode.outerHTML.toString().match(TEMPLATE_BIND_REGEX);
    }
    if (protoNode._nodeValue) {
      templateStrings = protoNode._nodeValue.match(TEMPLATE_BIND_REGEX);
    }
    if (templateStrings == null) {
      return;
    }
    for (let index = 0; index < templateStrings.length; index++) {
      templateStrings[index] = stripTemplateString(templateStrings[index]);
    }
    const matches = filter((str) => str.startsWith(key), templateStrings);
    if (matches.length === 0) {
      return;
    }
    if (isObject(value) || Array.isArray(value)) {
      for (let index = 0; index < matches.length; index++) {
        this.changeNode(
          node,
          templateStrings[index],
          findValueByString(
            value,
            templateStrings[index].substring(
              templateStrings[index].search(DOT_BRACKET_NOTATION_REGEX)
            )
          ),
          protoNode
        );
      }
    } else {
      this.changeNode(node, key, value, protoNode);
    }
  }
  update(key, value) {
    const walk = document.createTreeWalker(
      this.$parent,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode() {
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    while (walk.nextNode()) {
      this.updateNode(walk.currentNode, key, value);
    }
    return this.$parent;
  }
}
class BoundNode {
  constructor(elem) {
    this.$elem = elem;
    this.$tree = new NodeTree(this.$elem);
  }
  update(key, value) {
    if (value == void 0) {
      return;
    }
    this.$tree.update(key, value);
    if (this.$elem.onUpdate) {
      this.$elem.onUpdate();
    }
  }
}
class BoundHandler {
  constructor(obj) {
    this.$parent = obj;
  }
  set(target, key, value) {
    if (value === "undefined") {
      return true;
    }
    const ex = new RegExp(TEMPLATE_BIND_REGEX).exec(value);
    const capturedGroup = ex && ex[2] ? ex[2] : false;
    const change = {
      [key]: {
        previousValue: target[key],
        newValue: value
      }
    };
    if (capturedGroup) {
      if (target.parentNode && target.parentNode.host && target.parentNode.mode === "open") {
        target[key] = findValueByString(target.parentNode.host, capturedGroup);
      } else if (capturedGroup && target.parentNode) {
        target[key] = findValueByString(target.parentNode, capturedGroup);
      }
    } else {
      target[key] = value;
    }
    this.$parent.ɵɵstate[NODE_KEY].update(key, target[key]);
    if (!isNode) {
      this.$parent.ɵɵstate.$changes.dispatchEvent(
        new CustomEvent("change", { detail: change })
      );
    }
    if (this.$parent.onStateChange) {
      this.$parent.onStateChange(change);
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
  setValueByString(this.ɵstate, prop, model);
  this.ɵɵstate[NODE_KEY].update(prop, model);
}
function compileTemplate(elementMeta, target) {
  if (!elementMeta.style) {
    elementMeta.style = [""];
  }
  if (!elementMeta.template) {
    elementMeta.template = [""];
  }
  target.prototype.elementMeta = Object.assign(
    target.elementMeta ? target.elementMeta : {},
    elementMeta
  );
  target.prototype.elementMeta.eventMap = {};
  target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
  target.prototype.bindTemplate = bindTemplate;
  return target;
}
const EMIT_KEY = "$emit";
const LISTEN_KEY = "$listen";
const html = (...args) => {
  return args;
};
const css = (...args) => {
  return args;
};
function Component(meta) {
  if (!meta) {
    console.error("Component must include ElementMeta to compile");
    return;
  }
  return (target) => {
    compileTemplate(meta, target);
    if (meta.autoDefine === void 0) {
      meta.autoDefine = true;
    }
    if (meta.autoDefine === true && customElements.get(meta.selector) === void 0) {
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
function State() {
  return function decorator(target, key) {
    async function bindState() {
      this.$state = this[key]();
      this.ɵɵstate = {};
      this.ɵɵstate[HANDLER_KEY] = new BoundHandler(this);
      this.ɵɵstate[NODE_KEY] = new BoundNode(
        this.shadowRoot ? this.shadowRoot : this
      );
      this.ɵɵstate.$changes = new ReadymadeEventTarget();
      this.ɵstate = new Proxy(
        this.$state,
        this.ɵɵstate["handler" + BIND_SUFFIX]
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
function Emitter(eventName, options, channelName) {
  return function decorator(target) {
    const channel = channelName ? channelName : "default";
    let prop = "";
    if (eventName) {
      prop = EMIT_KEY + channel + eventName;
    } else {
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
      target[prop] = function() {
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
    let prop = "";
    if (channelName) {
      prop = LISTEN_KEY + eventName + channelName;
    } else {
      prop = LISTEN_KEY + eventName;
    }
    function addListener(name, chan) {
      const handler = this[symbolHandler] = (...args) => {
        descriptor.value.apply(this, args);
      };
      if (!this.emitter) {
        this.emitter = new EventDispatcher(this, chan ? chan : null);
      }
      if (!this.elementMeta) {
        this.elementMeta = {
          eventMap: {}
        };
      }
      if (!this.elementMeta.eventMap) {
        this.elementMeta.eventMap = {};
      }
      if (this.elementMeta) {
        this.elementMeta.eventMap[prop] = {
          key: name,
          handler: key
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
  get$(selector) {
    return this.shadowRoot ? this.shadowRoot.querySelector(selector) : this.querySelector(selector);
  }
  getAll$(selector) {
    return this.shadowRoot ? this.shadowRoot.querySelectorAll(selector) : this.querySelectorAll(selector);
  }
  wait$(selector, timeout = 6e4) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const interval = 100;
      const checkForElement = () => {
        const elapsedTime = Date.now() - startTime;
        const root = this.shadowRoot ? this.shadowRoot : this;
        const element = root.querySelector(selector);
        if (element) {
          resolve(element);
        } else if (elapsedTime >= timeout) {
          reject(
            new Error(
              `Element with selector "${selector}" did not appear within ${timeout} milliseconds`
            )
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
  waitAll$(selector, timeout = 6e4) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const interval = 100;
      const checkForElement = () => {
        const elapsedTime = Date.now() - startTime;
        const root = this.shadowRoot ? this.shadowRoot : this;
        const element = root.querySelectorAll(selector);
        if (element && element.length) {
          resolve(element);
        } else if (elapsedTime >= timeout) {
          reject(
            new Error(
              `Elements with selector "${selector}" did not appear within ${timeout} milliseconds`
            )
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
}
class CustomElement extends HTMLElement {
  constructor() {
    var _a, _b;
    super();
    attachShadow(this, {
      mode: ((_a = this.elementMeta) == null ? void 0 : _a.mode) || "open",
      delegatesFocus: ((_b = this.elementMeta) == null ? void 0 : _b.delegatesFocus) || false
    });
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
  get$(selector) {
    return this.shadowRoot ? this.shadowRoot.querySelector(selector) : this.querySelector(selector);
  }
  getAll$(selector) {
    return this.shadowRoot ? this.shadowRoot.querySelectorAll(selector) : this.querySelectorAll(selector);
  }
  wait$(selector, timeout = 6e4) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const interval = 100;
      const checkForElement = () => {
        const elapsedTime = Date.now() - startTime;
        const root = this.shadowRoot ? this.shadowRoot : this;
        const element = root.querySelector(selector);
        if (element) {
          resolve(element);
        } else if (elapsedTime >= timeout) {
          reject(
            new Error(
              `Element with selector "${selector}" did not appear within ${timeout} milliseconds`
            )
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
  waitAll$(selector, timeout = 6e4) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const interval = 100;
      const checkForElement = () => {
        const elapsedTime = Date.now() - startTime;
        const root = this.shadowRoot ? this.shadowRoot : this;
        const element = root.querySelectorAll(selector);
        if (element && element.length) {
          resolve(element);
        } else if (elapsedTime >= timeout) {
          reject(
            new Error(
              `Elements with selector "${selector}" did not appear within ${timeout} milliseconds`
            )
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
}
class FormElement extends CustomElement {
  static get formAssociated() {
    return true;
  }
  constructor() {
    super();
    this.$internals = this.attachInternals();
  }
}
export {
  Component as C,
  DOT_BRACKET_NOTATION_REGEX as D,
  Emitter as E,
  FormElement as F,
  Listen as L,
  PseudoElement as P,
  State as S,
  CustomElement as a,
  attachDOM as b,
  css as c,
  attachStyle as d,
  getElementIndex as e,
  findValueByString as f,
  getSiblings as g,
  html as h,
  isObject as i,
  stripTemplateString as s,
  templateId as t,
  uuidv4 as u
};
