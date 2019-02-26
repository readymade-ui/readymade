var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, css, CustomElement, html } from './../../modules/core/index.js';
let RLogoComponent = class RLogoComponent extends CustomElement {
    constructor() {
        super();
        this.sizes = ['is--small', 'is--medium', 'is--large'];
        this.state.heading = 'R';
        this.state.heading2 = 'readymade';
        // setInterval(this.update.bind(this), 4000);
    }
    static get observedAttributes() {
        return ['size'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'size':
                this.setSize(newValue);
                break;
        }
    }
    setSize(size) {
        if (this.sizes.includes(size)) {
            this.setState('size', size);
        }
    }
    update() {
        this.state.heading = Math.round(Math.random() * 100).toString();
        this.state.heading2 = Math.round(Math.random() * 100).toString();
    }
};
RLogoComponent = __decorate([
    Component({
        selector: 'r-logo',
        style: css `
      :host {
        display: block;
        user-select: none;
      }
	`,
        template: html `
    <r-headline headline="{{heading}}" size="{{size}}"></r-headline>
    <r-headline headline="{{heading2}}"></r-headline>
	`,
    })
], RLogoComponent);
customElements.define('r-logo', RLogoComponent);
export { RLogoComponent };
