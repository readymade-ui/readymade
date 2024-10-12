import { C as Component, a as CustomElement, S as State } from "./assets/index-a0kslZDK.js";
const template = "<div>{{params}}</div>\n";
const style = "";
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
__decorateClass([
  State()
], QueryComponent.prototype, "getState", 1);
QueryComponent = __decorateClass([
  Component({
    selector: "app-query",
    style,
    template
  })
], QueryComponent);
const render = () => `
<app-query>
  <template shadowrootmode="open">
    <style>
    ${style}
    </style>
    ${template}
  </template>
</app-query>
`;
export {
  QueryComponent,
  render
};
