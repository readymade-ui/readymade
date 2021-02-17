import { Component, css } from './../../../core';
import { InputComponent } from './../../../dom';

@Component({
  selector: 'rd-radio',
  custom: { extends: 'input' },
  style: css`
    :host {
      opacity: 0;
      width: 1.25em;
      height: 1.25em;
      margin: 0;
      transform: translateX(1.65em) translateY(0.25em);
    }
    :host + *::before {
      content: '';
      display: inline-block;
      vertical-align: bottom;
      width: 1em;
      height: 1em;
      margin-right: 0.5rem;
      border-radius: 50%;
      border: 2px solid var(--color-border);
    }
    :host:hover,
    :host:focus,
    :host:active {
      border: 2px solid var(--color-highlight);
      outline: none;
      box-shadow: none;
    }
    :host:checked + *::before {
      background: radial-gradient(
        var(--color-border) 0%,
        var(--color-border) 50%,
        transparent 50%,
        transparent
      );
      border-color: var(--color-highlight);
    }
    :host:checked + * {
      color: var(--color-highlight);
    }
  `
})
class RdRadioButton extends InputComponent {
  constructor() {
    super();
  }
}

export { RdRadioButton };
