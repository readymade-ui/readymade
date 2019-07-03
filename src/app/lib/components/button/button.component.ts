import { ButtonComponent, Component, css, Emitter, html, Listen, State } from '../../../../modules/core/index.js';

class ButtonState {
  public model: string = 'Click';
}

@Component({
  selector: 'my-button',
  style: css`
		:host {
			background: rgba(24, 24, 24, 1);
			cursor: pointer;
			color: white;
			font-weight: 400;
		}
	`,
  template: html`
   <span>{{model}}</span>
	`,
})
class MyButtonComponent extends ButtonComponent {

  constructor() {
    super();
  }

  @State()
  public getState() {
    return new ButtonState();
  }

  @Emitter('bang', { bubbles: true, composed: true })
  @Listen('click')
  public onClick(event: MouseEvent) {
      this.emitter.broadcast('bang');
  }
  @Listen('keyup')
  public onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.emitter.broadcast('bang');
    }
  }
}

customElements.define('my-button', MyButtonComponent, { extends: 'button'});

export { ButtonState, MyButtonComponent };
