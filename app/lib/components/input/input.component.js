var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, css, InputComponent, Listen } from '../../../../modules/core/index.js';
let MyInputComponent = class MyInputComponent extends InputComponent {
    constructor() {
        super();
    }
    onFocus(event) {
        this.value = 'input';
    }
};
__decorate([
    Listen('focus')
], MyInputComponent.prototype, "onFocus", null);
MyInputComponent = __decorate([
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
], MyInputComponent);
customElements.define('my-input', MyInputComponent, { extends: 'input' });
export { MyInputComponent };
