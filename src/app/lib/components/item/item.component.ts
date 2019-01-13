import { css, html, Component, CustomElement, Listen } from '../../../../modules/core/index';

@Component({
  selector: 'my-item',
  template: html`
		<p>
			<span><slot name="msg">item</slot></span>
		</p>
	`,
  style: css`
		:host {
			display: block;
			cursor: pointer;
		}
		:host([state='--selected']) {
			background: rgba(255, 105, 180, 1);
			color: black;
			font-weight: 700;
		}
	`,
})
class MyItemComponent extends CustomElement {
  constructor() {
    super();
  }
  @Listen('bang', 'default')
  public onBang(event) {
    this.getAttribute('state') === '--selected' ? this.setAttribute('state', '') : this.setAttribute('state', '--selected');
  }
}

customElements.define('my-item', MyItemComponent);

export { MyItemComponent };
