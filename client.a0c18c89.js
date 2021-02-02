// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"JFTA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

class Router {
  constructor(root, routes) {
    if (document.querySelector(root) === null) {
      console.error("[Router] Root element '".concat(root, "' does not exist."));
    }

    if (!routes) {
      console.error("[Router] initialized without any routes.");
    }

    this.rootElement = document.querySelector(root);
    this.routes = routes;
    this.listen();
  }

  init() {
    this.onLocationChange();
  }

  listen() {
    if (this.isPushState()) {
      window.addEventListener('popstate', this.onLocationChange.bind(this));
    } else if (this.isHashChange()) {
      window.addEventListener('hashchange', this.onLocationChange.bind(this));
    }

    this.init();
  }

  onLocationChange() {
    let path = window.location.pathname.replace(/\/$/, '');

    if (path === '') {
      path = '/';
    }

    if (this.matchRoute(path)) {
      this.navigate(path);
    }
  }

  decodeQuery() {
    if (location.search.length === 0) {
      return {};
    }

    const search = location.search.substring(1);
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
  }

  parseQuery(route) {
    return new URLSearchParams(route.queryParams);
  }

  matchRoute(path) {
    return this.routes.find(route => route.path === path);
  }

  navigate(path) {
    const route = this.matchRoute(path);

    if (!route) {
      console.error("[Router] Route '".concat(path, "' does not exist."));
      return;
    }

    this.resolve(route);
  }

  resolve(route) {
    const locationParams = this.decodeQuery();
    const component = document.createElement(route.component);

    if (Object.keys(locationParams).length) {
      route.queryParams = locationParams;
    } else if (route.queryParams) {
      window.history.replaceState({}, '', "".concat(location.pathname, "?").concat(this.parseQuery(route)));
    }

    if (route.title) {
      document.title = route.title;
    }

    if (route.description) {
      const description = document.querySelector('meta[name="description"]');

      if (description) {
        description.setAttribute('content', route.description);
      }
    }

    if (route.schema) {
      const script = document.querySelector('[type="application/ld+json"]');

      if (script) {
        script.innerHTML = route.schema;
      }
    }

    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(component);
    this.currentRoute = route;

    if (component.onNavigate) {
      component.onNavigate(this.currentRoute);
    }
  }

  isHashChange() {
    return typeof window !== 'undefined' && 'onhashchange' in window;
  }

  isPushState() {
    return !!(typeof window !== 'undefined' && window.history && window.history.pushState);
  }

}

exports.Router = Router;
},{}],"AwGU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _client = require("./client");

Object.keys(_client).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _client[key];
    }
  });
});
},{"./client":"JFTA"}],"J0eU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Router", {
  enumerable: true,
  get: function () {
    return _router.Router;
  }
});
exports.routing = void 0;

var _router = require("../../modules/router");

const routing = [{
  path: '/',
  component: 'app-home',
  title: 'Readymade'
}, {
  path: '/test',
  component: 'app-testbed',
  title: 'Readymade Test Page'
}, {
  path: '/perf',
  component: 'app-perftest',
  title: 'Readymade Performance Test'
}, {
  path: '/router',
  component: 'app-query',
  queryParams: {
    contentType: 'post',
    page: '1',
    header: '1'
  },
  title: 'Readymade Router Test'
}];
exports.routing = routing;
},{"../../modules/router":"AwGU"}],"ZjNa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadymadeEventTarget = exports.EventDispatcher = void 0;

// events
class ReadymadeEventTarget extends EventTarget {}

exports.ReadymadeEventTarget = ReadymadeEventTarget;

class EventDispatcher {
  constructor(context, channelName) {
    this.target = context;
    this.channels = {
      default: new BroadcastChannel('default')
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
      type: ev.type
    };
    name ? this.channels[name].postMessage(evt) : this.channels.default.postMessage(evt);
  }

  setChannel(name) {
    this.channels[name] = new BroadcastChannel(name);

    this.channels[name].onmessage = ev => {
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

exports.EventDispatcher = EventDispatcher;
},{}],"gqNY":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachDOM = attachDOM;
exports.attachStyle = attachStyle;
exports.attachShadow = attachShadow;
exports.define = define;

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
  const id = "".concat(instance.elementMeta.selector);

  if (!document.getElementById("".concat(id, "-x"))) {
    const t = document.createElement('style');
    t.setAttribute('id', "".concat(id, "-x"));
    t.innerText = instance.elementMeta.style;
    t.innerText = t.innerText.replace(/:host/gi, "[is=".concat(id, "]"));
    document.head.appendChild(t);
  }
}

function define(instance, meta) {
  if (meta.autoDefine === true) {
    if (meta.selector && !meta.custom) {
      customElements.define(meta.selector, instance.contructor);
    } else if (meta.selector && meta.custom) {
      customElements.define(meta.selector, instance.contructor, meta.custom);
    } else {
      customElements.define(meta.selector, instance.contructor);
    }
  }
}
},{}],"rH1J":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"cttP":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParent = getParent;
exports.getChildNodes = getChildNodes;
exports.getSiblings = getSiblings;
exports.querySelector = querySelector;
exports.querySelectorAll = querySelectorAll;
exports.getElementIndex = getElementIndex;
exports.isNode = exports.isBrowser = void 0;

function getParent(el) {
  return el.parentNode;
}

function getChildNodes(template) {
  const elem = template ? template : this;

  if (!elem) {
    return [];
  }

  function getChildren(node) {
    let path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    let result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

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
  return Array.from(getParent(el).children).filter(elem => {
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

const isNode = typeof process !== undefined && process.versions != null && process.versions.node != null;
exports.isNode = isNode;
const isBrowser = typeof window !== undefined && typeof window.document !== undefined;
exports.isBrowser = isBrowser;
},{"process":"rH1J"}],"ZUwi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setValueByString = setValueByString;
exports.templateId = templateId;
exports.uuidv4 = uuidv4;
exports.stripKey = stripKey;
exports.stripTemplateString = stripTemplateString;
exports.templateRegExp = templateRegExp;
exports.bindTemplate = bindTemplate;
exports.compileTemplate = compileTemplate;
exports.getTextNodesByContent = getTextNodesByContent;
exports.getElementByAttribute = getElementByAttribute;
exports.setState = setState;
exports.BoundNode = exports.BoundHandler = exports.findValueByString = exports.isObject = exports.HANDLER_KEY = exports.NODE_KEY = exports.BIND_SUFFIX = exports.TEMPLATE_END_REGEX = exports.TEMPLATE_START_REGEX = exports.BRACKET_END_REGEX = exports.BRACKET_START_REGEX = exports.TEMPLATE_BIND_REGEX = exports.DOT_BRACKET_NOTATION_REGEX = exports.ARRAY_REGEX = exports.STRING_DOT_REGEX = exports.STRING_VALUE_REGEX = void 0;

var _util = require("./util");

const STRING_VALUE_REGEX = /\[(\w+)\]/g;
exports.STRING_VALUE_REGEX = STRING_VALUE_REGEX;
const STRING_DOT_REGEX = /^\./;
exports.STRING_DOT_REGEX = STRING_DOT_REGEX;
const ARRAY_REGEX = /(\[)(.*)(\])/;
exports.ARRAY_REGEX = ARRAY_REGEX;
const DOT_BRACKET_NOTATION_REGEX = /\.|\[[0-9]*\]|(?:\['|'\])/g;
exports.DOT_BRACKET_NOTATION_REGEX = DOT_BRACKET_NOTATION_REGEX;
const TEMPLATE_BIND_REGEX = /\{\{\s*(.*?)\s*\}\}/g;
exports.TEMPLATE_BIND_REGEX = TEMPLATE_BIND_REGEX;
const BRACKET_START_REGEX = /\[/g;
exports.BRACKET_START_REGEX = BRACKET_START_REGEX;
const BRACKET_END_REGEX = /\]/g;
exports.BRACKET_END_REGEX = BRACKET_END_REGEX;
const TEMPLATE_START_REGEX = /\{\{\s?/g;
exports.TEMPLATE_START_REGEX = TEMPLATE_START_REGEX;
const TEMPLATE_END_REGEX = /\s?\}\}/g;
exports.TEMPLATE_END_REGEX = TEMPLATE_END_REGEX;
const BIND_SUFFIX = '__state';
exports.BIND_SUFFIX = BIND_SUFFIX;
const NODE_KEY = 'node' + BIND_SUFFIX;
exports.NODE_KEY = NODE_KEY;
const HANDLER_KEY = 'handler' + BIND_SUFFIX;
exports.HANDLER_KEY = HANDLER_KEY;

const isObject = function isObject(val) {
  if (val === null) {
    return false;
  }

  return typeof val === 'function' || typeof val === 'object';
};

exports.isObject = isObject;

const findValueByString = function findValueByString(o, s) {
  s = s.replace(STRING_VALUE_REGEX, '.$1');
  s = s.replace(STRING_DOT_REGEX, '');
  const a = s.split(DOT_BRACKET_NOTATION_REGEX).filter(s => s.length > 0);

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

exports.findValueByString = findValueByString;

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
  let str = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  while (str.length < 3) {
    str += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return str;
}
/* tslint:disable */


function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(24);
  });
}
/* tslint:enable */


function stripKey(key) {
  key = key.replace(BRACKET_START_REGEX, "\\[");
  key = key.replace(BRACKET_END_REGEX, "\\]");
  return key;
}

function stripTemplateString(key) {
  key = key.replace(TEMPLATE_START_REGEX, "");
  key = key.replace(TEMPLATE_END_REGEX, "");
  return key;
}

function templateRegExp(key) {
  return new RegExp("\\{\\{\\s*(".concat(key, ")\\s*\\}\\}"), 'g');
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

  let matches = [];

  for (let i = 0; i < node.attributes.length; i++) {
    if (/[A-Za-z0-9]{3}-[A-Za-z0-9]{6}/gm.test(node.attributes[i].nodeName || node.attributes[i].name)) {
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

    const id = attrID ? attrID : this.$parentId + '-' + uuidv4().slice(0, 6);
    const clone = node.cloneNode(true);

    if (!node.setAttribute) {
      // tslint:disable-next-line: only-arrow-functions, no-empty
      node.setAttribute = function (i, v) {};
    }

    node.setAttribute(id, '');

    if (!clone.setAttribute) {
      // tslint:disable-next-line: only-arrow-functions, no-empty
      clone.setAttribute = function (i, v) {};
    }

    clone.setAttribute(id, '');
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
          node.textContent = protoNode.textContent.replace(regex, value);
        }
      }
    }

    if (protoNode.attributes.length === 1) {
      return;
    }

    let attr = '';

    for (const attribute of protoNode.attributes) {
      attr = attribute.nodeName || attribute.name;

      if (attr.includes('attr.')) {
        if (!protoNode.getAttribute(attr.replace('attr.', ''))) {
          if (attribute.nodeName) {
            attr = attribute.nodeName.replace('attr.', '');
          } else if (attribute.name) {
            attr = attribute.name.replace('attr.', '');
          }

          if (!protoNode.setAttribute) {
            // tslint:disable-next-line: only-arrow-functions, no-empty
            protoNode.setAttribute = function (i, v) {};
          }

          protoNode.setAttribute(attr, attribute.nodeValue.replace(TEMPLATE_BIND_REGEX, ''));
          const remove = attribute.nodeName || attribute.name;
          node.removeAttribute(remove);
        }
      }

      const attributeValue = attribute.nodeValue || attribute.value;

      if (attributeValue.match(regex, 'gi')) {
        if (node.getAttribute(attr) !== value) {
          if (!node.setAttribute) {
            // tslint:disable-next-line: only-arrow-functions, no-empty
            node.setAttribute = function (i, v) {};
          }

          node.setAttribute(attr, attributeValue.replace(regex, value));
        }
      }

      const check = attribute.nodeName || attribute.name;

      if (check.includes('attr.')) {
        node.removeAttribute(check);
      }
    }
  }

  updateNode(node, key, value) {
    const attr = getElementByAttribute(node)[0];
    const attrId = attr ? attr.nodeName || attr.name : null;
    let entry = this.setNode(node, key, value, attrId);
    let protoNode = entry.node;
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

    let matches = filter(str => str.startsWith(key), templateStrings);

    if (matches.length === 0) {
      return;
    }

    if (isObject(value) || Array.isArray(value)) {
      for (let index = 0; index < matches.length; index++) {
        this.changeNode(node, templateStrings[index], findValueByString(value, templateStrings[index].substring(templateStrings[index].search(DOT_BRACKET_NOTATION_REGEX))), protoNode);
      }
    } else {
      this.changeNode(node, key, value, protoNode);
    }
  }

  update(key, value) {
    const walk = document.createTreeWalker(this.$parent, NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        return NodeFilter.FILTER_ACCEPT;
      }

    }, false);

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
    if (value == undefined) {
      return;
    }

    this.$tree.update(key, value);

    if (this.$elem.onUpdate) {
      this.$elem.onUpdate();
    }
  }

}

