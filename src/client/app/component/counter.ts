import { Component, State, CustomElement } from './../../../modules/core';

@Component({
  selector: 'my-counter',
  template: `
    <button id="dec">-</button>
    <span>{{c}}</span>
    <button id="inc">+</button>
  `,
  style: `
	span,
	button {
		font-size: 200%;
	}

	span {
		width: 4rem;
		display: inline-block;
		text-align: center;
	}

	button {
		width: 4rem;
		height: 4rem;
		border: none;
		border-radius: 10px;
		background-color: seagreen;
		color: white;
	}
	`
})
export class MyCounter extends CustomElement {
  private $state: {
    c: '0';
  };
  connectedCallback() {
    this.shadowRoot
      .querySelector('#inc')
      .addEventListener('click', this.inc.bind(this));
    this.shadowRoot
      .querySelector('#dec')
      .addEventListener('click', this.dec.bind(this));
  }

  get count() {
    return Number.parseInt(this.$state.c);
  }

  inc() {
    this.setState('c', this.count + 1);
  }

  dec() {
    this.setState('c', this.count - 1);
  }

  @State()
  public getState() {
    return { c: '0' };
  }
}
