var app = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    // events
    class EventDispatcher {
        constructor(context) {
            this.target = context;
            this.channels = {
                'default': new BroadcastChannel('default')
            };
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
            if (typeof ev === 'string')
                ev = this.events[ev];
            this.target.dispatchEvent(ev);
        }
        broadcast(ev, name) {
            if (typeof ev === 'string')
                ev = this.events[ev];
            this.target.dispatchEvent(ev);
            ev = { type: ev.type, detail: ev.detail };
            if (ev.detail === null)
                delete ev.detail;
            (name) ? this.channels[name].postMessage(ev) : this.channels['default'].postMessage(ev);
        }
        setChannel(name) {
            this.channels[name] = new BroadcastChannel(name);
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

    function getParent(el) {
        return el.parentNode;
    }
    function getChildNodes() {
        function getChildren(node, path = [], result = []) {
            if (!node.children.length)
                result.push(path.concat(node));
            for (const child of node.children)
                getChildren(child, path.concat(child), result);
            return result;
        }
        const nodes = getChildren(this, []).reduce((nodes, curr) => {
            return nodes.concat(curr);
        }, []);
        return nodes.filter((item, index) => { return nodes.indexOf(item) >= index; });
    }
    function getSiblings(el, filter) {
        if (!filter) {
            filter = [];
        }
        return Array.from(getParent(el).children).filter((elem) => {
            return elem.tagName !== 'TEXT' && elem.tagName !== 'STYLE';
        });
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
    class BoundNode {
        constructor(node) {
            this.template = node.innerHTML;
            this.node = node;
        }
        update(data) {
            let tempTemplate = this.template.slice(0);
            this.node.innerHTML = tempTemplate.replace(TEMPLATE_BIND_REGEX, (match, variable) => {
                return Object.byString(data, /\{\{(\s*)(.*?)(\s*)\}\}/.exec(match)[2]) || '';
            });
        }
    }
    class BoundHandler {
        constructor(obj) {
            this.model = obj;
        }
        set(target, key, value) {
            target[key] = value;
            this.model.elementMeta.boundState['node' + BIND_SUFFIX].update(this.model);
            return true;
        }
    }
    function bindTemplate() {
        if (!this.elementMeta)
            this.elementMeta = {};
        this.elementMeta.templateRegex = TEMPLATE_BIND_REGEX;
        this.elementMeta.boundState = {
            ['node' + BIND_SUFFIX]: new BoundNode(this),
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
    function compileTemplate(elementMeta, target) {
        target.prototype.elementMeta = Object.assign({}, elementMeta);
        target.prototype.elementMeta.eventMap = {};
        target.prototype.template = document.createElement('template');
        target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
        target.prototype.getChildNodes = getChildNodes;
        target.prototype.bindTemplateNodes = bindTemplateNodes;
        target.prototype.bindTemplate = bindTemplate;
    }

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
            };
        };
    }
    function Listen(eventName, channelName) {
        return function decorator(target, key, descriptor) {
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
                        };
                        this.emitter.channels[channelName].onmessage = (ev) => {
                            this[this.elementMeta.eventMap[eventName].handler](ev.data);
                        };
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

    class CustomElement extends HTMLElement {
        constructor() {
            super();
            attachShadow(this, { mode: 'open' });
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
            if (this.onInit) {
                this.onInit();
            }
        }
    }
    class InputComponent extends HTMLInputElement {
        constructor() {
            super();
            attachStyle(this);
            if (this.onInit) {
                this.onInit();
            }
        }
    }

    exports.MyButtonComponent = class MyButtonComponent extends ButtonComponent {
        constructor() {
            super();
            this.state.model = 'Click';
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
    __decorate([
        Emitter('bang', { bubbles: true, composed: true }),
        Listen('click')
    ], exports.MyButtonComponent.prototype, "onClick", null);
    __decorate([
        Listen('keyup')
    ], exports.MyButtonComponent.prototype, "onKeyUp", null);
    exports.MyButtonComponent = __decorate([
        Component({
            selector: 'my-button',
            template: html `{{model}}`,
            style: css `
		:host {
			background: rgba(24, 24, 24, 1);
			cursor: pointer;
			color: white;
			font-weight: 400;
		}
	`,
        })
    ], exports.MyButtonComponent);
    customElements.define('my-button', exports.MyButtonComponent, { extends: 'button' });

    exports.MyInputComponent = class MyInputComponent extends InputComponent {
        constructor() {
            super();
        }
        onFocus(event) {
            this.value = 'input';
        }
    };
    __decorate([
        Listen('focus')
    ], exports.MyInputComponent.prototype, "onFocus", null);
    exports.MyInputComponent = __decorate([
        Component({
            selector: 'my-input',
            style: css `
		:host {
			background: rgba(24, 24, 24, 1);
			border: 0px none;
			color: white;
		}
	`,
        })
    ], exports.MyInputComponent);
    customElements.define('my-input', exports.MyInputComponent, { extends: 'input' });

    exports.MyListComponent = class MyListComponent extends CustomElement {
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
                }
                else {
                    this.deactivateElement(li);
                }
                li.addEventListener('click', (clickEv) => {
                    getSiblings(li).forEach((elem) => {
                        this.deactivateElement(elem);
                    });
                    this.activateElement(li);
                    this.onSubmit(clickEv);
                });
            }
        }
        onKeydown(ev) {
            const currentElement = this.querySelector('[tabindex]:not([tabindex="-1"])');
            const siblings = getSiblings(currentElement);
            this.currentIndex = getElementIndex(currentElement);
            if (ev.keyCode === 13) {
                this.onSubmit(ev);
            }
            if (ev.keyCode === 38) {
                // up
                if (this.currentIndex === 0) {
                    this.currentIndex = siblings.length - 1;
                }
                else {
                    this.currentIndex -= 1;
                }
                siblings.forEach((elem) => {
                    if (getElementIndex(elem) === this.currentIndex) {
                        this.activateElement(elem);
                    }
                    else {
                        this.deactivateElement(elem);
                    }
                });
            }
            if (ev.keyCode === 40) {
                // down
                if (this.currentIndex === siblings.length - 1) {
                    this.currentIndex = 0;
                }
                else {
                    this.currentIndex += 1;
                }
                siblings.forEach((elem) => {
                    if (getElementIndex(elem) === this.currentIndex) {
                        this.activateElement(elem);
                    }
                    else {
                        this.deactivateElement(elem);
                    }
                });
            }
        }
        onSubmit(event) {
            // console.log(this, event);
        }
    };
    __decorate([
        Listen('focus')
    ], exports.MyListComponent.prototype, "onFocus", null);
    __decorate([
        Listen('keydown')
    ], exports.MyListComponent.prototype, "onKeydown", null);
    exports.MyListComponent = __decorate([
        Component({
            selector: 'my-list',
            template: html `<slot name=menu></slot>`,
            style: css `
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
        })
    ], exports.MyListComponent);
    customElements.define('my-list', exports.MyListComponent);

    exports.MyItemComponent = class MyItemComponent extends CustomElement {
        constructor() {
            super();
        }
        onBang(event) {
            this.getAttribute('state') === '--selected' ? this.setAttribute('state', '') : this.setAttribute('state', '--selected');
        }
    };
    __decorate([
        Listen('bang', 'default')
    ], exports.MyItemComponent.prototype, "onBang", null);
    exports.MyItemComponent = __decorate([
        Component({
            selector: 'my-item',
            template: html `<p><span><slot name=msg>item</slot></span></p>`,
            style: css `
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
        })
    ], exports.MyItemComponent);
    customElements.define('my-item', exports.MyItemComponent);

    // import { App } from './app';
    // View Components
    // export { HomeView } from './view/home.view';
    // export { ChapterOneView } from './view/chapter1.view';

    return exports;

}({}));
