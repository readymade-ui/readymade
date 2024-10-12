import { b as attachDOM, d as attachStyle, C as Component, t as templateId, u as uuidv4, P as PseudoElement, s as stripTemplateString, D as DOT_BRACKET_NOTATION_REGEX, i as isObject, f as findValueByString, S as State, E as Emitter, L as Listen, c as css, h as html, a as CustomElement, g as getSiblings, e as getElementIndex } from "./assets/index-a0kslZDK.js";
import { M } from "./assets/counter-CnZrxn8X.js";
import { r as render$3 } from "./assets/logo-Bm7Ucmdc.js";
import { R, a } from "./assets/logo-Bm7Ucmdc.js";
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
TemplateRepeater = __decorateClass$d([
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
Repeater = __decorateClass$d([
  Component({
    selector: "r-repeatr"
  })
], Repeater);
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
class ButtonState {
  constructor() {
    this.model = "Click";
  }
}
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
__decorateClass$c([
  State()
], MyButtonComponent.prototype, "getState", 1);
__decorateClass$c([
  Emitter("bang", { bubbles: true, composed: true }),
  Listen("click")
], MyButtonComponent.prototype, "onClick", 1);
__decorateClass$c([
  Listen("keyup")
], MyButtonComponent.prototype, "onKeyUp", 1);
MyButtonComponent = __decorateClass$c([
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
__decorateClass$b([
  State()
], RCodeComponent.prototype, "getState", 1);
RCodeComponent = __decorateClass$b([
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
let MyInputComponent = class extends InputComponent {
  constructor() {
    super();
  }
  onFocus() {
    this.value = "input";
  }
};
__decorateClass$a([
  Listen("focus")
], MyInputComponent.prototype, "onFocus", 1);
MyInputComponent = __decorateClass$a([
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
__decorateClass$9([
  Listen("bang", "default")
], MyItemComponent.prototype, "onBang", 1);
MyItemComponent = __decorateClass$9([
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
__decorateClass$8([
  Listen("focus")
], MyListComponent.prototype, "onFocus", 1);
__decorateClass$8([
  Listen("keydown")
], MyListComponent.prototype, "onKeydown", 1);
MyListComponent = __decorateClass$8([
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
class MainNavState {
  constructor() {
    this.resourceLinkFillColor = "#cfcfcf";
    this.size = "44px";
  }
}
const template$2 = `
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
const style$2 = `
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
__decorateClass$7([
  State()
], RMainNavComponent.prototype, "getState", 1);
__decorateClass$7([
  Emitter("open", {}, "sidenav"),
  Emitter("close", {}, "sidenav")
], RMainNavComponent.prototype, "connectedCallback", 1);
__decorateClass$7([
  Listen("close", "sidenav")
], RMainNavComponent.prototype, "onClose", 1);
RMainNavComponent = __decorateClass$7([
  Component({
    selector: "r-main-nav",
    style: style$2,
    template: template$2
  })
], RMainNavComponent);
const render$2 = () => `
  <r-main-nav>
    <template shadowrootmode="open">
    <style>
    ${style$2}
    </style>
    ${template$2}
    </template>
  </r-main-nav>
`;
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
RMeterComponent = __decorateClass$6([
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
const template$1 = html`
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
const style$1 = css`
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
    Array.from(this.shadowRoot.querySelectorAll("a")).forEach((a2) => {
      a2.addEventListener("click", (ev) => {
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
__decorateClass$5([
  State()
], RSideNavComponent.prototype, "getState", 1);
__decorateClass$5([
  Emitter("close", {}, "sidenav")
], RSideNavComponent.prototype, "connectedCallback", 1);
__decorateClass$5([
  Listen("close", "sidenav")
], RSideNavComponent.prototype, "close", 1);
__decorateClass$5([
  Listen("open", "sidenav")
], RSideNavComponent.prototype, "open", 1);
RSideNavComponent = __decorateClass$5([
  Component({
    selector: "r-side-nav",
    style: style$1,
    template: template$1
  })
], RSideNavComponent);
const render$1 = () => `
  <r-side-nav>
    <template shadowrootmode="open">
      <style>
      ${style$1}
      </style>
      ${template$1}
    </template>
  </r-side-nav>
`;
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
const env = process.env.NODE_ENV || "development";
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
    const ul = (_b = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("slot")) == null ? void 0 : _b.assignedNodes()[env === "production" ? 0 : 1];
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
RStatsComponent = __decorateClass$4([
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
__decorateClass$3([
  State()
], AtomComponent.prototype, "getState", 1);
AtomComponent = __decorateClass$3([
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
__decorateClass$2([
  State()
], NodeComponent.prototype, "getState", 1);
NodeComponent = __decorateClass$2([
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
__decorateClass$1([
  State()
], TreeComponent.prototype, "getState", 1);
TreeComponent = __decorateClass$1([
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
const template = `<r-side-nav></r-side-nav>
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
const style = "::selection {\n  background: #ff7de9; /* WebKit/Blink Browsers */\n}\n\n::-moz-selection {\n  background: #ff7de9; /* Gecko Browsers */\n}\n\nbutton,\ninput {\n  color: white;\n  font-size: 0.8em;\n  padding: 10px;\n  box-sizing: border-box;\n  text-decoration: none;\n  outline: none;\n  box-shadow: 0px 0px 0px transparent;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  transition-property: box-shadow, border;\n  transition-duration: 300ms;\n  transition-timing-function: ease-in-out;\n}\n\nul {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  -webkit-margin-start: 0px;\n  -webkit-margin-end: 0px;\n  -webkit-padding-start: 0px;\n  -webkit-margin-before: 0px;\n  -webkit-margin-after: 0px;\n}\n\nul li {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n[tabindex] {\n  outline: 1px solid transparent;\n  transition-property: box-shadow, border;\n  transition-duration: 300ms;\n  transition-timing-function: ease-in-out;\n}\n\nbutton,\ninput {\n  border-radius: 4px;\n  outline: none;\n  box-shadow: 0px 0px 0px transparent;\n  border: 1px solid transparent;\n}\n\n*:focus,\nbutton:focus,\ninput:focus {\n  box-shadow: 0px 0px 0px rgba(255, 105, 180, 1);\n  outline: 1px solid rgba(255, 105, 180, 1);\n}\n\n[hidden] {\n  display: none !important;\n}\n\na:link,\na:visited {\n  color: #cdcdcd;\n}\n\na:link:hover,\na:visited:hover {\n  color: #ffffff;\n}\n\nh1 {\n  font-family: 'Major Mono Display', serif;\n  line-height: 1.5em;\n}\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: 'Source Sans Pro', serif;\n  font-weight: 400;\n  line-height: 1.5em;\n}\n\nh1 {\n  font-weight: 700;\n}\n\nh2 {\n  margin-top: 2em;\n}\n\nh6 {\n  font-size: 1em;\n}\n\np {\n  font-family: 'Source Sans Pro', serif;\n  font-size: 1em;\n  line-height: 1.5em;\n}\n\n.hint {\n  opacity: 0.6;\n}\n\nheader,\nsection,\nfooter {\n  position: relative;\n  left: 50%;\n  max-width: 640px;\n  transform: translateX(-50%);\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\nheader {\n  padding-top: 4em;\n  text-align: center;\n  padding-bottom: 2em;\n}\n\nheader h2 {\n  font-size: 20px;\n  font-weight: 300;\n  margin-top: 2em;\n  margin-bottom: 2em;\n}\n\nsection {\n  margin-bottom: 20px;\n}\n\nsection h1 {\n  padding-top: 3em;\n  margin-bottom: 1em;\n  font-family: 'Source Sans Pro';\n}\n\nsection h2 {\n  padding: 2px 8px;\n  background: #cfcfcf;\n  color: #000000;\n  font-size: 1.1em;\n  font-weight: 400;\n  display: inline-block;\n}\n\nsection ul li {\n  margin-bottom: 0.25em;\n}\n\n.definition__list li {\n  padding-bottom: 0.5em;\n}\n\n.definition__title {\n  font-style: italic;\n  color: #ababab;\n  margin-right: 0.2em;\n}\n\n.i__e {\n  color: rgba(117, 191, 255, 1);\n}\n\n.i__c {\n  color: #e6d06c;\n}\n\nfooter {\n  text-align: center;\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nfooter p {\n  font-family: 'Major Mono Display', sans-sarif;\n  font-size: 0.8em;\n}\n\nfooter r-logo {\n  padding-bottom: 4em;\n}\n\n[is='my-button'] {\n  background: #181818;\n  cursor: pointer;\n  color: #fff;\n  font-weight: 400;\n}\n[is='my-input'] {\n  background: #181818;\n  border: 0;\n  color: #fff;\n}\n";
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
let HomeComponent = class extends CustomElement {
  constructor() {
    super();
  }
};
HomeComponent = __decorateClass([
  Component({
    selector: "app-home",
    style,
    template
  })
], HomeComponent);
const declarativeTemplate = `
${render$1()}
${render$2()}

<header>
    ${render$3({ size: "is--large" })}
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
    ${render$3({ size: "is--large", classes: "no--subtitle" })}
</footer>
`;
const render = () => `
  <app-home>
    <template shadowrootmode="open">
      <style>
        ${style}
      </style>
      ${declarativeTemplate}
    </template>
  </app-home>
`;
export {
  AtomComponent,
  ButtonState,
  HomeComponent,
  MyButtonComponent,
  M as MyCounter,
  MyInputComponent,
  MyItemComponent,
  MyListComponent,
  NodeComponent,
  RCodeComponent,
  R as RHeadlineComponent,
  a as RLogoComponent,
  RMainNavComponent,
  RMeterComponent,
  RSideNavComponent,
  RStatsComponent,
  TreeComponent,
  render
};
