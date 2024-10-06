import { Component, State, CustomElement } from './../../../modules/core';

const CounterState = {
  count: 0,
};

@Component({
  selector: 'my-counter',
  template: `
    <button id="dec">-</button>
    <span>{{ count }}</span>
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
	`,
})
export class MyCounter extends CustomElement {
  connectedCallback() {
    this.shadowRoot
      .querySelector('#inc')
      .addEventListener('click', this.inc.bind(this));
    this.shadowRoot
      .querySelector('#dec')
      .addEventListener('click', this.dec.bind(this));
  }

  @State()
  public getState() {
    return CounterState;
  }

  inc() {
    this.setState('count', this.getState().count + 1);
  }

  dec() {
    this.setState('count', this.getState().count - 1);
  }
}
