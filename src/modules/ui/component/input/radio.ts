import { Component, FormElement, Emitter, html, css } from './../../../core';

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
    ::slotted(input[type='radio'][disabled]):before {
      opacity: var(--opacity-disabled);
      background: var(--color-disabled);
      cursor: not-allowed;
    }
    ::slotted(input[type='radio'][disabled]:hover):before,
    ::slotted(input[type='radio'][disabled]:focus):before,
    ::slotted(input[type='radio'][disabled]:active):before {
      border: 2px solid var(--color-border);
      outline: none;
      box-shadow: none;
    }
  `,
  template: html`
    <slot></slot>
  `
})
class RdRadioGroup extends FormElement {
  constructor() {
    super();
  }
  formDisabledCallback(disabled: boolean) {
    this.$elem.forEach(elem => (elem.disabled = disabled));
  }
  get $elem() {
    return this.shadowRoot
      .querySelector('slot')
      .assignedNodes()
      .filter(elem => elem.tagName === 'INPUT' && elem.type === 'radio');
  }
}

export { RdRadioGroup };
