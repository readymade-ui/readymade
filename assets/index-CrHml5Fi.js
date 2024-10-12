(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
/*! (c) Andrea Giammarchi @webreflection ISC */
(function() {
  var attributesObserver = function(whenDefined2, MutationObserver2) {
    var attributeChanged = function attributeChanged2(records) {
      for (var i = 0, length = records.length; i < length; i++) dispatch(records[i]);
    };
    var dispatch = function dispatch2(_ref2) {
      var target = _ref2.target, attributeName = _ref2.attributeName, oldValue = _ref2.oldValue;
      target.attributeChangedCallback(attributeName, oldValue, target.getAttribute(attributeName));
    };
    return function(target, is2) {
      var attributeFilter = target.constructor.observedAttributes;
      if (attributeFilter) {
        whenDefined2(is2).then(function() {
          new MutationObserver2(attributeChanged).observe(target, {
            attributes: true,
            attributeOldValue: true,
            attributeFilter
          });
          for (var i = 0, length = attributeFilter.length; i < length; i++) {
            if (target.hasAttribute(attributeFilter[i])) dispatch({
              target,
              attributeName: attributeFilter[i],
              oldValue: null
            });
          }
        });
      }
      return target;
    };
  };
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        if (it) o = it;
        var i = 0;
        var F = function() {
        };
        return {
          s: F,
          n: function() {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function(e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
      s: function() {
        it = it.call(o);
      },
      n: function() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function(e) {
        didErr = true;
        err = e;
      },
      f: function() {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  /*! (c) Andrea Giammarchi - ISC */
  var TRUE = true, FALSE = false, QSA$1 = "querySelectorAll";
  var notify = function notify2(callback) {
    var root = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document;
    var MO = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : MutationObserver;
    var query2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ["*"];
    var loop = function loop2(nodes, selectors, added, removed, connected, pass) {
      var _iterator = _createForOfIteratorHelper(nodes), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var node = _step.value;
          if (pass || QSA$1 in node) {
            if (connected) {
              if (!added.has(node)) {
                added.add(node);
                removed["delete"](node);
                callback(node, connected);
              }
            } else if (!removed.has(node)) {
              removed.add(node);
              added["delete"](node);
              callback(node, connected);
            }
            if (!pass) loop2(node[QSA$1](selectors), selectors, added, removed, connected, TRUE);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };
    var mo = new MO(function(records) {
      if (query2.length) {
        var selectors = query2.join(",");
        var added = /* @__PURE__ */ new Set(), removed = /* @__PURE__ */ new Set();
        var _iterator2 = _createForOfIteratorHelper(records), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var _step2$value = _step2.value, addedNodes = _step2$value.addedNodes, removedNodes = _step2$value.removedNodes;
            loop(removedNodes, selectors, added, removed, FALSE, FALSE);
            loop(addedNodes, selectors, added, removed, TRUE, FALSE);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    });
    var observe = mo.observe;
    (mo.observe = function(node) {
      return observe.call(mo, node, {
        subtree: TRUE,
        childList: TRUE
      });
    })(root);
    return mo;
  };
  var QSA = "querySelectorAll";
  var _self$1 = self, document$2 = _self$1.document, Element$1 = _self$1.Element, MutationObserver$2 = _self$1.MutationObserver, Set$2 = _self$1.Set, WeakMap$1 = _self$1.WeakMap;
  var elements = function elements2(element) {
    return QSA in element;
  };
  var filter2 = [].filter;
  var qsaObserver = function(options) {
    var live = new WeakMap$1();
    var drop = function drop2(elements2) {
      for (var i = 0, length = elements2.length; i < length; i++) live["delete"](elements2[i]);
    };
    var flush = function flush2() {
      var records = observer.takeRecords();
      for (var i = 0, length = records.length; i < length; i++) {
        parse2(filter2.call(records[i].removedNodes, elements), false);
        parse2(filter2.call(records[i].addedNodes, elements), true);
      }
    };
    var matches = function matches2(element) {
      return element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
    };
    var notifier = function notifier2(element, connected) {
      var selectors;
      if (connected) {
        for (var q, m = matches(element), i = 0, length = query2.length; i < length; i++) {
          if (m.call(element, q = query2[i])) {
            if (!live.has(element)) live.set(element, new Set$2());
            selectors = live.get(element);
            if (!selectors.has(q)) {
              selectors.add(q);
              options.handle(element, connected, q);
            }
          }
        }
      } else if (live.has(element)) {
        selectors = live.get(element);
        live["delete"](element);
        selectors.forEach(function(q2) {
          options.handle(element, connected, q2);
        });
      }
    };
    var parse2 = function parse3(elements2) {
      var connected = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      for (var i = 0, length = elements2.length; i < length; i++) notifier(elements2[i], connected);
    };
    var query2 = options.query;
    var root = options.root || document$2;
    var observer = notify(notifier, root, MutationObserver$2, query2);
    var attachShadow3 = Element$1.prototype.attachShadow;
    if (attachShadow3) Element$1.prototype.attachShadow = function(init) {
      var shadowRoot = attachShadow3.call(this, init);
      observer.observe(shadowRoot);
      return shadowRoot;
    };
    if (query2.length) parse2(root[QSA](query2));
    return {
      drop,
      flush,
      observer,
      parse: parse2
    };
  };
  var _self = self, document$1 = _self.document, Map = _self.Map, MutationObserver$1 = _self.MutationObserver, Object$1 = _self.Object, Set$1 = _self.Set, WeakMap = _self.WeakMap, Element2 = _self.Element, HTMLElement2 = _self.HTMLElement, Node2 = _self.Node, Error2 = _self.Error, TypeError$1 = _self.TypeError, Reflect = _self.Reflect;
  var defineProperty = Object$1.defineProperty, keys = Object$1.keys, getOwnPropertyNames = Object$1.getOwnPropertyNames, setPrototypeOf = Object$1.setPrototypeOf;
  var legacy = !self.customElements;
  var expando = function expando2(element) {
    var key = keys(element);
    var value = [];
    var ignore = new Set$1();
    var length = key.length;
    for (var i = 0; i < length; i++) {
      value[i] = element[key[i]];
      try {
        delete element[key[i]];
      } catch (SafariTP) {
        ignore.add(i);
      }
    }
    return function() {
      for (var _i = 0; _i < length; _i++) ignore.has(_i) || (element[key[_i]] = value[_i]);
    };
  };
  if (legacy) {
    var HTMLBuiltIn = function HTMLBuiltIn2() {
      var constructor = this.constructor;
      if (!classes.has(constructor)) throw new TypeError$1("Illegal constructor");
      var is2 = classes.get(constructor);
      if (override) return augment(override, is2);
      var element = createElement.call(document$1, is2);
      return augment(setPrototypeOf(element, constructor.prototype), is2);
    };
    var createElement = document$1.createElement;
    var classes = new Map();
    var defined = new Map();
    var prototypes = new Map();
    var registry = new Map();
    var query = [];
    var handle = function handle2(element, connected, selector) {
      var proto = prototypes.get(selector);
      if (connected && !proto.isPrototypeOf(element)) {
        var redefine = expando(element);
        override = setPrototypeOf(element, proto);
        try {
          new proto.constructor();
        } finally {
          override = null;
          redefine();
        }
      }
      var method = "".concat(connected ? "" : "dis", "connectedCallback");
      if (method in proto) element[method]();
    };
    var _qsaObserver = qsaObserver({
      query,
      handle
    }), parse = _qsaObserver.parse;
    var override = null;
    var whenDefined = function whenDefined2(name) {
      if (!defined.has(name)) {
        var _, $ = new Promise(function($2) {
          _ = $2;
        });
        defined.set(name, {
          $,
          _
        });
      }
      return defined.get(name).$;
    };
    var augment = attributesObserver(whenDefined, MutationObserver$1);
    self.customElements = {
      define: function define2(is2, Class) {
        if (registry.has(is2)) throw new Error2('the name "'.concat(is2, '" has already been used with this registry'));
        classes.set(Class, is2);
        prototypes.set(is2, Class.prototype);
        registry.set(is2, Class);
        query.push(is2);
        whenDefined(is2).then(function() {
          parse(document$1.querySelectorAll(is2));
        });
        defined.get(is2)._(Class);
      },
      get: function get2(is2) {
        return registry.get(is2);
      },
      whenDefined
    };
    defineProperty(HTMLBuiltIn.prototype = HTMLElement2.prototype, "constructor", {
      value: HTMLBuiltIn
    });
    self.HTMLElement = HTMLBuiltIn;
    document$1.createElement = function(name, options) {
      var is2 = options && options.is;
      var Class = is2 ? registry.get(is2) : registry.get(name);
      return Class ? new Class() : createElement.call(document$1, name);
    };
    if (!("isConnected" in Node2.prototype)) defineProperty(Node2.prototype, "isConnected", {
      configurable: true,
      get: function get2() {
        return !(this.ownerDocument.compareDocumentPosition(this) & this.DOCUMENT_POSITION_DISCONNECTED);
      }
    });
  } else {
    legacy = !self.customElements.get("extends-br");
    if (legacy) {
      try {
        var BR = function BR2() {
          return self.Reflect.construct(HTMLBRElement, [], BR2);
        };
        BR.prototype = HTMLLIElement.prototype;
        var is = "extends-br";
        self.customElements.define("extends-br", BR, {
          "extends": "br"
        });
        legacy = document$1.createElement("br", {
          is
        }).outerHTML.indexOf(is) < 0;
        var _self$customElements = self.customElements, get = _self$customElements.get, _whenDefined = _self$customElements.whenDefined;
        self.customElements.whenDefined = function(is2) {
          var _this = this;
          return _whenDefined.call(this, is2).then(function(Class) {
            return Class || get.call(_this, is2);
          });
        };
      } catch (o_O) {
      }
    }
  }
  if (legacy) {
    var _parseShadow = function _parseShadow2(element) {
      var root = shadowRoots.get(element);
      _parse(root.querySelectorAll(this), element.isConnected);
    };
    var customElements2 = self.customElements;
    var _createElement = document$1.createElement;
    var define = customElements2.define, _get = customElements2.get, upgrade = customElements2.upgrade;
    var _ref = Reflect || {
      construct: function construct2(HTMLElement3) {
        return HTMLElement3.call(this);
      }
    }, construct = _ref.construct;
    var shadowRoots = new WeakMap();
    var shadows = new Set$1();
    var _classes = new Map();
    var _defined = new Map();
    var _prototypes = new Map();
    var _registry = new Map();
    var shadowed = [];
    var _query = [];
    var getCE = function getCE2(is2) {
      return _registry.get(is2) || _get.call(customElements2, is2);
    };
    var _handle = function _handle2(element, connected, selector) {
      var proto = _prototypes.get(selector);
      if (connected && !proto.isPrototypeOf(element)) {
        var redefine = expando(element);
        _override = setPrototypeOf(element, proto);
        try {
          new proto.constructor();
        } finally {
          _override = null;
          redefine();
        }
      }
      var method = "".concat(connected ? "" : "dis", "connectedCallback");
      if (method in proto) element[method]();
    };
    var _qsaObserver2 = qsaObserver({
      query: _query,
      handle: _handle
    }), _parse = _qsaObserver2.parse;
    var _qsaObserver3 = qsaObserver({
      query: shadowed,
      handle: function handle2(element, connected) {
        if (shadowRoots.has(element)) {
          if (connected) shadows.add(element);
          else shadows["delete"](element);
          if (_query.length) _parseShadow.call(_query, element);
        }
      }
    }), parseShadowed = _qsaObserver3.parse;
    var attachShadow2 = Element2.prototype.attachShadow;
    if (attachShadow2) Element2.prototype.attachShadow = function(init) {
      var root = attachShadow2.call(this, init);
      shadowRoots.set(this, root);
      return root;
    };
    var _whenDefined2 = function _whenDefined22(name) {
      if (!_defined.has(name)) {
        var _, $ = new Promise(function($2) {
          _ = $2;
        });
        _defined.set(name, {
          $,
          _
        });
      }
      return _defined.get(name).$;
    };
    var _augment = attributesObserver(_whenDefined2, MutationObserver$1);
    var _override = null;
    getOwnPropertyNames(self).filter(function(k) {
      return /^HTML.*Element$/.test(k);
    }).forEach(function(k) {
      var HTMLElement3 = self[k];
      function HTMLBuiltIn2() {
        var constructor = this.constructor;
        if (!_classes.has(constructor)) throw new TypeError$1("Illegal constructor");
        var _classes$get = _classes.get(constructor), is2 = _classes$get.is, tag = _classes$get.tag;
        if (is2) {
          if (_override) return _augment(_override, is2);
          var element = _createElement.call(document$1, tag);
          element.setAttribute("is", is2);
          return _augment(setPrototypeOf(element, constructor.prototype), is2);
        } else return construct.call(this, HTMLElement3, [], constructor);
      }
      defineProperty(HTMLBuiltIn2.prototype = HTMLElement3.prototype, "constructor", {
        value: HTMLBuiltIn2
      });
      defineProperty(self, k, {
        value: HTMLBuiltIn2
      });
    });
    document$1.createElement = function(name, options) {
      var is2 = options && options.is;
      if (is2) {
        var Class = _registry.get(is2);
        if (Class && _classes.get(Class).tag === name) return new Class();
      }
      var element = _createElement.call(document$1, name);
      if (is2) element.setAttribute("is", is2);
      return element;
    };
    customElements2.get = getCE;
    customElements2.whenDefined = _whenDefined2;
    customElements2.upgrade = function(element) {
      var is2 = element.getAttribute("is");
      if (is2) {
        var _constructor = _registry.get(is2);
        if (_constructor) {
          _augment(setPrototypeOf(element, _constructor.prototype), is2);
          return;
        }
      }
      upgrade.call(customElements2, element);
    };
    customElements2.define = function(is2, Class, options) {
      if (getCE(is2)) throw new Error2("'".concat(is2, "' has already been defined as a custom element"));
      var selector;
      var tag = options && options["extends"];
      _classes.set(Class, tag ? {
        is: is2,
        tag
      } : {
        is: "",
        tag: is2
      });
      if (tag) {
        selector = "".concat(tag, '[is="').concat(is2, '"]');
        _prototypes.set(selector, Class.prototype);
        _registry.set(is2, Class);
        _query.push(selector);
      } else {
        define.apply(customElements2, arguments);
        shadowed.push(selector = is2);
      }
      _whenDefined2(is2).then(function() {
        if (tag) {
          _parse(document$1.querySelectorAll(selector));
          shadows.forEach(_parseShadow, [selector]);
        } else parseShadowed(document$1.querySelectorAll(selector));
      });
      _defined.get(is2)._(Class);
    };
  }
})();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var prism = { exports: {} };
(function(module) {
  var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
  /**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   */
  var Prism2 = function(_self2) {
    var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
    var uniqueId = 0;
    var plainTextGrammar = {};
    var _ = {
      /**
       * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
       * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
       * additional languages or plugins yourself.
       *
       * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
       *
       * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.manual = true;
       * // add a new <script> to load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      manual: _self2.Prism && _self2.Prism.manual,
      /**
       * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
       * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
       * own worker, you don't want it to do this.
       *
       * By setting this value to `true`, Prism will not add its own listeners to the worker.
       *
       * You obviously have to change this value before Prism executes. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.disableWorkerMessageHandler = true;
       * // Load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
      /**
       * A namespace for utility methods.
       *
       * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
       * change or disappear at any time.
       *
       * @namespace
       * @memberof Prism
       */
      util: {
        encode: function encode(tokens) {
          if (tokens instanceof Token) {
            return new Token(tokens.type, encode(tokens.content), tokens.alias);
          } else if (Array.isArray(tokens)) {
            return tokens.map(encode);
          } else {
            return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          }
        },
        /**
         * Returns the name of the type of the given value.
         *
         * @param {any} o
         * @returns {string}
         * @example
         * type(null)      === 'Null'
         * type(undefined) === 'Undefined'
         * type(123)       === 'Number'
         * type('foo')     === 'String'
         * type(true)      === 'Boolean'
         * type([1, 2])    === 'Array'
         * type({})        === 'Object'
         * type(String)    === 'Function'
         * type(/abc+/)    === 'RegExp'
         */
        type: function(o) {
          return Object.prototype.toString.call(o).slice(8, -1);
        },
        /**
         * Returns a unique number for the given object. Later calls will still return the same number.
         *
         * @param {Object} obj
         * @returns {number}
         */
        objId: function(obj) {
          if (!obj["__id"]) {
            Object.defineProperty(obj, "__id", { value: ++uniqueId });
          }
          return obj["__id"];
        },
        /**
         * Creates a deep clone of the given object.
         *
         * The main intended use of this function is to clone language definitions.
         *
         * @param {T} o
         * @param {Record<number, any>} [visited]
         * @returns {T}
         * @template T
         */
        clone: function deepClone(o, visited) {
          visited = visited || {};
          var clone;
          var id;
          switch (_.util.type(o)) {
            case "Object":
              id = _.util.objId(o);
              if (visited[id]) {
                return visited[id];
              }
              clone = /** @type {Record<string, any>} */
              {};
              visited[id] = clone;
              for (var key in o) {
                if (o.hasOwnProperty(key)) {
                  clone[key] = deepClone(o[key], visited);
                }
              }
              return (
                /** @type {any} */
                clone
              );
            case "Array":
              id = _.util.objId(o);
              if (visited[id]) {
                return visited[id];
              }
              clone = [];
              visited[id] = clone;
              /** @type {Array} */
              /** @type {any} */
              o.forEach(function(v, i) {
                clone[i] = deepClone(v, visited);
              });
              return (
                /** @type {any} */
                clone
              );
            default:
              return o;
          }
        },
        /**
         * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
         *
         * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
         *
         * @param {Element} element
         * @returns {string}
         */
        getLanguage: function(element) {
          while (element) {
            var m = lang.exec(element.className);
            if (m) {
              return m[1].toLowerCase();
            }
            element = element.parentElement;
          }
          return "none";
        },
        /**
         * Sets the Prism `language-xxxx` class of the given element.
         *
         * @param {Element} element
         * @param {string} language
         * @returns {void}
         */
        setLanguage: function(element, language) {
          element.className = element.className.replace(RegExp(lang, "gi"), "");
          element.classList.add("language-" + language);
        },
        /**
         * Returns the script element that is currently executing.
         *
         * This does __not__ work for line script element.
         *
         * @returns {HTMLScriptElement | null}
         */
        currentScript: function() {
          if (typeof document === "undefined") {
            return null;
          }
          if ("currentScript" in document && 1 < 2) {
            return (
              /** @type {any} */
              document.currentScript
            );
          }
          try {
            throw new Error();
          } catch (err) {
            var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
            if (src) {
              var scripts = document.getElementsByTagName("script");
              for (var i in scripts) {
                if (scripts[i].src == src) {
                  return scripts[i];
                }
              }
            }
            return null;
          }
        },
        /**
         * Returns whether a given class is active for `element`.
         *
         * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
         * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
         * given class is just the given class with a `no-` prefix.
         *
         * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
         * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
         * ancestors have the given class or the negated version of it, then the default activation will be returned.
         *
         * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
         * version of it, the class is considered active.
         *
         * @param {Element} element
         * @param {string} className
         * @param {boolean} [defaultActivation=false]
         * @returns {boolean}
         */
        isActive: function(element, className, defaultActivation) {
          var no = "no-" + className;
          while (element) {
            var classList = element.classList;
            if (classList.contains(className)) {
              return true;
            }
            if (classList.contains(no)) {
              return false;
            }
            element = element.parentElement;
          }
          return !!defaultActivation;
        }
      },
      /**
       * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
       *
       * @namespace
       * @memberof Prism
       * @public
       */
      languages: {
        /**
         * The grammar for plain, unformatted text.
         */
        plain: plainTextGrammar,
        plaintext: plainTextGrammar,
        text: plainTextGrammar,
        txt: plainTextGrammar,
        /**
         * Creates a deep copy of the language with the given id and appends the given tokens.
         *
         * If a token in `redef` also appears in the copied language, then the existing token in the copied language
         * will be overwritten at its original position.
         *
         * ## Best practices
         *
         * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
         * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
         * understand the language definition because, normally, the order of tokens matters in Prism grammars.
         *
         * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
         * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
         *
         * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
         * @param {Grammar} redef The new tokens to append.
         * @returns {Grammar} The new language created.
         * @public
         * @example
         * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
         *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
         *     // at its original position
         *     'comment': { ... },
         *     // CSS doesn't have a 'color' token, so this token will be appended
         *     'color': /\b(?:red|green|blue)\b/
         * });
         */
        extend: function(id, redef) {
          var lang2 = _.util.clone(_.languages[id]);
          for (var key in redef) {
            lang2[key] = redef[key];
          }
          return lang2;
        },
        /**
         * Inserts tokens _before_ another token in a language definition or any other grammar.
         *
         * ## Usage
         *
         * This helper method makes it easy to modify existing languages. For example, the CSS language definition
         * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
         * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
         * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
         * this:
         *
         * ```js
         * Prism.languages.markup.style = {
         *     // token
         * };
         * ```
         *
         * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
         * before existing tokens. For the CSS example above, you would use it like this:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'cdata', {
         *     'style': {
         *         // token
         *     }
         * });
         * ```
         *
         * ## Special cases
         *
         * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
         * will be ignored.
         *
         * This behavior can be used to insert tokens after `before`:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'comment', {
         *     'comment': Prism.languages.markup.comment,
         *     // tokens after 'comment'
         * });
         * ```
         *
         * ## Limitations
         *
         * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
         * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
         * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
         * deleting properties which is necessary to insert at arbitrary positions.
         *
         * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
         * Instead, it will create a new object and replace all references to the target object with the new one. This
         * can be done without temporarily deleting properties, so the iteration order is well-defined.
         *
         * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
         * you hold the target object in a variable, then the value of the variable will not change.
         *
         * ```js
         * var oldMarkup = Prism.languages.markup;
         * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
         *
         * assert(oldMarkup !== Prism.languages.markup);
         * assert(newMarkup === Prism.languages.markup);
         * ```
         *
         * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
         * object to be modified.
         * @param {string} before The key to insert before.
         * @param {Grammar} insert An object containing the key-value pairs to be inserted.
         * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
         * object to be modified.
         *
         * Defaults to `Prism.languages`.
         * @returns {Grammar} The new grammar object.
         * @public
         */
        insertBefore: function(inside, before, insert, root) {
          root = root || /** @type {any} */
          _.languages;
          var grammar = root[inside];
          var ret = {};
          for (var token in grammar) {
            if (grammar.hasOwnProperty(token)) {
              if (token == before) {
                for (var newToken in insert) {
                  if (insert.hasOwnProperty(newToken)) {
                    ret[newToken] = insert[newToken];
                  }
                }
              }
              if (!insert.hasOwnProperty(token)) {
                ret[token] = grammar[token];
              }
            }
          }
          var old = root[inside];
          root[inside] = ret;
          _.languages.DFS(_.languages, function(key, value) {
            if (value === old && key != inside) {
              this[key] = ret;
            }
          });
          return ret;
        },
        // Traverse a language definition with Depth First Search
        DFS: function DFS(o, callback, type, visited) {
          visited = visited || {};
          var objId = _.util.objId;
          for (var i in o) {
            if (o.hasOwnProperty(i)) {
              callback.call(o, i, o[i], type || i);
              var property = o[i];
              var propertyType = _.util.type(property);
              if (propertyType === "Object" && !visited[objId(property)]) {
                visited[objId(property)] = true;
                DFS(property, callback, null, visited);
              } else if (propertyType === "Array" && !visited[objId(property)]) {
                visited[objId(property)] = true;
                DFS(property, callback, i, visited);
              }
            }
          }
        }
      },
      plugins: {},
      /**
       * This is the most high-level function in Prism’s API.
       * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
       * each one of them.
       *
       * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
       *
       * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
       * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
       * @memberof Prism
       * @public
       */
      highlightAll: function(async, callback) {
        _.highlightAllUnder(document, async, callback);
      },
      /**
       * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
       * {@link Prism.highlightElement} on each one of them.
       *
       * The following hooks will be run:
       * 1. `before-highlightall`
       * 2. `before-all-elements-highlight`
       * 3. All hooks of {@link Prism.highlightElement} for each element.
       *
       * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
       * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
       * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
       * @memberof Prism
       * @public
       */
      highlightAllUnder: function(container, async, callback) {
        var env = {
          callback,
          container,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        _.hooks.run("before-highlightall", env);
        env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
        _.hooks.run("before-all-elements-highlight", env);
        for (var i = 0, element; element = env.elements[i++]; ) {
          _.highlightElement(element, async === true, env.callback);
        }
      },
      /**
       * Highlights the code inside a single element.
       *
       * The following hooks will be run:
       * 1. `before-sanity-check`
       * 2. `before-highlight`
       * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
       * 4. `before-insert`
       * 5. `after-highlight`
       * 6. `complete`
       *
       * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
       * the element's language.
       *
       * @param {Element} element The element containing the code.
       * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
       * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
       * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
       * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
       *
       * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
       * asynchronous highlighting to work. You can build your own bundle on the
       * [Download page](https://prismjs.com/download.html).
       * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
       * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
       * @memberof Prism
       * @public
       */
      highlightElement: function(element, async, callback) {
        var language = _.util.getLanguage(element);
        var grammar = _.languages[language];
        _.util.setLanguage(element, language);
        var parent = element.parentElement;
        if (parent && parent.nodeName.toLowerCase() === "pre") {
          _.util.setLanguage(parent, language);
        }
        var code = element.textContent;
        var env = {
          element,
          language,
          grammar,
          code
        };
        function insertHighlightedCode(highlightedCode) {
          env.highlightedCode = highlightedCode;
          _.hooks.run("before-insert", env);
          env.element.innerHTML = env.highlightedCode;
          _.hooks.run("after-highlight", env);
          _.hooks.run("complete", env);
          callback && callback.call(env.element);
        }
        _.hooks.run("before-sanity-check", env);
        parent = env.element.parentElement;
        if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
          parent.setAttribute("tabindex", "0");
        }
        if (!env.code) {
          _.hooks.run("complete", env);
          callback && callback.call(env.element);
          return;
        }
        _.hooks.run("before-highlight", env);
        if (!env.grammar) {
          insertHighlightedCode(_.util.encode(env.code));
          return;
        }
        if (async && _self2.Worker) {
          var worker = new Worker(_.filename);
          worker.onmessage = function(evt) {
            insertHighlightedCode(evt.data);
          };
          worker.postMessage(JSON.stringify({
            language: env.language,
            code: env.code,
            immediateClose: true
          }));
        } else {
          insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
        }
      },
      /**
       * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
       * and the language definitions to use, and returns a string with the HTML produced.
       *
       * The following hooks will be run:
       * 1. `before-tokenize`
       * 2. `after-tokenize`
       * 3. `wrap`: On each {@link Token}.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @param {string} language The name of the language definition passed to `grammar`.
       * @returns {string} The highlighted HTML.
       * @memberof Prism
       * @public
       * @example
       * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
       */
      highlight: function(text, grammar, language) {
        var env = {
          code: text,
          grammar,
          language
        };
        _.hooks.run("before-tokenize", env);
        if (!env.grammar) {
          throw new Error('The language "' + env.language + '" has no grammar.');
        }
        env.tokens = _.tokenize(env.code, env.grammar);
        _.hooks.run("after-tokenize", env);
        return Token.stringify(_.util.encode(env.tokens), env.language);
      },
      /**
       * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
       * and the language definitions to use, and returns an array with the tokenized code.
       *
       * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
       *
       * This method could be useful in other contexts as well, as a very crude parser.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @returns {TokenStream} An array of strings and tokens, a token stream.
       * @memberof Prism
       * @public
       * @example
       * let code = `var foo = 0;`;
       * let tokens = Prism.tokenize(code, Prism.languages.javascript);
       * tokens.forEach(token => {
       *     if (token instanceof Prism.Token && token.type === 'number') {
       *         console.log(`Found numeric literal: ${token.content}`);
       *     }
       * });
       */
      tokenize: function(text, grammar) {
        var rest = grammar.rest;
        if (rest) {
          for (var token in rest) {
            grammar[token] = rest[token];
          }
          delete grammar.rest;
        }
        var tokenList = new LinkedList();
        addAfter(tokenList, tokenList.head, text);
        matchGrammar(text, tokenList, grammar, tokenList.head, 0);
        return toArray(tokenList);
      },
      /**
       * @namespace
       * @memberof Prism
       * @public
       */
      hooks: {
        all: {},
        /**
         * Adds the given callback to the list of callbacks for the given hook.
         *
         * The callback will be invoked when the hook it is registered for is run.
         * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
         *
         * One callback function can be registered to multiple hooks and the same hook multiple times.
         *
         * @param {string} name The name of the hook.
         * @param {HookCallback} callback The callback function which is given environment variables.
         * @public
         */
        add: function(name, callback) {
          var hooks = _.hooks.all;
          hooks[name] = hooks[name] || [];
          hooks[name].push(callback);
        },
        /**
         * Runs a hook invoking all registered callbacks with the given environment variables.
         *
         * Callbacks will be invoked synchronously and in the order in which they were registered.
         *
         * @param {string} name The name of the hook.
         * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
         * @public
         */
        run: function(name, env) {
          var callbacks = _.hooks.all[name];
          if (!callbacks || !callbacks.length) {
            return;
          }
          for (var i = 0, callback; callback = callbacks[i++]; ) {
            callback(env);
          }
        }
      },
      Token
    };
    _self2.Prism = _;
    function Token(type, content, alias, matchedStr) {
      this.type = type;
      this.content = content;
      this.alias = alias;
      this.length = (matchedStr || "").length | 0;
    }
    Token.stringify = function stringify(o, language) {
      if (typeof o == "string") {
        return o;
      }
      if (Array.isArray(o)) {
        var s = "";
        o.forEach(function(e) {
          s += stringify(e, language);
        });
        return s;
      }
      var env = {
        type: o.type,
        content: stringify(o.content, language),
        tag: "span",
        classes: ["token", o.type],
        attributes: {},
        language
      };
      var aliases = o.alias;
      if (aliases) {
        if (Array.isArray(aliases)) {
          Array.prototype.push.apply(env.classes, aliases);
        } else {
          env.classes.push(aliases);
        }
      }
      _.hooks.run("wrap", env);
      var attributes = "";
      for (var name in env.attributes) {
        attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
      }
      return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
    };
    function matchPattern(pattern, pos, text, lookbehind) {
      pattern.lastIndex = pos;
      var match = pattern.exec(text);
      if (match && lookbehind && match[1]) {
        var lookbehindLength = match[1].length;
        match.index += lookbehindLength;
        match[0] = match[0].slice(lookbehindLength);
      }
      return match;
    }
    function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
      for (var token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
          continue;
        }
        var patterns = grammar[token];
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        for (var j = 0; j < patterns.length; ++j) {
          if (rematch && rematch.cause == token + "," + j) {
            return;
          }
          var patternObj = patterns[j];
          var inside = patternObj.inside;
          var lookbehind = !!patternObj.lookbehind;
          var greedy = !!patternObj.greedy;
          var alias = patternObj.alias;
          if (greedy && !patternObj.pattern.global) {
            var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
            patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
          }
          var pattern = patternObj.pattern || patternObj;
          for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
            if (rematch && pos >= rematch.reach) {
              break;
            }
            var str = currentNode.value;
            if (tokenList.length > text.length) {
              return;
            }
            if (str instanceof Token) {
              continue;
            }
            var removeCount = 1;
            var match;
            if (greedy) {
              match = matchPattern(pattern, pos, text, lookbehind);
              if (!match || match.index >= text.length) {
                break;
              }
              var from = match.index;
              var to = match.index + match[0].length;
              var p = pos;
              p += currentNode.value.length;
              while (from >= p) {
                currentNode = currentNode.next;
                p += currentNode.value.length;
              }
              p -= currentNode.value.length;
              pos = p;
              if (currentNode.value instanceof Token) {
                continue;
              }
              for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                removeCount++;
                p += k.value.length;
              }
              removeCount--;
              str = text.slice(pos, p);
              match.index -= pos;
            } else {
              match = matchPattern(pattern, 0, str, lookbehind);
              if (!match) {
                continue;
              }
            }
            var from = match.index;
            var matchStr = match[0];
            var before = str.slice(0, from);
            var after = str.slice(from + matchStr.length);
            var reach = pos + str.length;
            if (rematch && reach > rematch.reach) {
              rematch.reach = reach;
            }
            var removeFrom = currentNode.prev;
            if (before) {
              removeFrom = addAfter(tokenList, removeFrom, before);
              pos += before.length;
            }
            removeRange(tokenList, removeFrom, removeCount);
            var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
            currentNode = addAfter(tokenList, removeFrom, wrapped);
            if (after) {
              addAfter(tokenList, currentNode, after);
            }
            if (removeCount > 1) {
              var nestedRematch = {
                cause: token + "," + j,
                reach
              };
              matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
              if (rematch && nestedRematch.reach > rematch.reach) {
                rematch.reach = nestedRematch.reach;
              }
            }
          }
        }
      }
    }
    function LinkedList() {
      var head = { value: null, prev: null, next: null };
      var tail = { value: null, prev: head, next: null };
      head.next = tail;
      this.head = head;
      this.tail = tail;
      this.length = 0;
    }
    function addAfter(list, node, value) {
      var next = node.next;
      var newNode = { value, prev: node, next };
      node.next = newNode;
      next.prev = newNode;
      list.length++;
      return newNode;
    }
    function removeRange(list, node, count) {
      var next = node.next;
      for (var i = 0; i < count && next !== list.tail; i++) {
        next = next.next;
      }
      node.next = next;
      next.prev = node;
      list.length -= i;
    }
    function toArray(list) {
      var array = [];
      var node = list.head.next;
      while (node !== list.tail) {
        array.push(node.value);
        node = node.next;
      }
      return array;
    }
    if (!_self2.document) {
      if (!_self2.addEventListener) {
        return _;
      }
      if (!_.disableWorkerMessageHandler) {
        _self2.addEventListener("message", function(evt) {
          var message = JSON.parse(evt.data);
          var lang2 = message.language;
          var code = message.code;
          var immediateClose = message.immediateClose;
          _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
          if (immediateClose) {
            _self2.close();
          }
        }, false);
      }
      return _;
    }
    var script = _.util.currentScript();
    if (script) {
      _.filename = script.src;
      if (script.hasAttribute("data-manual")) {
        _.manual = true;
      }
    }
    function highlightAutomaticallyCallback() {
      if (!_.manual) {
        _.highlightAll();
      }
    }
    if (!_.manual) {
      var readyState = document.readyState;
      if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
        document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
      } else {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(highlightAutomaticallyCallback);
        } else {
          window.setTimeout(highlightAutomaticallyCallback, 16);
        }
      }
    }
    return _;
  }(_self);
  if (module.exports) {
    module.exports = Prism2;
  }
  if (typeof commonjsGlobal !== "undefined") {
    commonjsGlobal.Prism = Prism2;
  }
  Prism2.languages.markup = {
    "comment": {
      pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
      greedy: true
    },
    "prolog": {
      pattern: /<\?[\s\S]+?\?>/,
      greedy: true
    },
    "doctype": {
      // https://www.w3.org/TR/xml/#NT-doctypedecl
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: true,
      inside: {
        "internal-subset": {
          pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
          lookbehind: true,
          greedy: true,
          inside: null
          // see below
        },
        "string": {
          pattern: /"[^"]*"|'[^']*'/,
          greedy: true
        },
        "punctuation": /^<!|>$|[[\]]/,
        "doctype-tag": /^DOCTYPE/i,
        "name": /[^\s<>'"]+/
      }
    },
    "cdata": {
      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
      greedy: true
    },
    "tag": {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: true,
      inside: {
        "tag": {
          pattern: /^<\/?[^\s>\/]+/,
          inside: {
            "punctuation": /^<\/?/,
            "namespace": /^[^\s>\/:]+:/
          }
        },
        "special-attr": [],
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            "punctuation": [
              {
                pattern: /^=/,
                alias: "attr-equals"
              },
              {
                pattern: /^(\s*)["']|["']$/,
                lookbehind: true
              }
            ]
          }
        },
        "punctuation": /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            "namespace": /^[^\s>\/:]+:/
          }
        }
      }
    },
    "entity": [
      {
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
      },
      /&#x?[\da-f]{1,8};/i
    ]
  };
  Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
  Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
  Prism2.hooks.add("wrap", function(env) {
    if (env.type === "entity") {
      env.attributes["title"] = env.content.replace(/&amp;/, "&");
    }
  });
  Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
    /**
     * Adds an inlined language to markup.
     *
     * An example of an inlined language is CSS with `<style>` tags.
     *
     * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addInlined('style', 'css');
     */
    value: function addInlined2(tagName, lang) {
      var includedCdataInside = {};
      includedCdataInside["language-" + lang] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: true,
        inside: Prism2.languages[lang]
      };
      includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
      var inside = {
        "included-cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: includedCdataInside
        }
      };
      inside["language-" + lang] = {
        pattern: /[\s\S]+/,
        inside: Prism2.languages[lang]
      };
      var def = {};
      def[tagName] = {
        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
          return tagName;
        }), "i"),
        lookbehind: true,
        greedy: true,
        inside
      };
      Prism2.languages.insertBefore("markup", "cdata", def);
    }
  });
  Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
    /**
     * Adds an pattern to highlight languages embedded in HTML attributes.
     *
     * An example of an inlined language is CSS with `style` attributes.
     *
     * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addAttribute('style', 'css');
     */
    value: function(attrName, lang) {
      Prism2.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
          "i"
        ),
        lookbehind: true,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              "value": {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: true,
                alias: [lang, "language-" + lang],
                inside: Prism2.languages[lang]
              },
              "punctuation": [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          }
        }
      });
    }
  });
  Prism2.languages.html = Prism2.languages.markup;
  Prism2.languages.mathml = Prism2.languages.markup;
  Prism2.languages.svg = Prism2.languages.markup;
  Prism2.languages.xml = Prism2.languages.extend("markup", {});
  Prism2.languages.ssml = Prism2.languages.xml;
  Prism2.languages.atom = Prism2.languages.xml;
  Prism2.languages.rss = Prism2.languages.xml;
  (function(Prism3) {
    var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    Prism3.languages.css = {
      "comment": /\/\*[\s\S]*?\*\//,
      "atrule": {
        pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
        inside: {
          "rule": /^@[\w-]+/,
          "selector-function-argument": {
            pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            lookbehind: true,
            alias: "selector"
          },
          "keyword": {
            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            lookbehind: true
          }
          // See rest below
        }
      },
      "url": {
        // https://drafts.csswg.org/css-values-3/#urls
        pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
        greedy: true,
        inside: {
          "function": /^url/i,
          "punctuation": /^\(|\)$/,
          "string": {
            pattern: RegExp("^" + string.source + "$"),
            alias: "url"
          }
        }
      },
      "selector": {
        pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
        lookbehind: true
      },
      "string": {
        pattern: string,
        greedy: true
      },
      "property": {
        pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        lookbehind: true
      },
      "important": /!important\b/i,
      "function": {
        pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
        lookbehind: true
      },
      "punctuation": /[(){};:,]/
    };
    Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
    var markup = Prism3.languages.markup;
    if (markup) {
      markup.tag.addInlined("style", "css");
      markup.tag.addAttribute("style", "css");
    }
  })(Prism2);
  Prism2.languages.clike = {
    "comment": [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
      }
    ],
    "string": {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: true,
      inside: {
        "punctuation": /[.\\]/
      }
    },
    "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    "boolean": /\b(?:false|true)\b/,
    "function": /\b\w+(?=\()/,
    "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    "punctuation": /[{}[\];(),.:]/
  };
  Prism2.languages.javascript = Prism2.languages.extend("clike", {
    "class-name": [
      Prism2.languages.clike["class-name"],
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: true
      }
    ],
    "keyword": [
      {
        pattern: /((?:^|\})\s*)catch\b/,
        lookbehind: true
      },
      {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: true
      }
    ],
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    "number": {
      pattern: RegExp(
        /(^|[^\w$])/.source + "(?:" + // constant
        (/NaN|Infinity/.source + "|" + // binary integer
        /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
        /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
        /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
        /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
        /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
      ),
      lookbehind: true
    },
    "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
  });
  Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
  Prism2.languages.insertBefore("javascript", "keyword", {
    "regex": {
      pattern: RegExp(
        // lookbehind
        // eslint-disable-next-line regexp/no-dupe-characters-character-class
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
        // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
        // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
        // with the only syntax, so we have to define 2 different regex patterns.
        /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
        /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
        /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
      ),
      lookbehind: true,
      greedy: true,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: true,
          alias: "language-regex",
          inside: Prism2.languages.regex
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/
      }
    },
    // This must be declared before keyword because we use "function" inside the look-forward
    "function-variable": {
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function"
    },
    "parameter": [
      {
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      },
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: true,
        inside: Prism2.languages.javascript
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      }
    ],
    "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  });
  Prism2.languages.insertBefore("javascript", "string", {
    "hashbang": {
      pattern: /^#!.*/,
      greedy: true,
      alias: "comment"
    },
    "template-string": {
      pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: true,
      inside: {
        "template-punctuation": {
          pattern: /^`|`$/,
          alias: "string"
        },
        "interpolation": {
          pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: true,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            rest: Prism2.languages.javascript
          }
        },
        "string": /[\s\S]+/
      }
    },
    "string-property": {
      pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: true,
      greedy: true,
      alias: "property"
    }
  });
  Prism2.languages.insertBefore("javascript", "operator", {
    "literal-property": {
      pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: true,
      alias: "property"
    }
  });
  if (Prism2.languages.markup) {
    Prism2.languages.markup.tag.addInlined("script", "javascript");
    Prism2.languages.markup.tag.addAttribute(
      /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
      "javascript"
    );
  }
  Prism2.languages.js = Prism2.languages.javascript;
  (function() {
    if (typeof Prism2 === "undefined" || typeof document === "undefined") {
      return;
    }
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    var LOADING_MESSAGE = "Loading…";
    var FAILURE_MESSAGE = function(status, message) {
      return "✖ Error " + status + " while fetching file: " + message;
    };
    var FAILURE_EMPTY_MESSAGE = "✖ Error: File does not exist or is empty";
    var EXTENSIONS = {
      "js": "javascript",
      "py": "python",
      "rb": "ruby",
      "ps1": "powershell",
      "psm1": "powershell",
      "sh": "bash",
      "bat": "batch",
      "h": "c",
      "tex": "latex"
    };
    var STATUS_ATTR = "data-src-status";
    var STATUS_LOADING = "loading";
    var STATUS_LOADED = "loaded";
    var STATUS_FAILED = "failed";
    var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
    function loadFile(src, success, error) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", src, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status < 400 && xhr.responseText) {
            success(xhr.responseText);
          } else {
            if (xhr.status >= 400) {
              error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
            } else {
              error(FAILURE_EMPTY_MESSAGE);
            }
          }
        }
      };
      xhr.send(null);
    }
    function parseRange(range) {
      var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
      if (m) {
        var start = Number(m[1]);
        var comma = m[2];
        var end = m[3];
        if (!comma) {
          return [start, start];
        }
        if (!end) {
          return [start, void 0];
        }
        return [start, Number(end)];
      }
      return void 0;
    }
    Prism2.hooks.add("before-highlightall", function(env) {
      env.selector += ", " + SELECTOR;
    });
    Prism2.hooks.add("before-sanity-check", function(env) {
      var pre = (
        /** @type {HTMLPreElement} */
        env.element
      );
      if (pre.matches(SELECTOR)) {
        env.code = "";
        pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
        var code = pre.appendChild(document.createElement("CODE"));
        code.textContent = LOADING_MESSAGE;
        var src = pre.getAttribute("data-src");
        var language = env.language;
        if (language === "none") {
          var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
          language = EXTENSIONS[extension] || extension;
        }
        Prism2.util.setLanguage(code, language);
        Prism2.util.setLanguage(pre, language);
        var autoloader = Prism2.plugins.autoloader;
        if (autoloader) {
          autoloader.loadLanguages(language);
        }
        loadFile(
          src,
          function(text) {
            pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
            var range = parseRange(pre.getAttribute("data-range"));
            if (range) {
              var lines = text.split(/\r\n?|\n/g);
              var start = range[0];
              var end = range[1] == null ? lines.length : range[1];
              if (start < 0) {
                start += lines.length;
              }
              start = Math.max(0, Math.min(start - 1, lines.length));
              if (end < 0) {
                end += lines.length;
              }
              end = Math.max(0, Math.min(end, lines.length));
              text = lines.slice(start, end).join("\n");
              if (!pre.hasAttribute("data-start")) {
                pre.setAttribute("data-start", String(start + 1));
              }
            }
            code.textContent = text;
            Prism2.highlightElement(code);
          },
          function(error) {
            pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
            code.textContent = error;
          }
        );
      }
    });
    Prism2.plugins.fileHighlight = {
      /**
       * Executes the File Highlight plugin for all matching `pre` elements under the given container.
       *
       * Note: Elements which are already loaded or currently loading will not be touched by this method.
       *
       * @param {ParentNode} [container=document]
       */
      highlight: function highlight(container) {
        var elements = (container || document).querySelectorAll(SELECTOR);
        for (var i = 0, element; element = elements[i++]; ) {
          Prism2.highlightElement(element);
        }
      }
    };
    var logged = false;
    Prism2.fileHighlight = function() {
      if (!logged) {
        console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
        logged = true;
      }
      Prism2.plugins.fileHighlight.highlight.apply(this, arguments);
    };
  })();
})(prism);
(function() {
  if (typeof Prism === "undefined" || typeof document === "undefined") {
    return;
  }
  var callbacks = [];
  var map = {};
  var noop = function() {
  };
  Prism.plugins.toolbar = {};
  var registerButton = Prism.plugins.toolbar.registerButton = function(key, opts) {
    var callback;
    if (typeof opts === "function") {
      callback = opts;
    } else {
      callback = function(env) {
        var element;
        if (typeof opts.onClick === "function") {
          element = document.createElement("button");
          element.type = "button";
          element.addEventListener("click", function() {
            opts.onClick.call(this, env);
          });
        } else if (typeof opts.url === "string") {
          element = document.createElement("a");
          element.href = opts.url;
        } else {
          element = document.createElement("span");
        }
        if (opts.className) {
          element.classList.add(opts.className);
        }
        element.textContent = opts.text;
        return element;
      };
    }
    if (key in map) {
      console.warn('There is a button with the key "' + key + '" registered already.');
      return;
    }
    callbacks.push(map[key] = callback);
  };
  function getOrder(element) {
    while (element) {
      var order = element.getAttribute("data-toolbar-order");
      if (order != null) {
        order = order.trim();
        if (order.length) {
          return order.split(/\s*,\s*/g);
        } else {
          return [];
        }
      }
      element = element.parentElement;
    }
  }
  var hook = Prism.plugins.toolbar.hook = function(env) {
    var pre = env.element.parentNode;
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return;
    }
    if (pre.parentNode.classList.contains("code-toolbar")) {
      return;
    }
    var wrapper = document.createElement("div");
    wrapper.classList.add("code-toolbar");
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    var toolbar = document.createElement("div");
    toolbar.classList.add("toolbar");
    var elementCallbacks = callbacks;
    var order = getOrder(env.element);
    if (order) {
      elementCallbacks = order.map(function(key) {
        return map[key] || noop;
      });
    }
    elementCallbacks.forEach(function(callback) {
      var element = callback(env);
      if (!element) {
        return;
      }
      var item = document.createElement("div");
      item.classList.add("toolbar-item");
      item.appendChild(element);
      toolbar.appendChild(item);
    });
    wrapper.appendChild(toolbar);
  };
  registerButton("label", function(env) {
    var pre = env.element.parentNode;
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return;
    }
    if (!pre.hasAttribute("data-label")) {
      return;
    }
    var element;
    var template2;
    var text = pre.getAttribute("data-label");
    try {
      template2 = document.querySelector("template#" + text);
    } catch (e) {
    }
    if (template2) {
      element = template2.content;
    } else {
      if (pre.hasAttribute("data-url")) {
        element = document.createElement("a");
        element.href = pre.getAttribute("data-url");
      } else {
        element = document.createElement("span");
      }
      element.textContent = text;
    }
    return element;
  });
  Prism.hooks.add("complete", hook);
})();
var prismNormalizeWhitespace = { exports: {} };
(function(module) {
  (function() {
    if (typeof Prism === "undefined") {
      return;
    }
    var assign = Object.assign || function(obj1, obj2) {
      for (var name in obj2) {
        if (obj2.hasOwnProperty(name)) {
          obj1[name] = obj2[name];
        }
      }
      return obj1;
    };
    function NormalizeWhitespace(defaults) {
      this.defaults = assign({}, defaults);
    }
    function toCamelCase(value) {
      return value.replace(/-(\w)/g, function(match, firstChar) {
        return firstChar.toUpperCase();
      });
    }
    function tabLen(str) {
      var res = 0;
      for (var i = 0; i < str.length; ++i) {
        if (str.charCodeAt(i) == "	".charCodeAt(0)) {
          res += 3;
        }
      }
      return str.length + res;
    }
    var settingsConfig = {
      "remove-trailing": "boolean",
      "remove-indent": "boolean",
      "left-trim": "boolean",
      "right-trim": "boolean",
      "break-lines": "number",
      "indent": "number",
      "remove-initial-line-feed": "boolean",
      "tabs-to-spaces": "number",
      "spaces-to-tabs": "number"
    };
    NormalizeWhitespace.prototype = {
      setDefaults: function(defaults) {
        this.defaults = assign(this.defaults, defaults);
      },
      normalize: function(input, settings) {
        settings = assign(this.defaults, settings);
        for (var name in settings) {
          var methodName = toCamelCase(name);
          if (name !== "normalize" && methodName !== "setDefaults" && settings[name] && this[methodName]) {
            input = this[methodName].call(this, input, settings[name]);
          }
        }
        return input;
      },
      /*
       * Normalization methods
       */
      leftTrim: function(input) {
        return input.replace(/^\s+/, "");
      },
      rightTrim: function(input) {
        return input.replace(/\s+$/, "");
      },
      tabsToSpaces: function(input, spaces) {
        spaces = spaces | 0 || 4;
        return input.replace(/\t/g, new Array(++spaces).join(" "));
      },
      spacesToTabs: function(input, spaces) {
        spaces = spaces | 0 || 4;
        return input.replace(RegExp(" {" + spaces + "}", "g"), "	");
      },
      removeTrailing: function(input) {
        return input.replace(/\s*?$/gm, "");
      },
      // Support for deprecated plugin remove-initial-line-feed
      removeInitialLineFeed: function(input) {
        return input.replace(/^(?:\r?\n|\r)/, "");
      },
      removeIndent: function(input) {
        var indents = input.match(/^[^\S\n\r]*(?=\S)/gm);
        if (!indents || !indents[0].length) {
          return input;
        }
        indents.sort(function(a, b) {
          return a.length - b.length;
        });
        if (!indents[0].length) {
          return input;
        }
        return input.replace(RegExp("^" + indents[0], "gm"), "");
      },
      indent: function(input, tabs) {
        return input.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++tabs).join("	") + "$&");
      },
      breakLines: function(input, characters) {
        characters = characters === true ? 80 : characters | 0 || 80;
        var lines = input.split("\n");
        for (var i = 0; i < lines.length; ++i) {
          if (tabLen(lines[i]) <= characters) {
            continue;
          }
          var line = lines[i].split(/(\s+)/g);
          var len = 0;
          for (var j = 0; j < line.length; ++j) {
            var tl = tabLen(line[j]);
            len += tl;
            if (len > characters) {
              line[j] = "\n" + line[j];
              len = tl;
            }
          }
          lines[i] = line.join("");
        }
        return lines.join("\n");
      }
    };
    if (module.exports) {
      module.exports = NormalizeWhitespace;
    }
    Prism.plugins.NormalizeWhitespace = new NormalizeWhitespace({
      "remove-trailing": true,
      "remove-indent": true,
      "left-trim": true,
      "right-trim": true
      /*'break-lines': 80,
      'indent': 2,
      'remove-initial-line-feed': false,
      'tabs-to-spaces': 4,
      'spaces-to-tabs': 4*/
    });
    Prism.hooks.add("before-sanity-check", function(env) {
      var Normalizer = Prism.plugins.NormalizeWhitespace;
      if (env.settings && env.settings["whitespace-normalization"] === false) {
        return;
      }
      if (!Prism.util.isActive(env.element, "whitespace-normalization", true)) {
        return;
      }
      if ((!env.element || !env.element.parentNode) && env.code) {
        env.code = Normalizer.normalize(env.code, env.settings);
        return;
      }
      var pre = env.element.parentNode;
      if (!env.code || !pre || pre.nodeName.toLowerCase() !== "pre") {
        return;
      }
      if (env.settings == null) {
        env.settings = {};
      }
      for (var key in settingsConfig) {
        if (Object.hasOwnProperty.call(settingsConfig, key)) {
          var settingType = settingsConfig[key];
          if (pre.hasAttribute("data-" + key)) {
            try {
              var value = JSON.parse(pre.getAttribute("data-" + key) || "true");
              if (typeof value === settingType) {
                env.settings[key] = value;
              }
            } catch (_error) {
            }
          }
        }
      }
      var children = pre.childNodes;
      var before = "";
      var after = "";
      var codeFound = false;
      for (var i = 0; i < children.length; ++i) {
        var node = children[i];
        if (node == env.element) {
          codeFound = true;
        } else if (node.nodeName === "#text") {
          if (codeFound) {
            after += node.nodeValue;
          } else {
            before += node.nodeValue;
          }
          pre.removeChild(node);
          --i;
        }
      }
      if (!env.element.children.length || !Prism.plugins.KeepMarkup) {
        env.code = before + env.code + after;
        env.code = Normalizer.normalize(env.code, env.settings);
      } else {
        var html2 = before + env.element.innerHTML + after;
        env.element.innerHTML = Normalizer.normalize(html2, env.settings);
        env.code = env.element.textContent;
      }
    });
  })();
})(prismNormalizeWhitespace);
(function(Prism2) {
  var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  Prism2.languages.css = {
    "comment": /\/\*[\s\S]*?\*\//,
    "atrule": {
      pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
      inside: {
        "rule": /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: true,
          alias: "selector"
        },
        "keyword": {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: true
        }
        // See rest below
      }
    },
    "url": {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
      greedy: true,
      inside: {
        "function": /^url/i,
        "punctuation": /^\(|\)$/,
        "string": {
          pattern: RegExp("^" + string.source + "$"),
          alias: "url"
        }
      }
    },
    "selector": {
      pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
      lookbehind: true
    },
    "string": {
      pattern: string,
      greedy: true
    },
    "property": {
      pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: true
    },
    "important": /!important\b/i,
    "function": {
      pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
      lookbehind: true
    },
    "punctuation": /[(){};:,]/
  };
  Prism2.languages.css["atrule"].inside.rest = Prism2.languages.css;
  var markup = Prism2.languages.markup;
  if (markup) {
    markup.tag.addInlined("style", "css");
    markup.tag.addAttribute("style", "css");
  }
})(Prism);
Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
      lookbehind: true
    }
  ],
  "keyword": [
    {
      pattern: /((?:^|\})\s*)catch\b/,
      lookbehind: true
    },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: true
    }
  ],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  "number": {
    pattern: RegExp(
      /(^|[^\w$])/.source + "(?:" + // constant
      (/NaN|Infinity/.source + "|" + // binary integer
      /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
      /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
      /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
      /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
      /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
    ),
    lookbehind: true
  },
  "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore("javascript", "keyword", {
  "regex": {
    pattern: RegExp(
      // lookbehind
      // eslint-disable-next-line regexp/no-dupe-characters-character-class
      /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
      // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
      // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
      // with the only syntax, so we have to define 2 different regex patterns.
      /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
      /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
      /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
    ),
    lookbehind: true,
    greedy: true,
    inside: {
      "regex-source": {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: "language-regex",
        inside: Prism.languages.regex
      },
      "regex-delimiter": /^\/|\/$/,
      "regex-flags": /^[a-z]+$/
    }
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  "function-variable": {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: "function"
  },
  "parameter": [
    {
      pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }
  ],
  "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore("javascript", "string", {
  "hashbang": {
    pattern: /^#!.*/,
    greedy: true,
    alias: "comment"
  },
  "template-string": {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: true,
    inside: {
      "template-punctuation": {
        pattern: /^`|`$/,
        alias: "string"
      },
      "interpolation": {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: true,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\$\{|\}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      "string": /[\s\S]+/
    }
  },
  "string-property": {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: true,
    greedy: true,
    alias: "property"
  }
});
Prism.languages.insertBefore("javascript", "operator", {
  "literal-property": {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    lookbehind: true,
    alias: "property"
  }
});
if (Prism.languages.markup) {
  Prism.languages.markup.tag.addInlined("script", "javascript");
  Prism.languages.markup.tag.addAttribute(
    /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
    "javascript"
  );
}
Prism.languages.js = Prism.languages.javascript;
Prism.languages.markup = {
  "comment": {
    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    greedy: true
  },
  "prolog": {
    pattern: /<\?[\s\S]+?\?>/,
    greedy: true
  },
  "doctype": {
    // https://www.w3.org/TR/xml/#NT-doctypedecl
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: true,
    inside: {
      "internal-subset": {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: true,
        greedy: true,
        inside: null
        // see below
      },
      "string": {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true
      },
      "punctuation": /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/i,
      "name": /[^\s<>'"]+/
    }
  },
  "cdata": {
    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    greedy: true
  },
  "tag": {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      "tag": {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          "punctuation": /^<\/?/,
          "namespace": /^[^\s>\/:]+:/
        }
      },
      "special-attr": [],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          "punctuation": [
            {
              pattern: /^=/,
              alias: "attr-equals"
            },
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true
            }
          ]
        }
      },
      "punctuation": /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          "namespace": /^[^\s>\/:]+:/
        }
      }
    }
  },
  "entity": [
    {
      pattern: /&[\da-z]{1,8};/i,
      alias: "named-entity"
    },
    /&#x?[\da-f]{1,8};/i
  ]
};
Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;
Prism.hooks.add("wrap", function(env) {
  if (env.type === "entity") {
    env.attributes["title"] = env.content.replace(/&amp;/, "&");
  }
});
Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
  /**
   * Adds an inlined language to markup.
   *
   * An example of an inlined language is CSS with `<style>` tags.
   *
   * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addInlined('style', 'css');
   */
  value: function addInlined(tagName, lang) {
    var includedCdataInside = {};
    includedCdataInside["language-" + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang]
    };
    includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
    var inside = {
      "included-cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside
      }
    };
    inside["language-" + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang]
    };
    var def = {};
    def[tagName] = {
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
        return tagName;
      }), "i"),
      lookbehind: true,
      greedy: true,
      inside
    };
    Prism.languages.insertBefore("markup", "cdata", def);
  }
});
Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
  /**
   * Adds an pattern to highlight languages embedded in HTML attributes.
   *
   * An example of an inlined language is CSS with `style` attributes.
   *
   * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addAttribute('style', 'css');
   */
  value: function(attrName, lang) {
    Prism.languages.markup.tag.inside["special-attr"].push({
      pattern: RegExp(
        /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
        "i"
      ),
      lookbehind: true,
      inside: {
        "attr-name": /^[^\s=]+/,
        "attr-value": {
          pattern: /=[\s\S]+/,
          inside: {
            "value": {
              pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: true,
              alias: [lang, "language-" + lang],
              inside: Prism.languages[lang]
            },
            "punctuation": [
              {
                pattern: /^=/,
                alias: "attr-equals"
              },
              /"|'/
            ]
          }
        }
      }
    });
  }
});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
Prism.languages.xml = Prism.languages.extend("markup", {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;
(function(Prism2) {
  Prism2.languages.typescript = Prism2.languages.extend("javascript", {
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: true,
      greedy: true,
      inside: null
      // see below
    },
    "builtin": /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
  });
  Prism2.languages.typescript.keyword.push(
    /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
    // keywords that have to be followed by an identifier
    /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
    // This is for `import type *, {}`
    /\btype\b(?=\s*(?:[\{*]|$))/
  );
  delete Prism2.languages.typescript["parameter"];
  delete Prism2.languages.typescript["literal-property"];
  var typeInside = Prism2.languages.extend("typescript", {});
  delete typeInside["class-name"];
  Prism2.languages.typescript["class-name"].inside = typeInside;
  Prism2.languages.insertBefore("typescript", "function", {
    "decorator": {
      pattern: /@[$\w\xA0-\uFFFF]+/,
      inside: {
        "at": {
          pattern: /^@/,
          alias: "operator"
        },
        "function": /^[\s\S]+/
      }
    },
    "generic-function": {
      // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
      greedy: true,
      inside: {
        "function": /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
        "generic": {
          pattern: /<[\s\S]+/,
          // everything after the first <
          alias: "class-name",
          inside: typeInside
        }
      }
    }
  });
  Prism2.languages.ts = Prism2.languages.typescript;
})(Prism);
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
var __defProp$u = Object.defineProperty;
var __getOwnPropDesc$u = Object.getOwnPropertyDescriptor;
var __decorateClass$u = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$u(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$u(target, key, result);
  return result;
};
function changeNode(protoNode, key, value) {
  const node = document.importNode(protoNode, true);
  let attr = "";
  node.removeAttribute("repeat");
  if (protoNode.textContent.startsWith(`{{${key}`)) {
    const path = stripTemplateString(protoNode.textContent);
    const template2 = path.substring(path.search(DOT_BRACKET_NOTATION_REGEX));
    node.textContent = protoNode.textContent.replace(
      protoNode.textContent,
      isObject(value) ? findValueByString(value, template2) : value
    );
  }
  for (const attribute of protoNode.attributes) {
    attr = attribute.nodeName || attribute.name;
    if (attr !== "repeat") {
      if (attr.includes("attr.")) {
        if (!protoNode.getAttribute(attr.replace("attr.", ""))) {
          if (attribute.nodeName) {
            attr = attribute.nodeName.replace("attr.", "");
          } else if (attribute.name) {
            attr = attribute.name.replace("attr.", "");
          }
          if (!protoNode.setAttribute) {
            node.setAttribute = () => {
            };
          }
          const path = stripTemplateString(attribute.nodeValue);
          const template2 = path.substring(
            path.search(DOT_BRACKET_NOTATION_REGEX)
          );
          protoNode.setAttribute(
            attr,
            isObject(value) ? findValueByString(value, template2) : value
          );
          const remove = attribute.nodeName || attribute.name;
          node.removeAttribute(remove);
        }
      }
      const attributeValue = attribute.nodeValue || attribute.value;
      if (attributeValue.startsWith(`{{${key}`)) {
        if (!node.setAttribute) {
          node.setAttribute = () => {
          };
        }
        const path = stripTemplateString(attributeValue);
        const template2 = path.substring(
          path.search(DOT_BRACKET_NOTATION_REGEX)
        );
        node.setAttribute(
          attr,
          attributeValue.replace(
            attributeValue,
            isObject(value) ? findValueByString(value, template2) : value
          )
        );
      }
      const check = attribute.nodeName || attribute.name;
      if (check.includes("attr.")) {
        node.removeAttribute(check);
      }
    }
  }
  protoNode.parentNode.appendChild(node);
}
function isJSON(str) {
  if (typeof str !== "string") {
    return false;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
function renderTemplate(elem, template2, items, previousNode) {
  var _a, _b;
  if (!elem.parentNode) {
    return;
  }
  const bound = items.match(/(\w*)(?:\s)(?:of)(?:\s)(.*)/);
  if (!bound.length) {
    return;
  }
  const clone = template2.content.cloneNode(true);
  const protoNode = clone.querySelector(`[repeat="${bound[1]}"]`);
  let $elem = elem;
  let model;
  for (; $elem && $elem !== document; $elem = $elem.parentNode) {
    if (($elem == null ? void 0 : $elem.host) && ((_a = $elem == null ? void 0 : $elem.host) == null ? void 0 : _a.$state) && ((_b = $elem == null ? void 0 : $elem.host) == null ? void 0 : _b.$state[bound[2]])) {
      model = isJSON($elem.host.$state[bound[2]]) ? JSON.parse($elem.host.$state[bound[2]]) : $elem.host.$state[bound[2]];
      elem.$key = bound[2];
      $elem.host.ɵɵstate.$changes.addEventListener(
        "change",
        (ev) => {
          elem.onChange(ev.detail);
        }
      );
    } else if (($elem == null ? void 0 : $elem.$state) && ($elem == null ? void 0 : $elem.$state[bound[2]])) {
      model = isJSON($elem.$state[bound[2]]) ? JSON.parse($elem.$state[bound[2]]) : $elem.$state[bound[2]];
      elem.$key = bound[2];
      $elem.ɵɵstate.$changes.addEventListener("change", (ev) => {
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
  if (elem instanceof Repeater || elem.constructor.name === "Repeater") {
    elem.appendChild(clone);
  } else if (elem instanceof TemplateRepeater || elem.constructor.name === "TemplateRepeater") {
    const div = document.createElement("div");
    div.appendChild(clone);
    div.setAttribute("target", elem.$id);
    if (previousNode) {
      elem.parentNode.replaceChild(div, previousNode);
    } else {
      elem.parentNode.appendChild(div);
    }
  }
}
let TemplateRepeater = class extends TemplateComponent {
  constructor() {
    super();
    this.$id = templateId() + uuidv4().slice(0, 6);
  }
  static get observedAttributes() {
    return ["items"];
  }
  attributeChangedCallback(name) {
    switch (name) {
      case "items":
        this.render();
        break;
    }
  }
  remove() {
    if (!this.parentNode) {
      return null;
    }
    return this.parentNode.querySelector(`[target="${this.$id}"]`);
  }
  render() {
    const previousTarget = this.remove();
    if (this.getAttribute("force") === "true") {
      setTimeout(
        () => renderTemplate(this, this, this.getAttribute("items"), previousTarget)
      );
    } else {
      renderTemplate(this, this, this.getAttribute("items"), previousTarget);
    }
  }
  onChange(change) {
    if (change[this.$key]) {
      this.render();
    }
  }
};
TemplateRepeater = __decorateClass$u([
  Component({
    selector: "r-repeat",
    custom: { extends: "template" }
  })
], TemplateRepeater);
let Repeater = class extends PseudoElement {
  constructor() {
    super();
    this.$id = templateId() + uuidv4().slice(0, 6);
  }
  static get observedAttributes() {
    return ["items", "template"];
  }
  attributeChangedCallback(name, prev, next) {
    switch (name) {
      case "template":
        this.setTemplate(next);
        break;
      case "items":
        this.render();
        break;
    }
  }
  remove() {
    this.innerHTML = "";
  }
  render() {
    const template2 = document.querySelector(`[id="${this.$templateId}"]`);
    if (template2) {
      this.remove();
      renderTemplate(this, template2, this.getAttribute("items"));
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
Repeater = __decorateClass$u([
  Component({
    selector: "r-repeatr"
  })
], Repeater);
class Router {
  constructor(root, routes, useHash) {
    if (document.querySelector(root) === null) {
      console.error(`[Router] Root element '${root}' does not exist.`);
    }
    if (!routes) {
      console.error(`[Router] initialized without any routes.`);
    }
    this.rootElement = document.querySelector(root);
    this.routes = routes;
    if (useHash === true) {
      this.hashMode = true;
    } else {
      this.hashMode = false;
    }
    this.listen();
  }
  init() {
    this.onLocationChange();
  }
  listen() {
    if (this.isPushState()) {
      window.addEventListener("popstate", this.onLocationChange.bind(this));
    } else if (this.isHashChange()) {
      window.addEventListener("hashchange", this.onLocationChange.bind(this));
    }
    this.init();
  }
  onLocationChange() {
    let path;
    if (this.hashMode && window.location.hash.length) {
      if (window.location.hash === "/#/") {
        window.location.href = window.location.origin + `/#`;
      } else {
        path = window.location.hash.replace(/^#/, "");
      }
    } else {
      if (this.hashMode && !window.location.hash.length) {
        window.location.href = window.location.origin + `/#${window.location.pathname}`;
      } else {
        path = window.location.pathname.replace(/\/$/, "");
      }
    }
    if (path === "") {
      path = "/";
    }
    if (this.matchRoute(path)) {
      this.navigate(path);
    }
  }
  decodeQuery() {
    if (window.location.search.length === 0) {
      return {};
    }
    const search = window.location.search.substring(1);
    return JSON.parse(
      '{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
    );
  }
  parseQuery(route) {
    return new URLSearchParams(route.queryParams);
  }
  matchRoute(path) {
    return this.routes.find((route) => route.path === path);
  }
  navigate(path) {
    const route = this.matchRoute(path);
    if (!route) {
      console.error(`[Router] Route '${path}' does not exist.`);
      return;
    }
    this.resolve(route);
  }
  resolve(route) {
    const locationParams = this.decodeQuery();
    const component = document.createElement(
      route.component
    );
    if (Object.keys(locationParams).length) {
      route.queryParams = locationParams;
    } else if (route.queryParams) {
      window.history.replaceState(
        {},
        "",
        `${location.pathname}?${this.parseQuery(route)}`
      );
    }
    if (route.title) {
      document.title = route.title;
    }
    if (route.description) {
      const description = document.querySelector('meta[name="description"]');
      if (description) {
        description.setAttribute("content", route.description);
      }
    }
    if (route.schema) {
      const script = document.querySelector('[type="application/ld+json"]');
      if (script) {
        script.innerHTML = route.schema;
      }
    }
    this.rootElement.innerHTML = "";
    this.rootElement.appendChild(component);
    this.currentRoute = route;
    if (component.onNavigate) {
      component.onNavigate(this.currentRoute);
    }
  }
  isHashChange() {
    return typeof window !== "undefined" && "onhashchange" in window;
  }
  isPushState() {
    return !!(typeof window !== "undefined" && window.history && window.history.pushState);
  }
}
var __defProp$t = Object.defineProperty;
var __getOwnPropDesc$t = Object.getOwnPropertyDescriptor;
var __decorateClass$t = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$t(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$t(target, key, result);
  return result;
};
let RdButton = class extends FormElement {
  constructor() {
    super();
    this._type = "button";
    this.type = "button";
  }
  static get observedAttributes() {
    return ["type", "label", "width", "height", "channel"];
  }
  attributeChangedCallback(name, old, next) {
    switch (name) {
      case "type":
        this._type = next;
        this.type = next;
        break;
      case "value":
        this.value = next;
        break;
      case "label":
        this.shadowRoot.querySelector(".label").innerText = next;
        break;
      case "width":
        this.shadowRoot.querySelector("button").style.width = next;
        break;
      case "height":
        this.shadowRoot.querySelector("button").style.height = next;
        break;
      case "channel":
        this.setChannel(next);
        break;
    }
  }
  formDisabledCallback(disabled) {
    this.$elem.disabled = disabled;
  }
  connectedCallback() {
    this.shadowRoot.querySelectorAll("span").forEach((spanElem) => {
      const slot = spanElem.querySelector("slot");
      if (slot && slot.assignedNodes().length === 0) {
        spanElem.classList.add("is--empty");
      }
    });
    this.$elem.onclick = () => {
      if (this.channel) {
        this.channel.postMessage({
          type: this.type,
          name: this.name,
          value: this.value.length ? this.value : "bang"
        });
      }
    };
    if (this.type === "submit") {
      this.$elem.onsubmit = (ev) => {
        this.emitter.emit(
          new CustomEvent("submit", {
            bubbles: true,
            composed: true,
            detail: "composed"
          })
        );
        if (this.onsubmit) {
          this.onsubmit(ev);
        }
      };
    }
  }
  onPress(ev) {
    var _a, _b;
    if ((_a = ev.detail) == null ? void 0 : _a.modifier) {
      this.setAttribute("modifier", (_b = ev.detail) == null ? void 0 : _b.modifier);
    }
    this.simulatePress();
  }
  get form() {
    return this.$internals.form;
  }
  get name() {
    return this.getAttribute("name");
  }
  checkValidity() {
    return this.$internals.checkValidity();
  }
  get validity() {
    return this.$internals.validity;
  }
  get validationMessage() {
    return this.$internals.validationMessage;
  }
  get type() {
    return this.$elem.type || this._type;
  }
  set type(value) {
    this.$elem.type = value;
  }
  get value() {
    return this.$elem.value;
  }
  set value(value) {
    this.$elem.value = value;
  }
  get $elem() {
    return this.shadowRoot.querySelector("button");
  }
  setChannel(name) {
    this.channel = new BroadcastChannel(name);
  }
  simulatePress() {
    this.$elem.classList.add("active");
    this.$elem.click();
    setTimeout(() => {
      this.$elem.classList.remove("active");
      this.removeAttribute("modifier");
    }, 100);
  }
};
__decorateClass$t([
  Listen("press")
], RdButton.prototype, "onPress", 1);
RdButton = __decorateClass$t([
  Component({
    selector: "rd-button",
    delegatesFocus: true,
    style: css`
    :host {
      display: inline-block;
      outline: none;
    }
    :host button {
      width: 72px;
      height: 36px;
      border: 2px solid var(--ready-color-border);
      background-color: var(--ready-color-bg);
      border-radius: 14px;
      color: var(--ready-color-default);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    :host button .label {
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Standard syntax */
    }
    :host button .icon:not(.is--empty) {
      display: block;
      width: 22px;
      height: 22px;
    }
    :host button.is--small {
      min-height: 18px;
      border-radius: 8px;
    }
    :host button.is--small .icon:not(.is--empty) {
      display: inline-block;
      width: 12px;
      height: 12px;
    }
    :host button.is--medium {
      min-height: 32px;
      border-radius: 14px;
    }
    :host button.is--medium .icon:not(.is--empty) {
      display: inline-block;
      width: 22px;
      height: 22px;
    }
    :host button.is--large {
      min-height: 44px;
      border-radius: 18px;
    }
    :host button.is--large .icon:not(.is--empty) {
      display: inline-block;
      width: 32px;
      height: 32px;
    }
    :host button:hover {
      background-color: var(--ready-color-bg);
      border: 2px solid var(--ready-color-highlight);
    }
    :host button:focus {
      outline: 0px;
      outline-offset: 0px;
      background-color: var(--ready-color-bg);
      border: 2px solid var(--ready-color-highlight);
    }
    :host button:active,
    :host button.active {
      outline: 0px;
      outline-offset: 0px;
      background-color: var(--ready-color-selected);
      border: 2px solid var(--ready-color-highlight);
    }
    :host button[disabled] {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
    }
    :host button[disabled]:hover,
    :host button[disabled]:focus,
    :host button[disabled]:active,
    :host button[disabled].active {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
  `,
    template: html`
    <button>
      <span class="icon"><slot name="icon"></slot></span>
      <span class="label"><slot name="label"></slot></span>
    </button>
  `
  })
], RdButton);
var __defProp$s = Object.defineProperty;
var __getOwnPropDesc$s = Object.getOwnPropertyDescriptor;
var __decorateClass$s = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$s(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$s(target, key, result);
  return result;
};
const StandardKeyboardModifiers = {
  "Shift+Backquote": { key: "~", code: "Shift+Backquote", label: "~" },
  "Shift+Digit1": { key: "!", code: "Digit1", label: "!" },
  "Shift+Digit2": { key: "@", code: "Digit2", label: "@" },
  "Shift+Digit3": { key: "#", code: "Digit3", label: "#" },
  "Shift+Digit4": { key: "$", code: "Digit4", label: "$" },
  "Shift+Digit5": { key: "%", code: "Digit5", label: "%" },
  "Shift+Digit6": { key: "^", code: "Digit6", label: "^" },
  "Shift+Digit7": { key: "&", code: "Digit7", label: "&" },
  "Shift+Digit8": { key: "*", code: "Digit8", label: "*" },
  "Shift+Digit9": { key: "(", code: "Digit9", label: "(" },
  "Shift+Digit0": { key: ")", code: "Digit0", label: ")" },
  "Shift+Minus": { key: "-", code: "Minus", label: "-" },
  "Shift+Equal": { key: "+", code: "Equal", label: "+" },
  "Shift+Comma": { key: "<", code: "Comma", label: "<" },
  "Shift+Period": { key: ">", code: "Period", label: ">" },
  "Shift+Slash": { key: "?", code: "Slash", label: "?" },
  "Shift+Semicolon": { key: ":", code: "Semicolon", label: ":" },
  "Shift+Quote": { key: '"', code: "Quote", label: '"' },
  "Shift+BracketLeft": { key: "{", code: "BracketLeft", label: "{" },
  "Shift+BracketRight": { key: "}", code: "BracketRight", label: "}" },
  "Shift+Backslash": { key: "|", code: "Backslash", label: "|" },
  "Shift+KeyQ": { key: "Q", code: "KeyQ", label: "q" },
  "Shift+KeyW": { key: "W", code: "KeyW", label: "w" },
  "Shift+KeyE": { key: "E", code: "KeyE", label: "e" },
  "Shift+KeyR": { key: "R", code: "KeyR", label: "r" },
  "Shift+KeyT": { key: "T", code: "KeyT", label: "t" },
  "Shift+KeyY": { key: "Y", code: "KeyY", label: "y" },
  "Shift+KeyU": { key: "U", code: "KeyU", label: "u" },
  "Shift+KeyI": { key: "I", code: "KeyI", label: "i" },
  "Shift+KeyO": { key: "O", code: "KeyO", label: "o" },
  "Shift+KeyP": { key: "P", code: "KeyP", label: "p" },
  "Shift+KeyA": { key: "A", code: "KeyA", label: "a" },
  "Shift+KeyS": { key: "S", code: "KeyS", label: "s" },
  "Shift+KeyD": { key: "D", code: "KeyD", label: "d" },
  "Shift+KeyF": { key: "F", code: "KeyF", label: "f" },
  "Shift+KeyG": { key: "G", code: "KeyG", label: "g" },
  "Shift+KeyH": { key: "H", code: "KeyH", label: "h" },
  "Shift+KeyJ": { key: "J", code: "KeyJ", label: "j" },
  "Shift+KeyK": { key: "K", code: "KeyK", label: "k" },
  "Shift+KeyL": { key: "L", code: "KeyL", label: "l" },
  "Shift+KeyZ": { key: "Z", code: "KeyZ", label: "z" },
  "Shift+KeyX": { key: "X", code: "KeyX", label: "x" },
  "Shift+KeyC": { key: "C", code: "KeyC", label: "c" },
  "Shift+KeyV": { key: "V", code: "KeyV", label: "v" },
  "Shift+KeyB": { key: "B", code: "KeyB", label: "b" },
  "Shift+KeyN": { key: "N", code: "KeyN", label: "n" },
  "Shift+KeyM": { key: "M", code: "KeyM", label: "m" }
};
const StandardKeyboard = [
  { key: "`", code: "Backquote", label: "`" },
  { key: "1", code: "Digit1", label: "1" },
  { key: "2", code: "Digit2", label: "2" },
  { key: "3", code: "Digit3", label: "3" },
  { key: "4", code: "Digit4", label: "4" },
  { key: "5", code: "Digit5", label: "5" },
  { key: "6", code: "Digit6", label: "6" },
  { key: "7", code: "Digit7", label: "7" },
  { key: "8", code: "Digit8", label: "8" },
  { key: "9", code: "Digit9", label: "9" },
  { key: "0", code: "Digit0", label: "0" },
  { key: "-", code: "Minus", label: "-" },
  { key: "=", code: "Equal", label: "=" },
  { key: "Backspace", code: "Backspace", label: "⌫" },
  { key: "Tab", code: "Tab", label: "⇥" },
  { key: "q", code: "KeyQ", label: "q" },
  { key: "w", code: "KeyW", label: "w" },
  { key: "e", code: "KeyE", label: "e" },
  { key: "r", code: "KeyR", label: "r" },
  { key: "t", code: "KeyT", label: "t" },
  { key: "y", code: "KeyY", label: "y" },
  { key: "u", code: "KeyU", label: "u" },
  { key: "i", code: "KeyI", label: "i" },
  { key: "o", code: "KeyO", label: "o" },
  { key: "p", code: "KeyP", label: "p" },
  { key: "[", code: "BracketLeft", label: "[" },
  { key: "]", code: "BracketRight", label: "]" },
  { key: "\\", code: "Backslash", label: "\\" },
  { key: "CapsLock", code: "CapsLock", label: "⇪" },
  { key: "a", code: "KeyA", label: "a" },
  { key: "s", code: "KeyS", label: "s" },
  { key: "d", code: "KeyD", label: "d" },
  { key: "f", code: "KeyF", label: "f" },
  { key: "g", code: "KeyG", label: "g" },
  { key: "h", code: "KeyH", label: "h" },
  { key: "j", code: "KeyJ", label: "j" },
  { key: "k", code: "KeyK", label: "k" },
  { key: "l", code: "KeyL", label: "l" },
  { key: ";", code: "Semicolon", label: ";" },
  { key: "'", code: "Quote", label: "'" },
  { key: "Enter", code: "Enter", label: "↵" },
  { key: "Shift", code: "ShiftLeft", label: "⇧" },
  { key: "z", code: "KeyZ", label: "z" },
  { key: "x", code: "KeyX", label: "x" },
  { key: "c", code: "KeyC", label: "c" },
  { key: "v", code: "KeyV", label: "v" },
  { key: "b", code: "KeyB", label: "b" },
  { key: "n", code: "KeyN", label: "n" },
  { key: "m", code: "KeyM", label: "m" },
  { key: ",", code: "Comma", label: "," },
  { key: ".", code: "Period", label: "." },
  { key: "/", code: "Slash", label: "/" },
  { key: "Shift", code: "ShiftRight", label: "⇧" },
  { key: "ArrowUp", code: "ArrowUp", label: "↑" },
  { key: "", code: "NULL", label: "" },
  { key: "Control", code: "ControlLeft", label: "⌃" },
  { key: "Alt", code: "AltLeft", label: "⌥" },
  { key: "Meta", code: "MetaLeft", label: "⌘" },
  { key: "Space", code: "Space", label: "␣" },
  { key: "Meta", code: "MetaRight", label: "⌘" },
  { key: "Alt", code: "AltRight", label: "⌥" },
  { key: "Context", code: "ContextMenu", label: "≣" },
  { key: "Control", code: "ControlRight", label: "⌃" },
  { key: "", code: "NULL", label: "" },
  { key: "ArrowLeft", code: "ArrowLeft", label: "←" },
  { key: "ArrowDown", code: "ArrowDown", label: "↓" },
  { key: "ArrowRight", code: "ArrowRight", label: "→" }
];
const StandardKeyboardNumPad = [
  { key: "Clear", code: "NumLock", label: "clear" },
  { key: "=", code: "NumpadEqual", label: "=" },
  { key: "/", code: "NumpadDivide", label: "/" },
  { key: "*", code: "NumpadMultiply", label: "*" },
  { key: "7", code: "Numpad7", label: "7" },
  { key: "8", code: "Numpad8", label: "8" },
  { key: "9", code: "Numpad9", label: "9" },
  { key: "-", code: "NumpadSubtract", label: "-" },
  { key: "4", code: "Numpad4", label: "4" },
  { key: "5", code: "Numpad5", label: "5" },
  { key: "6", code: "Numpad6", label: "6" },
  { key: "+", code: "NumpadAdd", label: "+" },
  { key: "1", code: "Numpad1", label: "1" },
  { key: "2", code: "Numpad2", label: "2" },
  { key: "3", code: "Numpad3", label: "3" },
  { key: "Enter", code: "NumpadEnter", label: "↵" },
  { key: "0", code: "Numpad0", label: "0" },
  { key: ".", code: "NumpadDecimal", label: "." }
];
const StandardKeyboardModifierCodeKeyMap = {
  ShiftLeft: "Shift",
  ShiftRight: "Shift",
  ControlLeft: "Control",
  ControlRight: "Control",
  AltLeft: "Alt",
  AltRight: "Alt",
  MetaLeft: "Meta",
  MetaRight: "Meta"
};
let RdButtonPad = class extends FormElement {
  constructor() {
    super();
    this.currentKey = null;
    this.currentModifier = null;
  }
  static get observedAttributes() {
    return ["grid", "buttons", "disabled", "channel"];
  }
  attributeChangedCallback(name, old, next) {
    switch (name) {
      case "disabled":
        if (!next.length) {
          next = "true";
        }
        this.disabled = Boolean(next);
        if (this.disabled === true) {
          this.setAttribute("tabindex", "-1");
        } else {
          this.removeAttribute("tabindex");
        }
        break;
      case "grid":
        this.grid = JSON.parse(next);
        break;
      case "buttons":
        this.buttons = JSON.parse(next);
        break;
      case "channel":
        this.setChannel(next);
        break;
    }
  }
  formDisabledCallback(disabled) {
    this.disabled = disabled;
  }
  getState() {
    return {
      grid: JSON.stringify({
        gap: "4px",
        columns: {
          count: 4
        }
      }),
      buttons: []
    };
  }
  onClick(ev) {
    if (ev.target === this) {
      this.focus();
    }
  }
  connectedCallback() {
    this.waitAll$("rd-button").then((elems) => {
      for (let i = 0; i < elems.length; i++) {
        elems[i].addEventListener("click", this.click$.bind(this));
        elems[i].addEventListener(
          "touchstart",
          this.buttonPressModifier$.bind(this)
        );
        elems[i].addEventListener("touchend", this.buttonPress$.bind(this));
      }
    }).catch((err) => console.error(err));
  }
  updateVisualGrid(elem, grid) {
    var _a;
    if (grid.gap) {
      elem.style.gridGap = grid.gap;
    }
    if ((_a = grid.columns) == null ? void 0 : _a.count) {
      elem.style.gridTemplateColumns = `repeat(${grid.columns.count}, 1fr)`;
    }
    if (grid.cells) {
      for (let i = 0; i < grid.cells.length; i++) {
        const cell = grid.cells[i];
        const cellElem = this.shadowRoot.querySelector(cell.selector);
        for (const styleProp in cell.styles) {
          if (cell.styles[styleProp] && cellElem) {
            if (styleProp === "width" || styleProp === "height") {
              cellElem.setAttribute(styleProp, cell.styles[styleProp]);
            } else {
              cellElem.style[styleProp] = cell.styles[styleProp];
            }
          }
        }
      }
    }
  }
  get form() {
    return this.$internals.form;
  }
  get name() {
    return this.getAttribute("name");
  }
  checkValidity() {
    return this.$internals.checkValidity();
  }
  get validity() {
    return this.$internals.validity;
  }
  get validationMessage() {
    return this.$internals.validationMessage;
  }
  get type() {
    return "button";
  }
  get value() {
    return this.currentKey;
  }
  set value(value) {
    this.currentKey = value;
  }
  get grid() {
    return this.getState().grid;
  }
  set grid(grid) {
    setTimeout(() => {
      this.wait$("[target]").then((elem) => {
        this.updateVisualGrid(elem, grid);
        this.setState("grid", JSON.stringify(grid));
      });
    });
  }
  get buttons() {
    return this.getState().buttons;
  }
  set buttons(buttons) {
    this.setState("buttons", JSON.stringify(buttons));
  }
  click$(ev) {
    if (this.onclick) {
      let value = ev.target.getAttribute("key");
      if (this.currentModifier && StandardKeyboardModifiers[`${this.currentModifier}+${ev.target.getAttribute(
        "code"
      )}`]) {
        value = StandardKeyboardModifiers[`${this.currentModifier}+${ev.target.getAttribute(
          "code"
        )}`].key;
      }
      this.value = value;
      if (this.channel) {
        this.channel.postMessage({
          type: this.type,
          name: this.name,
          value: this.currentKey
        });
      }
      this.onclick(ev);
    }
  }
  press$(ev) {
    let code = ev.code;
    let modifier = null;
    if (code === "NULL") {
      return;
    }
    if (StandardKeyboardModifierCodeKeyMap[code]) {
      this.currentModifier = null;
    } else {
      if (this.currentModifier && StandardKeyboardModifiers[`${this.currentModifier}+${code}`]) {
        code = StandardKeyboardModifiers[`${this.currentModifier}+${code}`].code;
        modifier = this.currentModifier;
      }
      this.value = ev.key;
      if (this.channel) {
        this.channel.postMessage({
          type: this.type,
          name: this.name,
          value: this.currentKey
        });
      }
      const keyElem = this.get$(`[code="${code}"]`);
      keyElem == null ? void 0 : keyElem.dispatchEvent(
        new CustomEvent("press", { detail: { modifier } })
      );
    }
  }
  pressModifier$(ev) {
    const code = ev.code;
    if (StandardKeyboardModifierCodeKeyMap[code]) {
      this.currentModifier = StandardKeyboardModifierCodeKeyMap[code];
      const keyElem = this.get$(`[code="${code}"]`);
      keyElem == null ? void 0 : keyElem.dispatchEvent(new CustomEvent("press"));
    }
  }
  buttonPress$(ev) {
    let code = ev.target.getAttribute("code");
    let modifier = null;
    if (code === "NULL") {
      return;
    }
    if (StandardKeyboardModifierCodeKeyMap[code]) {
      this.currentModifier = null;
    } else {
      if (this.currentModifier && StandardKeyboardModifiers[`${this.currentModifier}+${code}`]) {
        code = StandardKeyboardModifiers[`${this.currentModifier}+${code}`].code;
        modifier = this.currentModifier;
      }
      this.value = ev.target.getAttribute("key");
      if (this.channel) {
        this.channel.postMessage({
          type: this.type,
          name: this.name,
          value: this.currentKey
        });
      }
      const keyElem = ev.target;
      keyElem == null ? void 0 : keyElem.dispatchEvent(
        new CustomEvent("press", { detail: { modifier } })
      );
    }
  }
  buttonPressModifier$(ev) {
    const code = ev.target.getAttribute("code");
    if (StandardKeyboardModifierCodeKeyMap[code]) {
      this.currentModifier = StandardKeyboardModifierCodeKeyMap[code];
    }
  }
  setChannel(name) {
    this.channel = new BroadcastChannel(name);
  }
};
__decorateClass$s([
  State()
], RdButtonPad.prototype, "getState", 1);
__decorateClass$s([
  Listen("click")
], RdButtonPad.prototype, "onClick", 1);
__decorateClass$s([
  Listen("keyup")
], RdButtonPad.prototype, "press$", 1);
__decorateClass$s([
  Listen("keydown")
], RdButtonPad.prototype, "pressModifier$", 1);
RdButtonPad = __decorateClass$s([
  Component({
    selector: "rd-buttonpad",
    delegatesFocus: true,
    style: css`
    :host {
      display: inline-block;
      outline: none;
      user-select: none;
      border-radius: 14px;
    }
    :host([disabled]) {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
      pointer-events: none;
    }
    :host([disabled]):hover,
    :host([disabled]):focus,
    :host([disabled]):active,
    :host([disabled]).active {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    [target] {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
    }
  `,
    template: html`
    <template is="r-repeat" items="item of buttons" force="true">
      <rd-button
        repeat="item"
        label="{{item.label}}"
        key="{{item.key}}"
        code="{{item.code}}"
      ></rd-button>
    </template>
  `
  })
], RdButtonPad);
var __defProp$r = Object.defineProperty;
var __getOwnPropDesc$r = Object.getOwnPropertyDescriptor;
var __decorateClass$r = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$r(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$r(target, key, result);
  return result;
};
let RdCheckBox = class extends FormElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["checked", "channel"];
  }
  attributeChangedCallback(name, old, next) {
    switch (name) {
      case "checked":
        this.checked = next === "true" || next === "" ? true : false;
        break;
      case "channel":
        this.setChannel(next);
        break;
    }
  }
  formDisabledCallback(disabled) {
    this.$elem.disabled = disabled;
  }
  formResetCallback() {
    this.$elem.checked = false;
  }
  onValidate() {
    if (this.hasAttribute("required") && this.value === false) {
      this.$internals.setValidity({ customError: true }, "required");
      this.$elem.classList.add("required");
    } else {
      this.$internals.setValidity({});
      this.$elem.classList.remove("required");
    }
  }
  connectedCallback() {
    this.$elem.onchange = (ev) => {
      if (this.onchange) {
        this.onchange(ev);
      } else {
        this.emitter.emit(
          new CustomEvent("change", {
            bubbles: true,
            composed: true,
            detail: "composed"
          })
        );
      }
      if (this.channel) {
        this.channel.postMessage({
          type: this.type,
          name: this.name,
          value: ev.target.checked
        });
      }
    };
    this.$elem.onblur = () => {
      this.onValidate();
    };
  }
  get type() {
    return "checkbox";
  }
  get form() {
    return this.$internals.form;
  }
  get name() {
    return this.getAttribute("name");
  }
  checkValidity() {
    return this.$internals.checkValidity();
  }
  get validity() {
    return this.$internals.validity;
  }
  get validationMessage() {
    return this.$internals.validationMessage;
  }
  get willValidate() {
    return this.$internals.willValidate;
  }
  get checked() {
    return this.$elem.checked;
  }
  set checked(value) {
    this.$elem.checked = value;
  }
  get value() {
    return this.$elem.checked;
  }
  set value(value) {
    if (typeof value === "boolean") {
      this.$elem.checked = value;
    }
  }
  get $elem() {
    return this.shadowRoot.querySelector("input");
  }
  setChannel(name) {
    this.channel = new BroadcastChannel(name);
  }
};
__decorateClass$r([
  Emitter("change")
], RdCheckBox.prototype, "connectedCallback", 1);
RdCheckBox = __decorateClass$r([
  Component({
    selector: "rd-checkbox",
    delegatesFocus: true,
    style: css`
    :host {
      display: inline-block;
      width: 28px;
      height: 28px;
      outline: none;
    }
    :host input[type='checkbox'] {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
    :host input[type='checkbox']:before {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      border: 2px solid var(--ready-color-border);
      border-radius: 6px;
      background: var(--ready-color-bg);
    }
    :host input[type='checkbox']:checked:before {
      background-image: var(--ready-icon-check);
      background-repeat: no-repeat;
      background-position: center;
    }
    :host input[type='checkbox']:focus,
    :host input[type='checkbox']:active {
      outline: 0px;
      outline-offset: 0px;
    }
    :host input[type='checkbox']:hover:before,
    :host input[type='checkbox']:focus:before,
    :host input[type='checkbox']:active:before {
      border: 2px solid var(--ready-color-highlight);
    }
    :host input[type='checkbox'][disabled]:before {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
    }
    :host input[type='checkbox'][disabled]:checked:before {
      background-image: var(--ready-icon-check);
      background-repeat: no-repeat;
      background-position: center;
    }
    :host input[type='checkbox'][disabled]:hover:before,
    :host input[type='checkbox'][disabled]:focus:before,
    :host input[type='checkbox'][disabled]:active:before {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    :host input[type='checkbox'].required:before,
    :host input[type='checkbox'].required:hover:before,
    :host input[type='checkbox'].required:focus:before,
    :host input[type='checkbox'].required:active:before {
      border: 2px solid var(--ready-color-error);
      outline: none;
      box-shadow: none;
    }
  `,
    template: html` <input type="checkbox" /> `
  })
], RdCheckBox);
var __defProp$q = Object.defineProperty;
var __getOwnPropDesc$q = Object.getOwnPropertyDescriptor;
var __decorateClass$q = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$q(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$q(target, key, result);
  return result;
};
let RdSwitch = class extends RdCheckBox {
  constructor() {
    super();
  }
};
RdSwitch = __decorateClass$q([
  Component({
    selector: "rd-switch",
    delegatesFocus: true,
    style: css`
    :host {
      display: inline-block;
      width: 72px;
      height: 36px;
      outline: none;
    }
    :host input[type='checkbox'] {
      display: flex;
      width: 72px;
      height: 36px;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
    :host input[type='checkbox']:before {
      content: '';
      width: 100%;
      border: 2px solid var(--ready-color-border);
      background-color: var(--ready-color-bg);
      border-radius: 1em;
      color: var(--ready-color-default);
      padding: 1px 0px;
      background-image: var(--ready-icon-switch);
      background-size: 22px 22px;
      background-repeat: no-repeat;
      background-position: left 2px top 50%;
    }
    :host input[type='checkbox']:checked:before {
      background-image: var(--ready-icon-switch);
      background-size: 22px 22px;
      background-repeat: no-repeat;
      background-position: right 2px top 50%;
    }
    :host input[type='checkbox']:hover:before,
    :host input[type='checkbox']:focus:before,
    :host input[type='checkbox']:active:before {
      border: 2px solid var(--ready-color-highlight);
    }
    :host input[type='checkbox']:focus,
    :host input[type='checkbox']:active {
      outline: 0px;
      outline-offset: 0px;
    }
    :host input[type='checkbox']:active:before {
      background-color: var(--ready-color-selected);
      border: 2px solid var(--ready-color-highlight);
    }
    :host input[type='checkbox'][disabled]:before {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      background-image: var(--ready-icon-switch);
      background-size: 22px 22px;
      background-repeat: no-repeat;
      background-position: left 2px top 50%;
      cursor: not-allowed;
    }
    :host input[type='checkbox'][disabled]:checked:before {
      background-image: var(--ready-icon-switch);
      background-size: 22px 22px;
      background-repeat: no-repeat;
      background-position: right 2px top 50%;
    }
    :host input[type='checkbox'][disabled]:hover:before,
    :host input[type='checkbox'][disabled]:focus:before,
    :host input[type='checkbox'][disabled]:active:before {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    :host input[type='checkbox'].required:before,
    :host input[type='checkbox'].required:hover:before,
    :host input[type='checkbox'].required:focus:before,
    :host input[type='checkbox'].required:active:before {
      border: 2px solid var(--ready-color-error);
      outline: none;
      box-shadow: none;
    }
  `,
    template: html` <input type="checkbox" /> `
  })
], RdSwitch);
var __defProp$p = Object.defineProperty;
var __getOwnPropDesc$p = Object.getOwnPropertyDescriptor;
var __decorateClass$p = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$p(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$p(target, key, result);
  return result;
};
let RdInput = class extends FormElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["channel"];
  }
  attributeChangedCallback(name, old, next) {
    switch (name) {
      case "channel":
        this.setChannel(next);
        break;
    }
  }
  connectedCallback() {
    this.$elem.onchange = (ev) => {
      if (this.onchange) {
        this.onchange(ev);
      }
    };
    this.$elem.oninput = (ev) => {
      this.emitter.emit(
        new CustomEvent("change", {
          bubbles: true,
          composed: true,
          detail: "composed"
        })
      );
      if (this.oninput) {
        this.oninput(ev);
      }
      if (this.channel) {
        this.channel.postMessage({
          type: this.type,
          name: this.name,
          value: this.value
        });
      }
    };
    this.$elem.onblur = () => {
      this.onValidate();
    };
  }
  formDisabledCallback(disabled) {
    this.$elem.disabled = disabled;
  }
  formResetCallback() {
    this.value = "";
    this.$internals.setFormValue("");
  }
  onValidate() {
    if (this.hasAttribute("required") && this.value.length <= 0) {
      this.$internals.setValidity({ customError: true }, "required");
      this.$elem.classList.add("required");
    } else {
      this.$internals.setValidity({});
      this.$elem.classList.remove("required");
    }
  }
  get type() {
    return "text";
  }
  get form() {
    return this.$internals.form;
  }
  get name() {
    return this.getAttribute("name");
  }
  checkValidity() {
    return this.$internals.checkValidity();
  }
  get validity() {
    return this.$internals.validity;
  }
  get validationMessage() {
    return this.$internals.validationMessage;
  }
  get willValidate() {
    return this.$internals.willValidate;
  }
  get value() {
    return this.$elem.value;
  }
  set value(value) {
    this.$elem.value = value;
  }
  get $elem() {
    return this.shadowRoot.querySelector("input");
  }
  setChannel(name) {
    this.channel = new BroadcastChannel(name);
  }
};
__decorateClass$p([
  Emitter("change")
], RdInput.prototype, "connectedCallback", 1);
RdInput = __decorateClass$p([
  Component({
    selector: "rd-input",
    delegatesFocus: true,
    style: css`
    :host {
      display: inline-block;
      outline: none;
    }
    :host input {
      width: 100%;
      background-color: var(--ready-color-bg);
      border: 2px solid var(--ready-color-border);
      border-radius: 1em;
      color: var(--ready-color-default);
      font: var(--font-family);
      min-height: 2em;
      padding: 0em 1em;
    }
    :host input:hover,
    :host input:focus,
    :host input:active {
      border: 2px solid var(--ready-color-highlight);
      outline: none;
      box-shadow: none;
    }
    :host input[disabled] {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
    }
    :host input[disabled]:hover,
    :host input[disabled]:focus,
    :host input[disabled]:active {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    :host input.required,
    :host input.required:hover,
    :host input.required:focus,
    :host input.required:active {
      border: 2px solid var(--ready-color-error);
      outline: none;
      box-shadow: none;
    }
  `,
    template: html` <input type="text" /> `
  })
], RdInput);
var __defProp$o = Object.defineProperty;
var __getOwnPropDesc$o = Object.getOwnPropertyDescriptor;
var __decorateClass$o = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$o(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$o(target, key, result);
  return result;
};
let RdRadioGroup = class extends FormElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["direction", "channel"];
  }
  attributeChangedCallback(name, old, next) {
    var _a, _b;
    switch (name) {
      case "direction":
        this.direction = next;
        if (this.direction === "vertical") {
          (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".group").classList.add("vertical");
        } else {
          (_b = this.shadowRoot) == null ? void 0 : _b.querySelector(".group").classList.remove("vertical");
        }
        break;
      case "channel":
        this.setChannel(next);
        break;
    }
  }
  connectedCallback() {
    this.$elem.forEach((elem) => {
      elem.onblur = () => {
        this.onValidate();
      };
      elem.onclick = () => {
        if (this.channel) {
          this.channel.postMessage({
            type: "radio",
            name: this.name,
            value: this.value
          });
        }
      };
    });
  }
  formDisabledCallback(disabled) {
    this.$elem.forEach((elem) => elem.disabled = disabled);
  }
  formResetCallback() {
    this.$elem.forEach((elem) => elem.checked = false);
    this.$internals.setFormValue("");
  }
  checkValidity() {
    return this.$internals.checkValidity();
  }
  onValidate() {
    if (this.hasAttribute("required") && (!this.value || this.value.length <= 0)) {
      this.$internals.setValidity({ customError: true }, "required");
      this.$group.classList.add("required");
    } else {
      this.$internals.setValidity({});
      this.$group.classList.remove("required");
    }
  }
  get value() {
    const checked = this.$elem.filter(
      (elem) => elem.checked
    )[0];
    if (checked) {
      return this.$elem.filter(
        (elem) => elem.checked
      )[0].value;
    } else {
      return void 0;
    }
  }
  set value(value) {
    this.$elem.forEach((elem) => {
      if (elem.value === value) {
        elem.checked = true;
      } else {
        elem.checked = false;
      }
    });
  }
  get form() {
    return this.$internals.form;
  }
  get name() {
    return this.getAttribute("name");
  }
  get $group() {
    return this.shadowRoot.querySelector(".group");
  }
  get $elem() {
    return this.shadowRoot.querySelector("slot").assignedNodes().filter(
      (elem) => elem.tagName === "INPUT" && elem.type === "radio"
    );
  }
  setChannel(name) {
    this.channel = new BroadcastChannel(name);
  }
};
RdRadioGroup = __decorateClass$o([
  Component({
    selector: "rd-radiogroup",
    style: css`
    :host {
      display: inline-block;
    }
    ::slotted(input[type='radio']) {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      margin: 0px 4px 0px 8px;
      transform: translateY(4px);
    }
    ::slotted(input[type='radio']):before {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      border: 2px solid var(--ready-color-border);
      border-radius: 50%;
      background: var(--ready-color-bg);
    }
    ::slotted(input[type='radio']:checked):before {
      background: radial-gradient(
        var(--ready-color-border) 0%,
        var(--ready-color-border) 50%,
        transparent 50%,
        transparent
      );
      border-color: var(--ready-color-highlight);
    }
    ::slotted(input[type='radio']:focus),
    ::slotted(input[type='radio']:active) {
      outline: 0px;
      outline-offset: 0px;
    }
    ::slotted(input[type='radio']:hover):before,
    ::slotted(input[type='radio']:focus):before,
    ::slotted(input[type='radio']:active):before {
      border: 2px solid var(--ready-color-highlight);
    }
    ::slotted(input[type='radio'][disabled]):before {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
    }
    ::slotted(input[type='radio'][disabled]:hover):before,
    ::slotted(input[type='radio'][disabled]:focus):before,
    ::slotted(input[type='radio'][disabled]:active):before {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    // this doesn't work in Safari
    ::slotted(label) {
      margin-top: 5px;
      margin-right: 8px;
    }
    .group {
      box-sizing: border-box:
      border: 2px solid transparent;
      padding: 12px;
      border-radius: 14px;
    }
    .group.required {
      border: 2px solid var(--ready-color-error);
    }
    .group.required ::slotted(input[type='radio']) {
     transform: translateX(-1px) translateY(3px);
    }
    .group.vertical {
      display: flex;
      flex-direction: column;
      padding-top: 24px;
      padding-right: 120px;
      padding-bottom: 0px;
      & ::slotted(input[type='radio']) {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        margin: 0px 0px 0px 8px;
        transform: translateY(-8px);
      }
      & ::slotted(label) {
        display: block;
        margin-top: 0px;
        margin-right: 0px;
        position: relative;
        left: 42px;
        top: -28px;
      }
      &.required {
        
      }
    }
  `,
    template: html` <div class="group"><slot></slot></div> `
  })
], RdRadioGroup);
var __defProp$n = Object.defineProperty;
var __getOwnPropDesc$n = Object.getOwnPropertyDescriptor;
var __decorateClass$n = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$n(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$n(target, key, result);
  return result;
};
let RdTextArea = class extends RdInput {
  constructor() {
    super();
  }
  get $elem() {
    return this.shadowRoot.querySelector("textarea");
  }
};
RdTextArea = __decorateClass$n([
  Component({
    selector: "rd-textarea",
    delegatesFocus: true,
    style: css`
    :host {
      display: inline-block;
      outline: none;
    }
    :host textarea {
      background-color: var(--ready-color-bg);
      border: 2px solid var(--ready-color-border);
      border-radius: 1em;
      color: var(--ready-color-default);
      font: var(--font-family);
      outline: none;
      overflow: auto;
      padding: 1em;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-image: var(--ready-icon-expand);
      background-position: bottom 0.5em right 0.5em;
      background-repeat: no-repeat;
    }
    :host textarea:hover,
    :host textarea:focus,
    :host textarea:active {
      border: 2px solid var(--ready-color-highlight);
      outline: none;
      box-shadow: none;
    }
    :host textarea[disabled] {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
    }
    :host textarea[disabled]:hover,
    :host textarea[disabled]:focus,
    :host textarea[disabled]:active {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    :host textarea.required,
    :host textarea.required:hover,
    :host textarea.required:focus,
    :host textarea.required:active {
      border: 2px solid var(--ready-color-error);
      outline: none;
      box-shadow: none;
    }
    textarea::-webkit-resizer {
      display: none;
    }
  `,
    template: html` <textarea></textarea> `
  })
], RdTextArea);
var __defProp$m = Object.defineProperty;
var __getOwnPropDesc$m = Object.getOwnPropertyDescriptor;
var __decorateClass$m = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$m(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$m(target, key, result);
  return result;
};
let RdDropdown = class extends FormElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["channel"];
  }
  attributeChangedCallback(name, old, next) {
    switch (name) {
      case "channel":
        this.setChannel(next);
        break;
    }
  }
  connectedCallback() {
    this.$elem.oninput = (ev) => {
      this.emitter.emit(
        new CustomEvent("select", {
          bubbles: true,
          composed: true,
          detail: "composed"
        })
      );
      if (this.onselect) {
        this.onselect(ev);
      }
      if (this.oninput) {
        this.oninput(ev);
      }
      if (this.channel) {
        this.channel.postMessage({
          type: "select",
          name: this.name,
          value: this.value
        });
      }
    };
    this.$elem.onblur = () => {
      this.onValidate();
    };
  }
  formDisabledCallback(disabled) {
    this.$elem.disabled = disabled;
  }
  formResetCallback() {
    this.$elem.selectedIndex = -1;
    this.$internals.setFormValue("");
  }
  onValidate() {
    if (this.hasAttribute("required") && this.value.length <= 0) {
      this.$internals.setValidity({ customError: true }, "required");
      this.$elem.classList.add("required");
    } else {
      this.$internals.setValidity({});
      this.$elem.classList.remove("required");
    }
  }
  get form() {
    return this.$internals.form;
  }
  get name() {
    return this.getAttribute("name");
  }
  checkValidity() {
    return this.$internals.checkValidity();
  }
  get validity() {
    return this.$internals.validity;
  }
  get validationMessage() {
    return this.$internals.validationMessage;
  }
  get willValidate() {
    return this.$internals.willValidate;
  }
  get value() {
    return this.$elem.value;
  }
  set value(value) {
    this.$elem.value = value;
  }
  get $elem() {
    return this.shadowRoot.querySelector("slot").assignedNodes().filter((elem) => elem.tagName === "SELECT")[0];
  }
  setChannel(name) {
    this.channel = new BroadcastChannel(name);
  }
};
__decorateClass$m([
  Emitter("select")
], RdDropdown.prototype, "connectedCallback", 1);
RdDropdown = __decorateClass$m([
  Component({
    selector: "rd-dropdown",
    delegatesFocus: true,
    style: css`
    :host {
      display: inline-block;
      outline: none;
    }
    ::slotted(select) {
      display: block;
      width: 100%;
      background-color: var(--ready-color-bg);
      border: 2px solid var(--ready-color-border);
      border-radius: 1em;
      color: var(--ready-color-default);
      font: var(--font-family);
      line-height: 1.3;
      padding: 0.3em 1.6em 0.3em 0.8em;
      height: 36px;
      box-sizing: border-box;
      margin: 0;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-image: var(--ready-icon-menu);
      background-repeat: no-repeat;
      background-position:
        right 0.7em top 50%,
        0 0;
      background-size: 10px 9px;
    }
    ::slotted(select:hover),
    ::slotted(select:focus),
    ::slotted(select:active) {
      border: 2px solid var(--ready-color-highlight);
      outline: none;
      box-shadow: none;
    }
    *[dir='rtl'] ::slotted(select),
    :root:lang(ar) ::slotted(select),
    :root:lang(iw) ::slotted(select) {
      background-position:
        left 0.7em top 50%,
        0 0;
      padding: 0.3em 0.8em 0.3em 1.4em;
    }
    ::slotted(select::-ms-expand) {
      display: none;
    }
    ::slotted(select[disabled]) {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      background-image: var(--ready-icon-menu);
      background-repeat: no-repeat;
      background-position:
        right 0.7em top 50%,
        0 0;
      background-size: 10px 9px;
      cursor: not-allowed;
    }
    ::slotted(select[disabled]:hover),
    ::slotted(select[disabled]:focus),
    ::slotted(select[disabled]:active) {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    ::slotted(select.required),
    ::slotted(select.required:hover),
    ::slotted(select.required:focus),
    ::slotted(select.required:active) {
      border: 2px solid var(--ready-color-error);
      outline: none;
      box-shadow: none;
    }
  `,
    template: html` <slot></slot> `
  })
], RdDropdown);
var __defProp$l = Object.defineProperty;
var __getOwnPropDesc$l = Object.getOwnPropertyDescriptor;
var __decorateClass$l = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$l(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$l(target, key, result);
  return result;
};
let RdSlider = class extends FormElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["type", "size", "control", "channel"];
  }
  attributeChangedCallback(name, old, next) {
    switch (name) {
      case "type":
        this.shadowRoot.querySelector(".slider").classList.add(next);
        this._type = next === "vert" || next === "hor" ? "slider" : "joystick";
        break;
      case "size":
        this.shadowRoot.querySelector(".slider").classList.add(next);
        break;
      case "control":
        if (!next.startsWith("{{")) {
          this.control = JSON.parse(next);
          this.onSliderInit();
        }
        break;
      case "channel":
        this.setChannel(next);
        break;
    }
  }
  formDisabledCallback(disabled) {
    if (disabled) {
      this.$elem.setAttribute("disabled", "true");
    } else {
      this.$elem.removeAttribute("disabled");
    }
  }
  formResetCallback() {
    this.onSliderInit();
  }
  onValidate() {
    if (this.hasAttribute("required")) {
      this.$internals.setValidity({ customError: true }, "required");
      this.$elem.classList.add("required");
    } else {
      this.$internals.setValidity({});
      this.$elem.classList.remove("required");
    }
  }
  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value;
  }
  get form() {
    return this.$internals.form;
  }
  get name() {
    return this.getAttribute("name");
  }
  get validity() {
    return this.$internals.validity;
  }
  get validationMessage() {
    return this.$internals.validationMessage;
  }
  get willValidate() {
    return this.$internals.willValidate;
  }
  get value() {
    return this.control.currentValue;
  }
  set value(controlValue) {
    this.updateControl(controlValue);
  }
  get $elem() {
    return this.shadowRoot.querySelector(".draggable");
  }
  get $handle() {
    return this.shadowRoot.querySelector(".handle");
  }
  onSliderInit() {
    this._touchItem = null;
    this.control.height = this.clientHeight;
    this.control.width = this.clientWidth;
    if (this.control.numberType) {
      this._numberType = this.control.numberType;
    } else {
      this._numberType = "float";
    }
    if (this.control.orient === "is--hor") {
      this.style.maxWidth = "200px";
      this.control.currentValue = 0;
      this.control.position = "translate(0px,0px)";
    } else if (this.control.orient === "is--vert") {
      this.style.height = "200px";
      this.control.currentValue = 0;
      this.control.position = "translate(0px,0px)";
    } else if (this.control.orient.includes("is--joystick")) {
      this.style.maxWidth = "200px";
      this.style.maxHeight = "200px";
      this.control.currentValue = [0, 0];
      this.control.x = this.control.y = 76;
      this.control.position = "translate(76px,76px)";
      const joyStickType = this.control.orient.replace("is--joystick--", "");
      if (joyStickType === "is--joystick") {
        this._joystickType = "circle";
      } else {
        this._joystickType = joyStickType;
      }
      this.shadowRoot.querySelector(".slider").classList.add(this._joystickType);
    }
    this._lastPos = { transform: this.control.position };
    this.setActualPosition(this.control.position);
  }
  onMouseLeave() {
  }
  onMouseEnter() {
    if (this.control.isActive) {
      this.control.hasUserInput = true;
    }
  }
  onTouchStart(e) {
    this.control.hasUserInput = true;
    this.onTouchDown(e);
  }
  onTouchDown(e) {
    e.preventDefault();
    this.control.isActive = true;
    this.control.hasUserInput = true;
    this.$elem.classList.add("active");
    this._rect = this.getBoundingClientRect();
    this.control.height = this.clientHeight;
    this.control.width = this.clientWidth;
    this.addEventListener("touchmove", this.onTouchMove.bind(this));
    this.addEventListener("touchend", this.onMouseUp.bind(this));
    if (this._touchItem === null) {
      this._touchItem = e.touches.length - 1;
    }
    this.control.x = e.touches[this._touchItem].pageX - this._rect.left - this.$handle.clientWidth / 2;
    this.control.y = e.touches[this._touchItem].pageY - this._rect.top - this.$handle.clientHeight / 2;
    this.setPosition(this.control.x, this.control.y);
  }
  onMouseDown(e) {
    e.preventDefault();
    this.control.isActive = true;
    this.control.hasUserInput = true;
    this.$elem.classList.add("active");
    this._rect = this.getBoundingClientRect();
    this.control.height = this.clientHeight;
    this.control.width = this.clientWidth;
    if (this._joystickType) {
      this.control.x = e.offsetX;
      this.control.y = e.offsetY;
    }
    this.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.addEventListener("mouseup", this.onMouseUp.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.setPosition(this.control.x, this.control.y);
  }
  // Handle drag event
  onTouchMove(e) {
    e.preventDefault();
    if (this._touchItem === null) {
      this._touchItem = e.touches.length - 1;
    }
    if (this._joystickType) {
      this.control.x = (this.getBoundingClientRect().left - e.touches[this._touchItem].pageX) * -1;
      this.control.y = (this.offsetTop - e.touches[this._touchItem].pageY) * -1;
    }
    if (this.control.orient === "is--hor") {
      this.control.x = (this.getBoundingClientRect().left - e.touches[this._touchItem].pageX) * -1 - this.$handle.getBoundingClientRect().width / 2;
      this.control.y = 0;
    }
    if (this.control.orient === "is--vert") {
      this.control.x = 0;
      this.control.y = (this.offsetTop - e.touches[this._touchItem].pageY) * -1 - this.$handle.getBoundingClientRect().height / 2;
    }
    if (this.control.hasUserInput && this.control.isActive) {
      this.setPosition(this.control.x, this.control.y);
      this.mapValue();
      this.control.timeStamp = e.timeStamp;
      if (this.channel) {
        this.channel.postMessage({
          type: this.type,
          name: this.name,
          value: this.control.currentValue
        });
      }
      this.onEvent();
    }
  }
  onMouseMove(e) {
    if (!this.control.isActive) {
      return;
    }
    this.$elem.classList.add("active");
    if (this._joystickType) {
      this.control.x = (this.getBoundingClientRect().left - e.pageX) * -1;
      this.control.y = (this.offsetTop - e.pageY) * -1;
    }
    if (this.control.orient === "is--hor") {
      this.control.x = (this.getBoundingClientRect().left - e.pageX) * -1 - this.$handle.getBoundingClientRect().width / 2;
      this.control.y = 0;
    }
    if (this.control.orient === "is--vert") {
      this.control.x = 0;
      this.control.y = (this.offsetTop - e.pageY) * -1 - this.$handle.getBoundingClientRect().height / 2;
    }
    if (this.control.hasUserInput && this.control.isActive) {
      this.setPosition(this.control.x, this.control.y);
      this.mapValue();
      this.control.timeStamp = e.timeStamp;
      if (this.channel) {
        this.channel.postMessage({
          type: this.type,
          name: this.name,
          value: this.control.currentValue
        });
      }
      this.onEvent();
    }
  }
  onMouseUp() {
    this.control.isActive = false;
    this.control.hasUserInput = false;
    this.$elem.classList.remove("active");
    if ("ontouchstart" in document.documentElement) {
      this._touchItem = null;
    } else {
      this.removeEventListener("mousemove", this.onMouseMove.bind(this));
      this.removeEventListener("mouseup", this.onMouseUp.bind(this));
    }
    if (this._joystickType && this.control.snapToCenter === true) {
      const center = this.getCenter(
        [0, this.control.width - this.$handle.offsetWidth],
        [0, this.control.height - this.$handle.offsetHeight]
      );
      this.control.x = center[0];
      this.control.y = center[1];
      this.setPosition(center[0], center[1]);
    }
  }
  onTouchEnd() {
    this.onMouseUp();
  }
  onEvent() {
    const event = new CustomEvent("input", {
      bubbles: true,
      composed: true,
      detail: this.control
    });
    this.emitter.emit(event);
    if (this.onchange) {
      this.onchange(event);
    }
  }
  // Get Center of Circle
  getCenter(xRange, yRange) {
    const cX = xRange[1] - (xRange[1] - xRange[0]) / 2;
    const cY = yRange[1] - (yRange[1] - yRange[0]) / 2;
    return [cX, cY];
  }
  // Distance Between Two Points
  distance(dot1, dot2) {
    const x1 = dot1[0], y1 = dot1[1], x2 = dot2[0], y2 = dot2[1];
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
  // Convert between two ranges, for outputting user value
  scale(v, min, max, gmin, gmax) {
    return (v - min) / (max - min) * (gmax - gmin) + gmin;
  }
  // Find if cursor is within radius of elem
  circularBounds(x, y, xRange, yRange) {
    const center = this.getCenter(xRange, yRange);
    const dist = this.distance([x, y], center);
    const radius = xRange[1] - center[0];
    if (dist <= radius) {
      return [x, y];
    } else {
      x = x - center[0];
      y = y - center[1];
      const radians = Math.atan2(y, x);
      return [
        Math.cos(radians) * radius + center[0],
        Math.sin(radians) * radius + center[1]
      ];
    }
  }
  clamp(value, range) {
    return Math.max(Math.min(value, range[1]), range[0]);
  }
  setActualPosition(pos) {
    const transformRegex = new RegExp(/(\d+(\.\d+)?)/g);
    const positions = pos.match(transformRegex);
    if (positions) {
      this.$handle.style.transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0," + positions[0] + "," + positions[1] + ",0,1)";
    }
  }
  // set currentValue on control
  clampSlider(val) {
    if (val < this.control.min) {
      if (this._numberType === "int") {
        return Math.trunc(this.control.min);
      }
      return this.control.min;
    }
    if (val > this.control.max) {
      if (this._numberType === "int") {
        return Math.trunc(this.control.max);
      }
      return this.control.max;
    }
    if (this._numberType === "int") {
      val = Math.trunc(val);
    }
    return val;
  }
  clampJoystickX(val) {
    if (val < this.control.min[0]) {
      if (this._numberType === "int") {
        return Math.trunc(this.control.min[0]);
      }
      return this.control.min[0];
    }
    if (val > this.control.max[0]) {
      if (this._numberType === "int") {
        return Math.trunc(this.control.max[0]);
      }
      return this.control.max[0];
    }
    if (this._numberType === "int") {
      val = Math.trunc(val);
    }
    return val;
  }
  clampJoystickY(val) {
    if (val < this.control.min[1]) {
      if (this._numberType === "int") {
        return Math.trunc(this.control.min[1]);
      }
      return this.control.min[1];
    }
    if (val > this.control.max[1]) {
      if (this._numberType === "int") {
        return Math.trunc(this.control.max[1]);
      }
      return this.control.max[1];
    }
    if (this._numberType === "int") {
      val = Math.trunc(val);
    }
    return val;
  }
  mapValue() {
    if (this.control.orient === "is--hor") {
      this.control.currentValue = this.clampSlider(
        this.scale(
          this.control.x,
          0,
          this.control.width - 44,
          this.control.min,
          this.control.max
        )
      );
    }
    if (this.control.orient === "is--vert") {
      this.control.currentValue = this.clampSlider(
        this.scale(
          this.control.y,
          0,
          this.control.height - 44,
          this.control.min,
          this.control.max
        )
      );
    }
    if (this._joystickType) {
      this.control.currentValue = [
        this.clampJoystickX(
          this.scale(
            this.control.x,
            0,
            this.control.width - 44,
            this.control.min[0],
            this.control.max[0]
          )
        ),
        this.clampJoystickY(
          this.scale(
            this.control.y,
            0,
            this.control.height - 44,
            this.control.min[1],
            this.control.max[1]
          )
        )
      ];
    }
  }
  // Move handle, within elem
  setPosition(x, y) {
    const clampPos = (val) => {
      if (val < 0) {
        val = 0;
      }
      return val;
    };
    if (this.control.orient === "is--joystick") {
      this._joystickPos = this.circularBounds(
        this.control.x,
        this.control.y,
        [0, this.control.width - this.$handle.offsetWidth],
        [0, this.control.height - this.$handle.offsetHeight]
      );
      this.control.x = this.clamp(this._joystickPos[0], [
        0,
        this.control.width - this.$handle.offsetWidth
      ]);
      this.control.y = this.clamp(this._joystickPos[1], [
        0,
        this.control.height - this.$handle.offsetHeight
      ]);
      this.control.position = "translate(" + this.control.x + "px," + this.control.y + "px)";
      this.setActualPosition(this.control.position);
    } else {
      if (x <= 0) {
        this.control.x = 0;
      } else if (x > this.clientWidth - this.$handle.offsetWidth) {
        this.control.x = this.clientWidth - this.$handle.offsetWidth;
      } else {
        this.control.x = x;
      }
      if (y <= 0) {
        this.control.y = 0;
      } else if (y > this.clientHeight - this.$handle.offsetHeight) {
        this.control.y = this.clientHeight - this.$handle.offsetHeight;
      } else {
        this.control.y = y;
      }
      this.control.position = "translate(" + clampPos(this.control.x) + "px," + clampPos(this.control.y) + "px)";
      this.setActualPosition(this.control.position);
    }
  }
  updateControl(controlValue) {
    if (this._joystickType) {
      this.control.x = this.scale(
        controlValue[0],
        this.control.min[0],
        this.control.max[0],
        0,
        this.clientWidth
      );
      this.control.y = this.scale(
        controlValue[1],
        this.control.min[1],
        this.control.max[1],
        0,
        this.clientHeight
      );
    }
    if (this.control.orient === "is--hor") {
      this.control.x = this.scale(
        controlValue,
        this.control.min,
        this.control.max,
        0,
        this.clientWidth
      );
      this.control.y = 0;
    }
    if (this.control.orient === "is--vert") {
      this.control.x = 0;
      this.control.y = this.scale(
        controlValue,
        this.control.min,
        this.control.max,
        0,
        this.clientHeight
      );
    }
    this.setPosition(this.control.x, this.control.y);
    this.mapValue();
  }
  setChannel(name) {
    this.channel = new BroadcastChannel(name);
  }
};
__decorateClass$l([
  Emitter("input")
], RdSlider.prototype, "onSliderInit", 1);
__decorateClass$l([
  Listen("mouseleave")
], RdSlider.prototype, "onMouseLeave", 1);
__decorateClass$l([
  Listen("mouseenter")
], RdSlider.prototype, "onMouseEnter", 1);
__decorateClass$l([
  Listen("touchstart")
], RdSlider.prototype, "onTouchStart", 1);
__decorateClass$l([
  Listen("mousedown")
], RdSlider.prototype, "onMouseDown", 1);
__decorateClass$l([
  Listen("mouseup")
], RdSlider.prototype, "onMouseUp", 1);
__decorateClass$l([
  Listen("touchend")
], RdSlider.prototype, "onTouchEnd", 1);
RdSlider = __decorateClass$l([
  Component({
    selector: "rd-slider",
    style: css`
    :host {
      display: block;
    }
    :host:after {
      content: '';
      display: table;
      clear: both;
    }
    .draggable {
      display: block;
      z-index: 1000;
      background-color: var(--ready-color-bg);
      border: 2px solid var(--ready-color-border);
    }
    .draggable .range {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .draggable .handle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--ready-icon-joy);
      background-repeat: no-repeat;
      transition: transform 0.175;
      pointer-events: none;
    }
    .slider {
      position: relative;
    }
    .slider.small .draggable {
      border: none;
    }  
    .slider.small .draggable.active {
      border: none;
    }
    .slider.hor {
      width: 100%;
      max-width: 280px;
    }
    .slider.hor .draggable {
      width: 100%;
      border-radius: 14px;
    }
    .slider.hor .draggable .handle {
      background: var(--ready-icon-hor);
      background-position: 50% 0px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 32px;
      width: 32px;
    }
    .slider.hor.small {
      width: 100%;
      height: 12px;
    }
    .slider.hor.small .draggable {
      width: 100%;
      height: 12px;
      border-radius: 6px;
    }
    .slider.vert {
      width: 32px;
      height: 100%;
    }
    .slider.vert .draggable {
      width: 32px;
      height: 100%;
      min-height: 208px;
      border-radius: 14px;
    }
    .slider.vert .draggable .handle {
      background: var(--ready-icon-vert);
      background-position: 0px 50%;
      background-repeat: no-repeat;
      height: 32px;
      width: 32px;
    }
    .slider.vert.small {
      width: 12px;
      height: 100%;
    }
    .slider.vert.small .draggable {
      width: 12px;
      height: 100%;
      border-radius: 6px;
    }
    .slider.joystick {
      width: 200px;
      height: 200px;
    }
    .slider.joystick .draggable {
      width: 200px;
      height: 200px;
      cursor: var(--ready-icon-handle-bg) 0 0, pointer;
    }
    .slider.joystick.circle .draggable {
      border-radius: 50%;
    }
    .slider.joystick.square .draggable{
      border-radius: 22px;
    }
    .slider.joystick .draggable .handle {
      position: absolute;
      background-size: 44px 44px;
      width: 44px;
      height: 44px;
    }
    .slider .draggable:hover, 
    .slider .draggable.active {
      border: 2px solid var(--ready-color-highlight);
      outline: none;
      box-shadow: none;
    }
    .slider .draggable:hover .handle, 
    .slider .draggable.active .handle {
      -webkit-filter: grayscale(100%) brightness(5);
      filter: grayscale(100%) brightness(5); 
    }
    .slider .draggable[disabled] {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
    }
    .slider .draggable[disabled]:hover, 
    .slider .draggable[disabled].active {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    :host.required .slider .draggable,
    :host.required .slider .draggable[disabled]:hover, 
    :host.required .slider .draggable[disabled].active {
      border: 2px solid var(--ready-color-error);
      outline: none;
      box-shadow: none;
    }
  }
  `,
    template: html`
    <div class="slider">
      <div class="draggable">
        <div class="range">
          <div class="handle"></div>
        </div>
      </div>
    </div>
  `
  })
], RdSlider);
const routing = [
  { path: "/", component: "app-home", title: "Readymade" },
  { path: "/test", component: "app-testbed", title: "Readymade Test Page" },
  { path: "/lib", component: "app-library", title: "Readymade UI" },
  {
    path: "/perf",
    component: "app-perftest",
    title: "Readymade Performance Test"
  },
  {
    path: "/router",
    component: "app-query",
    queryParams: {
      contentType: "post",
      page: "1",
      header: "1"
    },
    title: "Readymade Router Test"
  },
  {
    path: "/404",
    component: "app-notfound",
    title: "File Not Found"
  }
];
var __defProp$k = Object.defineProperty;
var __getOwnPropDesc$k = Object.getOwnPropertyDescriptor;
var __decorateClass$k = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$k(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$k(target, key, result);
  return result;
};
let MyButtonComponent = class extends ButtonComponent {
  constructor() {
    super();
  }
  getState() {
    return {
      model: "Click"
    };
  }
  onClick() {
    this.emitter.broadcast("bang");
  }
  onKeyUp(event) {
    if (event.key === "Enter") {
      this.emitter.broadcast("bang");
    }
  }
};
__decorateClass$k([
  State()
], MyButtonComponent.prototype, "getState", 1);
__decorateClass$k([
  Emitter("bang", { bubbles: true, composed: true }),
  Listen("click")
], MyButtonComponent.prototype, "onClick", 1);
__decorateClass$k([
  Listen("keyup")
], MyButtonComponent.prototype, "onKeyUp", 1);
MyButtonComponent = __decorateClass$k([
  Component({
    selector: "my-button",
    custom: { extends: "button" },
    style: css`
    :host {
      background: rgba(24, 24, 24, 1);
      cursor: pointer;
      color: white;
      font-weight: 400;
    }
  `,
    template: html` <span>{{model}}</span> `
  })
], MyButtonComponent);
var __defProp$j = Object.defineProperty;
var __getOwnPropDesc$j = Object.getOwnPropertyDescriptor;
var __decorateClass$j = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$j(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$j(target, key, result);
  return result;
};
class CodeState {
  constructor() {
    this.type = "";
    this.language = "";
  }
}
let RCodeComponent = class extends CustomElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.onSlotChange();
  }
  getState() {
    return new CodeState();
  }
  static get observedAttributes() {
    return ["language"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "language":
        this.setState("type", newValue);
        this.setState("language", `language-${newValue}`);
        break;
    }
  }
  onSlotChange() {
    const code = this.shadowRoot.querySelector("slot").assignedNodes()[1].textContent;
    this.shadowRoot.querySelector("code").innerHTML = Prism.highlight(
      code,
      Prism.languages[this.getAttribute("type")],
      this.getAttribute("type")
    );
  }
};
__decorateClass$j([
  State()
], RCodeComponent.prototype, "getState", 1);
RCodeComponent = __decorateClass$j([
  Component({
    selector: "r-code",
    style: css`
    :host {
      display: block;
      padding: 1em;
      background: var(--ready-color-container-bg);
    }
    code[class*='language-'],
    pre[class*='language-'] {
      -moz-tab-size: 2;
      -o-tab-size: 2;
      tab-size: 2;
      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
      white-space: pre;
      white-space: pre-wrap;
      word-wrap: normal;
      font-family: 'Source Code Pro', 'Courier New', monospace;
      font-size: 14px;
      font-weight: 400;
      color: #e0e2e4;
      text-shadow: none;
    }
    ::selection {
      background: #ff7de9; /* WebKit/Blink Browsers */
    }
    ::-moz-selection {
      background: #ff7de9; /* Gecko Browsers */
    }
    pre[class*='language-'],
    :not(pre) > code[class*='language-'] {
      background: #0e1014;
    }
    pre[class*='language-'] {
      padding: 15px;
      border-radius: 4px;
      border: 1px solid #0e1014;
      overflow: auto;
    }

    pre[class*='language-'] {
      position: relative;
    }
    pre[class*='language-'] code {
      white-space: pre;
      display: block;
    }

    :not(pre) > code[class*='language-'] {
      padding: 0.2em 0.2em;
      border-radius: 0.3em;
      border: 0.13em solid #7a6652;
      box-shadow: 1px 1px 0.3em -0.1em #000 inset;
    }
    .token.namespace {
      opacity: 0.7;
    }
    .token.function {
      color: rgba(117, 191, 255, 1);
    }
    .token.class-name {
      color: #e0e2e4;
    }
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #208c9a;
    }
    .token.operator,
    .token.boolean,
    .token.number {
      color: #ff7de9;
    }
    .token.attr-name,
    .token.string {
      color: #e6d06c;
    }

    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
      color: #bb9cf1;
    }
    .token.selector,
    .token.inserted {
      color: #b6babf;
    }
    .token.atrule,
    .token.attr-value,
    .token.keyword,
    .token.important,
    .token.deleted {
      color: #ff7de9;
    }
    .token.regex,
    .token.statement {
      color: #ffe4a6;
    }
    .token.placeholder,
    .token.variable {
      color: #ff7de9;
    }
    .token.important,
    .token.statement,
    .token.bold {
      font-weight: bold;
    }
    .token.punctuation {
      color: #a9bacb;
    }
    .token.entity {
      cursor: help;
    }
    .token.italic {
      font-style: italic;
    }

    code.language-markup {
      color: #b1b1b3;
    }
    code.language-markup .token.tag {
      color: #75bfff;
    }
    code.language-markup .token.attr-name {
      color: #ff97e9;
    }
    code.language-markup .token.attr-value {
      color: #d7d7db;
    }
    code.language-markup .token.style,
    code.language-markup .token.script {
      color: #75bfff99;
    }
    code.language-markup .token.script .token.keyword {
      color: #9f9f9f;
    }

    pre[class*='language-'][data-line] {
      position: relative;
      padding: 1em 0 1em 3em;
    }
    pre[data-line] .line-highlight {
      position: absolute;
      left: 0;
      right: 0;
      padding: 0;
      margin-top: 1em;
      background: rgba(255, 255, 255, 0.08);
      pointer-events: none;
      line-height: inherit;
      white-space: pre;
    }
    pre[data-line] .line-highlight:before,
    pre[data-line] .line-highlight[data-end]:after {
      content: attr(data-start);
      position: absolute;
      top: 0.4em;
      left: 0.6em;
      min-width: 1em;
      padding: 0.2em 0.5em;
      background-color: rgba(255, 255, 255, 0.4);
      color: black;
      font: bold 65%/1 sans-serif;
      height: 1em;
      line-height: 1em;
      text-align: center;
      border-radius: 999px;
      text-shadow: none;
      box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
    }
    pre[data-line] .line-highlight[data-end]:after {
      content: attr(data-end);
      top: auto;
      bottom: 0.4em;
    }
  `,
    template: html`
    <pre class="{{language}}"><code class="{{language}}"></code></pre>
    <slot hidden></slot>
  `
  })
], RCodeComponent);
var __defProp$i = Object.defineProperty;
var __getOwnPropDesc$i = Object.getOwnPropertyDescriptor;
var __decorateClass$i = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$i(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$i(target, key, result);
  return result;
};
const CounterState = {
  count: 0
};
let MyCounter = class extends CustomElement {
  connectedCallback() {
    this.shadowRoot.querySelector("#inc").addEventListener("click", this.inc.bind(this));
    this.shadowRoot.querySelector("#dec").addEventListener("click", this.dec.bind(this));
  }
  getState() {
    return CounterState;
  }
  inc() {
    this.setState("count", this.getState().count + 1);
  }
  dec() {
    this.setState("count", this.getState().count - 1);
  }
};
__decorateClass$i([
  State()
], MyCounter.prototype, "getState", 1);
MyCounter = __decorateClass$i([
  Component({
    selector: "my-counter",
    template: `
    <button id="dec">-</button>
    <span>{{ count }}</span>
    <button id="inc">+</button>
  `,
    style: `
	span,
	button {
		font-size: 200%;
	}

	span {
		width: 4rem;
		display: inline-block;
		text-align: center;
	}

	button {
		width: 4rem;
		height: 4rem;
		border: none;
		border-radius: 10px;
		background-color: seagreen;
		color: white;
	}
	`
  })
], MyCounter);
var __defProp$h = Object.defineProperty;
var __getOwnPropDesc$h = Object.getOwnPropertyDescriptor;
var __decorateClass$h = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$h(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$h(target, key, result);
  return result;
};
const style$9 = `
  :host {
    font-size: 16px;
  }
  h1 {
    font-family: 'Major Mono Display', sans-serif;
    padding-left: 1em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-margin-before: 0px;
    -webkit-margin-after: 0px;
  }
  h1,
  span {
    font-size: 1em;
    letter-spacing: -0.04em;
    margin-block-start: 0em;
    margin-block-end: 0em;
  }
  h1.is--default,
  span.is--default {
    font-size: 1em;
  }
  h1.is--small,
  span.is--small {
    font-size: 12px;
  }
  h1.is--medium,
  span.is--medium {
    font-size: 6em;
  }
  h1.is--large,
  span.is--large {
    font-size: 12em;
    padding-left: 0em;
  }
`;
const template$9 = `<h1 class="{{model.size}}">{{ model.copy }}</h1>`;
let RHeadlineComponent = class extends CustomElement {
  constructor() {
    super();
  }
  getState() {
    return {
      model: {
        size: "",
        copy: ""
      }
    };
  }
  static get observedAttributes() {
    return ["headline", "size"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "headline":
        this.setState("model.copy", newValue);
        break;
      case "size":
        this.setState("model.size", newValue);
        break;
    }
  }
};
__decorateClass$h([
  State()
], RHeadlineComponent.prototype, "getState", 1);
RHeadlineComponent = __decorateClass$h([
  Component({
    selector: "r-headline",
    style: style$9,
    template: template$9
  })
], RHeadlineComponent);
const render$3 = ({ size, copy }) => `
  <r-headline>
    <template shadowrootmode="open">
      <style>
      ${style$9}
      </style>
      <h1 class="${size}">${copy}</h1>
    </template>
  </r-headline>
`;
var __defProp$g = Object.defineProperty;
var __getOwnPropDesc$g = Object.getOwnPropertyDescriptor;
var __decorateClass$g = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$g(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$g(target, key, result);
  return result;
};
let MyInputComponent = class extends InputComponent {
  constructor() {
    super();
  }
  onFocus() {
    this.value = "input";
  }
};
__decorateClass$g([
  Listen("focus")
], MyInputComponent.prototype, "onFocus", 1);
MyInputComponent = __decorateClass$g([
  Component({
    selector: "my-input",
    custom: { extends: "input" },
    style: css`
    :host {
      background: rgba(24, 24, 24, 1);
      border: 0px none;
      color: white;
    }
  `
  })
], MyInputComponent);
var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$f(target, key, result);
  return result;
};
let MyItemComponent = class extends CustomElement {
  constructor() {
    super();
  }
  onBang() {
    if (this.getAttribute("state") === "--selected") {
      this.setAttribute("state", "");
    } else {
      this.setAttribute("state", "--selected");
    }
  }
};
__decorateClass$f([
  Listen("bang", "default")
], MyItemComponent.prototype, "onBang", 1);
MyItemComponent = __decorateClass$f([
  Component({
    selector: "my-item",
    style: css`
    :host {
      display: block;
      cursor: pointer;
    }
    :host([state='--selected']) {
      background: rgba(255, 105, 180, 1);
      color: black;
      font-weight: 700;
    }
  `,
    template: html`
    <p>
      <span><slot name="msg">item</slot></span>
    </p>
  `
  })
], MyItemComponent);
var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$e(target, key, result);
  return result;
};
let MyListComponent = class extends CustomElement {
  constructor() {
    super();
    this.currentIndex = 0;
  }
  deactivateElement(elem) {
    elem.setAttribute("tabindex", "-1");
    elem.querySelector("my-item").setAttribute("state", "");
  }
  activateElement(elem) {
    elem.setAttribute("tabindex", "0");
    elem.querySelector("my-item").setAttribute("state", "--selected");
  }
  connectedCallback() {
    this.setAttribute("tabindex", "0");
  }
  onFocus() {
    for (const li of this.children[0].children) {
      if (li === this.children[0].children[this.currentIndex]) {
        this.activateElement(li);
      } else {
        this.deactivateElement(li);
      }
      li.addEventListener("click", (clickEv) => {
        getSiblings(li).forEach((elem) => {
          this.deactivateElement(elem);
        });
        this.activateElement(li);
        this.onSubmit(clickEv);
      });
    }
  }
  onKeydown(ev) {
    const currentElement = this.querySelector(
      '[tabindex]:not([tabindex="-1"])'
    );
    const siblings = getSiblings(currentElement);
    this.currentIndex = getElementIndex(currentElement);
    if (ev.keyCode === 13) {
      this.onSubmit(ev);
    }
    if (ev.keyCode === 38) {
      if (this.currentIndex === 0) {
        this.currentIndex = siblings.length - 1;
      } else {
        this.currentIndex -= 1;
      }
      siblings.forEach((elem) => {
        if (getElementIndex(elem) === this.currentIndex) {
          this.activateElement(elem);
        } else {
          this.deactivateElement(elem);
        }
      });
    }
    if (ev.keyCode === 40) {
      if (this.currentIndex === siblings.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
      siblings.forEach((elem) => {
        if (getElementIndex(elem) === this.currentIndex) {
          this.activateElement(elem);
        } else {
          this.deactivateElement(elem);
        }
      });
    }
  }
  onSubmit() {
  }
};
__decorateClass$e([
  Listen("focus")
], MyListComponent.prototype, "onFocus", 1);
__decorateClass$e([
  Listen("keydown")
], MyListComponent.prototype, "onKeydown", 1);
MyListComponent = __decorateClass$e([
  Component({
    selector: "my-list",
    style: css`
    :host {
      display: block;
      background: rgba(24, 24, 24, 1);
      width: 200px;
      height: 200px;
      color: white;
      padding: 1em;
      border-radius: 8px;
    }
  `,
    template: html` <slot name="menu"></slot> `
  })
], MyListComponent);
var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$d(target, key, result);
  return result;
};
class LogoState {
  constructor() {
    this.heading = "R";
    this.heading2 = "readymade";
    this.size = "";
    this.sizes = ["is--small", "is--medium", "is--large"];
  }
}
const _logoState = new LogoState();
const style$8 = `
  :host {
    display: block;
    user-select: none;
    font-size: 16px;
    font-family: Source Sans Pro, sans-serif;
  }
`;
const template$8 = `
<r-headline headline="{{heading}}" size="{{size}}"></r-headline>
<r-headline headline="{{heading2}}"></r-headline>
`;
let RLogoComponent = class extends CustomElement {
  constructor() {
    super();
  }
  getState() {
    return _logoState;
  }
  static get observedAttributes() {
    return ["size"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "size":
        this.setSize(newValue);
        break;
    }
  }
  setSize(size) {
    this.setState("size", size);
  }
};
__decorateClass$d([
  State()
], RLogoComponent.prototype, "getState", 1);
RLogoComponent = __decorateClass$d([
  Component({
    selector: "r-logo",
    style: style$8,
    template: template$8
  })
], RLogoComponent);
const render$2 = ({ size, classes }) => `
  <r-logo class="${classes ? classes : ""}">
    <template shadowrootmode="open">
      <style>
      ${style$8}
      </style>
      ${render$3({ size, copy: _logoState.heading })}
      ${render$3({ size: "is--default", copy: _logoState.heading2 })}
    </template>
  </r-logo>
`;
var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$c(target, key, result);
  return result;
};
class MainNavState {
  constructor() {
    this.resourceLinkFillColor = "#cfcfcf";
    this.size = "44px";
  }
}
const template$7 = `
  <nav>
    <ul class="left">
      <li link="side-nav"></li>
    </ul>
    <ul class="right">
      <li link="resource">
        <a
          href="https://github.com/readymade-ui/readymade"
          target="_blank"
          rel="noreferrer"
        >
          <svg width="25px" height="25px" viewBox="0 0 25 25">
            <title>Stephen Belovarich Github Profile</title>
            <defs></defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g
                transform="translate(3.000000, 2.000000)"
                fill="{{resourceLinkFillColor}}"
                fill-rule="nonzero"
              >
                <path
                  d="M3.94399028,5.10104103 C2.92388422,5.10104103 2.04650906,5.44611145 1.3097658,6.134109 C0.545735749,6.87140233 0.161621741,7.79087569 0.161621741,8.89252909 C0.161621741,9.62767912 0.369421122,10.31782 0.789217852,10.9608083 C1.16493593,11.5587875 1.55534688,11.9424372 2.06959788,12.1096142 L2.06959788,12.1546234 C1.55534688,12.3689528 1.32655767,12.9047765 1.32655767,13.7620943 C1.32655767,14.4200857 1.55534688,14.9109002 2.06959788,15.2323944 L2.06959788,15.2774036 C0.650684932,15.7510716 0,16.634109 0,17.9200857 C0,19.0388855 0.476469289,19.857624 1.40841803,20.3784446 C2.14306231,20.7921004 3.08760495,21 4.22735307,21 C7.00220946,21 8.39383562,19.8126148 8.39383562,17.4378445 C8.39383562,15.9525413 7.32335395,15.0394979 5.17819266,14.7030006 C4.68283252,14.625842 4.30921343,14.4415187 4.05313743,14.1521739 C3.85793195,13.9528475 3.7613787,13.7535211 3.7613787,13.5541947 C3.7613787,12.988365 4.06153336,12.6582976 4.66184269,12.5661359 C5.57699956,12.4289651 6.32423774,11.9960196 6.90145824,11.2672994 C7.47867875,10.5385793 7.76833849,9.68554807 7.76833849,8.70606246 C7.76833849,8.39957134 7.67808219,8.06950398 7.55844012,7.71800367 C7.94885108,7.62584201 8.22171896,7.54225352 8.42741935,7.46509492 L8.42741935,5.10104103 C7.5227574,5.46968769 6.67896597,5.65186773 5.95901458,5.65186773 C5.32931949,5.28536436 4.67863456,5.10104103 3.94399028,5.10104103 Z M4.19167035,16.5698102 C5.45106054,16.5698102 6.08285462,16.9598898 6.08285462,17.7421923 C6.08285462,18.569504 5.50563411,18.9831598 4.34909412,18.9831598 C3.02883341,18.9831598 2.36765356,18.584507 2.36765356,17.7872015 C2.36765356,16.9748928 2.97635882,16.5698102 4.19167035,16.5698102 Z M4.03424658,10.5021433 C3.08970393,10.5021433 2.61533363,9.97274954 2.61533363,8.91610533 C2.61533363,7.78230251 3.08760495,7.21647275 4.03424658,7.21647275 C4.48342908,7.21647275 4.83605833,7.3922229 5.09213433,7.7458665 C5.3020327,8.06736069 5.40698188,8.45101041 5.40698188,8.89467238 C5.40698188,9.96631966 4.94940345,10.5021433 4.03424658,10.5021433 Z M10.8748343,0 C10.4403447,0 10.0688246,0.169320269 9.76027397,0.505817514 C9.45172338,0.842314758 9.29849757,1.24954072 9.29849757,1.72320882 C9.29849757,2.18187385 9.45172338,2.58052664 9.76027397,2.91916718 C10.0688246,3.25566442 10.4382457,3.42498469 10.8748343,3.42498469 C11.294631,3.42498469 11.6598542,3.25566442 11.9663058,2.91916718 C12.2748564,2.58266993 12.4280822,2.18401715 12.4280822,1.72320882 C12.4280822,1.24739743 12.2748564,0.842314758 11.9663058,0.505817514 C11.6598542,0.169320269 11.29673,0 10.8748343,0 Z M12.1363235,5.25107165 L9.59235528,5.25107165 C9.62174105,5.544703 9.57976138,5.99050827 9.57976138,6.71065524 L9.57976138,13.8585426 C9.57976138,14.5936926 9.62174105,15.1873852 9.59235528,15.418861 L12.1363235,15.418861 C12.1069377,15.0823637 12.0271763,14.5036742 12.0271763,13.7213717 L12.0271763,6.66350276 C12.0271763,5.99050827 12.1069377,5.544703 12.1363235,5.25107165 Z M17.7448078,13.2134109 C17.0836279,13.2134109 16.7582855,12.6990202 16.7582855,11.6745254 L16.7582855,7.43508879 L17.7595007,7.43508879 C17.9400133,7.43508879 18.101635,7.42437232 18.3052364,7.43937538 C18.5088378,7.45437844 18.5885992,7.44366197 18.6935484,7.44366197 L18.6935484,5.25107165 L16.7603844,5.25107165 L16.7603844,4.27372933 C16.7603844,3.90508267 16.817057,3.57072872 16.8611357,3.36068585 L14.25,3.36068585 C14.2940787,3.57072872 14.2898807,3.8922229 14.2898807,4.32088181 L14.2898807,5.25107165 L13.1585285,5.25107165 L13.1585285,7.44580527 C13.4670791,7.40079608 13.742046,7.37721984 13.9372514,7.37721984 L14.2898807,7.40079608 L14.2898807,7.41365585 L14.2898807,11.5609308 C14.2898807,12.8469075 14.4494034,13.7899571 14.764251,14.3879363 C15.1840477,15.1852419 15.920791,15.5838947 17.0164605,15.5838947 C17.7972824,15.5838947 18.485749,15.4317208 19,15.1252296 L19,12.8233313 C18.5906982,13.0826699 18.2107821,13.2134109 17.7448078,13.2134109 Z"
                ></path>
              </g>
            </g>
          </svg>
        </a>
      </li>
    </ul>
  </nav>
`;
const style$7 = `
  :host {
    display: block;
    position: fixed;
    top: 0px;
    width: 100%;
    height: 60px;
    margin-right: 40px;
    font-weight: 700;
    z-index: 9999;
    user-select: none;
  }
  nav {
    width: 100%;
  }
  ul {
    margin-block-start: 0em;
    margin-block-end: 0em;
    padding-inline-start: 0px;
    padding: 0;
    margin: 0;
    list-style: none;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
    -webkit-margin-before: 0px;
    -webkit-margin-after: 0px;
  }
  ul li {
    display: inline-block;
    cursor: pointer;
    height: 100%;
    padding: 1em;
    width: 44px;
    height: 44px;
    cursor: pointer;
  }
  ul.left {
    float: left;
  }
  ul.left li {
    margin-right: 0px;
    padding: 0px;
    width: 44px;
    height: 44px;
    position: absolute;
    left: 4px;
    top: 4px;
  }
  ul.left li.is--dark {
    color: #222222;
  }
  ul.left li.is--dark:hover {
    color: #000000;
  }
  ul.right {
    float: right;
    margin-right: 2px;
  }
  ul.right li {
    margin-left: 0px;
    padding-right: 10px;
    text-align: right;
    transform: translateY(-10px);
  }
`;
let RMainNavComponent = class extends CustomElement {
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
    resourceLink.addEventListener("mouseenter", () => {
      this.setState("resourceLinkFillColor", "#efefef");
    });
    resourceLink.addEventListener("mouseleave", () => {
      this.setState("resourceLinkFillColor", "#cfcfcf");
    });
    navLink.addEventListener("click", () => {
      if (navLink.classList.contains("is--dark")) {
        this.emitter.broadcast("close", "sidenav");
        navLink.classList.remove("is--dark");
      } else {
        this.emitter.broadcast("open", "sidenav");
        navLink.classList.add("is--dark");
      }
    });
  }
  onClose() {
    this.shadowRoot.querySelector('[link="side-nav"]').classList.remove("is--dark");
  }
};
__decorateClass$c([
  State()
], RMainNavComponent.prototype, "getState", 1);
__decorateClass$c([
  Emitter("open", {}, "sidenav"),
  Emitter("close", {}, "sidenav")
], RMainNavComponent.prototype, "connectedCallback", 1);
__decorateClass$c([
  Listen("close", "sidenav")
], RMainNavComponent.prototype, "onClose", 1);
RMainNavComponent = __decorateClass$c([
  Component({
    selector: "r-main-nav",
    style: style$7,
    template: template$7
  })
], RMainNavComponent);
const render$1 = () => `
  <r-main-nav>
    <template shadowrootmode="open">
    <style>
    ${style$7}
    </style>
    ${template$7}
    </template>
  </r-main-nav>
`;
var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$b(target, key, result);
  return result;
};
let RMeterComponent = class extends CustomElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["label", "max", "value", "color"];
  }
  attributeChangedCallback(name, old, next) {
    switch (name) {
      case "label":
        this.setLabel(next);
        break;
      case "max":
        this.max = parseFloat(next);
        this.setValue();
        break;
      case "value":
        this.value = parseFloat(next);
        this.setValue();
        break;
      case "color":
        this.setColor(next);
        break;
    }
  }
  canSet() {
    if (this.max === void 0 || this.value === void 0) {
      return false;
    }
    return true;
  }
  setValue() {
    if (this.canSet()) {
      this.shadowRoot.querySelector(".progress").style.width = `${this.value / this.max * 100}%`;
      this.shadowRoot.querySelector(".value").innerText = `${this.value}Kb`;
    }
  }
  setLabel(val) {
    this.shadowRoot.querySelector(".label").innerText = val;
  }
  setColor(val) {
    this.shadowRoot.querySelector(".progress").style.background = val;
  }
};
RMeterComponent = __decorateClass$b([
  Component({
    selector: "r-meter",
    style: css`
    :host {
      display: block;
      width: 100%;
      margin-bottom: 4px;
    }
    label {
      display: block;
      font-size: 1em;
      margin-bottom: 4px;
    }
    .label {
      margin-right: 4px;
      opacity: 0.8;
      font-weight: 500;
    }
    .meter {
      display: block;
      width: 100%;
      height: 20px;
      overflow: hidden;
    }
    .progress {
      display: inline-block;
      width: 0%;
      height: 100%;
      border-radius: 4px;
      transition: width 2s ease-out;
    }
  `,
    template: html`
    <label><span class="label"></span><span class="value"></span></label>
    <div class="meter">
      <div class="progress"></div>
    </div>
  `
  })
], RMeterComponent);
var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$a(target, key, result);
  return result;
};
class SideNavState {
  constructor() {
    this.shadowPoints = `7,34 22,32 24,22`;
    this.triPoints = `7,9 7,34 24,22`;
    this.strokeColor = "#cfcfcf";
    this.fillColor = "#cfcfcf";
    this.shadowColor = "#c0c0c0";
    this.size = "10000px";
  }
}
const template$6 = html`
  <svg class="background" width="54px" height="60px">
    <clipPath id="c1">
      <polygon
        stroke-width="3"
        class="polygon"
        attr.points="{{triPoints}}"
      ></polygon>
    </clipPath>
    <g stroke="none" fill="none" fill-rule="evenodd">
      <polygon
        fill="{{shadowColor}}"
        stroke-width="0"
        class="shadow"
        attr.points="{{shadowPoints}}"
      ></polygon>
      <polygon
        fill="{{fillColor}}"
        stroke-width="0"
        class="polygon"
        attr.points="{{triPoints}}"
      ></polygon>
    </g>
  </svg>
  <nav>
    <ul class="top">
      <li>
        <span><a data-link="#intro">Intro</a></span>
      </li>
      <li>
        <span><a data-link="#started">Getting Started</a></span>
      </li>
      <li>
        <span><a data-link="#docs">Using Readymade</a></span>
      </li>
      <li>
        <span><a data-link="#resources">Resources</a></span>
      </li>
      <li>
        <span><a href="/lib">@readymade/ui</a></span>
      </li>
    </ul>
  </nav>
`;
const style$6 = css`
  :host {
    display: block;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 0px;
    max-width: 320px;
    z-index: 8888;
    color: #000;
    overflow: visible;
  }
  :host.is--active {
    width: 320px;
  }
  .is--hidden {
    display: none;
  }
  svg {
    overflow: visible;
    transform: translateX(0px);
  }
  nav {
    display: block;
    position: relative;
    width: 0%;
    height: 100%;
    -webkit-clip-path: url(#c1);
    overflow: hidden;
  }
  nav.is--active {
    width: 1400px;
  }
  ul {
    margin-block-start: 0em;
    margin-block-end: 0em;
    padding-inline-start: 0px;
    width: 100%;
    display: block;
  }
  ul li {
    display: block;
    cursor: pointer;
    width: 100%;
    opacity: 0.8;
    cursor: pointer;
    padding-inline-start: 0px;
    width: 100%;
    max-width: 320px;
    font-weight: 700;
  }
  ul li > span {
    display: inline-block;
    position: relative;
    height: 22px;
    width: calc(100% - 56px);
    margin-left: 20px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 0px;
    padding-right: 0px;
  }
  ul li a:link,
  ul li a:visited {
    opacity: 0.8;
    color: #000000;
    text-decoration: none;
  }
  ul li:hover a:link,
  ul li:hover a:visited {
    opacity: 1;
    color: #ffffff;
  }
  ul.top {
    position: absolute;
    top: 0px;
    margin-top: 240px;
  }
  ul.bottom {
    position: absolute;
    bottom: 0px;
  }
  ul.bottom li {
    margin-bottom: 10px;
  }
`;
let RSideNavComponent = class extends CustomElement {
  constructor() {
    super();
    this.direction = "forwards";
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
    this.nav = this.shadowRoot.querySelector("nav");
    this.background = this.shadowRoot.querySelector(".background");
    this.shadow = this.shadowRoot.querySelector(".shadow");
    Array.from(this.shadowRoot.querySelectorAll("a")).forEach((a) => {
      a.addEventListener("click", (ev) => {
        document.querySelector("app-home").shadowRoot.querySelector(
          ev.target.getAttribute("data-link")
        ).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
        this.close();
      });
    });
  }
  close() {
    if (this.status === "is--inactive") {
      return;
    }
    this.status = "is--inactive";
    this.direction = "reverse";
    this.emitter.broadcast("close", "sidenav");
    this.player = this.animate([{ x: 0 }, { x: 100 }], {
      duration: 150,
      fill: "forwards",
      easing: "cubic-bezier(0.42, 0, 0.88, 1)"
    });
    setTimeout(() => {
      this.classList.remove("is--active");
    }, 50);
    setTimeout(() => {
      this.shadow.classList.remove("is--hidden");
    }, 100);
    setTimeout(() => {
      this.nav.classList.remove("is--active");
    }, 50);
    this.player.play();
    this.update();
  }
  open() {
    if (this.status === "is--active") {
      return;
    }
    this.direction = "forwards";
    this.status = "is--active";
    this.player = this.animate([{ x: 100 }, { x: 0 }], {
      duration: 1500,
      fill: "forwards",
      easing: "cubic-bezier(0.42, 0, 0.88, 1)"
    });
    this.classList.add("is--active");
    this.shadow.classList.add("is--hidden");
    this.nav.classList.add("is--active");
    this.player.play();
    this.update();
  }
  scale(v, min, max, gmin, gmax) {
    return (v - min) / (max - min) * (gmax - gmin) + gmin;
  }
  update() {
    const time = this.player.currentTime;
    if (this.direction === "forwards") {
      this.points.tri.a = this.scale(time, 0, 350, 34, 3444);
      this.points.tri.b = this.scale(time, 0, 350, 24, 2444);
      this.points.tri.c = this.scale(time, 0, 350, 22, 2222);
      this.points.shadow.d = this.scale(time, 0, 350, 32, 3222);
    }
    if (this.direction === "reverse") {
      this.points.tri.a = this.scale(time, 0, 150, 3444, 34);
      this.points.tri.b = this.scale(time, 0, 150, 2444, 24);
      this.points.tri.c = this.scale(time, 0, 150, 2222, 22);
      this.points.shadow.d = this.scale(time, 0, 150, 3222, 32);
    }
    this.setState(
      "triPoints",
      `7,9 7,${this.points.tri.a} ${this.points.tri.b},${this.points.tri.c}`
    );
    this.setState(
      "shadowPoints",
      `7,${this.points.tri.a} ${this.points.tri.c},${this.points.shadow.d} ${this.points.tri.b},${this.points.tri.c}`
    );
    if (this.player.playState === "running" || this.player.playState === "pending") {
      window.requestAnimationFrame(this.update.bind(this));
    }
  }
};
__decorateClass$a([
  State()
], RSideNavComponent.prototype, "getState", 1);
__decorateClass$a([
  Emitter("close", {}, "sidenav")
], RSideNavComponent.prototype, "connectedCallback", 1);
__decorateClass$a([
  Listen("close", "sidenav")
], RSideNavComponent.prototype, "close", 1);
__decorateClass$a([
  Listen("open", "sidenav")
], RSideNavComponent.prototype, "open", 1);
RSideNavComponent = __decorateClass$a([
  Component({
    selector: "r-side-nav",
    style: style$6,
    template: template$6
  })
], RSideNavComponent);
const render = () => `
  <r-side-nav>
    <template shadowrootmode="open">
      <style>
      ${style$6}
      </style>
      ${template$6}
    </template>
  </r-side-nav>
`;
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$9(target, key, result);
  return result;
};
let RStatsComponent = class extends CustomElement {
  constructor() {
    var _a, _b;
    super();
    (_b = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("slot")) == null ? void 0 : _b.addEventListener("slotchange", () => this.onSlotChange());
  }
  onSlotChange() {
    this.animateIn();
  }
  animateIn() {
    var _a, _b;
    const ul = (_b = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("slot")) == null ? void 0 : _b.assignedNodes()[1];
    if (ul && ul.children) {
      Array.from(ul.children).forEach((li, index) => {
        li.animate(
          [
            { opacity: "0", color: "#000" },
            { opacity: "0", offset: index * 0.1 },
            { opacity: "1", color: "#fff" }
          ],
          {
            duration: 2e3
          }
        );
      });
    }
  }
};
RStatsComponent = __decorateClass$9([
  Component({
    selector: "r-stats",
    style: css`
    :host {
      display: block;
    }
    ::slotted(ul) {
      display: inline-block;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      font-weight: 300;
    }
  `,
    template: html` <slot></slot> `
  })
], RStatsComponent);
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$8(target, key, result);
  return result;
};
let AtomComponent = class extends CustomElement {
  constructor() {
    super();
  }
  getState() {
    return {
      astate: ""
    };
  }
  static get observedAttributes() {
    return ["model"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "model":
        this.setModel(newValue);
        break;
    }
  }
  setModel(model) {
    this.setState("astate", model);
  }
};
__decorateClass$8([
  State()
], AtomComponent.prototype, "getState", 1);
AtomComponent = __decorateClass$8([
  Component({
    selector: "x-atom",
    style: css`
    :host {
      display: flex;
    }
  `,
    template: html` <span>{{astate}}</span> `
  })
], AtomComponent);
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$7(target, key, result);
  return result;
};
let NodeComponent = class extends CustomElement {
  constructor() {
    super();
  }
  getState() {
    return {
      xnode: ""
    };
  }
  static get observedAttributes() {
    return ["model"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "model":
        this.setModel(newValue);
        break;
    }
  }
  setModel(model) {
    this.setState("xnode", model);
  }
};
__decorateClass$7([
  State()
], NodeComponent.prototype, "getState", 1);
NodeComponent = __decorateClass$7([
  Component({
    selector: "x-node",
    style: css`
    :host {
      display: flex;
    }
  `,
    template: html` <x-atom model="{{xnode}}"></x-atom> `
  })
], NodeComponent);
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$6(target, key, result);
  return result;
};
let TreeComponent = class extends CustomElement {
  constructor() {
    super();
  }
  getState() {
    return {
      arrayModel: [
        "aaa",
        "Node 1",
        "Node 2",
        "Node 3",
        "Node 4",
        "Node 5",
        "Node 6",
        "Node 7",
        ["far", "fiz", "faz", "fuz"]
      ],
      objectModel: {
        foo: {
          bar: {
            baz: "bbb"
          },
          far: {
            fiz: {
              faz: {
                fuz: "fuz"
              }
            }
          },
          mar: {
            maz: "mmm"
          }
        }
      },
      ax: "aaa",
      bx: "bbb",
      cx: "ccc",
      dx: "ddd",
      ex: "eee",
      fx: "fff",
      gx: "ggg",
      hx: "hhh",
      state: {
        foo: {
          bar: "x"
        }
      }
    };
  }
  static get observedAttributes() {
    return ["model"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "model":
        this.setModel(newValue);
        break;
    }
  }
  setModel(model) {
    this.setState("state.foo.bar", model);
  }
};
__decorateClass$6([
  State()
], TreeComponent.prototype, "getState", 1);
TreeComponent = __decorateClass$6([
  Component({
    selector: "x-tree",
    autoDefine: false,
    style: css`
    :host {
      display: grid;
      font-size: 2em;
    }
  `,
    template: html`
    <x-node model="{{arrayModel[0]}}"></x-node>
    <x-node model="{{arrayModel[8][1]}}"></x-node>
    <x-node model="{{objectModel.foo.bar.baz}}"></x-node>
    <x-node model="{{objectModel['foo']['far'].fiz['faz'].fuz}}"></x-node>
    <x-node model="{{dx}}"></x-node>
    <x-node model="{{ex}}"></x-node>
    <x-node model="{{fx}}"></x-node>
    <x-node model="{{gx}}"></x-node>
    <x-node model="{{hx}}"></x-node>
    <x-node model="{{state.foo.bar}}"></x-node>
  `
  })
], TreeComponent);
customElements.define("x-tree", TreeComponent);
const template$5 = `<r-side-nav></r-side-nav>
<r-main-nav></r-main-nav>

<header>
    <r-logo size="is--large"></r-logo>
    <h2>TypeScript Decorators for Web Components</h2>
</header>

<section>
    <r-stats>
        <ul>
            <li> 🎰 Declare metadata for CSS and HTML ShadowDOM template</li>
            <li> ☕️ Single interface for 'autonomous custom' and 'customized built-in' elements </li>
            <li> 🏋️‍ Weighing in under 1.2Kb for 'Hello World' <span class="hint">(gzipped)</span> </li>
            <li> 1️⃣ One-way data binding </li>
            <li> 🎤 Event Emitter pattern </li>
            <li> 🖥 Server side renderable </li>
            <li> 🌲 Treeshakable </li>
        </ul>
    </r-stats>
</section>

<section id="intro">
    <h1>@readymade</h1>
    <p>Readymade is a JavaScript library for composing user interfaces with Web Components. <span class="i__c">@readymade/core</span> provides an interface for bootstrapping new custom elements.</p>
    <h2 id="whatis">What is Readymade?</h2>
    <p>Readymade simplifies handling template and styling for Web Components with TypeScript Decorators. The <span class="i__c">@Component</span> decorator has an interface that uses the Custom Elements v1 spec to provide template and styling for the component.</p>
    <r-code type="javascript">
            <span hidden>
@Component({
  selector: 'my-button',
  custom: { extends: 'button' },
  template:&#96;
  &lt;span>Click&lt;/span>
  &#96;,
  style:&#96;
    :host {
        background: rgba(24, 24, 24, 1);
        cursor: pointer;
        color: white;
        font-weight: 400;
    }
  &#96;,
})
            </span>
    </r-code>
</section>

<section>
  <p>Readymade optimizes down to 1.2Kb for Hello World without data binding and 3Kb with data binding (gzipped). JavaScript UI libraries like React are bloated in comparison.</p>
  <p>Readymade is treeshakable and relies mainly on existing DOM API. A simple component that uses all the available decorators in Readymade: <span class="i__c">@Component</span>, <span class="i__c">@State</span>, <span class="i__c">@Listen</span> and <span class="i__c">@Emitter</span> is 3.7Kb (gzipped). </p>
  <h3>🏋️‍ Weighing in at 1.2Kb for 'Hello World' (gzipped)</h3>
  <r-meter value="1.2" max="44.17" label="Readymade" color="#8AC926"></r-meter>
  <r-meter value="1.87" max="44.17" label="Svelte" color="#e6d06c"></r-meter>
  <r-meter value="4.2" max="44.17" label="Solid" color="#FFAE03"></r-meter>
  <r-meter value="44.17" max="44.17" label="React with hooks" color="#61dafb"></r-meter>
</section>

<section>
    <h2>A Readymade Example</h2>

    <p>A class named <span class="i__c">MyButtonComponent
        </span> is decorated with <span class="i__c">@Component</span> that includes properties for specifying the template and styling for a button. A call to action is bound to the template through the <span class="i__c">@State</span> decorator and a one-way data binding algorithm. <span class="i__c">@Listen</span> decorator binds <span class="i__c">addEventListener</span> to the element, while <span class="i__c">@Emitter</span> broadcasts 'bang' on click using the <span class="i__c">BroadcastChannel API</span>.</p>

    <r-code type="typescript">
        <span hidden>
import {
  Component,
  Emitter,
  Listen } from '@readymade/core';

import {
  ButtonComponent
} from '@readymade/dom';

@Component({
  selector: 'my-button',
  custom: { extends: 'button' },
  template:&#96;
  &lt;span>{{buttonCopy}}&lt;/span>
  &#96;,
  style:&#96;
      :host {
          background: rgba(24, 24, 24, 1);
          cursor: pointer;
          color: white;
          font-weight: 400;
      }
  &#96;,
})
class MyButtonComponent extends ButtonComponent {
  constructor() {
      super();
  }
  @State()
  getState() {
    return {
      buttonCopy: 'Click'
    }
  }
  @Emitter('bang')
  @Listen('click')
  public onClick(event) {
      this.emitter.broadcast('bang');
  }
  @Listen('keyup')
  public onKeyUp(event) {
      if (event.key === 'Enter') {
          this.emitter.broadcast('bang');
      }
  }
}
        </span>
    </r-code>
<p>The above example uses customized built-in elements, extending from <span class="i__c">HTMLButtonElement</span> under the hood. Readymade calls <span class="i__c">define</span> on the <span class="i__c">CustomElementRegistry</span> and provides encapsulation for the template and styling whether or not the element supports ShadowDOM.</p>
</section>


<section id="started">
    <h1>Getting Started</h1>
    <h2 id="install">Install</h2>
    <p>Install readymade/core via npm or yarn.</p>
    <r-code type="javascript">
            <span hidden>
npm i @readymade/core --save
            </span>
    </r-code>

    <p>If you want to use the client-side router or customized built-in elements also install these packages.</p>
    <r-code type="javascript">
            <span hidden>
npm i @readymade/router @readymade/dom --save
            </span>
    </r-code>

    <p>If typescript is not already part of your project, install it too.</p>

    <r-code type="javascript">
            <span hidden>
npm i typescript --save
            </span>
    </r-code>

    <p>Readymade requires <span class="i__c">experimentalDecorators</span> to be set to true in your <span class="i__c">tsconfig.json</span>. A sample minimal recommended configuration is below.</p>
    <r-code type="javascript">
            <span hidden>
{
  "compilerOptions": {
      "experimentalDecorators": true,
      "moduleResolution": "node",
      "typeRoots": ["node_modules/@types"],
      "lib": ["ES2022", "DOM", "DOM.iterable"],
  }
}
            </span>
    </r-code>
    <h2 id="decorators">Readymade Starter</h2>
    <p>primr is a tool for generating Readymade projects.</p>
    <r-code type="javascript">
            <span hidden>
npx primr my-app
            </span>
    </r-code>

    <p>The above command generates a project called my-app. primr separates template and styling into separate files out of the box. Support for PostCSS is baked in, although CSS preprocessors and Lightning CSS are optional. The development environment is built with Vite.</p>
    <r-code type="javascript">
      <span hidden>
import style from './button.scss';
import template from './button.html';

@Component({
  selector: 'my-button',
  style: style,
  template: template,
})
      </span>
</r-code>
    <p>primr bootstraps the necessary polyfill for Customized built-in elements to work in Safari, provides a client-side only router and has the option to server-side render using Express, @lit-labs/ssr and Vite.</p>
</section>

<section id="docs">
    <h1>Using Readymade</h1>
    <h2 id="decorators">Decorators</h2>
    <p>Readymade implements UI components using a decorator pattern. Decorators are currently in [stage 3 proposal](https://github.com/tc39/proposal-decorators) for the ECMAScript Internationalization API Specification. Readymade implements decorators now with TypeScript and plans to adopt the newer specification at a later date.</p>
    <p>A class decorator called <span class="i__c">@Component</span> provides an interface for declaring styles and template for custom elements. The <span class="i__c">@Emitter</span> method decorator declares how <span class="i__c">CustomEvent</span> that can be emitted or broadcasted. The <span class="i__c">@Listen</span> method decorator is a wrapper around <span class="i__c">addEventListener</span>, making the method it decorates the callback function for event handling. <span class="i__c">@State</span> method decorator returns a State that is bound to a template.</p>
    <h3>Readymade Decorators</h3>
    <ul class="definition__list">
        <li><span class="definition__title">@Component</span> metadata class decorator for defining template and styling</li>
        <li><span class="definition__title">@Listen</span> method decorator binds the method to <span class="i__c">addEventListener</span> callback</li>
        <li><span class="definition__title">@Emitter</span> method decorator declares <span class="i__c">CustomEvent</span> emitted by the component</li>
        <li><span class="definition__title">@State</span> method decorator returns stateful object used for data-binding the template</li>
    </ul>
    <p></p>
    <h3>@Component</h3>
    <p>The Component decorator is the place to specify the custom element selector. The decorator encapsulates the template and styles declared here with ShadowDOM on elements that support it or through attribute scoping on elements that don't.</p>
    <r-code type="javascript">
            <span hidden>
@Component({
  selector: 'my-button',
  custom: { extends: 'button' },
  template:&#96;
  &lt;span>{{buttonCopy}}&lt;/span>
  &#96;,
  style:&#96;
      :host {
          background: rgba(24, 24, 24, 1);
          cursor: pointer;
          color: white;
          font-weight: 400;
      }
  &#96;,
})
class MyButtonComponent extends CustomElement
            </span>
    </r-code>
    <h4>@Component API</h4>
    <ul class="definition__list">
      <li><span class="definition__title">autoDefine:</span> set to false to call CustomElementRegistry.define manually</li>
      <li><span class="definition__title">custom:</span> use with customized built-in elements to specify which element to extend from</li>
      <li><span class="definition__title">mode:</span> specifies whether ShadowDOM is "open" or "closed" mode</li>
      <li><span class="definition__title">selector:</span> tag name for the custom element</li>
      <li><span class="definition__title">style:</span> styles for the custom element</li>
      <li><span class="definition__title">template:</span> custom element HTML template</li>
    </ul>
    <h3>@Listen</h3>
    <p>Attaches the method it decorates to the function callback of <span class="i__c">addEventListener</span> . The following example listens for <span class="i__c">keyup</span> events, emits a <span class="i__c">CustomEvent</span> when the user presses the Enter key. This method decorator takes an event name in the first argument. When listening for broadcasted events over the <span class="i__c">BroadcastChannel API</span>, a channel name can be specified in the second argument.</p>
    <r-code type="javascript">
            <span hidden>
@Listen('keyup')
public onKeyUp(event) {
  if (event.key === 'Enter') {
      this.emitter.broadcast('bang');
  }
}
            </span>
    </r-code>
    <h4>@Listen API</h4>
    <ul class="definition__list">
      <li><span class="definition__title">event:</span> the name of the event</li>
      <li><span class="definition__title">channel:</span> the channel name to listen for events using the BroadcastChannel API</li>
    </ul>
    <h3>@Emitter</h3>
    <p>The Emitter method decorator adds the <span class="i__c">emitter</span> property to the component. <span class="i__c">@Emitter</span> first argument is the <span class="i__c">CustomEvent</span> type, options for the <span class="i__c">CustomEvent</span> in the second argument. To broadcast <span class="i__c">CustomEvent</span> with this <span class="i__c">Emitter</span>, specify a channel name in the third argument.</p>
    <r-code type="javascript">
            <span hidden>
@Emitter('bang', options, 'mtv')
            </span>
    </r-code>
    <h4>@Emitter API</h4>
    <ul class="definition__list">
      <li><span class="definition__title">event:</span> the name of the <span class="i__c">CustomEvent</span></li>
      <li><span class="definition__title">options:</span> options used with <span class="i__c">new CustomEvent</span></li>
      <li><span class="definition__title">channel:</span> the channel name to broadcast on using the <span class="i__c">BroadcastChannel API</span></li>
    </ul>
    <p>Emitters are stored on the component instance using the property <span class="i__c">emitter</span>. There are two methods for <span class="i__c">emitter</span>: <span class="i__c">emit</span> and <span class="i__c">broadcast</span>.</p>
    <ul class="definition__list">
            <li><span class="definition__title">emit</span> calls <span class="i__c">dispatchEvent</span> internally.</li>
            <li><span class="definition__title">broadcast</span> uses <span class="i__c">BroadcastChannel API</span> to broadcast events, even to other browser contexts.</li>
    </ul>
    <h3>@State</h3>
    <p>Binds a method that returns a stateful object to data bound template. In the example below, <span class="i__c">@State</span> decoarates the <span class="i__c">setState</span> method that returns an <span class="i__c">Object</span> with a property named <span class="i__c">buttonCopy</span>.</p>
    <r-code type="javascript">
      <span hidden>
@Component({
  template:&#96;
    &lt;span>{{buttonCopy}}&lt;/span>
  &#96;,
})
class MyButtonComponent extends HTMLButtonElement {
  constructor() {
    super();
  }
  @State()
  getState() {
    return {
      buttonCopy: 'Click'
    }
  }
}
      </span>
    </r-code>
    <p>In the template, this property is wrapped in data-binding template syntax (curly brackets). When the instance of the component is instantiated, Readymade crawls the DOM nodes in the component's template and replaces  <span class="i__c">{{buttonCopy}}</span> with the value of that property on state: <span class="i__c">'Click'</span>.</p>
    <h4>A More Complex Example</h4>
    <p>Readymade can handle the following permutations on state, setting properties on Objects or indices of Arrays.</p>
    <r-code type="javascript">
      <span hidden>
export class TreeState {
  public arrayModel = [
    ['far', 'fiz', 'faz', 'fuz']
  ];
  public objectModel = {
    foo: {
      bar: 'x'
    }
  };
  public stringModel = 'r';
  public numberModel = 0;
}
@Component({
  selector: 'r-tree',
  template: html&#96;
  &lt;x-node data-model="{{arrayModel[0][1]}}">&lt;/x-node>
  &lt;x-node>{{objectModel['foo'].bar}}&lt;/x-node>
  &lt;x-node model="{{stringModel}}">&lt;/x-node>
  &lt;x-node>{{numberModel}}&lt;/x-node>
  &#96;
})
class TreeComponent extends CustomElement {
  constructor() {
    super();
  }
  @State()
  public getState() {
    return new TreeState();
  }
}
      </span>
    </r-code>

    <p>Readymade binds the properties in curly brackets to DOM attributes and content. The template is instantly updated as state changes through one-way data-binding.</p>
    <r-code type="javascript">
      <span hidden>
  &lt;x-node data-model="fiz">&lt;/x-node>
  &lt;x-node>x&lt;/x-node>
  &lt;x-node model="r">&lt;/x-node>
  &lt;x-node>0&lt;/x-node>
      </span>
    </r-code>
</section>

<section>
    <h2 id="components">Components</h2>
    <p>Readymade is packaged with several component classes to bootstrap UI component development. Readymade takes the hassle out of remembering which DOM elements support ShadowDOM, encapsulating elements with ShadowDOM that support it under the hood. Readymade reduces the complexity of implementing customized built-in elements by handling styles and template with a unified API via the <span class="i__c">@Component</span> decorator.</p>
    <p>Typically you would extend <span class="i__c">HTMLElement</span> for an element that utilizes ShadowDOM.</p>
    <r-code type="javascript">
            <span hidden>
class MyComponent extends HTMLElement
            </span>
    </r-code>
    <h4>Automomous custom elements</h4>
    <p>With Readymade extend <span class="i__c">CustomElement</span> instead when implementing autonomous custom elements. CustomElement extends <span class="i__c">HTMLElement</span> already. Along with the <span class="i__c">@Component</span> decorator, <span class="i__c">CustomElement</span> attachs ShadowDOM and provides an interface for interacting with Readymade API via TypeScript. <span class="i__c">CustomElement</span> is exported from the @readymade/core package.</p>
    <r-code type="javascript">
            <span hidden>
import { CustomElement } from 'readymade/core';

class MyComponent extends CustomElement
            </span>
    </r-code>
    <p>Two other autonomous custom element classes <span class="i__c">PseudoElement</span> and <span class="i__c">StructuralElement</span> are also exported from @readymade/core.</p>
    <ul class="definition__list">
      <li><span class="definition__title">CustomElement</span> attachs ShadowDOM</li>
      <li><span class="definition__title">PseudoElement</span> encapsulates template and styling without ShadowDOM</li>
      <li><span class="definition__title">StructuralElement</span> doesn't accept template or styling, is purely "structural"</li>
    </ul>
    <p>All other component classes are exported from @readymade/dom, including customized built-in elements.</p>
    <h4>Customized built-in elements</h4>
    <p>Sometimes you need to extend other elements to retain Web Accessibility features or other user experience paradigms. Customized built-in elements allow you to extend form input elements, retaining their accessible characteristics.</p>
    <r-code type="javascript">
            <span hidden>
class MyInputComponent extends HTMLInputElement
            </span>
    </r-code>
    <p>Readymade handles customized built-in elements slightly differently. These elements are exported from the @readymade/dom package. Readymade provides encapsulation for styling despite the lack of ShadowDOM in customized built-in element by scoping the styles with attributes in the <span class="i__c">&lt;head></span>.</p>
    <r-code type="javascript">
            <span hidden>
import { InputComponent } from 'readymade/dom';

@Component({
  selector: 'my-input',
  custom: { extends: 'input' },
  style:&#96;
      :host {
          background: rgba(24, 24, 24, 1);
          cursor: pointer;
          color: white;
          font-weight: 400;
      }
  &#96;,
})

class MyInputComponent extends InputComponent
            </span>
    </r-code>
    <p>Readymade provides a single interface for handling 'autonomous custom' and 'customized built-in' elements. Customized built-in elements require the <span class="i__c">custom</span> property set to an <span class="i__c">Object</span> that would normally be used with <span class="i__c">CustomElementRegistry.register</span>. By using the <span class="i__c">is</span> attribute in DOM, the <span class="i__c">input</span> will become an instance of <span class="i__c">MyInputComponent</span>, a customized built-in element.</p>
    <r-code type="javascript">
      <span hidden>
&lt;input is="my-input">
      </span>
  </r-code>
<h4>Repeaters</h4>
<p>Readymade exports two classes useful for looping over a data model and appending DOM nodes with the content of that model: <span class="i__c">Repeater</span> and <span class="i__c">TemplateRepeater</span>.</p>

<ul class="definition__list">
  <li><span class="definition__title">Repeater</span> is a custom element that references a template to iterate over a model and replace DOM nodes.</li>
  <li><span class="definition__title">TemplateRepeater</span> extends HTMLTemplateElement to iterate over a model and replace DOM nodes.</li>
</ul> 

<p>Suppose an Array of strings is found on state.</p>

<r-code type="javascript">
  <span hidden>
@State()
public getState() {
  return {
    items: ["1", "2", "3", "4", "5"]
  }
}
  </span>
</r-code>

<p><span class="definition__title">TemplateRepeater</span> clones the template, iterates over the Array, binds the data model to each node, then inserts the new cloned template in the <span class="i__c">parentNode</span> of the original template.</p>


<r-code type="javascript">
  <span hidden>
&lt;ul class="is--large">
  &lt;template is="r-repeat" items="item of items">
    &lt;li repeat="item" foo="{{item}}">{{item}}&lt;/li>
  &lt;/template>
&lt;/ul>
  </span>
</r-code>

<h4>TemplateRepeater API</h4>
<ul class="definition__list">
  <li><span class="definition__title">items:</span> string that specifies the property on state <span class="definition__title">TemplateRepeater</span> should reference</li>
</ul>

<p>Suppose an Array of objects is found on state.</p>

<r-code type="javascript">
  <span hidden>
@State()
public getState() {
  return {
    items: [
      {index: "1", title: "One"},
      {index: "2", title: "Two"},
      {index: "3", title: "Three"},
      {index: "4", title: "Four"},
      {index: "5", title: "Five"}
    ]
  }
}
  </span>
</r-code>

<p><span class="definition__title">Repeater</span> clones a template anywhere in the document, iterates over the Array, binds the data model to each node that is appended to DOM, and then inserts the cloned template as the content of <span class="i__c">Repeater</span>.</p>

<r-code type="javascript">
  <span hidden>

&lt;ul class="is--large">
  &lt;template id="object-repeater" items="item of items">
    &lt;li repeat="item" foo="{{item.index}}">{{item.title}}&lt;/li>
  &lt;/template>
&lt;/ul>

&lt;r-repeatr template="object-repeater" items="item of items">
&lt;/r-repeatr>
  </span>
</r-code>

<h4>Repeater API</h4>
<ul class="definition__list">
  <li><span class="definition__title">template:</span> id of the template Repeater should reference</li>
  <li><span class="definition__title">items:</span> string that specifies the property on state <span class="definition__title">TemplateRepeater</span> should reference</li>
</ul>

<p><span class="i__c">Repeater</span> and <span class="i__c">TemplateRepeater</span> use a template element. Any repeatable element should be tagged with the <span class="i__c">repeat</span> attribute that matches the name of the item reference passed into the <span class="i__c">items</span> attribute. </p>

</section>

<section>
  <h2 id="components">Server-Side Rendering (SSR)</h2>
  <p>@readymade/core supports SSR out of the box because Readymade is built with web standards in mind. To server-side render a Component, create a Declarative Shadow DOM template. If you are using the Readymade Starter, this takes the form of a <span class="i__c">function</span> named  <span class="i__c">render</span>. After exporting  <span class="i__c">render</span>, you can build this view as it's own module and using Express and @lit-labs/ssr, render the template on the server.</p>
  
  <p>Below is an example of the 404 page built with this site that uses Declarative Shadow DOM with Readymade to server-side render the view. Once the browser loads, the declared animation starts. You can preview this by navigating to <a href="/404">/404</a></p>
  <r-code type="javascript">
    <span hidden>
import { Component, CustomElement, html } from '@readymade/core';
import template from './404.html?raw';
import style from './404.css?raw';

@Component({
  selector: 'app-notfound',
  style,
  template,
})
class NotFoundComponent extends CustomElement {
  constructor() {
    super();
  }
  public connectedCallback() {
    this.animateIn();
  }
  public animateIn() {
    if (!this.shadowRoot.querySelector) return;
    this.shadowRoot.querySelector('.app__icon').animate(
      [
        { opacity: '0', transform: 'translateZ(-1000px)' },
        { opacity: '1', transform: 'translateZ(0px)' },
      ],
      {
        duration: 2000,
        easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
        fill: 'forwards',
      },
    );
  }
}

const render = () => {
  const declarativeShadowDOMTemplate = &#96;
    &lt;app-notfound>
      &lt;template shadowrootmode="open">
        &lt;style>
        &dollar;{style}
        &lt;/style>
        &dollar;{template}
      &lt;/template>
    &lt;/app-notfound>
  &#96;
  return declarativeShadowDOMTemplate;
};

export { NotFoundComponent, render };
  </span>
</r-code>

<p> In the above example, <span class="i__c">template</span> is imported from a .html file with Vite and passed to the client-side and server-side versions of the Readymade custom element. Vite bundles each view like this one as separate JavaScript bundles which are server-side rendered with @lit-labs/ssr, Vite, and Express.</p>

<p>By exporting the template via the <span class="i__c">render</span> function, you can opt to pass in dynamic models server-side.</p>
</section>

<section>
  <h2 id="components">Router</h2>
  <p>@readymade/router exports a client-side router that handles swapping out views on a root element in DOM.</p>
  <r-code type="javascript">
    <span hidden>
import { Router } from '@readymade/router';

const routing = [
  { path: '/', component: 'app-home' },
  { path: '/test', component: 'app-testbed' },
  { path: '/perf', component: 'app-perftest' }
];

const router = new Router('#root', routing);
  </span>
</r-code>
  <h4>Router API</h4>
  <ul class="definition__list">
    <li><span class="definition__title">id</span> selector for DOM Element Router should append views</li>
    <li><span class="definition__title">routing</span> Array of configuration for routes </li>
  </ul>
  <p><span class="i__c">Route</span> configuration is used to specify the renderable component, query params, page title and meta description, and JSON-LD. While success may be varied client-side for specifying these properties for SEO, the same Route configuration could be used for server-side rendering to sure crawlers can analyze the JSON-LD.</p>
  <h4>Route</h4>
  <ul class="definition__list">
    <li><span class="definition__title">path</span> the URL path</li>
    <li><span class="definition__title">component</span> component selector as string </li>
    <li><span class="definition__title">queryParams</span> Object that specifies query params in key / value pairs </li>
    <li><span class="definition__title">title</span> document title </li>
    <li><span class="definition__title">description</span> text displayed in the content attribute of meta description tag </li>
    <li><span class="definition__title">schema</span>JSON-LD</li>
  </ul>
  
  <p>* description and JSON-LD schema require the appropriate meta and script tags, respectively to already be available in DOM.</p>
  
</section>

<section id="why">
        <h1>Why Do We Need Another Web Component Library?</h1>
        <p>Readymade started as an exercise to see how component based frameworks like Angular, Polymer, and Stencil could be built with just available browser API. The microlibrary that came to fruition simplifes web component development and includes some powerful features. The Component metadata decorator provides an easy interface for declaring styling and template. One way data binding allows you to forget about setting innerHTML and attributes of elements. Method decorators bind CustomEvent listeners and use the BroadcastChannel API to overcome limitations of event bubbling. Readymade is treeshakable, meaning you only import the code your project needs and leave the rest behind.</p>
        <p>A simple 'Hello World' readymade project compiled with TypeScript and Terser minifies down to ~1Kb (gzipped). This site is built with Readymade and weighs in ~7Kb (gzipped). The bundle deployed to Github Pages includes minimal application logic, a small library of components, polyfills, and third party library for syntax highlighting (PrismJS)and it weighs in at ~38Kb (gzipped).</p>
        <p>The name of the project 'readymade' is an homage to Marcel Duchamp, an artist in the 20th century who made art with ordinary objects. Like Duchamp's readymades, this library picks up ordinary objects found in ECMAScript, repositions and joins them together to form something completely new.</p>
 </section>

 <section id="resources">
    <h1>Resources</h1>
    <ul>
        <li><a target="_blank" rel="noreferrer" href="https://www.npmjs.com/package/@readymade/core">npm</a></li>
        <li><a target="_blank" rel="noreferrer" href="https://github.com/readymade-ui/readymade">Github</a></li>
    </ul>
 </section>

<footer>
    <r-logo size="is--large" no--subtitle ></r-logo>
</footer>`;
const style$5 = "::selection {\n  background: #ff7de9; /* WebKit/Blink Browsers */\n}\n\n::-moz-selection {\n  background: #ff7de9; /* Gecko Browsers */\n}\n\nbutton,\ninput {\n  color: white;\n  font-size: 0.8em;\n  padding: 10px;\n  box-sizing: border-box;\n  text-decoration: none;\n  outline: none;\n  box-shadow: 0px 0px 0px transparent;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  transition-property: box-shadow, border;\n  transition-duration: 300ms;\n  transition-timing-function: ease-in-out;\n}\n\nul {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  -webkit-margin-start: 0px;\n  -webkit-margin-end: 0px;\n  -webkit-padding-start: 0px;\n  -webkit-margin-before: 0px;\n  -webkit-margin-after: 0px;\n}\n\nul li {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n[tabindex] {\n  outline: 1px solid transparent;\n  transition-property: box-shadow, border;\n  transition-duration: 300ms;\n  transition-timing-function: ease-in-out;\n}\n\nbutton,\ninput {\n  border-radius: 4px;\n  outline: none;\n  box-shadow: 0px 0px 0px transparent;\n  border: 1px solid transparent;\n}\n\n*:focus,\nbutton:focus,\ninput:focus {\n  box-shadow: 0px 0px 0px rgba(255, 105, 180, 1);\n  outline: 1px solid rgba(255, 105, 180, 1);\n}\n\n[hidden] {\n  display: none !important;\n}\n\na:link,\na:visited {\n  color: #cdcdcd;\n}\n\na:link:hover,\na:visited:hover {\n  color: #ffffff;\n}\n\nh1 {\n  font-family: 'Major Mono Display', serif;\n  line-height: 1.5em;\n}\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: 'Source Sans Pro', serif;\n  font-weight: 400;\n  line-height: 1.5em;\n}\n\nh1 {\n  font-weight: 700;\n}\n\nh2 {\n  margin-top: 2em;\n}\n\nh6 {\n  font-size: 1em;\n}\n\np {\n  font-family: 'Source Sans Pro', serif;\n  font-size: 1em;\n  line-height: 1.5em;\n}\n\n.hint {\n  opacity: 0.6;\n}\n\nheader,\nsection,\nfooter {\n  position: relative;\n  left: 50%;\n  max-width: 640px;\n  transform: translateX(-50%);\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\nheader {\n  padding-top: 4em;\n  text-align: center;\n  padding-bottom: 2em;\n}\n\nheader h2 {\n  font-size: 20px;\n  font-weight: 300;\n  margin-top: 2em;\n  margin-bottom: 2em;\n}\n\nsection {\n  margin-bottom: 20px;\n}\n\nsection h1 {\n  padding-top: 3em;\n  margin-bottom: 1em;\n  font-family: 'Source Sans Pro';\n}\n\nsection h2 {\n  padding: 2px 8px;\n  background: #cfcfcf;\n  color: #000000;\n  font-size: 1.1em;\n  font-weight: 400;\n  display: inline-block;\n}\n\nsection ul li {\n  margin-bottom: 0.25em;\n}\n\n.definition__list li {\n  padding-bottom: 0.5em;\n}\n\n.definition__title {\n  font-style: italic;\n  color: #ababab;\n  margin-right: 0.2em;\n}\n\n.i__e {\n  color: rgba(117, 191, 255, 1);\n}\n\n.i__c {\n  color: #e6d06c;\n}\n\nfooter {\n  text-align: center;\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nfooter p {\n  font-family: 'Major Mono Display', sans-sarif;\n  font-size: 0.8em;\n}\n\nfooter r-logo {\n  padding-bottom: 4em;\n}\n\n[is='my-button'] {\n  background: #181818;\n  cursor: pointer;\n  color: #fff;\n  font-weight: 400;\n}\n[is='my-input'] {\n  background: #181818;\n  border: 0;\n  color: #fff;\n}\n";
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$5(target, key, result);
  return result;
};
let HomeComponent = class extends CustomElement {
  constructor() {
    super();
  }
};
HomeComponent = __decorateClass$5([
  Component({
    selector: "app-home",
    style: style$5,
    template: template$5
  })
], HomeComponent);
`
${render()}
${render$1()}

<header>
    ${render$2({ size: "is--large" })}
    <h2>TypeScript Decorators for Web Components</h2>
</header>

<section>
    <r-stats>
        <ul>
            <li> 🎰 Declare metadata for CSS and HTML ShadowDOM template</li>
            <li> ☕️ Single interface for 'autonomous custom' and 'customized built-in' elements </li>
            <li> 🏋️‍ Weighing in at 1.2Kb for 'Hello World' <span class="hint">(gzipped)</span> </li>
            <li> 1️⃣ One-way data binding </li>
            <li> 🎤 Event Emitter pattern </li>
            <li> 🖥 Server side renderable </li>
            <li> 🌲 Treeshakable </li>
        </ul>
    </r-stats>
</section>

<section id="intro">
    <h1>@readymade</h1>
    <p>Readymade is a JavaScript library for composing user interfaces with Web Components. <span class="i__c">@readymade/core</span> provides an interface for bootstrapping new custom elements.</p>
    <h2 id="whatis">What is Readymade?</h2>
    <p>Readymade simplifies handling template and styling for Web Components with TypeScript Decorators. The <span class="i__c">@Component</span> decorator has an interface that uses the Custom Elements v1 spec to provide template and styling for the component.</p>
    <r-code type="javascript">
            <span hidden>
@Component({
  selector: 'my-button',
  custom: { extends: 'button' },
  template:&#96;
  &lt;span>Click&lt;/span>
  &#96;,
  style:&#96;
    :host {
        background: rgba(24, 24, 24, 1);
        cursor: pointer;
        color: white;
        font-weight: 400;
    }
  &#96;,
})
            </span>
    </r-code>
</section>

<section>
  <p>Readymade optimizes down to 1.2Kb for Hello World without data binding and 3Kb with data binding (gzipped). JavaScript UI libraries like React are bloated in comparison.</p>
  <p>Readymade is treeshakable and relies mainly on existing DOM API. A simple component that uses all the available decorators in Readymade: <span class="i__c">@Component</span>, <span class="i__c">@State</span>, <span class="i__c">@Listen</span> and <span class="i__c">@Emitter</span> is 3.7Kb (gzipped). </p>
  <h3>🏋️‍ Weighing in at 1.2Kb for 'Hello World' (gzipped)</h3>
  <r-meter value="1.2" max="44.17" label="Readymade w/o data-binding" color="#8AC926"></r-meter>
  <r-meter value="3.0" max="44.17" label="Readymade w/ data binding" color="#e6d06c"></r-meter>
  <r-meter value="3.7" max="44.17" label="Readymade w/ data binding &amp; event handling" color="#FFAE03"></r-meter>
  <r-meter value="44.17" max="44.17" label="React with hooks" color="#61dafb"></r-meter>
</section>

<section>
    <h2>A Readymade Example</h2>

    <p>A class named <span class="i__c">MyButtonComponent
        </span> is decorated with <span class="i__c">@Component</span> that includes properties for specifying the template and styling for a button. A call to action is bound to the template through the <span class="i__c">@State</span> decorator and a one-way data binding algorithm. <span class="i__c">@Listen</span> decorator binds <span class="i__c">addEventListener</span> to the element, while <span class="i__c">@Emitter</span> broadcasts 'bang' on click using the <span class="i__c">BroadcastChannel API</span>.</p>

    <r-code type="typescript">
        <span hidden>
import {
  Component,
  Emitter,
  Listen } from '@readymade/core';

import {
  ButtonComponent
} from '@readymade/dom';

@Component({
  selector: 'my-button',
  custom: { extends: 'button' },
  template:&#96;
  &lt;span>{{buttonCopy}}&lt;/span>
  &#96;,
  style:&#96;
      :host {
          background: rgba(24, 24, 24, 1);
          cursor: pointer;
          color: white;
          font-weight: 400;
      }
  &#96;,
})
class MyButtonComponent extends ButtonComponent {
  constructor() {
      super();
  }
  @State()
  getState() {
    return {
      buttonCopy: 'Click'
    }
  }
  @Emitter('bang')
  @Listen('click')
  public onClick(event) {
      this.emitter.broadcast('bang');
  }
  @Listen('keyup')
  public onKeyUp(event) {
      if (event.key === 'Enter') {
          this.emitter.broadcast('bang');
      }
  }
}
        </span>
    </r-code>
<p>The above example uses customized built-in elements, extending from <span class="i__c">HTMLButtonElement</span> under the hood. Readymade calls <span class="i__c">define</span> on the <span class="i__c">CustomElementRegistry</span> and provides encapsulation for the template and styling whether or not the element supports ShadowDOM.</p>
</section>


<section id="started">
    <h1>Getting Started</h1>
    <h2 id="install">Install</h2>
    <p>Install readymade/core via npm or yarn.</p>
    <r-code type="javascript">
            <span hidden>
npm i @readymade/core --save
            </span>
    </r-code>

    <p>If you want to use the client-side router or customized built-in elements also install these packages.</p>
    <r-code type="javascript">
            <span hidden>
npm i @readymade/router @readymade/dom --save
            </span>
    </r-code>

    <p>If typescript is not already part of your project, install it too.</p>

    <r-code type="javascript">
            <span hidden>
npm i typescript --save
            </span>
    </r-code>

    <p>Readymade requires <span class="i__c">experimentalDecorators</span> to be set to true in your <span class="i__c">tsconfig.json</span>. A sample minimal recommended configuration is below.</p>
    <r-code type="javascript">
            <span hidden>
{
  "compilerOptions": {
      "experimentalDecorators": true,
      "moduleResolution": "node",
      "typeRoots": ["node_modules/@types"],
      "lib": ["es2017", "dom", "dom.iterable"],
  }
}
            </span>
    </r-code>
    <h2 id="decorators">Readymade Starter</h2>
    <p>primr is a tool for generating Readymade projects.</p>
    <r-code type="javascript">
            <span hidden>
npx primr my-app
            </span>
    </r-code>

    <p>The above command generates a project called my-app. primr separates template and styling into separate files out of the box. Support for SCSS and PostCSS is baked in. The development environment is built with Parcel.</p>
    <r-code type="javascript">
      <span hidden>
import style from './button.scss';
import template from './button.html';

@Component({
  selector: 'my-button',
  style: style,
  template: template,
})
      </span>
</r-code>
    <p>primr bootstraps the necessary polyfill for Web Components to work in IE11, provides a client-side router and has the option to server-side render with @skatejs/ssr.</p>
</section>

<section id="docs">
    <h1>Using Readymade</h1>
    <h2 id="decorators">Decorators</h2>
    <p>Readymade implements UI components using a decorator pattern. Decorators are currently in [stage 2 proposal](https://github.com/tc39/proposal-decorators) for the ECMAScript Internationalization API Specification. Readymade implements decorators now with TypeScript.</p>
    <p>A class decorator called <span class="i__c">@Component</span> provides an interface for declaring styles and template for custom elements. The <span class="i__c">@Emitter</span> method decorator declares how CustomEvents that can be emitted or broadcasted. The <span class="i__c">@Listen</span> method decorator is a wrapper around <span class="i__c">addEventListener</span>, making the method it decorates the callback function for event handling. <span class="i__c">@State</span> method decorator returns a State that is bound to a template.</p>
    <h3>Readymade Decorators</h3>
    <ul class="definition__list">
        <li><span class="definition__title">@Component</span> metadata class decorator for defining template and styling</li>
        <li><span class="definition__title">@Listen</span> method decorator binds the method to <span class="i__c">addEventListener</span> callback</li>
        <li><span class="definition__title">@Emitter</span> method decorator declares <span class="i__c">CustomEvent</span> emitted by the component</li>
        <li><span class="definition__title">@State</span> method decorator returns stateful object used for data-binding the template</li>
    </ul>
    <p></p>
    <h3>@Component</h3>
    <p>The Component decorator is the place to specify the custom element selector. The decorator encapsulates the template and styles declared here with ShadowDOM on elements that support it or through attribute scoping on elements that don't.</p>
    <r-code type="javascript">
            <span hidden>
@Component({
  selector: 'my-button',
  custom: { extends: 'button' },
  template:&#96;
  &lt;span>{{buttonCopy}}&lt;/span>
  &#96;,
  style:&#96;
      :host {
          background: rgba(24, 24, 24, 1);
          cursor: pointer;
          color: white;
          font-weight: 400;
      }
  &#96;,
})
class MyButtonComponent extends CustomElement
            </span>
    </r-code>
    <h4>@Component API</h4>
    <ul class="definition__list">
      <li><span class="definition__title">autoDefine:</span> set to false to call CustomElementRegistry.define manually</li>
      <li><span class="definition__title">custom:</span> use with customized built-in elements to specify which element to extend from</li>
      <li><span class="definition__title">mode:</span> specifies whether ShadowDOM is "open" or "closed" mode</li>
      <li><span class="definition__title">selector:</span> tag name for the custom element</li>
      <li><span class="definition__title">style:</span> styles for the custom element</li>
      <li><span class="definition__title">template:</span> custom element HTML template</li>
    </ul>
    <h3>@Listen</h3>
    <p>Attaches the method it decorates to the function callback of <span class="i__c">addEventListener</span> . The following example listens for <span class="i__c">keyup</span> events, emits a <span class="i__c">CustomEvent</span> when the user presses the Enter key. This method decorator takes an event name in the first argument. When listening for broadcasted events over the <span class="i__c">BroadcastChannel API</span>, a channel name can be specified in the second argument.</p>
    <r-code type="javascript">
            <span hidden>
@Listen('keyup')
public onKeyUp(event) {
  if (event.key === 'Enter') {
      this.emitter.broadcast('bang');
  }
}
            </span>
    </r-code>
    <h4>@Listen API</h4>
    <ul class="definition__list">
      <li><span class="definition__title">event:</span> the name of the event</li>
      <li><span class="definition__title">channel:</span> the channel name to listen for events using the BroadcastChannel API</li>
    </ul>
    <h3>@Emitter</h3>
    <p>The Emitter method decorator adds the <span class="i__c">emitter</span> property to the component. <span class="i__c">@Emitter</span> first argument is the <span class="i__c">CustomEvent</span> type, options for the <span class="i__c">CustomEvent</span> in the second argument. To broadcast <span class="i__c">CustomEvent</span> with this <span class="i__c">Emitter</span>, specify a channel name in the third argument.</p>
    <r-code type="javascript">
            <span hidden>
@Emitter('bang', options, 'mtv')
            </span>
    </r-code>
    <h4>@Emitter API</h4>
    <ul class="definition__list">
      <li><span class="definition__title">event:</span> the name of the <span class="i__c">CustomEvent</span></li>
      <li><span class="definition__title">options:</span> options used with <span class="i__c">new CustomEvent</span></li>
      <li><span class="definition__title">channel:</span> the channel name to broadcast on using the <span class="i__c">BroadcastChannel API</span></li>
    </ul>
    <p>Emitters are stored on the component instance using the property <span class="i__c">emitter</span>. There are two methods for <span class="i__c">emitter</span>: <span class="i__c">emit</span> and <span class="i__c">broadcast</span>.</p>
    <ul class="definition__list">
            <li><span class="definition__title">emit</span> calls <span class="i__c">dispatchEvent</span> internally.</li>
            <li><span class="definition__title">broadcast</span> uses <span class="i__c">BroadcastChannel API</span> to broadcast events, even to other browser contexts.</li>
    </ul>
    <h3>@State</h3>
    <p>Binds a method that returns a stateful object to data bound template. In the example below, <span class="i__c">@State</span> decoarates the <span class="i__c">setState</span> method that returns an <span class="i__c">Object</span> with a property named <span class="i__c">buttonCopy</span>.</p>
    <r-code type="javascript">
      <span hidden>
@Component({
  template:&#96;
    &lt;span>{{buttonCopy}}&lt;/span>
  &#96;,
})
class MyButtonComponent extends HTMLButtonElement {
  constructor() {
    super();
  }
  @State()
  getState() {
    return {
      buttonCopy: 'Click'
    }
  }
}
      </span>
    </r-code>
    <p>In the template, this property is wrapped in data-binding template syntax (curly brackets). When the instance of the component is instantiated, Readymade crawls the DOM nodes in the component's template and replaces  <span class="i__c">{{buttonCopy}}</span> with the value of that property on state: <span class="i__c">'Click'</span>.</p>
    <h4>A More Complex Example</h4>
    <p>Readymade can handle the following permutations on state, setting properties on Objects or indices of Arrays.</p>
    <r-code type="javascript">
      <span hidden>
export class TreeState {
  public arrayModel = [
    ['far', 'fiz', 'faz', 'fuz']
  ];
  public objectModel = {
    foo: {
      bar: 'x'
    }
  };
  public stringModel = 'r';
  public numberModel = 0;
}
@Component({
  selector: 'r-tree',
  template: html&#96;
  &lt;x-node data-model="{{arrayModel[0][1]}}">&lt;/x-node>
  &lt;x-node>{{objectModel['foo'].bar}}&lt;/x-node>
  &lt;x-node model="{{stringModel}}">&lt;/x-node>
  &lt;x-node>{{numberModel}}&lt;/x-node>
  &#96;
})
class TreeComponent extends CustomElement {
  constructor() {
    super();
  }
  @State()
  public getState() {
    return new TreeState();
  }
}
      </span>
    </r-code>

    <p>Readymade binds the properties in curly brackets to DOM attributes and content. The template is instantly updated as state changes through one-way data-binding.</p>
    <r-code type="javascript">
      <span hidden>
  &lt;x-node data-model="fiz">&lt;/x-node>
  &lt;x-node>x&lt;/x-node>
  &lt;x-node model="r">&lt;/x-node>
  &lt;x-node>0&lt;/x-node>
      </span>
    </r-code>
</section>

<section>
    <h2 id="components">Components</h2>
    <p>Readymade is packaged with several component classes to bootstrap UI component development. Readymade takes the hassle out of remembering which DOM elements support ShadowDOM, encapsulating elements with ShadowDOM that support it under the hood. Readymade reduces the complexity of implementing customized built-in elements by handling styles and template with a unified API via the <span class="i__c">@Component</span> decorator.</p>
    <p>Typically you would extend <span class="i__c">HTMLElement</span> for an element that utilizes ShadowDOM.</p>
    <r-code type="javascript">
            <span hidden>
class MyComponent extends HTMLElement
            </span>
    </r-code>
    <h4>Automomous custom elements</h4>
    <p>With Readymade extend <span class="i__c">CustomElement</span> instead when implementing autonomous custom elements. CustomElement extends <span class="i__c">HTMLElement</span> already. Along with the <span class="i__c">@Component</span> decorator, <span class="i__c">CustomElement</span> attachs ShadowDOM and provides an interface for interacting with Readymade API via TypeScript. <span class="i__c">CustomElement</span> is exported from the @readymade/core package.</p>
    <r-code type="javascript">
            <span hidden>
import { CustomElement } from 'readymade/core';

class MyComponent extends CustomElement
            </span>
    </r-code>
    <p>Two other autonomous custom element classes <span class="i__c">PseudoElement</span> and <span class="i__c">StructuralElement</span> are also exported from @readymade/core.</p>
    <ul class="definition__list">
      <li><span class="definition__title">CustomElement</span> attachs ShadowDOM</li>
      <li><span class="definition__title">PseudoElement</span> encapsulates template and styling without ShadowDOM</li>
      <li><span class="definition__title">StructuralElement</span> doesn't accept template or styling, is purely "structural"</li>
    </ul>
    <p>All other component classes are exported from @readymade/dom, including customized built-in elements.</p>
    <h4>Customized built-in elements</h4>
    <p>Sometimes you need to extend other elements to retain Web Accessibility features or other user experience paradigms. Customized built-in elements allow you to extend form input elements, retaining their accessible characteristics.</p>
    <r-code type="javascript">
            <span hidden>
class MyInputComponent extends HTMLInputElement
            </span>
    </r-code>
    <p>Readymade handles customized built-in elements slightly differently. These elements are exported from the @readymade/dom package. Readymade provides encapsulation for styling despite the lack of ShadowDOM in customized built-in element by scoping the styles with attributes in the <span class="i__c">&lt;head></span>.</p>
    <r-code type="javascript">
            <span hidden>
import { InputComponent } from 'readymade/dom';

@Component({
  selector: 'my-input',
  custom: { extends: 'input' },
  style:&#96;
      :host {
          background: rgba(24, 24, 24, 1);
          cursor: pointer;
          color: white;
          font-weight: 400;
      }
  &#96;,
})

class MyInputComponent extends InputComponent
            </span>
    </r-code>
    <p>Readymade provides a single interface for handling 'autonomous custom' and 'customized built-in' elements. Customized built-in elements require the <span class="i__c">custom</span> property set to an <span class="i__c">Object</span> that would normally be used with <span class="i__c">CustomElementRegistry.register</span>. By using the <span class="i__c">is</span> attribute in DOM, the <span class="i__c">input</span> will become an instance of <span class="i__c">MyInputComponent</span>, a customized built-in element.</p>
    <r-code type="javascript">
      <span hidden>
&lt;input is="my-input">
      </span>
  </r-code>
<h4>Repeaters</h4>
<p>Readymade exports two classes useful for looping over a data model and appending DOM nodes with the content of that model: <span class="i__c">Repeater</span> and <span class="i__c">TemplateRepeater</span>.</p>

<ul class="definition__list">
  <li><span class="definition__title">Repeater</span> is a custom element that references a template to iterate over a model and replace DOM nodes.</li>
  <li><span class="definition__title">TemplateRepeater</span> extends HTMLTemplateElement to iterate over a model and replace DOM nodes.</li>
</ul> 

<p>Suppose an Array of strings is found on state.</p>

<r-code type="javascript">
  <span hidden>
@State()
public getState() {
  return {
    items: ["1", "2", "3", "4", "5"]
  }
}
  </span>
</r-code>

<p><span class="definition__title">TemplateRepeater</span> clones the template, iterates over the Array, binds the data model to each node, then inserts the new cloned template in the <span class="i__c">parentNode</span> of the original template.</p>


<r-code type="javascript">
  <span hidden>
&lt;ul class="is--large">
  &lt;template is="r-repeat" items="item of items">
    &lt;li repeat="item" foo="{{item}}">{{item}}&lt;/li>
  &lt;/template>
&lt;/ul>
  </span>
</r-code>

<h4>TemplateRepeater API</h4>
<ul class="definition__list">
  <li><span class="definition__title">items:</span> string that specifies the property on state <span class="definition__title">TemplateRepeater</span> should reference</li>
</ul>

<p>Suppose an Array of objects is found on state.</p>

<r-code type="javascript">
  <span hidden>
@State()
public getState() {
  return {
    items: [
      {index: "1", title: "One"},
      {index: "2", title: "Two"},
      {index: "3", title: "Three"},
      {index: "4", title: "Four"},
      {index: "5", title: "Five"}
    ]
  }
}
  </span>
</r-code>

<p><span class="definition__title">Repeater</span> clones a template anywhere in the document, iterates over the Array, binds the data model to each node that is appended to DOM, and then inserts the cloned template as the content of <span class="i__c">Repeater</span>.</p>

<r-code type="javascript">
  <span hidden>

&lt;ul class="is--large">
  &lt;template id="object-repeater" items="item of items">
    &lt;li repeat="item" foo="{{item.index}}">{{item.title}}&lt;/li>
  &lt;/template>
&lt;/ul>

&lt;r-repeatr template="object-repeater" items="item of items">
&lt;/r-repeatr>
  </span>
</r-code>

<h4>Repeater API</h4>
<ul class="definition__list">
  <li><span class="definition__title">template:</span> id of the template Repeater should reference</li>
  <li><span class="definition__title">items:</span> string that specifies the property on state <span class="definition__title">TemplateRepeater</span> should reference</li>
</ul>

<p><span class="i__c">Repeater</span> and <span class="i__c">TemplateRepeater</span> use a template element. Any repeatable element should be tagged with the <span class="i__c">repeat</span> attribute that matches the name of the item reference passed into the <span class="i__c">items</span> attribute. </p>

</section>
<section>
  <h2 id="components">Server-Side Rendering (SSR)</h2>
  <p>@readymade/core supports SSR out of the box because Readymade is built with web standards in mind. To server-side render a Component, create a Declarative Shadow DOM template. If you are using the Readymade Starter, this takes the form of a <span class="i__c">function</span> named  <span class="i__c">render</span>. After exporting  <span class="i__c">render</span>, you can build this view as it's own module and using Express and @lit-labs/ssr, render the template on the server.</p>
  
  <p>Below is an example of the 404 page built with this site that uses Declarative Shadow DOM with Readymade to server-side render the view. Once the browser loads, the declared animation starts. You can preview this by navigating to <a href="/404">/404</a></p>
  <r-code type="javascript">
    <span hidden>
import { Component, CustomElement, html } from '@readymade/core';
import template from './404.html?raw';
import style from './404.css?raw';

@Component({
  selector: 'app-notfound',
  style,
  template,
})
class NotFoundComponent extends CustomElement {
  constructor() {
    super();
  }
  public connectedCallback() {
    this.animateIn();
  }
  public animateIn() {
    if (!this.shadowRoot.querySelector) return;
    this.shadowRoot.querySelector('.app__icon').animate(
      [
        { opacity: '0', transform: 'translateZ(-1000px)' },
        { opacity: '1', transform: 'translateZ(0px)' },
      ],
      {
        duration: 2000,
        easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
        fill: 'forwards',
      },
    );
  }
}

const render = () => {
  const declarativeShadowDOMTemplate = &#96;
    &lt;app-notfound>
      &lt;template shadowrootmode="open">
        &lt;style>
        &dollar;{style}
        &lt;/style>
        &dollar;{template}
      &lt;/template>
    &lt;/app-notfound>
  &#96;
  return declarativeShadowDOMTemplate;
};

export { NotFoundComponent, render };
  </span>
</r-code>

<p> In the above example, <span class="i__c">template</span> is imported from a .html file with Vite and passed to the client-side and server-side versions of the Readymade custom element. Vite bundles each view like this one as separate JavaScript bundles which are server-side rendered with @lit-labs/ssr, Vite, and Express.</p>

<p>By exporting the template via the <span class="i__c">render</span> function, you can opt to pass in dynamic models server-side.</p>
</section>
<section>
  <h2 id="components">Router</h2>
  <p>@readymade/router exports a client-side router that handles swapping out views on a root element in DOM.</p>
  <r-code type="javascript">
    <span hidden>
import { Router } from '@readymade/router';

const routing = [
  { path: '/', component: 'app-home' },
  { path: '/test', component: 'app-testbed' },
  { path: '/perf', component: 'app-perftest' }
];

const router = new Router('#root', routing);
  </span>
</r-code>
  <h4>Router API</h4>
  <ul class="definition__list">
    <li><span class="definition__title">id</span> selector for DOM Element Router should append views</li>
    <li><span class="definition__title">routing</span> Array of configuration for routes </li>
  </ul>
  <p><span class="i__c">Route</span> configuration is used to specify the renderable component, query params, page title and meta description, and JSON-LD. While success may be varied client-side for specifying these properties for SEO, the same Route configuration could be used for server-side rendering to sure crawlers can analyze the JSON-LD.</p>
  <h4>Route</h4>
  <ul class="definition__list">
    <li><span class="definition__title">path</span> the URL path</li>
    <li><span class="definition__title">component</span> component selector as string </li>
    <li><span class="definition__title">queryParams</span> Object that specifies query params in key / value pairs </li>
    <li><span class="definition__title">title</span> document title </li>
    <li><span class="definition__title">description</span> text displayed in the content attribute of meta description tag </li>
    <li><span class="definition__title">schema</span>JSON-LD</li>
  </ul>
  
  <p>* description and JSON-LD schema require the appropriate meta and script tags, respectively to already be available in DOM.</p>  
  
</section>

<section id="why">
        <h1>Why Do We Need Another Web Component Library?</h1>
        <p>Readymade started as an exercise to see how component based frameworks like Angular, Polymer, and Stencil could be built with just available browser API. The microlibrary that came to fruition simplifes web component development and includes some powerful features. The Component metadata decorator provides an easy interface for declaring styling and template. One way data binding allows you to forget about setting innerHTML and attributes of elements. Method decorators bind CustomEvent listeners and use the BroadcastChannel API to overcome limitations of event bubbling. Readymade is treeshakable, meaning you only import the code your project needs and leave the rest behind.</p>
        <p>A simple 'Hello World' readymade project compiled with TypeScript and Terser minifies down to ~1Kb (gzipped). This site is built with Readymade and weighs in ~7Kb (gzipped). The bundle deployed to Github Pages includes minimal application logic, a small library of components, polyfills, and third party library for syntax highlighting (PrismJS)and it weighs in at ~38Kb (gzipped).</p>
        <p>The name of the project 'readymade' is an homage to Marcel Duchamp, an artist in the 20th century who made art with ordinary objects. Like Duchamp's readymades, this library picks up ordinary objects found in ECMAScript, repositions and joins them together to form something completely new.</p>
 </section>

 <section id="resources">
    <h1>Resources</h1>
    <ul>
        <li><a target="_blank" rel="noreferrer" href="https://www.npmjs.com/package/@readymade/core">npm</a></li>
        <li><a target="_blank" rel="noreferrer" href="https://github.com/readymade-ui/readymade">Github</a></li>
    </ul>
 </section>

<footer>
    ${render$2({ size: "is--large", classes: "no--subtitle" })}
</footer>
`;
const style$4 = "@import url('https://fonts.googleapis.com/css?family=Major+Mono+Display|Source Sans Pro:100,300,400');\n\n:host {\n  display: block;\n  background: #cfcfcf;\n  color: rgb(25, 25, 25);\n  font-family: 'Source Sans Pro', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  padding: 20px;\n  margin: 0px;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n  overflow-y: auto;\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n}\n";
const template$4 = '<div class="testbed">\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n</div>\n';
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
let PerformanceTestComponent = class extends CustomElement {
  constructor() {
    super();
  }
};
PerformanceTestComponent = __decorateClass$4([
  Component({
    selector: "app-perftest",
    style: style$4,
    template: template$4
  })
], PerformanceTestComponent);
const template$3 = "<div>{{params}}</div>\n";
const style$3 = "";
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
let QueryComponent = class extends CustomElement {
  constructor() {
    super();
  }
  getState() {
    return {
      params: {}
    };
  }
  onNavigate(route) {
    this.setState("params", JSON.stringify(route.queryParams));
  }
};
__decorateClass$3([
  State()
], QueryComponent.prototype, "getState", 1);
QueryComponent = __decorateClass$3([
  Component({
    selector: "app-query",
    style: style$3,
    template: template$3
  })
], QueryComponent);
const template$2 = '<div class="testbed">\n  <div>\n    <r-logo size="is--large"></r-logo>\n    <my-list>\n      <ul slot="menu">\n        <li>\n          <my-item><span slot="msg">Item 1</span></my-item>\n        </li>\n        <li>\n          <my-item><span slot="msg">Item 2</span></my-item>\n        </li>\n        <li>\n          <my-item><span slot="msg">Item 3</span></my-item>\n        </li>\n        <li>\n          <my-item><span slot="msg">Item 4</span></my-item>\n        </li>\n      </ul>\n    </my-list>\n\n    <br />\n    <br />\n    <button is="my-button"></button>\n    <input is="my-input" type="text" />\n  </div>\n  <div>\n    <x-tree model="deep"></x-tree>\n  </div>\n  <div>\n    <ul class="is--large">\n      <template is="r-repeat" items="item of items">\n        <li repeat="item" foo="{{item.index}}">{{item.title}}</li>\n      </template>\n    </ul>\n\n    <ul class="is--large">\n      <template is="r-repeat" items="sub of subitems">\n        <li repeat="sub" foo="{{sub}}">{{sub}}</li>\n      </template>\n    </ul>\n\n    <r-repeatr template="object-repeater" items="item of items"></r-repeatr>\n    <r-repeatr template="array-repeater" items="sub of subitems"></r-repeatr>\n    <footer>{{message}}</footer>\n  </div>\n</div>\n';
const style$2 = "@import url('https://fonts.googleapis.com/css?family=Major+Mono+Display|Source Sans Pro:100,300,400');\n\n:host {\n  display: block;\n  background: #cfcfcf;\n  color: rgb(25, 25, 25);\n  font-family: 'Source Sans Pro', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  padding: 20px;\n  margin: 0px;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n  overflow-y: auto;\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n::selection {\n  background: #ff7de9; /* WebKit/Blink Browsers */\n}\n::-moz-selection {\n  background: #ff7de9; /* Gecko Browsers */\n}\n\nr-logo {\n  margin-bottom: 40px;\n}\n\nheader,\nsection,\nfooter {\n  position: relative;\n  left: 50%;\n  max-width: 640px;\n  transform: translateX(-50%);\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\nbutton,\ninput {\n  color: white;\n  font-size: 0.8em;\n  padding: 10px;\n  box-sizing: border-box;\n  text-decoration: none;\n  outline: none;\n  box-shadow: 0px 0px 0px transparent;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  transition-property: box-shadow, border;\n  transition-duration: 300ms;\n  transition-timing-function: ease-in-out;\n}\n\nul {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  -webkit-margin-start: 0px;\n  -webkit-margin-end: 0px;\n  -webkit-padding-start: 0px;\n  -webkit-margin-before: 0px;\n  -webkit-margin-after: 0px;\n  &.is--large {\n    font-size: 2em;\n  }\n}\n\nul li {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n[tabindex] {\n  outline: 1px solid transparent;\n  transition-property: box-shadow, border;\n  transition-duration: 300ms;\n  transition-timing-function: ease-in-out;\n}\n\nbutton,\ninput {\n  border-radius: 4px;\n  outline: none;\n  box-shadow: 0px 0px 0px transparent;\n  border: 1px solid transparent;\n}\n\n*:focus,\nbutton:focus,\ninput:focus {\n  box-shadow: 0px 0px 0px rgba(255, 105, 180, 1);\n  outline: 1px solid rgba(255, 105, 180, 1);\n}\n\n[hidden] {\n  display: none !important;\n}\n\na:link,\na:visited {\n  color: #cdcdcd;\n}\n\na:link:hover,\na:visited:hover {\n  color: #ffffff;\n}\n\nh1 {\n  font-family: 'Major Mono Display', serif;\n  line-height: 1.5em;\n}\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: 'Source Sans Pro', serif;\n  font-weight: 400;\n  line-height: 1.5em;\n}\n\nh1 {\n  font-weight: 700;\n}\n\nh6 {\n  font-size: 1em;\n}\n\np {\n  font-family: 'Source Sans Pro', serif;\n  font-size: 1em;\n  line-height: 1.5em;\n}\n\n.hint {\n  opacity: 0.6;\n}\n\nheader {\n  padding-top: 4em;\n  text-align: center;\n  padding-bottom: 2em;\n}\n\nheader h2 {\n  font-size: 20px;\n  font-weight: 300;\n  margin-top: 2em;\n  margin-bottom: 2em;\n}\n\nsection h1 {\n  padding-top: 3em;\n  margin-bottom: 1em;\n  font-family: 'Source Sans Pro';\n}\n\nsection h2 {\n  padding: 2px 8px;\n  background: #cfcfcf;\n  color: #000000;\n  font-size: 1.1em;\n  font-weight: 400;\n  display: inline-block;\n}\n\nsection ul li {\n  margin-bottom: 0.25em;\n}\n\n.definition__list li {\n  padding-bottom: 0.5em;\n}\n\n.definition__title {\n  font-style: italic;\n  color: #ababab;\n  margin-right: 0.2em;\n}\n\n.i__e {\n  color: rgba(117, 191, 255, 1);\n}\n\n.i__c {\n  color: #e6d06c;\n}\n\nfooter {\n  text-align: center;\n  margin-top: 60px;\n  margin-bottom: 60px;\n  font-size: 2em;\n}\n\nfooter p {\n  font-family: 'Major Mono Display', sans-sarif;\n  font-size: 0.8em;\n}\n\nfooter r-logo {\n  padding-bottom: 4em;\n}\n\n[is='my-button'] {\n  background: #181818;\n  cursor: pointer;\n  color: #fff;\n  font-weight: 400;\n}\n[is='my-input'] {\n  background: #181818;\n  border: 0;\n  color: #fff;\n}\n\n.testbed {\n  display: flex;\n  justify-content: space-evenly;\n}\n";
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
const objectModel = [
  {
    index: 1,
    title: "Item 1"
  },
  {
    index: 2,
    title: "Item 2"
  },
  {
    index: 3,
    title: "Item 3"
  },
  {
    index: 4,
    title: "Item 4"
  },
  {
    index: 5,
    title: "Item 5"
  }
];
const arrayModel = [1, "two", 3, 4, "five"];
let TestBedComponent = class extends CustomElement {
  constructor() {
    super();
  }
  getState() {
    return {
      items: objectModel,
      subitems: arrayModel,
      message: "message"
    };
  }
};
__decorateClass$2([
  State()
], TestBedComponent.prototype, "getState", 1);
TestBedComponent = __decorateClass$2([
  Component({
    selector: "app-testbed",
    style: style$2,
    template: template$2
  })
], TestBedComponent);
const template$1 = '<div class="testbed">\n  <div class="theme__toggle"></div>\n  <div>\n    <h1>Readymade UI</h1>\n\n    <div>\n      <p>\n        Readymade UI is a specialized user-interface library for remote control\n        surfaces. Designed primarily for touch surfaces, Readymade UI is built\n        with web specifications, making them portable wherever browsers are\n        available. Many Readymade UI elements can participate in HTML forms,\n        however their real power is unlocked when using the elements as a remote\n        control. Every Readymade UI element can dispatch events to a global\n        event bus that can then transmit events over Touch OSC, WebSocket, or\n        WebRTC.\n      </p>\n\n      <p>\n        Examples of each Readymade UI element are below. Open DevTools console\n        to observe messages dispatched from each element.\n      </p>\n      <div>\n        <rd-radiogroup class="form__item">\n          <input type="radio" name="control" value="form" checked />\n          <label for="form">Form</label>\n          <input type="radio" name="control" value="channel" />\n          <label for="channel">Channel</label>\n        </rd-radiogroup>\n      </div>\n    </div>\n\n    <form class="grid">\n      <div class="pane">\n        <h3>Button</h3>\n        <rd-button name="button"></rd-button>\n      </div>\n      <div class="pane">\n        <h3>Switch</h3>\n        <rd-switch name="switch" class="form__item"></rd-switch>\n      </div>\n      <div class="pane">\n        <h3>Input</h3>\n        <rd-input name="input" class="form__item"></rd-input>\n      </div>\n      <div class="pane">\n        <h3>Text Area</h3>\n        <rd-textarea name="textarea" class="form__item" required />\n      </div>\n      <div class="pane">\n        <h3>Select</h3>\n        <rd-dropdown name="dropdown" class="form__item">\n          <select>\n            <option>Option 1</option>\n            <option>Option 2</option>\n            <option>Option With Very Long Title</option>\n          </select>\n        </rd-dropdown>\n      </div>\n      <div class="pane">\n        <h3>Radio (Vertical)</h3>\n        <rd-radiogroup\n          name="radio"\n          class="form__item"\n          direction="vertical"\n          required\n        >\n          <input type="radio" name="control" value="hue" />\n          <label for="hue">Hue</label>\n          <input type="radio" name="control" value="saturation" />\n          <label for="saturation">Saturation</label>\n          <input type="radio" name="control" value="brightness" />\n          <label for="brightess">Brightness</label>\n        </rd-radiogroup>\n      </div>\n      <div class="pane">\n        <h3>Check Box</h3>\n        <rd-checkbox name="checkbox" class="form__item" checked></rd-checkbox>\n      </div>\n      <div class="pane">\n        <h3>Slider (Horizontal)</h3>\n        <rd-slider\n          class="form__item"\n          name="horizontal slider"\n          type="hor"\n          control="{{ horControl }}"\n        ></rd-slider>\n      </div>\n      <div class="pane">\n        <h3>Slider (Vertical)</h3>\n        <rd-slider\n          class="form__item"\n          name="vertical slider"\n          type="vert"\n          control="{{ vertControl }}"\n        ></rd-slider>\n      </div>\n      <div class="pane">\n        <h3>Joystick</h3>\n        <rd-slider\n          class="form__item"\n          name="joystick"\n          type="joystick"\n          control="{{ joyControl }}"\n        ></rd-slider>\n      </div>\n      <div class="pane">\n        <h3>Joystick (Square)</h3>\n        <rd-slider\n          class="form__item"\n          name="joystick square"\n          type="joystick"\n          control="{{ joySquareControl }}"\n        ></rd-slider>\n      </div>\n      <div class="pane">\n        <h3>Form Submit</h3>\n        <rd-button name="submit" type="submit"></rd-button>\n      </div>\n      <div class="pane full">\n        <h3>Button Pad (Keyboard)</h3>\n        <rd-buttonpad\n          name="keyboard"\n          tabindex="0"\n          class="form__item"\n        ></rd-buttonpad>\n      </div>\n      <div class="pane full">\n        <h3>Button Pad (Number)</h3>\n        <rd-buttonpad\n          name="numberpad"\n          tabindex="0"\n          class="form__item"\n        ></rd-buttonpad>\n      </div>\n    </form>\n  </div>\n  <div class="spacer"></div>\n</div>\n';
const style$1 = ":host {\n  display: block;\n  font-weight: 400;\n  font-size: 16px;\n  padding: 20px;\n  margin: 0px;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n  overflow-y: auto;\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n  margin-bottom: 360px;\n}\n\np {\n  max-width: 640px;\n  font-size: 1.2em;\n}\n\n.theme__toggle {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  cursor: pointer;\n  &.dark {\n    background: #ffffff;\n  }\n  &.light {\n    background: #000000;\n  }\n}\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n\n.pane {\n  margin-top: 20px;\n}\n\n.full {\n  grid-column: span 3;\n}\n";
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let LibraryComponent = class extends CustomElement {
  constructor() {
    super();
    this.theme = "dark";
    this.mode = "form";
    this.channelName = "rd-messages";
  }
  connectedCallback() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    (_b = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".theme__toggle")) == null ? void 0 : _b.classList.add(this.theme);
    (_d = (_c = this.shadowRoot) == null ? void 0 : _c.querySelector(".theme__toggle")) == null ? void 0 : _d.addEventListener("click", () => {
      this.toggleTheme();
    });
    const modeRadio = (_e = this.shadowRoot) == null ? void 0 : _e.querySelectorAll("rd-radiogroup")[0];
    modeRadio.onchange = (ev) => {
      this.mode = ev.target.value;
      this.onModeChange();
    };
    const buttonPad = (_f = this.shadowRoot) == null ? void 0 : _f.querySelector("rd-buttonpad");
    const buttonNumberPad = (_g = this.shadowRoot) == null ? void 0 : _g.querySelectorAll("rd-buttonpad")[1];
    const joystick = (_h = this.shadowRoot) == null ? void 0 : _h.querySelector('[type="joystick"]');
    const squareJoystick = (_i = this.shadowRoot) == null ? void 0 : _i.querySelectorAll('[type="joystick"]')[1];
    const vertSlider = (_j = this.shadowRoot) == null ? void 0 : _j.querySelector('[type="vert"]');
    const horizontalSlider = (_k = this.shadowRoot) == null ? void 0 : _k.querySelector('[type="hor"]');
    buttonPad.setAttribute(
      "grid",
      JSON.stringify({
        gap: "4px",
        columns: {
          count: 14
        },
        cells: [
          {
            selector: '[key="Space"]',
            styles: {
              width: "100%",
              gridColumn: "span 3"
            }
          },
          {
            selector: '[key="Enter"]',
            styles: {
              width: "100%",
              gridColumn: "span 2"
            }
          }
        ]
      })
    );
    buttonPad.setAttribute("buttons", JSON.stringify(StandardKeyboard));
    buttonNumberPad.setAttribute(
      "grid",
      JSON.stringify({
        gap: "4px",
        columns: {
          count: 4
        },
        cells: [
          {
            selector: '[key="0"]',
            styles: {
              width: "100%",
              gridColumn: "span 2"
            }
          },
          {
            selector: '[key="Enter"]',
            styles: {
              height: "100%",
              gridRow: "span 2"
            }
          }
        ]
      })
    );
    buttonNumberPad.setAttribute(
      "buttons",
      JSON.stringify(StandardKeyboardNumPad)
    );
    setTimeout(() => vertSlider.value = 100);
    setTimeout(() => horizontalSlider.value = 1e3);
    setTimeout(() => joystick.value = [140, 140]);
    setTimeout(() => squareJoystick.value = [140, 140]);
    this.onModeChange();
    modeRadio.value = this.mode;
  }
  getState() {
    return {
      vertControl: JSON.stringify({
        type: "slider",
        name: "slider",
        orient: "is--vert",
        min: 0,
        max: 255,
        size: "small",
        gridArea: "1 / 1 / span 3 / span 1"
      }),
      horControl: JSON.stringify({
        type: "slider",
        name: "h",
        orient: "is--hor",
        min: 0,
        max: 1e3,
        gridArea: "1 / 3 / span 1 / span 3"
      }),
      joyControl: JSON.stringify({
        type: "slider",
        name: "joystick",
        orient: "is--joystick",
        min: [0, 0],
        max: [255, 255],
        snapToCenter: false,
        gridArea: "1 / 2 / span 4 / span 1"
      }),
      joySquareControl: JSON.stringify({
        type: "slider",
        name: "square-joystick",
        orient: "is--joystick--square",
        min: [0, 0],
        max: [12, 12],
        snapToCenter: false,
        gridArea: "1 / 2 / span 4 / span 1",
        numberType: "int"
      })
    };
  }
  toggleTheme() {
    var _a, _b, _c;
    this.theme = this.theme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", this.theme);
    (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".theme__toggle").classList.remove("light");
    (_b = this.shadowRoot) == null ? void 0 : _b.querySelector(".theme__toggle").classList.remove("dark");
    (_c = this.shadowRoot) == null ? void 0 : _c.querySelector(".theme__toggle").classList.add(this.theme);
  }
  onModeChange() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    const form = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("form");
    const radio = (_b = this.shadowRoot) == null ? void 0 : _b.querySelectorAll("rd-radiogroup")[1];
    const toggle = (_c = this.shadowRoot) == null ? void 0 : _c.querySelector("rd-switch");
    const checkbox = (_d = this.shadowRoot) == null ? void 0 : _d.querySelector("rd-checkbox");
    const input = (_e = this.shadowRoot) == null ? void 0 : _e.querySelector("rd-input");
    const textarea = (_f = this.shadowRoot) == null ? void 0 : _f.querySelector("rd-textarea");
    const select = (_g = this.shadowRoot) == null ? void 0 : _g.querySelector("rd-dropdown");
    const button = (_h = this.shadowRoot) == null ? void 0 : _h.querySelector("rd-button");
    const buttonPad = (_i = this.shadowRoot) == null ? void 0 : _i.querySelector("rd-buttonpad");
    const buttonNumberPad = (_j = this.shadowRoot) == null ? void 0 : _j.querySelectorAll("rd-buttonpad")[1];
    const joystick = (_k = this.shadowRoot) == null ? void 0 : _k.querySelector('[type="joystick"]');
    const squareJoystick = (_l = this.shadowRoot) == null ? void 0 : _l.querySelectorAll('[type="joystick"]')[1];
    const vertSlider = (_m = this.shadowRoot) == null ? void 0 : _m.querySelector('[type="vert"]');
    const horizontalSlider = (_n = this.shadowRoot) == null ? void 0 : _n.querySelector('[type="hor"]');
    const submit = (_o = this.shadowRoot) == null ? void 0 : _o.querySelector('[type="submit"]');
    if (this.mode === "form") {
      (_p = this.channel) == null ? void 0 : _p.close();
      radio.onchange = (ev) => {
        console.log(ev.target.value);
      };
      toggle.onchange = (ev) => {
        console.log(ev.target.checked);
      };
      checkbox.onchange = (ev) => {
        console.log(ev.target.checked);
      };
      input.oninput = (ev) => {
        console.log(ev.target.value);
      };
      input.onchange = (ev) => {
        console.log(ev.target.value);
      };
      textarea.oninput = (ev) => {
        console.log(ev.target.value);
      };
      textarea.onchange = (ev) => {
        console.log(ev.target.value);
      };
      select.onchange = (ev) => {
        console.log(ev.target.value);
      };
      button.onclick = (ev) => {
        console.log(ev);
      };
      buttonPad.onclick = (ev) => {
        if (ev.target.tagName === "RD-BUTTON") {
          console.dir(form[16].value);
        }
      };
      buttonNumberPad.onclick = (ev) => {
        if (ev.target.tagName === "RD-BUTTON") {
          console.dir(form[17].value);
        }
      };
      joystick.oninput = (ev) => {
        console.log(ev.target.value);
      };
      squareJoystick.oninput = (ev) => {
        console.log(ev.target.value);
      };
      vertSlider.oninput = (ev) => {
        console.log(ev.target.value);
      };
      horizontalSlider.oninput = (ev) => {
        console.log(ev.target.value);
      };
      submit.onclick = (ev) => {
        var _a2;
        ev.preventDefault();
        const values = Array.from(
          (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelectorAll(".form__item")
        ).map((item) => {
          if (item.onValidate) {
            item.onValidate();
          }
          return {
            tag: item.tagName,
            value: item.value,
            validity: item.checkValidity ? item.checkValidity() : null
          };
        });
        console.log(values);
      };
    }
    if (this.mode === "channel") {
      this.channel = new BroadcastChannel(this.channelName);
      radio.setAttribute("channel", this.channelName);
      toggle.setAttribute("channel", this.channelName);
      checkbox.setAttribute("channel", this.channelName);
      input.setAttribute("channel", this.channelName);
      textarea.setAttribute("channel", this.channelName);
      select.setAttribute("channel", this.channelName);
      button.setAttribute("channel", this.channelName);
      buttonPad.setAttribute("channel", this.channelName);
      buttonNumberPad.setAttribute("channel", this.channelName);
      joystick.setAttribute("channel", this.channelName);
      squareJoystick.setAttribute("channel", this.channelName);
      vertSlider.setAttribute("channel", this.channelName);
      horizontalSlider.setAttribute("channel", this.channelName);
      submit.setAttribute("channel", this.channelName);
      this.channel.onmessage = (event) => {
        console.log(event.data);
      };
      radio.onchange = () => {
      };
      toggle.onchange = () => {
      };
      checkbox.onchange = () => {
      };
      input.oninput = () => {
      };
      input.onchange = () => {
      };
      textarea.oninput = () => {
      };
      textarea.onchange = () => {
      };
      select.onchange = () => {
      };
      button.onclick = () => {
      };
      buttonPad.onclick = () => {
      };
      buttonNumberPad.onclick = () => {
      };
      joystick.oninput = () => {
      };
      squareJoystick.oninput = () => {
      };
      vertSlider.oninput = () => {
      };
      horizontalSlider.oninput = () => {
      };
      submit.onclick = () => {
      };
    }
  }
};
__decorateClass$1([
  State()
], LibraryComponent.prototype, "getState", 1);
LibraryComponent = __decorateClass$1([
  Component({
    selector: "app-library",
    style: style$1,
    template: template$1
  })
], LibraryComponent);
const template = '<div class="app__logo">\n  <a\n    class="app__icon"\n    href="/"\n    rel="noreferrer"\n    title="Visit Readymade documentation"\n  >\n    404\n  </a>\n</div>\n';
const style = ":host {\n  display: block;\n  background: #000000;\n  color: #cfcfcf;\n  font-family: 'Source Sans Pro', sans-serif;\n  font-weight: 400;\n  font-size: 124px;\n  padding: 0px;\n  margin: 0px;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n  overflow-y: auto;\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n}\n\na:link,\na:visited,\na:active {\n  color: #cfcfcf;\n  text-decoration: none;\n}\n\n.app__logo {\n  width: 256px;\n  height: 256px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%);\n  perspective: 1000px;\n}\n\n.app__icon {\n  display: block;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  transform: translateZ(-1000px);\n  & img {\n    width: 100%;\n    height: 100%;\n  }\n}\n";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let NotFoundComponent = class extends CustomElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.animateIn();
  }
  animateIn() {
    if (!this.shadowRoot.querySelector) return;
    this.shadowRoot.querySelector(".app__icon").animate(
      [
        { opacity: "0", transform: "translateZ(-1000px)" },
        { opacity: "1", transform: "translateZ(0px)" }
      ],
      {
        duration: 2e3,
        easing: "cubic-bezier(0.19, 1, 0.22, 1)",
        fill: "forwards"
      }
    );
  }
};
NotFoundComponent = __decorateClass([
  Component({
    selector: "app-notfound",
    style,
    template
  })
], NotFoundComponent);
{
  window["clientRouter"] = new Router("#root", routing, true);
}
