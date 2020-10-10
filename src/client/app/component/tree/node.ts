import { Component, css, html, PseudoElement, State } from '@readymade/core';

export class NodeState {
  public state;
}

export const _nodeState = new NodeState();

@Component({
  selector: 'x-node',
  style: css`
      :host {
        display: flex;
      }
	`,
  template: html`
    <x-atom model="{{state}}"></x-atom>
	`,
})
class NodeComponent extends PseudoElement {

  constructor() {
    super();
  }

  @State()
  public getState() {
    return _nodeState;
  }

  static get observedAttributes() {
    return ['model'];
  }

  public attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'model':
        this.setModel(newValue);
        break;
    }
  }
  public setModel(model: string) {
    this.setState('state', model);
  }
}

export { NodeComponent };
