import { C as Component, a as CustomElement, S as State } from "./assets/index-a0kslZDK.js";
import { r as render$1 } from "./assets/logo-Bm7Ucmdc.js";
const template = '<div class="testbed">\n  <div>\n    <r-logo size="is--large"></r-logo>\n    <my-list>\n      <ul slot="menu">\n        <li>\n          <my-item><span slot="msg">Item 1</span></my-item>\n        </li>\n        <li>\n          <my-item><span slot="msg">Item 2</span></my-item>\n        </li>\n        <li>\n          <my-item><span slot="msg">Item 3</span></my-item>\n        </li>\n        <li>\n          <my-item><span slot="msg">Item 4</span></my-item>\n        </li>\n      </ul>\n    </my-list>\n\n    <br />\n    <br />\n    <button is="my-button"></button>\n    <input is="my-input" type="text" />\n  </div>\n  <div>\n    <x-tree model="deep"></x-tree>\n  </div>\n  <div>\n    <ul class="is--large">\n      <template is="r-repeat" items="item of items">\n        <li repeat="item" foo="{{item.index}}">{{item.title}}</li>\n      </template>\n    </ul>\n\n    <ul class="is--large">\n      <template is="r-repeat" items="sub of subitems">\n        <li repeat="sub" foo="{{sub}}">{{sub}}</li>\n      </template>\n    </ul>\n\n    <r-repeatr template="object-repeater" items="item of items"></r-repeatr>\n    <r-repeatr template="array-repeater" items="sub of subitems"></r-repeatr>\n    <footer>{{message}}</footer>\n  </div>\n</div>\n';
const style = "@import url('https://fonts.googleapis.com/css?family=Major+Mono+Display|Source Sans Pro:100,300,400');\n\n:host {\n  display: block;\n  background: #cfcfcf;\n  color: rgb(25, 25, 25);\n  font-family: 'Source Sans Pro', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  padding: 20px;\n  margin: 0px;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n  overflow-y: auto;\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n::selection {\n  background: #ff7de9; /* WebKit/Blink Browsers */\n}\n::-moz-selection {\n  background: #ff7de9; /* Gecko Browsers */\n}\n\nr-logo {\n  margin-bottom: 40px;\n}\n\nheader,\nsection,\nfooter {\n  position: relative;\n  left: 50%;\n  max-width: 640px;\n  transform: translateX(-50%);\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\nbutton,\ninput {\n  color: white;\n  font-size: 0.8em;\n  padding: 10px;\n  box-sizing: border-box;\n  text-decoration: none;\n  outline: none;\n  box-shadow: 0px 0px 0px transparent;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  transition-property: box-shadow, border;\n  transition-duration: 300ms;\n  transition-timing-function: ease-in-out;\n}\n\nul {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  -webkit-margin-start: 0px;\n  -webkit-margin-end: 0px;\n  -webkit-padding-start: 0px;\n  -webkit-margin-before: 0px;\n  -webkit-margin-after: 0px;\n  &.is--large {\n    font-size: 2em;\n  }\n}\n\nul li {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n[tabindex] {\n  outline: 1px solid transparent;\n  transition-property: box-shadow, border;\n  transition-duration: 300ms;\n  transition-timing-function: ease-in-out;\n}\n\nbutton,\ninput {\n  border-radius: 4px;\n  outline: none;\n  box-shadow: 0px 0px 0px transparent;\n  border: 1px solid transparent;\n}\n\n*:focus,\nbutton:focus,\ninput:focus {\n  box-shadow: 0px 0px 0px rgba(255, 105, 180, 1);\n  outline: 1px solid rgba(255, 105, 180, 1);\n}\n\n[hidden] {\n  display: none !important;\n}\n\na:link,\na:visited {\n  color: #cdcdcd;\n}\n\na:link:hover,\na:visited:hover {\n  color: #ffffff;\n}\n\nh1 {\n  font-family: 'Major Mono Display', serif;\n  line-height: 1.5em;\n}\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: 'Source Sans Pro', serif;\n  font-weight: 400;\n  line-height: 1.5em;\n}\n\nh1 {\n  font-weight: 700;\n}\n\nh6 {\n  font-size: 1em;\n}\n\np {\n  font-family: 'Source Sans Pro', serif;\n  font-size: 1em;\n  line-height: 1.5em;\n}\n\n.hint {\n  opacity: 0.6;\n}\n\nheader {\n  padding-top: 4em;\n  text-align: center;\n  padding-bottom: 2em;\n}\n\nheader h2 {\n  font-size: 20px;\n  font-weight: 300;\n  margin-top: 2em;\n  margin-bottom: 2em;\n}\n\nsection h1 {\n  padding-top: 3em;\n  margin-bottom: 1em;\n  font-family: 'Source Sans Pro';\n}\n\nsection h2 {\n  padding: 2px 8px;\n  background: #cfcfcf;\n  color: #000000;\n  font-size: 1.1em;\n  font-weight: 400;\n  display: inline-block;\n}\n\nsection ul li {\n  margin-bottom: 0.25em;\n}\n\n.definition__list li {\n  padding-bottom: 0.5em;\n}\n\n.definition__title {\n  font-style: italic;\n  color: #ababab;\n  margin-right: 0.2em;\n}\n\n.i__e {\n  color: rgba(117, 191, 255, 1);\n}\n\n.i__c {\n  color: #e6d06c;\n}\n\nfooter {\n  text-align: center;\n  margin-top: 60px;\n  margin-bottom: 60px;\n  font-size: 2em;\n}\n\nfooter p {\n  font-family: 'Major Mono Display', sans-sarif;\n  font-size: 0.8em;\n}\n\nfooter r-logo {\n  padding-bottom: 4em;\n}\n\n[is='my-button'] {\n  background: #181818;\n  cursor: pointer;\n  color: #fff;\n  font-weight: 400;\n}\n[is='my-input'] {\n  background: #181818;\n  border: 0;\n  color: #fff;\n}\n\n.testbed {\n  display: flex;\n  justify-content: space-evenly;\n}\n";
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
__decorateClass([
  State()
], TestBedComponent.prototype, "getState", 1);
TestBedComponent = __decorateClass([
  Component({
    selector: "app-testbed",
    style,
    template
  })
], TestBedComponent);
const render = () => `
<app-testbed>
  <template shadowrootmode="open">
    <style>
    ${style}
    </style>
    <div class="testbed">
      <div>
        ${render$1({ size: "is--large" })}
        <my-list>
          <ul slot="menu">
            <li>
              <my-item><span slot="msg">Item 1</span></my-item>
            </li>
            <li>
              <my-item><span slot="msg">Item 2</span></my-item>
            </li>
            <li>
              <my-item><span slot="msg">Item 3</span></my-item>
            </li>
            <li>
              <my-item><span slot="msg">Item 4</span></my-item>
            </li>
          </ul>
        </my-list>
    
        <br />
        <br />
        <button is="my-button"></button>
        <input is="my-input" type="text" />
      </div>
      <div>
        <x-tree model="deep"></x-tree>
      </div>
      <div>
        <ul class="is--large">
          <template is="r-repeat" items="item of items">
            <li repeat="item" foo="{{item.index}}">{{item.title}}</li>
          </template>
        </ul>
    
        <ul class="is--large">
          <template is="r-repeat" items="sub of subitems">
            <li repeat="sub" foo="{{sub}}">{{sub}}</li>
          </template>
        </ul>
    
        <r-repeatr template="object-repeater" items="item of items"></r-repeatr>
        <r-repeatr template="array-repeater" items="sub of subitems"></r-repeatr>
        <footer>{{message}}</footer>
      </div>
    </div>
  </template>
</app-testbed>
`;
export {
  TestBedComponent,
  render
};
