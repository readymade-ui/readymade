import { Component, css, html, CustomElement, StateChange } from './../../modules/core/index.js';

@Component({
  selector: 'r-stats',
  style: css`
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
  template: html`
    <slot></slot>
	`
})
class RStatsComponent extends CustomElement {
  constructor() {
    super();
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', event => this.onSlotChange(event));
  }
  onSlotChange(ev: any) {
     this.animateIn();
  }
  animateIn() {
    const ul = this.shadowRoot.querySelector('slot').assignedNodes()[1];
    Array.from((<Element>ul).children).forEach((li: Element, index) => {
      li.animate(
        [
          { opacity: '0', color: '#000' },
          { opacity: '0', offset: (index * 0.1)},
          { opacity: '1', color: '#fff' }
        ], {
          duration: (2000)
        }
      );
    });
  }
}


customElements.define('r-stats', RStatsComponent);

export { RStatsComponent };
