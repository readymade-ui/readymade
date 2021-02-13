import { Component, css } from './../../../core';
import { InputComponent } from './../../../dom';

@Component({
  selector: 'rd-input',
  custom: { extends: 'input' },
  style: css`
    :host {
      background-color: var(--color-bg);
      border: 2px solid var(--color-border);
      border-radius: 14px;
      color: var(--color-default);
      font: var(--font-family);
      max-width: 280px;
      min-height: 32px;
      padding: 0px 14px;
    }
    :host:hover,
    :host:focus,
    :host:active {
      border: 2px solid var(--color-highlight);
      outline: none;
      box-shadow: none;
    }
  `
})
class RdInput extends InputComponent {
  constructor() {
    super();
  }
}

export { RdInput };
