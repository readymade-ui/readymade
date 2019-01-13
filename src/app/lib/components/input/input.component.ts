import { css, Component, InputComponent, Listen } from '../../../../modules/core/index';

@Component({
  selector: 'my-input',
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

customElements.define('my-input', MyInputComponent, { extends: 'input'});

export { MyInputComponent };
