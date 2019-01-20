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
        // const _elem = (<Node>elem).cloneNode(false);
        // (<Element>_elem).innerHTML = html;
        // (<Element>elem).parentNode.replaceChild((<Element>_elem), (<Element>elem));
        // return (<Element>_elem);
        elem.innerHTML = html;
        return elem;
    }
    class BoundNode {
        constructor(node) {
            this.template = node.querySelector('r-template').innerHTML;
            this.node = node.querySelector('r-template');
        }
        update(data) {
            console.log(this.template.slice(0), this.node);
            this.node = setTemplate(this.node, this.template.slice(0).replace(TEMPLATE_BIND_REGEX, (match, variable) => {
                return Object.byString(data, /\{\{(\s*)(.*?)(\s*)\}\}/.exec(match)[2]) || '';
            }));
        }
    }
    class BoundHandler {
        constructor(obj) {
            this.model = obj;
        }
        set(target, key, value) {
            const change = {
                [key]: {
                    previousValue: target[key],
                    newValue: value
                }
            };
            target[key] = value;
            this.model.elementMeta.boundState['node' + BIND_SUFFIX].update(this.model);
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

    class PseudoElement extends HTMLElement {
        constructor() {
            super();
            attachDOM(this);
            attachStyle(this);
            if (this.onInit) {
                this.onInit();
            }
        }
    }

    exports.RLogoComponent = class RLogoComponent extends PseudoElement {
        constructor() {
            super();
            this.sizes = ['is--small', 'is--medium', 'is--large'];
            //this.state.headline = 'R';
            this.state.headline = Math.floor(Math.random() * 100);
            setInterval(() => { this.state.headline = Math.floor(Math.random() * 100); }, 1000);
        }
        static get observedAttributes() {
            return ['size'];
        }
        onStateChange(change) {
            // console.log(change);
            // this.setSize(this.getAttribute('size'));
        }
        setRandomNumber() {
            this.state.headline = 'R';
        }
        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case 'size':
                    this.setSize(this.getAttribute('size'));
                    break;
            }
        }
        setSize(size) {
            if (this.sizes.indexOf(size) > -1) {
                for (const item in this.sizes) {
                    this.querySelector('h1').classList.remove(this.sizes[item]);
                }
                this.querySelector('h1').classList.add(size);
            }
        }
    };
    exports.RLogoComponent = __decorate([
        Component({
            selector: 'r-logo',
            template: html `<r-template><h1>{{headline}}</h1></r-template>`,
            style: css `
	  h1 {
      font-size: 1em;
    }
    h1.is--small {
        font-size: 12px;
    }
    h1.is--medium {
        font-size: 6em;
    }
    h1.is--large {
        font-size: 12em;
    }
	`
        })
    ], exports.RLogoComponent);
    customElements.define('r-logo', exports.RLogoComponent);

    // import { App } from './app';
    // View Components
    // export { HomeView } from './view/home.view';
    // export { ChapterOneView } from './view/chapter1.view';

    return exports;

}({}));