exports.BoundNode = BoundNode;

class BoundHandler {
  constructor(obj) {
    this.$parent = obj;
  }

  set(target, key, value) {
    if (value === 'undefined') {
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
      if (target.parentNode && target.parentNode.host && target.parentNode.mode === 'open') {
        target[key] = findValueByString(target.parentNode.host, capturedGroup);
      } else if (capturedGroup && target.parentNode) {
        target[key] = findValueByString(target.parentNode, capturedGroup);
      }
    } else {
      target[key] = value;
    }

    this.$parent.ɵɵstate[NODE_KEY].update(key, target[key]);

    if (!_util.isNode) {
      this.$parent.ɵɵstate.$changes.dispatchEvent(new CustomEvent('change', {
        detail: change
      }));
    }

    if (this.$parent.onStateChange) {
      this.$parent.onStateChange(change);
    }

    return true;
  }

}

exports.BoundHandler = BoundHandler;

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
    elementMeta.style = '';
  }

  if (!elementMeta.template) {
    elementMeta.template = '';
  }

  target.prototype.elementMeta = Object.assign(target.elementMeta ? target.elementMeta : {}, elementMeta);
  target.prototype.elementMeta.eventMap = {};
  target.prototype.template = "<style>".concat(elementMeta.style, "</style>").concat(elementMeta.template);
  target.prototype.bindTemplate = bindTemplate;
}
},{"./util":"cttP"}],"isQ4":[function(require,module,exports) {
var define;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "attachDOM", {
  enumerable: true,
  get: function () {
    return _attach.attachDOM;
  }
});
Object.defineProperty(exports, "attachShadow", {
  enumerable: true,
  get: function () {
    return _attach.attachShadow;
  }
});
Object.defineProperty(exports, "attachStyle", {
  enumerable: true,
  get: function () {
    return _attach.attachStyle;
  }
});
Object.defineProperty(exports, "define", {
  enumerable: true,
  get: function () {
    return _attach.define;
  }
});
Object.defineProperty(exports, "bindTemplate", {
  enumerable: true,
  get: function () {
    return _compile.bindTemplate;
  }
});
Object.defineProperty(exports, "compileTemplate", {
  enumerable: true,
  get: function () {
    return _compile.compileTemplate;
  }
});
Object.defineProperty(exports, "templateId", {
  enumerable: true,
  get: function () {
    return _compile.templateId;
  }
});
Object.defineProperty(exports, "uuidv4", {
  enumerable: true,
  get: function () {
    return _compile.uuidv4;
  }
});
Object.defineProperty(exports, "getSiblings", {
  enumerable: true,
  get: function () {
    return _util.getSiblings;
  }
});
Object.defineProperty(exports, "getElementIndex", {
  enumerable: true,
  get: function () {
    return _util.getElementIndex;
  }
});
Object.defineProperty(exports, "getParent", {
  enumerable: true,
  get: function () {
    return _util.getParent;
  }
});
Object.defineProperty(exports, "querySelector", {
  enumerable: true,
  get: function () {
    return _util.querySelector;
  }
});
Object.defineProperty(exports, "querySelectorAll", {
  enumerable: true,
  get: function () {
    return _util.querySelectorAll;
  }
});
Object.defineProperty(exports, "getChildNodes", {
  enumerable: true,
  get: function () {
    return _util.getChildNodes;
  }
});

var _attach = require("./src/attach");

var _compile = require("./src/compile");

var _util = require("./src/util");
},{"./src/attach":"gqNY","./src/compile":"ZUwi","./src/util":"cttP"}],"zVU0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = Component;
exports.State = State;
exports.Emitter = Emitter;
exports.Listen = Listen;
exports.noop = exports.css = exports.html = exports.LISTEN_KEY = exports.EMIT_KEY = void 0;

var _compile = require("../element/src/compile");

var _element = require("./../element");

var _event = require("./../event");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const EMIT_KEY = '$emit';
exports.EMIT_KEY = EMIT_KEY;
const LISTEN_KEY = '$listen';
exports.LISTEN_KEY = LISTEN_KEY;

const html = function html() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args;
};

exports.html = html;

const css = function css() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return args;
}; // tslint:disable-next-line


exports.css = css;

const noop = () => {}; // Decorators


exports.noop = noop;

function Component(meta) {
  if (!meta) {
    console.error('Component must include ElementMeta to compile');
    return;
  }

  return target => {
    (0, _element.compileTemplate)(meta, target);

    if (meta.autoDefine === undefined) {
      meta.autoDefine = true;
    }

    if (meta.autoDefine === true && customElements.get(meta.selector) === undefined) {
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

function State(property) {
  return function decorator(target, key, descriptor) {
    function bindState() {
      return __awaiter(this, void 0, void 0, function* () {
        this.$state = this[key]();
        this.ɵɵstate = {};
        this.ɵɵstate[_compile.HANDLER_KEY] = new _compile.BoundHandler(this);
        this.ɵɵstate[_compile.NODE_KEY] = new _compile.BoundNode(this.shadowRoot ? this.shadowRoot : this);
        this.ɵɵstate.$changes = new _event.ReadymadeEventTarget();
        this.ɵstate = new Proxy(this.$state, this.ɵɵstate['handler' + _compile.BIND_SUFFIX]);

        for (const prop in this.$state) {
          this.ɵstate[prop] = this.$state[prop];
        }
      });
    }

    target.setState = _compile.setState;

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
    } else {
      prop = EMIT_KEY + channel;
    }

    function addEvent(name, chan) {
      if (!this.emitter) {
        this.emitter = new _event.EventDispatcher(this, chan);
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
    } else {
      prop = LISTEN_KEY + eventName;
    }

    function addListener(name, chan) {
      var _this = this;

      const handler = this[symbolHandler] = function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        descriptor.value.apply(_this, args);
      };

      if (!this.emitter) {
        this.emitter = new _event.EventDispatcher(this, chan ? chan : null);
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
},{"../element/src/compile":"ZUwi","./../element":"isQ4","./../event":"ZjNa"}],"jIwh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindListeners = bindListeners;
exports.bindEmitters = bindEmitters;
exports.CustomElement = exports.PseudoElement = exports.StructuralElement = void 0;

var _decorator = require("../decorator");

var _element = require("../element");

function bindListeners(target) {
  for (const prop in target) {
    if (prop.includes(_decorator.LISTEN_KEY)) {
      this[prop].onListener.call(this);
    }
  }
}

function bindEmitters(target) {
  for (const prop in target) {
    if (prop.includes(_decorator.EMIT_KEY)) {
      target[prop].call(target);
    }
  }
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

exports.StructuralElement = StructuralElement;

class PseudoElement extends HTMLElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.PseudoElement = PseudoElement;

class CustomElement extends HTMLElement {
  constructor() {
    super();
    (0, _element.attachShadow)(this, {
      mode: this.elementMeta.mode || 'open'
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

}

exports.CustomElement = CustomElement;
},{"../decorator":"zVU0","../element":"isQ4"}],"yJpC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _event = require("./event");

Object.keys(_event).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _event[key];
    }
  });
});

var _element = require("./element");

Object.keys(_element).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _element[key];
    }
  });
});

var _decorator = require("./decorator");

Object.keys(_decorator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _decorator[key];
    }
  });
});

var _component = require("./component");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _component[key];
    }
  });
});
},{"./event":"ZjNa","./element":"isQ4","./decorator":"zVU0","./component":"jIwh"}],"xcLx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoComponent = exports.UnknownComponent = exports.UListComponent = exports.TrackComponent = exports.TitleComponent = exports.TimeComponent = exports.TemplateComponent = exports.TableSectionComponent = exports.TableRowComponent = exports.TableComponent = exports.TableColComponent = exports.TableCellComponent = exports.TableCaptionComponent = exports.StyleComponent = exports.SpanComponent = exports.SourceComponent = exports.SlotComponent = exports.SelectComponent = exports.ScriptComponent = exports.QuoteComponent = exports.ProgressComponent = exports.PreComponent = exports.PictureComponent = exports.ParamComponent = exports.ParagraphComponent = exports.OutputComponent = exports.OptionsCollectionComponent = exports.OptionComponent = exports.OptGroupComponent = exports.ObjectComponent = exports.OListComponent = exports.ModComponent = exports.MeterComponent = exports.MetaComponent = exports.MenuComponent = exports.MediaComponent = exports.MapComponent = exports.LinkComponent = exports.LegendComponent = exports.LabelComponent = exports.LIComponent = exports.InputComponent = exports.ImageComponent = exports.IFrameComponent = exports.HtmlComponent = exports.HeadingComponent = exports.HeadComponent = exports.HRComponent = exports.FormComponent = exports.FormControlsComponent = exports.FieldSetComponent = exports.EmbedComponent = exports.DivComponent = exports.DetailsComponent = exports.DataComponent = exports.DListComponent = exports.CollectionComponent = exports.CanvasComponent = exports.ButtonComponent = exports.BodyComponent = exports.BRComponent = exports.AudioComponent = exports.AreaComponent = exports.AnchorComponent = exports.AllCollectionComponent = void 0;

var _element = require("../../core/element");

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

exports.AllCollectionComponent = AllCollectionComponent;

class AnchorComponent extends HTMLAnchorElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.AnchorComponent = AnchorComponent;

class AreaComponent extends HTMLAreaElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.AreaComponent = AreaComponent;

class AudioComponent extends HTMLAudioElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.AudioComponent = AudioComponent;

class BRComponent extends HTMLBRElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.BRComponent = BRComponent;

