import { C as Component, a as CustomElement, S as State } from "./index-a0kslZDK.js";
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
const CounterState = {
  count: 0
};
let MyCounter = class extends CustomElement {
  connectedCallback() {
    this.shadowRoot.querySelector("#inc").addEventListener("click", this.inc.bind(this));
    this.shadowRoot.querySelector("#dec").addEventListener("click", this.dec.bind(this));
  }
  getState() {
    return CounterState;
  }
  inc() {
    this.setState("count", this.getState().count + 1);
  }
  dec() {
    this.setState("count", this.getState().count - 1);
  }
};
__decorateClass([
  State()
], MyCounter.prototype, "getState", 1);
MyCounter = __decorateClass([
  Component({
    selector: "my-counter",
    template: `
    <button id="dec">-</button>
    <span>{{ count }}</span>
    <button id="inc">+</button>
  `,
    style: `
	span,
	button {
		font-size: 200%;
	}

	span {
		width: 4rem;
		display: inline-block;
		text-align: center;
	}

	button {
		width: 4rem;
		height: 4rem;
		border: none;
		border-radius: 10px;
		background-color: seagreen;
		color: white;
	}
	`
  })
], MyCounter);
export {
  MyCounter as M
};
