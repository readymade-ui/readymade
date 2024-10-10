import { Component, css, Listen } from '@readymade/core';
import { InputComponent } from '@readymade/dom';

@Component({
  selector: 'my-input',
  custom: { extends: 'input' },
  style: css`
    :host {
      background: rgba(24, 24, 24, 1);
      border: 0px none;
      color: white;
    }
  `,
})
class MyInputComponent extends InputComponent {
  constructor() {
    super();
  }
  @Listen('focus')
  public onFocus() {
    this.value = 'input';
  }
}

export { MyInputComponent };