class BodyComponent extends HTMLBodyElement {
  constructor() {
    super();
    (0, _element.attachShadow)(this, {
      mode: this.elementMeta.mode || 'open'
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

}

exports.BodyComponent = BodyComponent;

class ButtonComponent extends HTMLButtonElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.ButtonComponent = ButtonComponent;

class CanvasComponent extends HTMLCanvasElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.CanvasComponent = CanvasComponent;

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

exports.CollectionComponent = CollectionComponent;

class DListComponent extends HTMLDListElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.DListComponent = DListComponent;

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

exports.DataComponent = DataComponent;

class DetailsComponent extends HTMLDetailsElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.DetailsComponent = DetailsComponent;

class DivComponent extends HTMLDivElement {
  constructor() {
    super();
    (0, _element.attachShadow)(this, {
      mode: this.elementMeta.mode || 'open'
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

}

exports.DivComponent = DivComponent;

class EmbedComponent extends HTMLEmbedElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.EmbedComponent = EmbedComponent;

class FieldSetComponent extends HTMLFieldSetElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.FieldSetComponent = FieldSetComponent;

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

exports.FormControlsComponent = FormControlsComponent;

class FormComponent extends HTMLFormElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.FormComponent = FormComponent;

class HRComponent extends HTMLHRElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.HRComponent = HRComponent;

class HeadComponent extends HTMLHeadElement {
  constructor() {
    super();

    if (this.onInit) {
      this.onInit();
    }
  }

}

exports.HeadComponent = HeadComponent;

class HeadingComponent extends HTMLHeadingElement {
  constructor() {
    super();
    (0, _element.attachShadow)(this, {
      mode: this.elementMeta.mode || 'open'
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

}

exports.HeadingComponent = HeadingComponent;

class HtmlComponent extends HTMLHtmlElement {
  constructor() {
    super();

    if (this.onInit) {
      this.onInit();
    }
  }

}

exports.HtmlComponent = HtmlComponent;

class IFrameComponent extends HTMLIFrameElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.IFrameComponent = IFrameComponent;

class ImageComponent extends HTMLImageElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.ImageComponent = ImageComponent;

class InputComponent extends HTMLInputElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.InputComponent = InputComponent;

class LIComponent extends HTMLLIElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.LIComponent = LIComponent;

class LabelComponent extends HTMLLabelElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.LabelComponent = LabelComponent;

class LegendComponent extends HTMLLegendElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.LegendComponent = LegendComponent;

class LinkComponent extends HTMLLinkElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.LinkComponent = LinkComponent;

class MapComponent extends HTMLMapElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.MapComponent = MapComponent;

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

exports.MediaComponent = MediaComponent;

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

exports.MenuComponent = MenuComponent;

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

exports.MetaComponent = MetaComponent;

class MeterComponent extends HTMLMeterElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.MeterComponent = MeterComponent;

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

exports.ModComponent = ModComponent;

class OListComponent extends HTMLOListElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.OListComponent = OListComponent;

class ObjectComponent extends HTMLObjectElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.ObjectComponent = ObjectComponent;

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

exports.OptGroupComponent = OptGroupComponent;

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

exports.OptionComponent = OptionComponent;

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

exports.OptionsCollectionComponent = OptionsCollectionComponent;

class OutputComponent extends HTMLOutputElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.OutputComponent = OutputComponent;

class ParagraphComponent extends HTMLParagraphElement {
  constructor() {
    super();
    (0, _element.attachShadow)(this, {
      mode: this.elementMeta.mode || 'open'
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

}

exports.ParagraphComponent = ParagraphComponent;

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

exports.ParamComponent = ParamComponent;

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

exports.PictureComponent = PictureComponent;

class PreComponent extends HTMLPreElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.PreComponent = PreComponent;

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

exports.ProgressComponent = ProgressComponent;

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

exports.QuoteComponent = QuoteComponent;

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

exports.ScriptComponent = ScriptComponent;

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

exports.SelectComponent = SelectComponent;

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

exports.SlotComponent = SlotComponent;

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

exports.SourceComponent = SourceComponent;

class SpanComponent extends HTMLSpanElement {
  constructor() {
    super();
    (0, _element.attachShadow)(this, {
      mode: this.elementMeta.mode || 'open'
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

}

exports.SpanComponent = SpanComponent;

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

exports.StyleComponent = StyleComponent;

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

exports.TableCaptionComponent = TableCaptionComponent;

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

exports.TableCellComponent = TableCellComponent;

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

exports.TableColComponent = TableColComponent;

class TableComponent extends HTMLTableElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.TableComponent = TableComponent;

class TableRowComponent extends HTMLTableRowElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.TableRowComponent = TableRowComponent;

class TableSectionComponent extends HTMLTableSectionElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.TableSectionComponent = TableSectionComponent;

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

exports.TemplateComponent = TemplateComponent;

class TimeComponent extends HTMLTimeElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.TimeComponent = TimeComponent;

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

exports.TitleComponent = TitleComponent;

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

exports.TrackComponent = TrackComponent;

class UListComponent extends HTMLUListElement {
  constructor() {
    super();
    (0, _element.attachDOM)(this);
    (0, _element.attachStyle)(this);

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

exports.UListComponent = UListComponent;

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

exports.UnknownComponent = UnknownComponent;

class VideoComponent extends HTMLVideoElement {
  constructor() {
    super();
    (0, _element.attachStyle)(this);

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

exports.VideoComponent = VideoComponent;
},{"../../core/element":"isQ4"}],"UBvq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repeater = exports.TemplateRepeater = void 0;

var _core = require("../../core");

var _compile = require("../../core/element/src/compile");

var _custom = require("../custom");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function changeNode(protoNode, key, value) {
  const node = document.importNode(protoNode, true);
  let attr = '';
  node.removeAttribute('repeat');

  if (protoNode.textContent.startsWith("{{".concat(key))) {
    const path = (0, _compile.stripTemplateString)(protoNode.textContent);
    const template = path.substring(path.search(_compile.DOT_BRACKET_NOTATION_REGEX));
    node.textContent = protoNode.textContent.replace(protoNode.textContent, (0, _compile.isObject)(value) ? (0, _compile.findValueByString)(value, template) : value);
  }

  for (const attribute of protoNode.attributes) {
    attr = attribute.nodeName || attribute.name;

    if (attr !== 'repeat') {
      if (attr.includes('attr.')) {
        if (!protoNode.getAttribute(attr.replace('attr.', ''))) {
          if (attribute.nodeName) {
            attr = attribute.nodeName.replace('attr.', '');
          } else if (attribute.name) {
            attr = attribute.name.replace('attr.', '');
          }

          if (!protoNode.setAttribute) {
            node.setAttribute = () => {};
          }

          const path = (0, _compile.stripTemplateString)(attribute.nodeValue);
          const template = path.substring(path.search(_compile.DOT_BRACKET_NOTATION_REGEX));
          protoNode.setAttribute(attr, (0, _compile.isObject)(value) ? (0, _compile.findValueByString)(value, template) : value);
          const remove = attribute.nodeName || attribute.name;
          node.removeAttribute(remove);
        }
      }

      const attributeValue = attribute.nodeValue || attribute.value;

      if (attributeValue.startsWith("{{".concat(key))) {
        if (!node.setAttribute) {
          node.setAttribute = () => {};
        }

        const path = (0, _compile.stripTemplateString)(attributeValue);
        const template = path.substring(path.search(_compile.DOT_BRACKET_NOTATION_REGEX));
        node.setAttribute(attr, attributeValue.replace(attributeValue, (0, _compile.isObject)(value) ? (0, _compile.findValueByString)(value, template) : value));
      }

      const check = attribute.nodeName || attribute.name;

      if (check.includes('attr.')) {
        node.removeAttribute(check);
      }
    }
  }

  protoNode.parentNode.appendChild(node);
}

function renderTemplate(elem, template, items, previousNode) {
  if (!elem.parentNode) {
    return;
  }

  const bound = items.match(/(\w*)(?:\s)(?:of)(?:\s)(.*)/);

  if (!bound.length) {
    return;
  }

  const clone = template.content.cloneNode(true);
  const protoNode = clone.querySelector("[repeat=\"".concat(bound[1], "\"]"));
  let $elem = elem;
  let model;

  for (; $elem && $elem !== document; $elem = $elem.parentNode) {
    if ($elem.host && $elem.host.$state && $elem.host.$state[bound[2]]) {
      model = JSON.parse($elem.host.$state[bound[2]]);
      elem.$key = bound[2];
      $elem.host.ɵɵstate.$changes.addEventListener('change', ev => {
        elem.onChange(ev.detail);
      });
    } else if ($elem.$state && $elem.$state[bound[2]]) {
      model = JSON.parse($elem.$state[bound[2]]);
      elem.$key = bound[2];
      $elem.ɵɵstate.$changes.addEventListener('change', ev => {
        elem.onChange(ev.detail);
      });
    }
  }

  if (!model) {
    return;
  }

  if (Array.isArray(model)) {
    for (let index = 0; index < model.length; index++) {
      changeNode(protoNode, bound[1], model[index]);
    }
  }

  protoNode.parentNode.removeChild(protoNode);

  if (elem instanceof Repeater || elem.constructor.name === 'Repeater') {
    elem.appendChild(clone);
  } else if (elem instanceof TemplateRepeater || elem.constructor.name === 'TemplateRepeater') {
    const div = document.createElement('div');
    div.appendChild(clone);
    div.setAttribute('target', elem.$id);

    if (previousNode) {
      elem.parentNode.replaceChild(div, previousNode);
    } else {
      elem.parentNode.appendChild(div);
    }
  }
}

let TemplateRepeater = class TemplateRepeater extends _custom.TemplateComponent {
  constructor() {
    super();
    this.$id = (0, _core.templateId)() + (0, _core.uuidv4)().slice(0, 6);
  }

  static get observedAttributes() {
    return ['items'];
  }

  attributeChangedCallback(name) {
    switch (name) {
      case 'items':
        this.render();
        break;
    }
  }

  remove() {
    if (!this.parentNode) {
      return null;
    }

    return this.parentNode.querySelector("[target=\"".concat(this.$id, "\"]"));
  }

  render() {
    const previousTarget = this.remove();
    renderTemplate(this, this, this.getAttribute('items'), previousTarget);
  }

  onChange(change) {
    if (change[this.$key]) {
      this.render();
    }
  }

};
exports.TemplateRepeater = TemplateRepeater;
exports.TemplateRepeater = TemplateRepeater = __decorate([(0, _core.Component)({
  selector: 'r-repeat',
  custom: {
    extends: 'template'
  }
})], TemplateRepeater);
let Repeater = class Repeater extends _core.PseudoElement {
  constructor() {
    super();
    this.$id = (0, _core.templateId)() + (0, _core.uuidv4)().slice(0, 6);
  }

  static get observedAttributes() {
    return ['items', 'template'];
  }

  attributeChangedCallback(name, prev, next) {
    switch (name) {
      case 'template':
        this.setTemplate(next);
        break;

      case 'items':
        this.render();
        break;
    }
  }

  remove() {
    this.innerHTML = '';
  }

  render() {
    const template = document.querySelector("[id=\"".concat(this.$templateId, "\"]"));

    if (template) {
      this.remove();
      renderTemplate(this, template, this.getAttribute('items'));
    }
  }

  onChange(change) {
    if (change[this.$key]) {
      this.render();
    }
  }

  setTemplate(id) {
    this.$templateId = id;
    this.render();
  }

};
exports.Repeater = Repeater;
exports.Repeater = Repeater = __decorate([(0, _core.Component)({
  selector: 'r-repeatr'
})], Repeater);
},{"../../core":"yJpC","../../core/element/src/compile":"ZUwi","../custom":"xcLx"}],"ezFA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _custom = require("./custom");

Object.keys(_custom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _custom[key];
    }
  });
});

var _repeatr = require("./repeatr");

Object.keys(_repeatr).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _repeatr[key];
    }
  });
});
},{"./custom":"xcLx","./repeatr":"UBvq"}],"WwiA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyButtonComponent = exports.ButtonState = void 0;

var _core = require("./../../../modules/core");

var _dom = require("./../../../modules/dom");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <span>{{model}}</span>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      background: rgba(24, 24, 24, 1);\n      cursor: pointer;\n      color: white;\n      font-weight: 400;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class ButtonState {
  constructor() {
    this.model = 'Click';
  }

}

exports.ButtonState = ButtonState;
let MyButtonComponent = class MyButtonComponent extends _dom.ButtonComponent {
  constructor() {
    super();
  }

  getState() {
    return new ButtonState();
  }

  onClick(event) {
    this.emitter.broadcast('bang');
  }

  onKeyUp(event) {
    if (event.key === 'Enter') {
      this.emitter.broadcast('bang');
    }
  }

};
exports.MyButtonComponent = MyButtonComponent;

__decorate([(0, _core.State)()], MyButtonComponent.prototype, "getState", null);

__decorate([(0, _core.Emitter)('bang', {
  bubbles: true,
  composed: true
}), (0, _core.Listen)('click')], MyButtonComponent.prototype, "onClick", null);

__decorate([(0, _core.Listen)('keyup')], MyButtonComponent.prototype, "onKeyUp", null);

exports.MyButtonComponent = MyButtonComponent = __decorate([(0, _core.Component)({
  selector: 'my-button',
  custom: {
    extends: 'button'
  },
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], MyButtonComponent);
},{"./../../../modules/core":"yJpC","./../../../modules/dom":"ezFA"}],"sxN8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RCodeComponent = exports.CodeState = void 0;

var _core = require("./../../../modules/core");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <pre class=\"language-{{type}}\"><code class=\"language-{{type}}\"></code></pre>\n    <slot hidden></slot>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      display: block;\n      padding-top: 1em;\n      padding-bottom: 1em;\n    }\n    code[class*='language-'],\n    pre[class*='language-'] {\n      -moz-tab-size: 2;\n      -o-tab-size: 2;\n      tab-size: 2;\n      -webkit-hyphens: none;\n      -moz-hyphens: none;\n      -ms-hyphens: none;\n      hyphens: none;\n      white-space: pre;\n      white-space: pre-wrap;\n      word-wrap: normal;\n      font-family: 'Source Code Pro', 'Courier New', monospace;\n      font-size: 14px;\n      font-weight: 500;\n      color: #e0e2e4;\n      text-shadow: none;\n    }\n    ::selection {\n      background: #ff7de9; /* WebKit/Blink Browsers */\n    }\n    ::-moz-selection {\n      background: #ff7de9; /* Gecko Browsers */\n    }\n    pre[class*='language-'],\n    :not(pre) > code[class*='language-'] {\n      background: #0e1014;\n    }\n    pre[class*='language-'] {\n      padding: 15px;\n      border-radius: 4px;\n      border: 1px solid #0e1014;\n      overflow: auto;\n    }\n\n    pre[class*='language-'] {\n      position: relative;\n    }\n    pre[class*='language-'] code {\n      white-space: pre;\n      display: block;\n    }\n\n    :not(pre) > code[class*='language-'] {\n      padding: 0.2em 0.2em;\n      border-radius: 0.3em;\n      border: 0.13em solid #7a6652;\n      box-shadow: 1px 1px 0.3em -0.1em #000 inset;\n    }\n    .token.namespace {\n      opacity: 0.7;\n    }\n    .token.function {\n      color: rgba(117, 191, 255, 1);\n    }\n    .token.class-name {\n      color: #e0e2e4;\n    }\n    .token.comment,\n    .token.prolog,\n    .token.doctype,\n    .token.cdata {\n      color: #208c9a;\n    }\n    .token.operator,\n    .token.boolean,\n    .token.number {\n      color: #ff7de9;\n    }\n    .token.attr-name,\n    .token.string {\n      color: #e6d06c;\n    }\n\n    .token.entity,\n    .token.url,\n    .language-css .token.string,\n    .style .token.string {\n      color: #bb9cf1;\n    }\n    .token.selector,\n    .token.inserted {\n      color: #b6babf;\n    }\n    .token.atrule,\n    .token.attr-value,\n    .token.keyword,\n    .token.important,\n    .token.deleted {\n      color: #ff7de9;\n    }\n    .token.regex,\n    .token.statement {\n      color: #ffe4a6;\n    }\n    .token.placeholder,\n    .token.variable {\n      color: #ff7de9;\n    }\n    .token.important,\n    .token.statement,\n    .token.bold {\n      font-weight: bold;\n    }\n    .token.punctuation {\n      color: #a9bacb;\n    }\n    .token.entity {\n      cursor: help;\n    }\n    .token.italic {\n      font-style: italic;\n    }\n\n    code.language-markup {\n      color: #b1b1b3;\n    }\n    code.language-markup .token.tag {\n      color: #75bfff;\n    }\n    code.language-markup .token.attr-name {\n      color: #ff97e9;\n    }\n    code.language-markup .token.attr-value {\n      color: #d7d7db;\n    }\n    code.language-markup .token.style,\n    code.language-markup .token.script {\n      color: #75bfff99;\n    }\n    code.language-markup .token.script .token.keyword {\n      color: #9f9f9f;\n    }\n\n    pre[class*='language-'][data-line] {\n      position: relative;\n      padding: 1em 0 1em 3em;\n    }\n    pre[data-line] .line-highlight {\n      position: absolute;\n      left: 0;\n      right: 0;\n      padding: 0;\n      margin-top: 1em;\n      background: rgba(255, 255, 255, 0.08);\n      pointer-events: none;\n      line-height: inherit;\n      white-space: pre;\n    }\n    pre[data-line] .line-highlight:before,\n    pre[data-line] .line-highlight[data-end]:after {\n      content: attr(data-start);\n      position: absolute;\n      top: 0.4em;\n      left: 0.6em;\n      min-width: 1em;\n      padding: 0.2em 0.5em;\n      background-color: rgba(255, 255, 255, 0.4);\n      color: black;\n      font: bold 65%/1 sans-serif;\n      height: 1em;\n      line-height: 1em;\n      text-align: center;\n      border-radius: 999px;\n      text-shadow: none;\n      box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\n    }\n    pre[data-line] .line-highlight[data-end]:after {\n      content: attr(data-end);\n      top: auto;\n      bottom: 0.4em;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

const env = "development" || 'development';

class CodeState {}

exports.CodeState = CodeState;
let RCodeComponent = class RCodeComponent extends _core.CustomElement {
  constructor() {
    super();
  }

  getState() {
    return new CodeState();
  }

  connectedCallback(event) {
    this.onSlotChange();
  }

  get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'type':
        this.setState('type', this.getAttribute('type'));
        break;
    }
  }

  onSlotChange() {
    const code = this.shadowRoot.querySelector('slot').assignedNodes()[env === 'production' ? 0 : 1].textContent;
    this.shadowRoot.querySelector('code').innerHTML = Prism.highlight(code, Prism.languages[this.getAttribute('type')], this.getAttribute('type'));
  }

};
exports.RCodeComponent = RCodeComponent;

__decorate([(0, _core.State)()], RCodeComponent.prototype, "getState", null);

exports.RCodeComponent = RCodeComponent = __decorate([(0, _core.Component)({
  selector: 'r-code',
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], RCodeComponent);
},{"./../../../modules/core":"yJpC"}],"HzZx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyCounter = void 0;

var _core = require("./../../../modules/core");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let MyCounter = class MyCounter extends _core.CustomElement {
  connectedCallback() {
    this.shadowRoot.querySelector('#inc').addEventListener('click', this.inc.bind(this));
    this.shadowRoot.querySelector('#dec').addEventListener('click', this.dec.bind(this));
  }

  get count() {
    return Number.parseInt(this.$state.c);
  }

  inc() {
    this.setState('c', this.count + 1);
  }

  dec() {
    this.setState('c', this.count - 1);
  }

  getState() {
    return {
      c: '0'
    };
  }

};
exports.MyCounter = MyCounter;

__decorate([(0, _core.State)()], MyCounter.prototype, "getState", null);

exports.MyCounter = MyCounter = __decorate([(0, _core.Component)({
  selector: 'my-counter',
  template: "\n    <button id=\"dec\">-</button>\n    <span>{{ c }}</span>\n    <button id=\"inc\">+</button>\n  ",
  style: "\n\tspan,\n\tbutton {\n\t\tfont-size: 200%;\n\t}\n\n\tspan {\n\t\twidth: 4rem;\n\t\tdisplay: inline-block;\n\t\ttext-align: center;\n\t}\n\n\tbutton {\n\t\twidth: 4rem;\n\t\theight: 4rem;\n\t\tborder: none;\n\t\tborder-radius: 10px;\n\t\tbackground-color: seagreen;\n\t\tcolor: white;\n\t}\n\t"
})], MyCounter);
},{"./../../../modules/core":"yJpC"}],"fJgt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RHeadlineComponent = void 0;

