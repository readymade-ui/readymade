import { M } from "./assets/counter-CnZrxn8X.js";
import { C as Component, a as CustomElement } from "./assets/index-a0kslZDK.js";
const style = "@import url('https://fonts.googleapis.com/css?family=Major+Mono+Display|Source Sans Pro:100,300,400');\n\n:host {\n  display: block;\n  background: #cfcfcf;\n  color: rgb(25, 25, 25);\n  font-family: 'Source Sans Pro', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  padding: 20px;\n  margin: 0px;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n  overflow-y: auto;\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n}\n";
const template = '<div class="testbed">\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n  <my-counter></my-counter>\n</div>\n';
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
let PerformanceTestComponent = class extends CustomElement {
  constructor() {
    super();
  }
};
PerformanceTestComponent = __decorateClass([
  Component({
    selector: "app-perftest",
    style,
    template
  })
], PerformanceTestComponent);
const render = () => `
  <app-perftest>
    <template shadowrootmode="open">
      <style>
        ${style}
      </style>
      ${template}
    </template>
  </app-perftest>
`;
export {
  M as MyCounter,
  PerformanceTestComponent,
  render
};
