import { C as Component, a as CustomElement } from "./assets/index-a0kslZDK.js";
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
const render = () => `
<app-notfound>
  <template shadowrootmode="open">
    <style>
    ${style}
    </style>
    ${template}
  </template>
</app-notfound>
`;
export {
  NotFoundComponent,
  render
};
