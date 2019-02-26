var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ButtonComponent, Component, css, Emitter, html, Listen } from '../../../../modules/core/index.js';
let MyButtonComponent = class MyButtonComponent extends ButtonComponent {
    constructor() {
        super();
        this.state.model = 'Click';
    }
    onClick(event) {
        this.emitter.broadcast('bang');
    }
    onKeyUp(event) {
        if (event.key === 'Enter') {
            this.emitter.broadcast('bang');
        }
    }
};
__decorate([
    Emitter('bang', { bubbles: true, composed: true }),
    Listen('click')
], MyButtonComponent.prototype, "onClick", null);
__decorate([
    Listen('keyup')
], MyButtonComponent.prototype, "onKeyUp", null);
MyButtonComponent = __decorate([
    Component({
        selector: 'my-button',
        style: css `
		:host {
			background: rgba(24, 24, 24, 1);
			cursor: pointer;
			color: white;
			font-weight: 400;
		}
	`,
        template: html `
   <span>{{model}}</span>
	`,
    })
], MyButtonComponent);
customElements.define('my-button', MyButtonComponent, { extends: 'button' });
export { MyButtonComponent };