var _core = require("./../../../modules/core");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <h1 class=\"{{model.size}}\">{{ model.copy }}</h1>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    h1 {\n      font-family: 'Major Mono Display', sans-serif;\n      padding-left: 1em;\n      -webkit-font-smoothing: antialiased;\n      -moz-osx-font-smoothing: grayscale;\n      -webkit-margin-before: 0px;\n      -webkit-margin-after: 0px;\n    }\n    h1,\n    span {\n      font-size: 1em;\n      letter-spacing: -0.04em;\n      margin-block-start: 0em;\n      margin-block-end: 0em;\n    }\n    h1.is--small,\n    span.is--small {\n      font-size: 12px;\n    }\n    h1.is--medium,\n    span.is--medium {\n      font-size: 6em;\n    }\n    h1.is--large,\n    span.is--large {\n      font-size: 12em;\n      padding-left: 0em;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let RHeadlineComponent = class RHeadlineComponent extends _core.CustomElement {
  constructor() {
    super();
  }

  getState() {
    return {
      model: {
        size: '',
        copy: ''
      }
    };
  }

  static get observedAttributes() {
    return ['headline', 'size'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'headline':
        this.setState('model.copy', newValue);
        break;

      case 'size':
        this.setState('model.size', newValue);
        break;
    }
  }

};
exports.RHeadlineComponent = RHeadlineComponent;

__decorate([(0, _core.State)()], RHeadlineComponent.prototype, "getState", null);

exports.RHeadlineComponent = RHeadlineComponent = __decorate([(0, _core.Component)({
  selector: 'r-headline',
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], RHeadlineComponent);
},{"./../../../modules/core":"yJpC"}],"pQER":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyInputComponent = void 0;

var _core = require("./../../../modules/core");

var _dom = require("./../../../modules/dom");

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      background: rgba(24, 24, 24, 1);\n      border: 0px none;\n      color: white;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let MyInputComponent = class MyInputComponent extends _dom.InputComponent {
  constructor() {
    super();
  }

  onFocus(event) {
    this.value = 'input';
  }

};
exports.MyInputComponent = MyInputComponent;

__decorate([(0, _core.Listen)('focus')], MyInputComponent.prototype, "onFocus", null);

exports.MyInputComponent = MyInputComponent = __decorate([(0, _core.Component)({
  selector: 'my-input',
  custom: {
    extends: 'input'
  },
  style: (0, _core.css)(_templateObject())
})], MyInputComponent);
},{"./../../../modules/core":"yJpC","./../../../modules/dom":"ezFA"}],"gN3Z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyItemComponent = void 0;

var _core = require("./../../../modules/core");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <p>\n      <span><slot name=\"msg\">item</slot></span>\n    </p>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      display: block;\n      cursor: pointer;\n    }\n    :host([state='--selected']) {\n      background: rgba(255, 105, 180, 1);\n      color: black;\n      font-weight: 700;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let MyItemComponent = class MyItemComponent extends _core.CustomElement {
  constructor() {
    super();
  }

  onBang(event) {
    this.getAttribute('state') === '--selected' ? this.setAttribute('state', '') : this.setAttribute('state', '--selected');
  }

};
exports.MyItemComponent = MyItemComponent;

__decorate([(0, _core.Listen)('bang', 'default')], MyItemComponent.prototype, "onBang", null);

exports.MyItemComponent = MyItemComponent = __decorate([(0, _core.Component)({
  selector: 'my-item',
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], MyItemComponent);
},{"./../../../modules/core":"yJpC"}],"GX6A":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyListComponent = void 0;

