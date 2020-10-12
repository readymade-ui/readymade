import { Component, css, CustomElement, html } from './../../../modules/core';

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
    this.shadowRoot
      .querySelector('slot')
      .addEventListener('slotchange', event => this.onSlotChange(event));
  }
  public onSlotChange(ev: any) {
    this.animateIn();
  }
  public animateIn() {
    const ul = this.shadowRoot.querySelector('slot').assignedNodes()[0];
    Array.from((ul as Element).children).forEach((li: Element, index) => {
      li.animate(
        [
          { opacity: '0', color: '#000' },
          { opacity: '0', offset: index * 0.1 },
          { opacity: '1', color: '#fff' }
        ],
        {
          duration: 2000
        }
      );
    });
  }
}

export { RStatsComponent };
