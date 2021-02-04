import { Component, css } from '@readymade/core';
import { InputComponent } from '@readymade/dom';

@Component({
  selector: 'rd-input',
  custom: { extends: 'input' },
  style: css`
    .rdInput {
      background: rgba(24, 24, 24, 1);
      border: 2px solid rgba(236, 236, 236, 1);
      border-radius: 4px;
      cursor: pointer;
      color: white;
      font-weight: 400;
    }
  `
})
class RdInput extends InputComponent {
  constructor() {
    super();
  }
}

export { RdInput };