var _core = require("./../../../modules/core");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <slot name=\"menu\"></slot>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      display: block;\n      background: rgba(24, 24, 24, 1);\n      width: 200px;\n      height: 200px;\n      color: white;\n      padding: 1em;\n      border-radius: 8px;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let MyListComponent = class MyListComponent extends _core.CustomElement {
  constructor() {
    super();
    this.currentIndex = 0;
  }

  deactivateElement(elem) {
    elem.setAttribute('tabindex', '-1');
    elem.querySelector('my-item').setAttribute('state', '');
  }

  activateElement(elem) {
    elem.setAttribute('tabindex', '0');
    elem.querySelector('my-item').setAttribute('state', '--selected');
  }

  connectedCallback() {
    this.setAttribute('tabindex', '0');
  }

  onFocus(ev) {
    for (const li of this.children[0].children) {
      if (li === this.children[0].children[this.currentIndex]) {
        this.activateElement(li);
      } else {
        this.deactivateElement(li);
      }

      li.addEventListener('click', clickEv => {
        (0, _core.getSiblings)(li).forEach(elem => {
          this.deactivateElement(elem);
        });
        this.activateElement(li);
        this.onSubmit(clickEv);
      });
    }
  }

  onKeydown(ev) {
    const currentElement = this.querySelector('[tabindex]:not([tabindex="-1"])');
    const siblings = (0, _core.getSiblings)(currentElement);
    this.currentIndex = (0, _core.getElementIndex)(currentElement);

    if (ev.keyCode === 13) {
      this.onSubmit(ev);
    }

    if (ev.keyCode === 38) {
      // up
      if (this.currentIndex === 0) {
        this.currentIndex = siblings.length - 1;
      } else {
        this.currentIndex -= 1;
      }

      siblings.forEach(elem => {
        if ((0, _core.getElementIndex)(elem) === this.currentIndex) {
          this.activateElement(elem);
        } else {
          this.deactivateElement(elem);
        }
      });
    }

    if (ev.keyCode === 40) {
      // down
      if (this.currentIndex === siblings.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }

      siblings.forEach(elem => {
        if ((0, _core.getElementIndex)(elem) === this.currentIndex) {
          this.activateElement(elem);
        } else {
          this.deactivateElement(elem);
        }
      });
    }
  }

  onSubmit(event) {// console.log(this, event);
  }

};
exports.MyListComponent = MyListComponent;

__decorate([(0, _core.Listen)('focus')], MyListComponent.prototype, "onFocus", null);

__decorate([(0, _core.Listen)('keydown')], MyListComponent.prototype, "onKeydown", null);

exports.MyListComponent = MyListComponent = __decorate([(0, _core.Component)({
  selector: 'my-list',
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], MyListComponent);
},{"./../../../modules/core":"yJpC"}],"ShnT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RLogoComponent = exports._logoState = exports.LogoState = void 0;

var _core = require("./../../../modules/core");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <r-headline headline=\"{{heading}}\" size=\"{{size}}\"></r-headline>\n    <r-headline headline=\"{{heading2}}\"></r-headline>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      display: block;\n      user-select: none;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class LogoState {
  constructor() {
    this.heading = 'R';
    this.heading2 = 'readymade';
    this.size = '';
    this.sizes = ['is--small', 'is--medium', 'is--large'];
  }

}

exports.LogoState = LogoState;

const _logoState = new LogoState();

exports._logoState = _logoState;
let RLogoComponent = class RLogoComponent extends _core.CustomElement {
  constructor() {
    super();
  }

  getState() {
    return _logoState;
  }

  static get observedAttributes() {
    return ['size'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'size':
        this.setSize(newValue);
        break;
    }
  }

  setSize(size) {
    this.setState('size', size);
  }

};
exports.RLogoComponent = RLogoComponent;

__decorate([(0, _core.State)()], RLogoComponent.prototype, "getState", null);

exports.RLogoComponent = RLogoComponent = __decorate([(0, _core.Component)({
  selector: 'r-logo',
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], RLogoComponent);
},{"./../../../modules/core":"yJpC"}],"gAYE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RMainNavComponent = exports.MainNavState = void 0;

var _core = require("./../../../modules/core");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <nav>\n      <ul class=\"left\">\n        <li link=\"side-nav\"></li>\n      </ul>\n      <ul class=\"right\">\n        <li link=\"resource\">\n          <a\n            href=\"https://github.com/readymade-ui/readymade\"\n            target=\"_blank\"\n            rel=\"noreferrer\"\n          >\n            <svg width=\"25px\" height=\"25px\" viewBox=\"0 0 25 25\">\n              <title>Stephen Belovarich Github Profile</title>\n              <defs></defs>\n              <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                <g\n                  transform=\"translate(3.000000, 2.000000)\"\n                  fill=\"{{resourceLinkFillColor}}\"\n                  fill-rule=\"nonzero\"\n                >\n                  <path\n                    d=\"M3.94399028,5.10104103 C2.92388422,5.10104103 2.04650906,5.44611145 1.3097658,6.134109 C0.545735749,6.87140233 0.161621741,7.79087569 0.161621741,8.89252909 C0.161621741,9.62767912 0.369421122,10.31782 0.789217852,10.9608083 C1.16493593,11.5587875 1.55534688,11.9424372 2.06959788,12.1096142 L2.06959788,12.1546234 C1.55534688,12.3689528 1.32655767,12.9047765 1.32655767,13.7620943 C1.32655767,14.4200857 1.55534688,14.9109002 2.06959788,15.2323944 L2.06959788,15.2774036 C0.650684932,15.7510716 0,16.634109 0,17.9200857 C0,19.0388855 0.476469289,19.857624 1.40841803,20.3784446 C2.14306231,20.7921004 3.08760495,21 4.22735307,21 C7.00220946,21 8.39383562,19.8126148 8.39383562,17.4378445 C8.39383562,15.9525413 7.32335395,15.0394979 5.17819266,14.7030006 C4.68283252,14.625842 4.30921343,14.4415187 4.05313743,14.1521739 C3.85793195,13.9528475 3.7613787,13.7535211 3.7613787,13.5541947 C3.7613787,12.988365 4.06153336,12.6582976 4.66184269,12.5661359 C5.57699956,12.4289651 6.32423774,11.9960196 6.90145824,11.2672994 C7.47867875,10.5385793 7.76833849,9.68554807 7.76833849,8.70606246 C7.76833849,8.39957134 7.67808219,8.06950398 7.55844012,7.71800367 C7.94885108,7.62584201 8.22171896,7.54225352 8.42741935,7.46509492 L8.42741935,5.10104103 C7.5227574,5.46968769 6.67896597,5.65186773 5.95901458,5.65186773 C5.32931949,5.28536436 4.67863456,5.10104103 3.94399028,5.10104103 Z M4.19167035,16.5698102 C5.45106054,16.5698102 6.08285462,16.9598898 6.08285462,17.7421923 C6.08285462,18.569504 5.50563411,18.9831598 4.34909412,18.9831598 C3.02883341,18.9831598 2.36765356,18.584507 2.36765356,17.7872015 C2.36765356,16.9748928 2.97635882,16.5698102 4.19167035,16.5698102 Z M4.03424658,10.5021433 C3.08970393,10.5021433 2.61533363,9.97274954 2.61533363,8.91610533 C2.61533363,7.78230251 3.08760495,7.21647275 4.03424658,7.21647275 C4.48342908,7.21647275 4.83605833,7.3922229 5.09213433,7.7458665 C5.3020327,8.06736069 5.40698188,8.45101041 5.40698188,8.89467238 C5.40698188,9.96631966 4.94940345,10.5021433 4.03424658,10.5021433 Z M10.8748343,0 C10.4403447,0 10.0688246,0.169320269 9.76027397,0.505817514 C9.45172338,0.842314758 9.29849757,1.24954072 9.29849757,1.72320882 C9.29849757,2.18187385 9.45172338,2.58052664 9.76027397,2.91916718 C10.0688246,3.25566442 10.4382457,3.42498469 10.8748343,3.42498469 C11.294631,3.42498469 11.6598542,3.25566442 11.9663058,2.91916718 C12.2748564,2.58266993 12.4280822,2.18401715 12.4280822,1.72320882 C12.4280822,1.24739743 12.2748564,0.842314758 11.9663058,0.505817514 C11.6598542,0.169320269 11.29673,0 10.8748343,0 Z M12.1363235,5.25107165 L9.59235528,5.25107165 C9.62174105,5.544703 9.57976138,5.99050827 9.57976138,6.71065524 L9.57976138,13.8585426 C9.57976138,14.5936926 9.62174105,15.1873852 9.59235528,15.418861 L12.1363235,15.418861 C12.1069377,15.0823637 12.0271763,14.5036742 12.0271763,13.7213717 L12.0271763,6.66350276 C12.0271763,5.99050827 12.1069377,5.544703 12.1363235,5.25107165 Z M17.7448078,13.2134109 C17.0836279,13.2134109 16.7582855,12.6990202 16.7582855,11.6745254 L16.7582855,7.43508879 L17.7595007,7.43508879 C17.9400133,7.43508879 18.101635,7.42437232 18.3052364,7.43937538 C18.5088378,7.45437844 18.5885992,7.44366197 18.6935484,7.44366197 L18.6935484,5.25107165 L16.7603844,5.25107165 L16.7603844,4.27372933 C16.7603844,3.90508267 16.817057,3.57072872 16.8611357,3.36068585 L14.25,3.36068585 C14.2940787,3.57072872 14.2898807,3.8922229 14.2898807,4.32088181 L14.2898807,5.25107165 L13.1585285,5.25107165 L13.1585285,7.44580527 C13.4670791,7.40079608 13.742046,7.37721984 13.9372514,7.37721984 L14.2898807,7.40079608 L14.2898807,7.41365585 L14.2898807,11.5609308 C14.2898807,12.8469075 14.4494034,13.7899571 14.764251,14.3879363 C15.1840477,15.1852419 15.920791,15.5838947 17.0164605,15.5838947 C17.7972824,15.5838947 18.485749,15.4317208 19,15.1252296 L19,12.8233313 C18.5906982,13.0826699 18.2107821,13.2134109 17.7448078,13.2134109 Z\"\n                  ></path>\n                </g>\n              </g>\n            </svg>\n          </a>\n        </li>\n      </ul>\n    </nav>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      display: block;\n      position: fixed;\n      top: 0px;\n      width: 100%;\n      height: 60px;\n      margin-right: 40px;\n      font-weight: 700;\n      z-index: 9999;\n      user-select: none;\n    }\n    nav {\n      width: 100%;\n    }\n    ul {\n      margin-block-start: 0em;\n      margin-block-end: 0em;\n      padding-inline-start: 0px;\n      padding: 0;\n      margin: 0;\n      list-style: none;\n      -webkit-margin-start: 0px;\n      -webkit-margin-end: 0px;\n      -webkit-padding-start: 0px;\n      -webkit-margin-before: 0px;\n      -webkit-margin-after: 0px;\n    }\n    ul li {\n      display: inline-block;\n      cursor: pointer;\n      height: 100%;\n      padding: 1em;\n      width: 44px;\n      height: 44px;\n      cursor: pointer;\n    }\n    ul.left {\n      float: left;\n    }\n    ul.left li {\n      margin-right: 0px;\n      padding: 0px;\n      width: 44px;\n      height: 44px;\n      position: absolute;\n      left: 4px;\n      top: 4px;\n    }\n    ul.left li.is--dark {\n      color: #222222;\n    }\n    ul.left li.is--dark:hover {\n      color: #000000;\n    }\n    ul.right {\n      float: right;\n      margin-right: 2px;\n    }\n    ul.right li {\n      margin-left: 0px;\n      padding-right: 10px;\n      text-align: right;\n      transform: translateY(-10px);\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class MainNavState {
  constructor() {
    this.resourceLinkFillColor = '#cfcfcf';
    this.size = '44px';
  }

}

