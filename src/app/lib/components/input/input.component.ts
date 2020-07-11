import { Component, css, InputComponent, Listen } from '../../../../modules/core/index.js';

@Component({
  selector: 'my-input',
  custom: { extends: 'input'},
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
  public onFocus(event) {
    this.value = 'input';
  }
}

export { MyInputComponent };
