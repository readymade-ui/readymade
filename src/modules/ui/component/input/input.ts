import { Component, css } from './../../../core';
import { InputComponent } from './../../../dom';

@Component({
  selector: 'rd-input',
  custom: { extends: 'input' },
  style: css`
    :host {
      background-color: var(--color-bg);
      border: 2px solid var(--color-border);
      border-radius: 1em;
      color: var(--color-default);
      font: var(--font-family);
      max-width: 280px;
      min-height: 2em;
      padding: 0em 1em;
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