exports.MainNavState = MainNavState;
let RMainNavComponent = class RMainNavComponent extends _core.CustomElement {
  constructor() {
    super();
    this.isNavOpen = false;
  }

  getState() {
    return new MainNavState();
  }

  connectedCallback() {
    const navLink = this.shadowRoot.querySelector('[link="side-nav"]');
    const resourceLink = this.shadowRoot.querySelector('[link="resource"]');
    resourceLink.addEventListener('mouseenter', () => {
      this.setState('resourceLinkFillColor', '#efefef');
    });
    resourceLink.addEventListener('mouseleave', () => {
      this.setState('resourceLinkFillColor', '#cfcfcf');
    });
    navLink.addEventListener('click', () => {
      if (navLink.classList.contains('is--dark')) {
        this.emitter.broadcast('close', 'sidenav');
        navLink.classList.remove('is--dark');
      } else {
        this.emitter.broadcast('open', 'sidenav');
        navLink.classList.add('is--dark');
      }
    });
  }

  onClose() {
    this.shadowRoot.querySelector('[link="side-nav"]').classList.remove('is--dark');
  }

};
exports.RMainNavComponent = RMainNavComponent;

__decorate([(0, _core.State)()], RMainNavComponent.prototype, "getState", null);

__decorate([(0, _core.Emitter)('open', {}, 'sidenav'), (0, _core.Emitter)('close', {}, 'sidenav')], RMainNavComponent.prototype, "connectedCallback", null);

__decorate([(0, _core.Listen)('close', 'sidenav')], RMainNavComponent.prototype, "onClose", null);

exports.RMainNavComponent = RMainNavComponent = __decorate([(0, _core.Component)({
  selector: 'r-main-nav',
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], RMainNavComponent);
},{"./../../../modules/core":"yJpC"}],"hbGM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RMeterComponent = void 0;

var _core = require("./../../../modules/core");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <label><span class=\"label\"></span><span class=\"value\"></span></label>\n    <div class=\"meter\">\n      <div class=\"progress\"></div>\n    </div>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      display: block;\n      width: 100%; \n      margin-bottom: 4px;\n    }\n    label {\n      display: block;\n      font-size: 1em;\n      margin-bottom: 4px;\n    }\n    .label {\n      margin-right: 4px;\n      opacity: 0.8;\n      font-weight: 500;\n    }\n    .meter {\n      display: block;\n      width: 100%;\n      height: 20px;\n      overflow: hidden;\n    }\n    .progress {\n      display: inline-block;\n      width: 0%;\n      height: 100%;\n      border-radius: 4px;\n      transition: width 2s ease-out;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let RMeterComponent = class RMeterComponent extends _core.CustomElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['label', 'max', 'value', 'color'];
  }

  attributeChangedCallback(name, old, next) {
    switch (name) {
      case 'label':
        this.setLabel(next);
        break;

      case 'max':
        this.max = parseFloat(next);
        this.setValue();
        break;

      case 'value':
        this.value = parseFloat(next);
        this.setValue();
        break;

      case 'color':
        this.setColor(next);
        break;
    }
  }

  canSet() {
    if (this.max === undefined || this.value === undefined) {
      return false;
    }

    return true;
  }

  setValue() {
    if (this.canSet()) {
      this.shadowRoot.querySelector('.progress').style.width = "".concat(this.value / this.max * 100, "%");
      this.shadowRoot.querySelector('.value').innerText = "".concat(this.value, "Kb");
    }
  }

  setLabel(val) {
    this.shadowRoot.querySelector('.label').innerText = val;
  }

  setColor(val) {
    this.shadowRoot.querySelector('.progress').style.background = val;
  }

};
exports.RMeterComponent = RMeterComponent;
exports.RMeterComponent = RMeterComponent = __decorate([(0, _core.Component)({
  selector: 'r-meter',
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], RMeterComponent);
},{"./../../../modules/core":"yJpC"}],"yOn5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RSideNavComponent = exports.SideNavState = void 0;

var _core = require("./../../../modules/core");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <svg class=\"background\" width=\"54px\" height=\"60px\">\n      <clipPath id=\"c1\">\n        <polygon\n          stroke-width=\"3\"\n          class=\"polygon\"\n          attr.points=\"{{triPoints}}\"\n        ></polygon>\n      </clipPath>\n      <g stroke=\"none\" fill=\"none\" fill-rule=\"evenodd\">\n        <polygon\n          fill=\"{{shadowColor}}\"\n          stroke-width=\"0\"\n          class=\"shadow\"\n          attr.points=\"{{shadowPoints}}\"\n        ></polygon>\n        <polygon\n          fill=\"{{fillColor}}\"\n          stroke-width=\"0\"\n          class=\"polygon\"\n          attr.points=\"{{triPoints}}\"\n        ></polygon>\n      </g>\n    </svg>\n    <nav>\n      <ul class=\"top\">\n        <li>\n          <span><a data-link=\"#intro\">Intro</a></span>\n        </li>\n        <li>\n          <span><a data-link=\"#started\">Getting Started</a></span>\n        </li>\n        <li>\n          <span><a data-link=\"#docs\">Using Readymade</a></span>\n        </li>\n        <li>\n          <span><a data-link=\"#resources\">Resources</a></span>\n        </li>\n      </ul>\n    </nav>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      display: block;\n      position: fixed;\n      top: 0px;\n      left: 0px;\n      height: 100%;\n      width: 0px;\n      max-width: 320px;\n      z-index: 8888;\n      color: #000;\n      overflow: visible;\n    }\n    :host.is--active {\n      width: 320px;\n    }\n    .is--hidden {\n      display: none;\n    }\n    svg {\n      overflow: visible;\n      transform: translateX(0px);\n    }\n    nav {\n      display: block;\n      position: relative;\n      width: 0%;\n      height: 100%;\n      -webkit-clip-path: url(#c1);\n      overflow: hidden;\n    }\n    nav.is--active {\n      width: 1400px;\n    }\n    ul {\n      margin-block-start: 0em;\n      margin-block-end: 0em;\n      padding-inline-start: 0px;\n      width: 100%;\n      display: block;\n    }\n    ul li {\n      display: block;\n      cursor: pointer;\n      width: 100%;\n      opacity: 0.8;\n      cursor: pointer;\n      padding-inline-start: 0px;\n      width: 100%;\n      max-width: 320px;\n      font-weight: 700;\n    }\n    ul li > span {\n      display: inline-block;\n      position: relative;\n      height: 22px;\n      width: calc(100% - 56px);\n      margin-left: 20px;\n      padding-top: 8px;\n      padding-bottom: 8px;\n      padding-left: 0px;\n      padding-right: 0px;\n    }\n    ul li a:link,\n    ul li a:visited {\n      opacity: 0.8;\n      color: #000000;\n      text-decoration: none;\n    }\n    ul li:hover a:link,\n    ul li:hover a:visited {\n      opacity: 1;\n      color: #ffffff;\n    }\n    ul.top {\n      position: absolute;\n      top: 0px;\n      margin-top: 240px;\n    }\n    ul.bottom {\n      position: absolute;\n      bottom: 0px;\n    }\n    ul.bottom li {\n      margin-bottom: 10px;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class SideNavState {
  constructor() {
    this.shadowPoints = "7,34 22,32 24,22";
    this.triPoints = "7,9 7,34 24,22";
    this.strokeColor = '#cfcfcf';
    this.fillColor = '#cfcfcf';
    this.shadowColor = '#c0c0c0';
    this.size = '10000px';
  }

}

exports.SideNavState = SideNavState;
let RSideNavComponent = class RSideNavComponent extends _core.CustomElement {
  constructor() {
    super();
    this.direction = 'forwards';
    this.points = {
      tri: {
        a: 34,
        b: 24,
        c: 22
      },
      shadow: {
        a: 34,
        b: 24,
        c: 22,
        d: 32
      }
    };
  }

  getState() {
    return new SideNavState();
  }

  connectedCallback() {
    this.nav = this.shadowRoot.querySelector('nav');
    this.background = this.shadowRoot.querySelector('.background');
    this.shadow = this.shadowRoot.querySelector('.shadow');
    Array.from(this.shadowRoot.querySelectorAll('a')).forEach(a => {
      a.addEventListener('click', ev => {
        document.querySelector('app-home').shadowRoot.querySelector(ev.target.getAttribute('data-link')).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        this.close();
      });
    });
  }

  close() {
    if (this.status === 'is--inactive') {
      return;
    }

    this.status = 'is--inactive';
    this.direction = 'reverse';
    this.emitter.broadcast('close', 'sidenav');
    this.player = this.animate([{
      x: 0
    }, {
      x: 100
    }], {
      duration: 150,
      fill: 'forwards',
      easing: 'cubic-bezier(0.42, 0, 0.88, 1)'
    });
    setTimeout(() => {
      this.classList.remove('is--active');
    }, 50);
    setTimeout(() => {
      this.shadow.classList.remove('is--hidden');
    }, 100);
    setTimeout(() => {
      this.nav.classList.remove('is--active');
    }, 50);
    this.player.play();
    this.update();
  }

  open(ev) {
    if (this.status === 'is--active') {
      return;
    }

    this.direction = 'forwards';
    this.status = 'is--active';
    this.player = this.animate([{
      x: 100
    }, {
      x: 0
    }], {
      duration: 1500,
      fill: 'forwards',
      easing: 'cubic-bezier(0.42, 0, 0.88, 1)'
    });
    this.classList.add('is--active');
    this.shadow.classList.add('is--hidden');
    this.nav.classList.add('is--active');
    this.player.play();
    this.update();
  }

  scale(v, min, max, gmin, gmax) {
    return (v - min) / (max - min) * (gmax - gmin) + gmin;
  }

  update() {
    const time = this.player.currentTime;

    if (this.direction === 'forwards') {
      this.points.tri.a = this.scale(time, 0, 350, 34, 3444);
      this.points.tri.b = this.scale(time, 0, 350, 24, 2444);
      this.points.tri.c = this.scale(time, 0, 350, 22, 2222);
      this.points.shadow.d = this.scale(time, 0, 350, 32, 3222);
    }

    if (this.direction === 'reverse') {
      this.points.tri.a = this.scale(time, 0, 150, 3444, 34);
      this.points.tri.b = this.scale(time, 0, 150, 2444, 24);
      this.points.tri.c = this.scale(time, 0, 150, 2222, 22);
      this.points.shadow.d = this.scale(time, 0, 150, 3222, 32);
    }

    this.setState('triPoints', "7,9 7,".concat(this.points.tri.a, " ").concat(this.points.tri.b, ",").concat(this.points.tri.c));
    this.setState('shadowPoints', "7,".concat(this.points.tri.a, " ").concat(this.points.tri.c, ",").concat(this.points.shadow.d, " ").concat(this.points.tri.b, ",").concat(this.points.tri.c));

    if (this.player.playState === 'running' || this.player.playState === 'pending') {
      window.requestAnimationFrame(this.update.bind(this));
    }
  }

};
exports.RSideNavComponent = RSideNavComponent;

__decorate([(0, _core.State)()], RSideNavComponent.prototype, "getState", null);

__decorate([(0, _core.Emitter)('close', {}, 'sidenav')], RSideNavComponent.prototype, "connectedCallback", null);

__decorate([(0, _core.Listen)('close', 'sidenav')], RSideNavComponent.prototype, "close", null);

__decorate([(0, _core.Listen)('open', 'sidenav')], RSideNavComponent.prototype, "open", null);

exports.RSideNavComponent = RSideNavComponent = __decorate([(0, _core.Component)({
  selector: 'r-side-nav',
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], RSideNavComponent);
},{"./../../../modules/core":"yJpC"}],"E2rk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RStatsComponent = void 0;

