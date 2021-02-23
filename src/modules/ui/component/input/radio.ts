import { Component, css } from './../../../core';
import { InputComponent } from './../../../dom';

@Component({
  selector: 'rd-radio',
  custom: { extends: 'input' },
  style: css`
    :host {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
    }
    :host:before {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      border: 2px solid var(--color-border);
      border-radius: 50%;
      background: var(--color-bg);
      transform: translateY(4px);
    }
    :host:checked:before {
      background: radial-gradient(
        var(--color-border) 0%,
        var(--color-border) 50%,
        transparent 50%,
        transparent
      );
      border-color: var(--color-highlight);
    }
    :host:focus,
    :host:active {
      outline: 0px;
      outline-offset: 0px;
    }
    :host:hover:before,
    :host:focus:before,
    :host:active:before {
      border: 2px solid var(--color-highlight);
    }
  `
})
class RdRadioButton extends InputComponent {
  constructor() {
    super();
  }
}

export { RdRadioButton };
