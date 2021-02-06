import { Component, css } from '@readymade/core';
import { InputComponent } from '@readymade/dom';

@Component({
  selector: 'rd-input',
  custom: { extends: 'input' },
  style: css`
    :host {
      background: var(--color-highlight);
      border: 2px solid var(--color-default);
      border-radius: 4px;
      color: var(--color-default);
      font-weight: 400;
      min-width: 280px;
      min-height: 44px;
      outline-color: rgba(236, 0, 236, 1);
      padding: 0px 14px;
    }
  `
})
class RdInput extends InputComponent {
  constructor() {
    super();
  }
}

export { RdInput };
