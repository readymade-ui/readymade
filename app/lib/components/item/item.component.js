var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, css, CustomElement, html, Listen } from '../../../../modules/core/index.js';
let MyItemComponent = class MyItemComponent extends CustomElement {
    constructor() {
        super();
    }
    onBang(event) {
        this.getAttribute('state') === '--selected' ? this.setAttribute('state', '') : this.setAttribute('state', '--selected');
    }
};
__decorate([
    Listen('bang', 'default')
], MyItemComponent.prototype, "onBang", null);
MyItemComponent = __decorate([
    Component({
        selector: 'my-item',
        style: css `
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
        template: html `
		<p>
			<span><slot name="msg">item</slot></span>
		</p>
	`,
    })
], MyItemComponent);
customElements.define('my-item', MyItemComponent);
export { MyItemComponent };
