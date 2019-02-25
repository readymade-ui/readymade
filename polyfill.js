(function (exports) {
  'use strict';

  /*! (c) Andrea Giammarchi - ISC */
  (function (document, customElements, Object) {
    if (customElements.get('ungap-li') || typeof Reflect == typeof EXTENDS)
      return;
    var EXTENDS = 'extends';
    try {
      // class LI extends HTMLLIElement {}
      var desc = {};
      desc[EXTENDS] = 'li';
      var HtmlLI = HTMLLIElement;
      var LI = function () {
        return Reflect.construct(HtmlLI, [], LI);
      };
      LI.prototype = Object.create(HtmlLI.prototype);
      customElements.define('ungap-li', LI, desc);
      if (!/is="ungap-li"/.test((new LI).outerHTML))
        throw {};
    } catch (o_O) {
      var ATTRIBUTE_CHANGED_CALLBACK = 'attributeChangedCallback';
      var CONNECTED_CALLBACK = 'connectedCallback';
      var DISCONNECTED_CALLBACK = 'disconnectedCallback';
      var assign = Object.assign;
      var create = Object.create;
      var defineProperties = Object.defineProperties;
      var setPrototypeOf = Object.setPrototypeOf;
      var define = customElements.define;
      var get = customElements.get;
      var upgrade = customElements.upgrade;
      var whenDefined = customElements.whenDefined;
      var registry = create(null);
      new MutationObserver(function (changes) {
        for (var i = 0, length = changes.length; i < length; i++) {
          var change = changes[i];
          var addedNodes = change.addedNodes;
          var removedNodes = change.removedNodes;
          for (var j = 0, len = addedNodes.length; j < len; j++)
            setupIfNeeded(addedNodes[j]);
          for (var j = 0, len = removedNodes.length; j < len; j++)
            disconnectIfNeeded(removedNodes[j]);
        }
      }).observe(
        document,
        {childList: true, subtree: true}
      );
      defineProperties(
        customElements,
        {
          define: {
            value: function (name, Class, options) {
              name = name.toLowerCase();
              if (options && EXTENDS in options) {
                // currently options is not used but preserved for the future
                registry[name] = assign({}, options, {Class: Class});
                var query = options[EXTENDS] + '[is="' + name + '"]';
                var changes = document.querySelectorAll(query);
                for (var i = 0, length = changes.length; i < length; i++)
                  setupIfNeeded(changes[i]);
              }
              else
                define.apply(customElements, arguments);
            }
          },
          get: {
            value: function (name) {
              return name in registry ?
                registry[name].Class :
                get.call(customElements, name);
            }
          },
          upgrade: {
            value: function (node) {
              var info = getInfo(node);
              if (info && !(node instanceof info.Class))
                setup(node, info);
              else
                upgrade.call(customElements, node);
            }
          },
          whenDefined: {
            value: function (name) {
              return name in registry ?
                Promise.resolve() :
                whenDefined.call(customElements, name);
            }
          }
        }
      );
      var createElement = document.createElement;
      defineProperties(
        document,
        {
          createElement: {
            value: function (name, options) {
              var node = createElement.call(document, name);
              if (options && 'is' in options) {
                node.setAttribute('is', options.is);
                customElements.upgrade(node);
              }
              return node;
            }
          }
        }
      );
      function attributeChanged(changes) {
        for (var i = 0, length = changes.length; i < length; i++) {
          var change = changes[i];
          var attributeName = change.attributeName;
          var oldValue = change.oldValue;
          var target = change.target;
          var newValue = target.getAttribute(attributeName);
          if (
            ATTRIBUTE_CHANGED_CALLBACK in target &&
            !(oldValue == newValue && newValue == null)
          )
            target[ATTRIBUTE_CHANGED_CALLBACK](
              attributeName,
              oldValue,
              target.getAttribute(attributeName),
              // TODO: add getAttributeNS if the node is XML
              null
            );
        }
      }
      function disconnectIfNeeded(node) {
        if (node.nodeType !== 1)
          return;
        setupSubNodes(node, disconnectIfNeeded);
        var info = getInfo(node);
        if (
          info &&
          node instanceof info.Class &&
          DISCONNECTED_CALLBACK in node
        )
          node[DISCONNECTED_CALLBACK]();
      }
      function getInfo(node) {
        var is = node.getAttribute('is');
        if (is) {
          is = is.toLowerCase();
          if (is in registry)
            return registry[is];
        }
        return null;
      }
      function setup(node, info) {
        var Class = info.Class;
        var oa = Class.observedAttributes || [];
        setPrototypeOf(node, Class.prototype);
        if (oa.length) {
          new MutationObserver(attributeChanged).observe(
            node,
            {
              attributes: true,
              attributeFilter: oa,
              attributeOldValue: true
            }
          );
          var changes = [];
          for (var i = 0, length = oa.length; i < length; i++)
            changes.push({attributeName: oa[i], oldValue: null, target: node});
          attributeChanged(changes);
        }
      }
      function setupIfNeeded(node) {
        if (node.nodeType !== 1)
          return;
        setupSubNodes(node, setupIfNeeded);
        var info = getInfo(node);
        if (info) {
          if (!(node instanceof info.Class))
            setup(node, info);
          if (CONNECTED_CALLBACK in node)
            node[CONNECTED_CALLBACK]();
        }
      }
      function setupSubNodes(node, setup) {
        var nodes = node.querySelectorAll('[is]');
        for (var i = 0, length = nodes.length; i < length; i++)
          setup(nodes[i]);
      }
    }
  }(document, customElements, Object));

  (function(global) {
    var channels = [];

    function BroadcastChannel(channel) {
      var $this = this;
      channel = String(channel);

      var id = '$BroadcastChannel$' + channel + '$';

      channels[id] = channels[id] || [];
      channels[id].push(this);

      this._name = channel;
      this._id = id;
      this._closed = false;
      this._mc = new MessageChannel();
      this._mc.port1.start();
      this._mc.port2.start();

      global.addEventListener('storage', function(e) {
        if (e.storageArea !== global.localStorage) return;
        if (e.newValue === null) return;
        if (e.key.substring(0, id.length) !== id) return;
        var data = JSON.parse(e.newValue);
        $this._mc.port2.postMessage(data);
      });
    }

    BroadcastChannel.prototype = {
      // BroadcastChannel API
      get name() { return this._name; },
      postMessage: function(message) {
        var $this = this;
        if (this._closed) {
          var e = new Error();
          e.name = 'InvalidStateError';
          throw e;
        }
        var value = JSON.stringify(message);

        // Broadcast to other contexts via storage events...
        var key = this._id + String(Date.now()) + '$' + String(Math.random());
        global.localStorage.setItem(key, value);
        setTimeout(function() { global.localStorage.removeItem(key); }, 500);

        // Broadcast to current context via ports
        channels[this._id].forEach(function(bc) {
          if (bc === $this) return;
          bc._mc.port2.postMessage(JSON.parse(value));
        });
      },
      close: function() {
        if (this._closed) return;
        this._closed = true;
        this._mc.port1.close();
        this._mc.port2.close();

        var index = channels[this._id].indexOf(this);
        channels[this._id].splice(index, 1);
      },

      // EventTarget API
      get onmessage() { return this._mc.port1.onmessage; },
      set onmessage(value) { this._mc.port1.onmessage = value; },
      addEventListener: function(type, listener /*, useCapture*/) {
        return this._mc.port1.addEventListener.apply(this._mc.port1, arguments);
      },
      removeEventListener: function(type, listener /*, useCapture*/) {
        return this._mc.port1.removeEventListener.apply(this._mc.port1, arguments);
      },
      dispatchEvent: function(event) {
        return this._mc.port1.dispatchEvent.apply(this._mc.port1, arguments);
      }
    };

    global.BroadcastChannel = global.BroadcastChannel || BroadcastChannel;
  }(self));

}((this.window = this.window || {})));
//# sourceMappingURL=polyfill.js.map
