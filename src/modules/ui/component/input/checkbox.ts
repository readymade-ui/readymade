import { Component, css } from './../../../core';
import { InputComponent } from './../../../dom';

@Component({
  selector: 'rd-checkbox',
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
      width: 24px;
      height: 24px;
      border: 2px solid var(--color-border);
      border-radius: 6px;
      background: var(--color-bg);
    }
    :host:checked:before {
      background-image: var(--icon-check);
      background-repeat: no-repeat;
      background-position: center;
    }
    :host:hover:before,
    :host:focus:before,
    :host:active:before {
      border: 2px solid var(--color-highlight);
    }
  `
})
class RdCheckBox extends InputComponent {
  constructor() {
    super();
  }
}

export { RdCheckBox };
