var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, css, CustomElement, getElementIndex, getSiblings, html, Listen } from '../../../../modules/core/index.js';
let MyListComponent = class MyListComponent extends CustomElement {
    constructor() {
        super();
        this.currentIndex = 0;
    }
    deactivateElement(elem) {
        elem.setAttribute('tabindex', '-1');
        elem.querySelector('my-item').setAttribute('state', '');
    }
    activateElement(elem) {
        elem.setAttribute('tabindex', '0');
        elem.querySelector('my-item').setAttribute('state', '--selected');
    }
    connectedCallback() {
        this.setAttribute('tabindex', '0');
    }
    onFocus(ev) {
        for (const li of this.children[0].children) {
            if (li === this.children[0].children[this.currentIndex]) {
                this.activateElement(li);
            }
            else {
                this.deactivateElement(li);
            }
            li.addEventListener('click', (clickEv) => {
                getSiblings(li).forEach((elem) => {
                    this.deactivateElement(elem);
                });
                this.activateElement(li);
                this.onSubmit(clickEv);
            });
        }
    }
    onKeydown(ev) {
        const currentElement = this.querySelector('[tabindex]:not([tabindex="-1"])');
        const siblings = getSiblings(currentElement);
        this.currentIndex = getElementIndex(currentElement);
        if (ev.keyCode === 13) {
            this.onSubmit(ev);
        }
        if (ev.keyCode === 38) {
            // up
            if (this.currentIndex === 0) {
                this.currentIndex = siblings.length - 1;
            }
            else {
                this.currentIndex -= 1;
            }
            siblings.forEach((elem) => {
                if (getElementIndex(elem) === this.currentIndex) {
                    this.activateElement(elem);
                }
                else {
                    this.deactivateElement(elem);
                }
            });
        }
        if (ev.keyCode === 40) {
            // down
            if (this.currentIndex === siblings.length - 1) {
                this.currentIndex = 0;
            }
            else {
                this.currentIndex += 1;
            }
            siblings.forEach((elem) => {
                if (getElementIndex(elem) === this.currentIndex) {
                    this.activateElement(elem);
                }
                else {
                    this.deactivateElement(elem);
                }
            });
        }
    }
    onSubmit(event) {
        // console.log(this, event);
    }
};
__decorate([
    Listen('focus')
], MyListComponent.prototype, "onFocus", null);
__decorate([
    Listen('keydown')
], MyListComponent.prototype, "onKeydown", null);
MyListComponent = __decorate([
    Component({
        selector: 'my-list',
        style: css `
		:host {
			display: block;
			background: rgba(24, 24, 24, 1);
			width: 200px;
			height: 200px;
			color: white;
			padding: 1em;
			border-radius: 8px;
		}
	`,
        template: html `
		<slot name="menu"></slot>
	`,
    })
], MyListComponent);
customElements.define('my-list', MyListComponent);
export { MyListComponent };
