import { C as Component, a as CustomElement, S as State } from "./index-a0kslZDK.js";
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
const style$1 = `
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
const template$1 = `<h1 class="{{model.size}}">{{ model.copy }}</h1>`;
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
__decorateClass$1([
  State()
], RHeadlineComponent.prototype, "getState", 1);
RHeadlineComponent = __decorateClass$1([
  Component({
    selector: "r-headline",
    style: style$1,
    template: template$1
  })
], RHeadlineComponent);
const render$1 = ({ size, copy }) => `
  <r-headline>
    <template shadowrootmode="open">
      <style>
      ${style$1}
      </style>
      <h1 class="${size}">${copy}</h1>
    </template>
  </r-headline>
`;
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
class LogoState {
  constructor() {
    this.heading = "R";
    this.heading2 = "readymade";
    this.size = "";
    this.sizes = ["is--small", "is--medium", "is--large"];
  }
}
const _logoState = new LogoState();
const style = `
  :host {
    display: block;
    user-select: none;
    font-size: 16px;
    font-family: Source Sans Pro, sans-serif;
  }
`;
const template = `
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
__decorateClass([
  State()
], RLogoComponent.prototype, "getState", 1);
RLogoComponent = __decorateClass([
  Component({
    selector: "r-logo",
    style,
    template
  })
], RLogoComponent);
const render = ({ size, classes }) => `
  <r-logo class="${classes ? classes : ""}">
    <template shadowrootmode="open">
      <style>
      ${style}
      </style>
      ${render$1({ size, copy: _logoState.heading })}
      ${render$1({ size: "is--default", copy: _logoState.heading2 })}
    </template>
  </r-logo>
`;
export {
  RHeadlineComponent as R,
  RLogoComponent as a,
  render as r
};