var _core = require("./../../../modules/core");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <slot></slot>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      display: block;\n    }\n    ::slotted(ul) {\n      display: inline-block;\n      position: relative;\n      left: 50%;\n      transform: translateX(-50%);\n      font-weight: 300;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

const env = "development" || 'development';
let RStatsComponent = class RStatsComponent extends _core.CustomElement {
  constructor() {
    super();
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', event => this.onSlotChange(event));
  }

  onSlotChange(ev) {
    this.animateIn();
  }

  animateIn() {
    const ul = this.shadowRoot.querySelector('slot').assignedNodes()[env === 'production' ? 0 : 1];
    Array.from(ul.children).forEach((li, index) => {
      li.animate([{
        opacity: '0',
        color: '#000'
      }, {
        opacity: '0',
        offset: index * 0.1
      }, {
        opacity: '1',
        color: '#fff'
      }], {
        duration: 2000
      });
    });
  }

};
exports.RStatsComponent = RStatsComponent;
exports.RStatsComponent = RStatsComponent = __decorate([(0, _core.Component)({
  selector: 'r-stats',
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], RStatsComponent);
},{"./../../../modules/core":"yJpC"}],"cpXY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AtomComponent = exports._nodeState = exports.NodeState = void 0;

var _core = require("./../../../../modules/core");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <span>{{astate}}</span>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      display: flex;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class NodeState {}

exports.NodeState = NodeState;

const _nodeState = new NodeState();

exports._nodeState = _nodeState;
let AtomComponent = class AtomComponent extends _core.CustomElement {
  constructor() {
    super();
  }

  getState() {
    return _nodeState;
  }

  static get observedAttributes() {
    return ['model'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'model':
        this.setModel(newValue);
        break;
    }
  }

  setModel(model) {
    this.setState('astate', model);
  }

};
exports.AtomComponent = AtomComponent;

__decorate([(0, _core.State)()], AtomComponent.prototype, "getState", null);

exports.AtomComponent = AtomComponent = __decorate([(0, _core.Component)({
  selector: 'x-atom',
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], AtomComponent);
},{"./../../../../modules/core":"yJpC"}],"mQR8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeComponent = exports._nodeState = exports.NodeState = void 0;

var _core = require("./../../../../modules/core");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <x-atom model=\"{{xnode}}\"></x-atom>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      display: flex;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class NodeState {}

exports.NodeState = NodeState;

const _nodeState = new NodeState();

exports._nodeState = _nodeState;
let NodeComponent = class NodeComponent extends _core.PseudoElement {
  constructor() {
    super();
  }

  getState() {
    return _nodeState;
  }

  static get observedAttributes() {
    return ['model'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'model':
        this.setModel(newValue);
        break;
    }
  }

  setModel(model) {
    this.setState('xnode', model);
  }

};
exports.NodeComponent = NodeComponent;

__decorate([(0, _core.State)()], NodeComponent.prototype, "getState", null);

exports.NodeComponent = NodeComponent = __decorate([(0, _core.Component)({
  selector: 'x-node',
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], NodeComponent);
},{"./../../../../modules/core":"yJpC"}],"iRJc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeComponent = exports._treeState = exports.TreeState = void 0;

var _core = require("./../../../../modules/core");

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    <x-node model=\"{{arrayModel[0]}}\"></x-node>\n    <x-node model=\"{{arrayModel[8][1]}}\"></x-node>\n    <x-node model=\"{{objectModel.foo.bar.baz}}\"></x-node>\n    <x-node model=\"{{objectModel['foo']['far'].fiz['faz'].fuz}}\"></x-node>\n    <x-node model=\"{{dx}}\"></x-node>\n    <x-node model=\"{{ex}}\"></x-node>\n    <x-node model=\"{{fx}}\"></x-node>\n    <x-node model=\"{{gx}}\"></x-node>\n    <x-node model=\"{{hx}}\"></x-node>\n    <x-node model=\"{{state.foo.bar}}\"></x-node>\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    :host {\n      display: grid;\n      font-size: 2em;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class TreeState {
  constructor() {
    this.arrayModel = ['aaa', 'Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5', 'Node 6', 'Node 7', ['far', 'fiz', 'faz', 'fuz']];
    this.objectModel = {
      foo: {
        bar: {
          baz: 'bbb'
        },
        far: {
          fiz: {
            faz: {
              fuz: 'fuz'
            }
          }
        },
        mar: {
          maz: 'mmm'
        }
      }
    };
    this.ax = 'aaa';
    this.bx = 'bbb';
    this.cx = 'ccc';
    this.dx = 'ddd';
    this.ex = 'eee';
    this.fx = 'fff';
    this.gx = 'ggg';
    this.hx = 'hhh';
  }

}

exports.TreeState = TreeState;

const _treeState = new TreeState();

exports._treeState = _treeState;
let TreeComponent = class TreeComponent extends _core.CustomElement {
  constructor() {
    super();
  }

  getState() {
    return new TreeState();
  }

  static get observedAttributes() {
    return ['model'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'model':
        this.setModel(newValue);
        break;
    }
  }

  setModel(model) {
    this.setState('state.foo.bar', model);
  }

};
exports.TreeComponent = TreeComponent;

__decorate([(0, _core.State)()], TreeComponent.prototype, "getState", null);

exports.TreeComponent = TreeComponent = __decorate([(0, _core.Component)({
  selector: 'x-tree',
  autoDefine: false,
  style: (0, _core.css)(_templateObject()),
  template: (0, _core.html)(_templateObject2())
})], TreeComponent);
customElements.define('x-tree', TreeComponent);
},{"./../../../../modules/core":"yJpC"}],"otAc":[function(require,module,exports) {
module.exports = "::selection {\n  background: #ff7de9;\n  /* WebKit/Blink Browsers */ }\n\n::-moz-selection {\n  background: #ff7de9;\n  /* Gecko Browsers */ }\n\nbutton,\ninput {\n  color: white;\n  font-size: 0.8em;\n  padding: 10px;\n  box-sizing: border-box;\n  text-decoration: none;\n  outline: none;\n  box-shadow: 0px 0px 0px transparent;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  transition-property: box-shadow, border;\n  transition-duration: 300ms;\n  transition-timing-function: ease-in-out; }\n\nul {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  -webkit-margin-start: 0px;\n  -webkit-margin-end: 0px;\n  -webkit-padding-start: 0px;\n  -webkit-margin-before: 0px;\n  -webkit-margin-after: 0px; }\n\nul li {\n  margin-left: 10px;\n  margin-right: 10px; }\n\n[tabindex] {\n  outline: 1px solid transparent;\n  transition-property: box-shadow, border;\n  transition-duration: 300ms;\n  transition-timing-function: ease-in-out; }\n\nbutton,\ninput {\n  border-radius: 4px;\n  outline: none;\n  box-shadow: 0px 0px 0px transparent;\n  border: 1px solid transparent; }\n\n*:focus,\nbutton:focus,\ninput:focus {\n  box-shadow: 0px 0px 0px hotpink;\n  outline: 1px solid hotpink; }\n\n[hidden] {\n  display: none !important; }\n\na:link,\na:visited {\n  color: #cdcdcd; }\n\na:link:hover,\na:visited:hover {\n  color: #ffffff; }\n\nh1 {\n  font-family: 'Major Mono Display', serif;\n  line-height: 1.5em; }\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: 'Source Sans Pro', serif;\n  font-weight: 400;\n  line-height: 1.5em; }\n\nh1 {\n  font-weight: 700; }\n\nh2 {\n  margin-top: 2em; }\n\nh6 {\n  font-size: 1em; }\n\np {\n  font-family: 'Source Sans Pro', serif;\n  font-size: 1em;\n  line-height: 1.5em; }\n\n.hint {\n  opacity: 0.6; }\n\nheader,\nsection,\nfooter {\n  position: relative;\n  left: 50%;\n  max-width: 640px;\n  transform: translateX(-50%);\n  padding-left: 20px;\n  padding-right: 20px; }\n\nheader {\n  padding-top: 4em;\n  text-align: center;\n  padding-bottom: 2em; }\n\nheader h2 {\n  font-size: 20px;\n  font-weight: 300;\n  margin-top: 2em;\n  margin-bottom: 2em; }\n\nsection {\n  margin-bottom: 20px; }\n\nsection h1 {\n  padding-top: 3em;\n  margin-bottom: 1em;\n  font-family: 'Source Sans Pro'; }\n\nsection h2 {\n  padding: 2px 8px;\n  background: #cfcfcf;\n  color: #000000;\n  font-size: 1.1em;\n  font-weight: 400;\n  display: inline-block; }\n\nsection ul li {\n  margin-bottom: 0.25em; }\n\n.definition__list li {\n  padding-bottom: 0.5em; }\n\n.definition__title {\n  font-style: italic;\n  color: #ababab;\n  margin-right: 0.2em; }\n\n.i__e {\n  color: #75bfff; }\n\n.i__c {\n  color: #e6d06c; }\n\nfooter {\n  text-align: center;\n  margin-top: 60px;\n  margin-bottom: 60px; }\n\nfooter p {\n  font-family: 'Major Mono Display', sans-sarif;\n  font-size: 0.8em; }\n\nfooter r-logo {\n  padding-bottom: 4em; }\n\n[is='my-button'] {\n  background: #181818;\n  cursor: pointer;\n  color: #fff;\n  font-weight: 400; }\n\n[is='my-input'] {\n  background: #181818;\n  border: 0;\n  color: #fff; }\n"
},{}],"FB6S":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeComponent = void 0;

var _core = require("./../../../../modules/core");

var _home = _interopRequireDefault(require("./home.scss"));

var _home2 = _interopRequireDefault(require("./home.html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let HomeComponent = class HomeComponent extends _core.CustomElement {
  constructor() {
    super();
  }

};
exports.HomeComponent = HomeComponent;
exports.HomeComponent = HomeComponent = __decorate([(0, _core.Component)({
  selector: 'app-home',
  style: _home.default,
  template: _home2.default
})], HomeComponent);
},{"./../../../../modules/core":"yJpC","./home.scss":"otAc","./home.html":"m5eZ"}],"Zx8e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "HomeComponent", {
  enumerable: true,
  get: function () {
    return _home.HomeComponent;
  }
});

var _home = require("./home");
},{"./home":"FB6S"}],"nUOT":[function(require,module,exports) {
module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Major+Mono+Display|Source Sans Pro:100,300,400\");\n:host {\n  display: block;\n  background: #cfcfcf;\n  color: #191919;\n  font-family: 'Source Sans Pro', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  padding: 20px;\n  margin: 0px;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n  overflow-y: auto;\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale; }\n"
},{}],"aYUr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformanceTestComponent = void 0;

var _core = require("./../../../../modules/core");

var _perf = _interopRequireDefault(require("./perf.scss"));

var _perf2 = _interopRequireDefault(require("./perf.html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let PerformanceTestComponent = class PerformanceTestComponent extends _core.CustomElement {
  constructor() {
    super();
  }

};
exports.PerformanceTestComponent = PerformanceTestComponent;
exports.PerformanceTestComponent = PerformanceTestComponent = __decorate([(0, _core.Component)({
  selector: 'app-perftest',
  style: _perf.default,
  template: _perf2.default
})], PerformanceTestComponent);
},{"./../../../../modules/core":"yJpC","./perf.scss":"nUOT","./perf.html":"nF9K"}],"Y0k7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PerformanceTestComponent", {
  enumerable: true,
  get: function () {
    return _perf.PerformanceTestComponent;
  }
});

var _perf = require("./perf");
},{"./perf":"aYUr"}],"ZmmH":[function(require,module,exports) {
module.exports = undefined
},{}],"t7P1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryComponent = void 0;

var _core = require("./../../../../modules/core");

var _query = _interopRequireDefault(require("./query.html"));

