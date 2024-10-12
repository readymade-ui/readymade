import { C as Component, F as FormElement, L as Listen, c as css, h as html, S as State, E as Emitter, a as CustomElement } from "./assets/index-a0kslZDK.js";
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
__decorateClass$9([
  Listen("press")
], RdButton.prototype, "onPress", 1);
RdButton = __decorateClass$9([
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
__decorateClass$8([
  State()
], RdButtonPad.prototype, "getState", 1);
__decorateClass$8([
  Listen("click")
], RdButtonPad.prototype, "onClick", 1);
__decorateClass$8([
  Listen("keyup")
], RdButtonPad.prototype, "press$", 1);
__decorateClass$8([
  Listen("keydown")
], RdButtonPad.prototype, "pressModifier$", 1);
RdButtonPad = __decorateClass$8([
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
__decorateClass$7([
  Emitter("change")
], RdCheckBox.prototype, "connectedCallback", 1);
RdCheckBox = __decorateClass$7([
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
let RdSwitch = class extends RdCheckBox {
  constructor() {
    super();
  }
};
RdSwitch = __decorateClass$6([
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
__decorateClass$5([
  Emitter("change")
], RdInput.prototype, "connectedCallback", 1);
RdInput = __decorateClass$5([
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
RdRadioGroup = __decorateClass$4([
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
let RdTextArea = class extends RdInput {
  constructor() {
    super();
  }
  get $elem() {
    return this.shadowRoot.querySelector("textarea");
  }
};
RdTextArea = __decorateClass$3([
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
__decorateClass$2([
  Emitter("select")
], RdDropdown.prototype, "connectedCallback", 1);
RdDropdown = __decorateClass$2([
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
__decorateClass$1([
  Emitter("input")
], RdSlider.prototype, "onSliderInit", 1);
__decorateClass$1([
  Listen("mouseleave")
], RdSlider.prototype, "onMouseLeave", 1);
__decorateClass$1([
  Listen("mouseenter")
], RdSlider.prototype, "onMouseEnter", 1);
__decorateClass$1([
  Listen("touchstart")
], RdSlider.prototype, "onTouchStart", 1);
__decorateClass$1([
  Listen("mousedown")
], RdSlider.prototype, "onMouseDown", 1);
__decorateClass$1([
  Listen("mouseup")
], RdSlider.prototype, "onMouseUp", 1);
__decorateClass$1([
  Listen("touchend")
], RdSlider.prototype, "onTouchEnd", 1);
RdSlider = __decorateClass$1([
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
const template = '<div class="testbed">\n  <div class="theme__toggle"></div>\n  <div>\n    <h1>Readymade UI</h1>\n\n    <div>\n      <p>\n        Readymade UI is a specialized user-interface library for remote control\n        surfaces. Designed primarily for touch surfaces, Readymade UI is built\n        with web specifications, making them portable wherever browsers are\n        available. Many Readymade UI elements can participate in HTML forms,\n        however their real power is unlocked when using the elements as a remote\n        control. Every Readymade UI element can dispatch events to a global\n        event bus that can then transmit events over Touch OSC, WebSocket, or\n        WebRTC.\n      </p>\n\n      <p>\n        Examples of each Readymade UI element are below. Open DevTools console\n        to observe messages dispatched from each element.\n      </p>\n      <div>\n        <rd-radiogroup class="form__item">\n          <input type="radio" name="control" value="form" checked />\n          <label for="form">Form</label>\n          <input type="radio" name="control" value="channel" />\n          <label for="channel">Channel</label>\n        </rd-radiogroup>\n      </div>\n    </div>\n\n    <form class="grid">\n      <div class="pane">\n        <h3>Button</h3>\n        <rd-button name="button"></rd-button>\n      </div>\n      <div class="pane">\n        <h3>Switch</h3>\n        <rd-switch name="switch" class="form__item"></rd-switch>\n      </div>\n      <div class="pane">\n        <h3>Input</h3>\n        <rd-input name="input" class="form__item"></rd-input>\n      </div>\n      <div class="pane">\n        <h3>Text Area</h3>\n        <rd-textarea name="textarea" class="form__item" required />\n      </div>\n      <div class="pane">\n        <h3>Select</h3>\n        <rd-dropdown name="dropdown" class="form__item">\n          <select>\n            <option>Option 1</option>\n            <option>Option 2</option>\n            <option>Option With Very Long Title</option>\n          </select>\n        </rd-dropdown>\n      </div>\n      <div class="pane">\n        <h3>Radio (Vertical)</h3>\n        <rd-radiogroup\n          name="radio"\n          class="form__item"\n          direction="vertical"\n          required\n        >\n          <input type="radio" name="control" value="hue" />\n          <label for="hue">Hue</label>\n          <input type="radio" name="control" value="saturation" />\n          <label for="saturation">Saturation</label>\n          <input type="radio" name="control" value="brightness" />\n          <label for="brightess">Brightness</label>\n        </rd-radiogroup>\n      </div>\n      <div class="pane">\n        <h3>Check Box</h3>\n        <rd-checkbox name="checkbox" class="form__item" checked></rd-checkbox>\n      </div>\n      <div class="pane">\n        <h3>Slider (Horizontal)</h3>\n        <rd-slider\n          class="form__item"\n          name="horizontal slider"\n          type="hor"\n          control="{{ horControl }}"\n        ></rd-slider>\n      </div>\n      <div class="pane">\n        <h3>Slider (Vertical)</h3>\n        <rd-slider\n          class="form__item"\n          name="vertical slider"\n          type="vert"\n          control="{{ vertControl }}"\n        ></rd-slider>\n      </div>\n      <div class="pane">\n        <h3>Joystick</h3>\n        <rd-slider\n          class="form__item"\n          name="joystick"\n          type="joystick"\n          control="{{ joyControl }}"\n        ></rd-slider>\n      </div>\n      <div class="pane">\n        <h3>Joystick (Square)</h3>\n        <rd-slider\n          class="form__item"\n          name="joystick square"\n          type="joystick"\n          control="{{ joySquareControl }}"\n        ></rd-slider>\n      </div>\n      <div class="pane">\n        <h3>Form Submit</h3>\n        <rd-button name="submit" type="submit"></rd-button>\n      </div>\n      <div class="pane full">\n        <h3>Button Pad (Keyboard)</h3>\n        <rd-buttonpad\n          name="keyboard"\n          tabindex="0"\n          class="form__item"\n        ></rd-buttonpad>\n      </div>\n      <div class="pane full">\n        <h3>Button Pad (Number)</h3>\n        <rd-buttonpad\n          name="numberpad"\n          tabindex="0"\n          class="form__item"\n        ></rd-buttonpad>\n      </div>\n    </form>\n  </div>\n  <div class="spacer"></div>\n</div>\n';
const style = ":host {\n  display: block;\n  font-weight: 400;\n  font-size: 16px;\n  padding: 20px;\n  margin: 0px;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n  overflow-y: auto;\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n  margin-bottom: 360px;\n}\n\np {\n  max-width: 640px;\n  font-size: 1.2em;\n}\n\n.theme__toggle {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  cursor: pointer;\n  &.dark {\n    background: #ffffff;\n  }\n  &.light {\n    background: #000000;\n  }\n}\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n\n.pane {\n  margin-top: 20px;\n}\n\n.full {\n  grid-column: span 3;\n}\n";
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
__decorateClass([
  State()
], LibraryComponent.prototype, "getState", 1);
LibraryComponent = __decorateClass([
  Component({
    selector: "app-library",
    style,
    template
  })
], LibraryComponent);
const render = () => `
  <app-library>
    <template shadowrootmode="open">
      <style>
        ${style}
      </style>
      ${template}
    </template>
  </app-library>
`;
export {
  LibraryComponent,
  RdButton,
  RdButtonPad,
  RdCheckBox,
  RdDropdown,
  RdInput,
  RdRadioGroup,
  RdSlider,
  RdSwitch,
  RdTextArea,
  StandardKeyboard,
  StandardKeyboardModifierCodeKeyMap,
  StandardKeyboardModifiers,
  StandardKeyboardNumPad,
  render
};
