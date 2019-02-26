<<<<<<< HEAD
import { css, html, ButtonComponent, Component, Emitter, Listen } from '../../../../modules/core/index';

@Component({
  selector: 'my-button',
  template: html`
   {{model}}
	`,
=======
import { ButtonComponent, Component, css, Emitter, html, Listen } from '../../../../modules/core/index.js';

@Component({
  selector: 'my-button',
>>>>>>> dev
  style: css`
		:host {
			background: rgba(24, 24, 24, 1);
			cursor: pointer;
			color: white;
			font-weight: 400;
		}
	`,
<<<<<<< HEAD
})
class MyButtonComponent extends ButtonComponent {

=======
  template: html`
   <span>{{model}}</span>
	`,
})
class MyButtonComponent extends ButtonComponent {

  public state: {
    model: string;
  };

>>>>>>> dev
  constructor() {
    super();
    this.state.model = 'Click';
  }

  @Emitter('bang', { bubbles: true, composed: true })
  @Listen('click')
  public onClick(event) {
<<<<<<< HEAD
			this.emitter.broadcast('bang');
=======
      this.emitter.broadcast('bang');
>>>>>>> dev
  }
  @Listen('keyup')
  public onKeyUp(event) {
    if (event.key === 'Enter') {
      this.emitter.broadcast('bang');
    }
  }
}

customElements.define('my-button', MyButtonComponent, { extends: 'button'});

export { MyButtonComponent };