var _query2 = _interopRequireDefault(require("./query.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let QueryComponent = class QueryComponent extends _core.CustomElement {
  constructor() {
    super();
  }

  getState() {
    return {
      params: {}
    };
  }

  onNavigate(route) {
    this.setState('params', JSON.stringify(route.queryParams));
  }

};
exports.QueryComponent = QueryComponent;

__decorate([(0, _core.State)()], QueryComponent.prototype, "getState", null);

exports.QueryComponent = QueryComponent = __decorate([(0, _core.Component)({
  selector: 'app-query',
  style: _query2.default,
  template: _query.default
})], QueryComponent);
},{"./../../../../modules/core":"yJpC","./query.html":"iCVQ","./query.scss":"ZmmH"}],"RQTT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "QueryComponent", {
  enumerable: true,
  get: function () {
    return _query.QueryComponent;
  }
});

var _query = require("./query");
},{"./query":"t7P1"}],"GrnA":[function(require,module,exports) {
module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Major+Mono+Display|Source Sans Pro:100,300,400\");\n:host {\n  display: block;\n  background: #cfcfcf;\n  color: #191919;\n  font-family: 'Source Sans Pro', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  padding: 20px;\n  margin: 0px;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n  overflow-y: auto;\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale; }\n\n::selection {\n  background: #ff7de9;\n  /* WebKit/Blink Browsers */ }\n\n::-moz-selection {\n  background: #ff7de9;\n  /* Gecko Browsers */ }\n\nr-logo {\n  margin-bottom: 40px; }\n\nheader,\nsection,\nfooter {\n  position: relative;\n  left: 50%;\n  max-width: 640px;\n  transform: translateX(-50%);\n  padding-left: 20px;\n  padding-right: 20px; }\n\nbutton,\ninput {\n  color: white;\n  font-size: 0.8em;\n  padding: 10px;\n  box-sizing: border-box;\n  text-decoration: none;\n  outline: none;\n  box-shadow: 0px 0px 0px transparent;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  transition-property: box-shadow, border;\n  transition-duration: 300ms;\n  transition-timing-function: ease-in-out; }\n\nul {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  -webkit-margin-start: 0px;\n  -webkit-margin-end: 0px;\n  -webkit-padding-start: 0px;\n  -webkit-margin-before: 0px;\n  -webkit-margin-after: 0px; }\n  ul.is--large {\n    font-size: 2em; }\n\nul li {\n  margin-left: 10px;\n  margin-right: 10px; }\n\n[tabindex] {\n  outline: 1px solid transparent;\n  transition-property: box-shadow, border;\n  transition-duration: 300ms;\n  transition-timing-function: ease-in-out; }\n\nbutton,\ninput {\n  border-radius: 4px;\n  outline: none;\n  box-shadow: 0px 0px 0px transparent;\n  border: 1px solid transparent; }\n\n*:focus,\nbutton:focus,\ninput:focus {\n  box-shadow: 0px 0px 0px hotpink;\n  outline: 1px solid hotpink; }\n\n[hidden] {\n  display: none !important; }\n\na:link,\na:visited {\n  color: #cdcdcd; }\n\na:link:hover,\na:visited:hover {\n  color: #ffffff; }\n\nh1 {\n  font-family: 'Major Mono Display', serif;\n  line-height: 1.5em; }\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: 'Source Sans Pro', serif;\n  font-weight: 400;\n  line-height: 1.5em; }\n\nh1 {\n  font-weight: 700; }\n\nh6 {\n  font-size: 1em; }\n\np {\n  font-family: 'Source Sans Pro', serif;\n  font-size: 1em;\n  line-height: 1.5em; }\n\n.hint {\n  opacity: 0.6; }\n\nheader {\n  padding-top: 4em;\n  text-align: center;\n  padding-bottom: 2em; }\n\nheader h2 {\n  font-size: 20px;\n  font-weight: 300;\n  margin-top: 2em;\n  margin-bottom: 2em; }\n\nsection h1 {\n  padding-top: 3em;\n  margin-bottom: 1em;\n  font-family: 'Source Sans Pro'; }\n\nsection h2 {\n  padding: 2px 8px;\n  background: #cfcfcf;\n  color: #000000;\n  font-size: 1.1em;\n  font-weight: 400;\n  display: inline-block; }\n\nsection ul li {\n  margin-bottom: 0.25em; }\n\n.definition__list li {\n  padding-bottom: 0.5em; }\n\n.definition__title {\n  font-style: italic;\n  color: #ababab;\n  margin-right: 0.2em; }\n\n.i__e {\n  color: #75bfff; }\n\n.i__c {\n  color: #e6d06c; }\n\nfooter {\n  text-align: center;\n  margin-top: 60px;\n  margin-bottom: 60px;\n  font-size: 2em; }\n\nfooter p {\n  font-family: 'Major Mono Display', sans-sarif;\n  font-size: 0.8em; }\n\nfooter r-logo {\n  padding-bottom: 4em; }\n\n[is='my-button'] {\n  background: #181818;\n  cursor: pointer;\n  color: #fff;\n  font-weight: 400; }\n\n[is='my-input'] {\n  background: #181818;\n  border: 0;\n  color: #fff; }\n\n.testbed {\n  display: flex;\n  justify-content: space-evenly; }\n"
},{}],"QYeV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestBedComponent = void 0;

var _core = require("./../../../../modules/core");

var _test = _interopRequireDefault(require("./test.html"));

var _test2 = _interopRequireDefault(require("./test.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

const objectModel = [{
  index: 1,
  title: 'Item 1'
}, {
  index: 2,
  title: 'Item 2'
}, {
  index: 3,
  title: 'Item 3'
}, {
  index: 4,
  title: 'Item 4'
}, {
  index: 5,
  title: 'Item 5'
}];
const arrayModel = [1, 'two', 3, 4, 'five'];
let TestBedComponent = class TestBedComponent extends _core.CustomElement {
  constructor() {
    super();
  }

  getState() {
    return {
      items: JSON.stringify(objectModel),
      subitems: JSON.stringify(arrayModel),
      message: 'message'
    };
  }

};
exports.TestBedComponent = TestBedComponent;

__decorate([(0, _core.State)()], TestBedComponent.prototype, "getState", null);

exports.TestBedComponent = TestBedComponent = __decorate([(0, _core.Component)({
  selector: 'app-testbed',
  style: _test2.default,
  template: _test.default
})], TestBedComponent);
},{"./../../../../modules/core":"yJpC","./test.html":"pDyl","./test.scss":"GrnA"}],"NzQD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TestBedComponent", {
  enumerable: true,
  get: function () {
    return _test.TestBedComponent;
  }
});

var _test = require("./test");
},{"./test":"QYeV"}],"Ws3s":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ButtonState", {
  enumerable: true,
  get: function () {
    return _button.ButtonState;
  }
});
Object.defineProperty(exports, "MyButtonComponent", {
  enumerable: true,
  get: function () {
    return _button.MyButtonComponent;
  }
});
Object.defineProperty(exports, "RCodeComponent", {
  enumerable: true,
  get: function () {
    return _code.RCodeComponent;
  }
});
Object.defineProperty(exports, "MyCounter", {
  enumerable: true,
  get: function () {
    return _counter.MyCounter;
  }
});
Object.defineProperty(exports, "RHeadlineComponent", {
  enumerable: true,
  get: function () {
    return _headline.RHeadlineComponent;
  }
});
Object.defineProperty(exports, "MyInputComponent", {
  enumerable: true,
  get: function () {
    return _input.MyInputComponent;
  }
});
Object.defineProperty(exports, "MyItemComponent", {
  enumerable: true,
  get: function () {
    return _item.MyItemComponent;
  }
});
Object.defineProperty(exports, "MyListComponent", {
  enumerable: true,
  get: function () {
    return _list.MyListComponent;
  }
});
Object.defineProperty(exports, "RLogoComponent", {
  enumerable: true,
  get: function () {
    return _logo.RLogoComponent;
  }
});
Object.defineProperty(exports, "RMainNavComponent", {
  enumerable: true,
  get: function () {
    return _mainNav.RMainNavComponent;
  }
});
Object.defineProperty(exports, "RMeterComponent", {
  enumerable: true,
  get: function () {
    return _meter.RMeterComponent;
  }
});
Object.defineProperty(exports, "RSideNavComponent", {
  enumerable: true,
  get: function () {
    return _sideNav.RSideNavComponent;
  }
});
Object.defineProperty(exports, "RStatsComponent", {
  enumerable: true,
  get: function () {
    return _stats.RStatsComponent;
  }
});
Object.defineProperty(exports, "AtomComponent", {
  enumerable: true,
  get: function () {
    return _atom.AtomComponent;
  }
});
Object.defineProperty(exports, "NodeComponent", {
  enumerable: true,
  get: function () {
    return _node.NodeComponent;
  }
});
Object.defineProperty(exports, "TreeComponent", {
  enumerable: true,
  get: function () {
    return _tree.TreeComponent;
  }
});
Object.defineProperty(exports, "HomeComponent", {
  enumerable: true,
  get: function () {
    return _home.HomeComponent;
  }
});
Object.defineProperty(exports, "PerformanceTestComponent", {
  enumerable: true,
  get: function () {
    return _perf.PerformanceTestComponent;
  }
});
Object.defineProperty(exports, "QueryComponent", {
  enumerable: true,
  get: function () {
    return _query.QueryComponent;
  }
});
Object.defineProperty(exports, "TestBedComponent", {
  enumerable: true,
  get: function () {
    return _test.TestBedComponent;
  }
});

var _button = require("./component/button");

var _code = require("./component/code");

var _counter = require("./component/counter");

var _headline = require("./component/headline");

var _input = require("./component/input");

var _item = require("./component/item");

var _list = require("./component/list");

var _logo = require("./component/logo");

var _mainNav = require("./component/main-nav");

var _meter = require("./component/meter");

var _sideNav = require("./component/side-nav");

var _stats = require("./component/stats");

var _atom = require("./component/tree/atom");

var _node = require("./component/tree/node");

var _tree = require("./component/tree/tree");

var _home = require("./view/home");

var _perf = require("./view/perf");

var _query = require("./view/query");

var _test = require("./view/test");
},{"./component/button":"WwiA","./component/code":"sxN8","./component/counter":"HzZx","./component/headline":"fJgt","./component/input":"pQER","./component/item":"gN3Z","./component/list":"GX6A","./component/logo":"ShnT","./component/main-nav":"gAYE","./component/meter":"hbGM","./component/side-nav":"yOn5","./component/stats":"E2rk","./component/tree/atom":"cpXY","./component/tree/node":"mQR8","./component/tree/tree":"iRJc","./view/home":"Zx8e","./view/perf":"Y0k7","./view/query":"RQTT","./view/test":"NzQD"}],"QCba":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  TemplateRepeater: true,
  Repeater: true
};
Object.defineProperty(exports, "TemplateRepeater", {
  enumerable: true,
  get: function () {
    return _repeatr.TemplateRepeater;
  }
});
Object.defineProperty(exports, "Repeater", {
  enumerable: true,
  get: function () {
    return _repeatr.Repeater;
  }
});

var _routing = require("./app/routing");

var _repeatr = require("./../modules/dom/repeatr");

var _app = require("./app");

Object.keys(_app).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _app[key];
    }
  });
});
window['clientRouter'] = new _routing.Router('#root', _routing.routing);
},{"./app/routing":"J0eU","./../modules/dom/repeatr":"UBvq","./app":"Ws3s"}],"ARet":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"yU0Q":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"ARet"}],"OkSu":[function(require,module,exports) {
module.exports = function loadHTMLBundle(bundle) {
  return fetch(bundle).then(function (res) {
    return res.text();
  });
};
},{}],0:[function(require,module,exports) {
var b=require("yU0Q");b.register("html",require("OkSu"));b.load([["home.8f6e152d.html","m5eZ"],["perf.1ed8496c.html","nF9K"],["query.f10bc655.html","iCVQ"],["test.f2c55edf.html","pDyl"]]).then(function(){require("QCba");});
},{}]},{},[0], null)