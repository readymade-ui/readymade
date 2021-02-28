import { Component, CustomElement, html, css } from './../../../core';

@Component({
  selector: 'rd-radiogroup',
  style: css`
    :host {
      display: inline-block;
    }
    ::slotted(input[type='radio']) {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
    ::slotted(input[type='radio']):before {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      border: 2px solid var(--color-border);
      border-radius: 50%;
      background: var(--color-bg);
      transform: translateY(4px);
    }
    ::slotted(input[type='radio']:checked):before {
      background: radial-gradient(
        var(--color-border) 0%,
        var(--color-border) 50%,
        transparent 50%,
        transparent
      );
      border-color: var(--color-highlight);
    }
    ::slotted(input[type='radio']:focus),
    ::slotted(input[type='radio']:active) {
      outline: 0px;
      outline-offset: 0px;
    }
    ::slotted(input[type='radio']:hover):before,
    ::slotted(input[type='radio']:focus):before,
    ::slotted(input[type='radio']:active):before {
      border: 2px solid var(--color-highlight);
    }
  `,
  template: html`
    <slot></slot>
  `
})
class RdRadioGroup extends CustomElement {
  constructor() {
    super();
  }
  connectedCallback() {
    Array.from(this.shadowRoot.querySelector('slot').assignedNodes())
      .filter(elem => elem.tagName === 'INPUT' && elem.type === 'radio')
      .forEach(elem => (elem.onchange = this.onChange));
  }
  onChange(ev: Event) {
    // TODO: hook into event pattern to notify outside world of selection
    console.log(ev.target.value);
  }
}

export { RdRadioGroup };
