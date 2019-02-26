var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, css, CustomElement, html } from './../../modules/core/index.js';
let RStatsComponent = class RStatsComponent extends CustomElement {
    constructor() {
        super();
        this.shadowRoot.querySelector('slot').addEventListener('slotchange', (event) => this.onSlotChange(event));
    }
    onSlotChange(ev) {
        this.animateIn();
    }
    animateIn() {
        const ul = this.shadowRoot.querySelector('slot').assignedNodes()[1];
        Array.from(ul.children).forEach((li, index) => {
            li.animate([
                { opacity: '0', color: '#000' },
                { opacity: '0', offset: (index * 0.1) },
                { opacity: '1', color: '#fff' },
            ], {
                duration: (2000),
            });
        });
    }
};
RStatsComponent = __decorate([
    Component({
        selector: 'r-stats',
        style: css `
    :host {
      display: block;
    }
    ::slotted(ul) {
      display: inline-block;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      font-weight: 300;
    }
	`,
        template: html `
    <slot></slot>
	`,
    })
], RStatsComponent);
customElements.define('r-stats', RStatsComponent);
export { RStatsComponent };
