import { Component, css } from '@readymade/core';
import { InputComponent } from '@readymade/dom';

@Component({
  selector: 'rd-input',
  custom: { extends: 'input' },
  style: css`
    :host {
      background-color: var(--color-bg);
      border: 2px solid var(--color-border);
      border-radius: 4px;
      color: var(--color-default);
      font-weight: 400;
      min-width: 280px;
      min-height: 44px;
      padding: 0px 14px;
    }
    :host:focus {
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
