import {
  Component,
  css,
  CustomElement,
  html,
  Listen,
} from './../../../modules/core';

@Component({
  selector: 'my-item',
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
  template: html`
    <p>
      <span><slot name="msg">item</slot></span>
    </p>
  `,
})
class MyItemComponent extends CustomElement {
  constructor() {
    super();
  }
  @Listen('bang', 'default')
  public onBang() {
    if (this.getAttribute('state') === '--selected') {
      this.setAttribute('state', '');
    } else {
      this.setAttribute('state', '--selected');
    }
  }
}

export { MyItemComponent };
