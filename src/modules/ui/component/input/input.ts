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
      color: white;
      font-weight: 400;
      min-width: 280px;
      min-height: 44px;
      outline-color: rgba(236, 0, 236, 1);
      padding: 0px 14px;
      &:focus {
        border: 2px solid rgba(236, 0, 236, 1);
      }
    }
  `
})
class RdInput extends InputComponent {
  constructor() {
    super();
  }
}

export { RdInput };
