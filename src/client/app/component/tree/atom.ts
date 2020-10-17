import {
  Component,
  css,
  CustomElement,
  html,
  State
} from './../../../../modules/core';

export class NodeState {
  public astate;
}

export const _nodeState = new NodeState();

@Component({
  selector: 'x-atom',
  style: css`
    :host {
      display: flex;
    }
  `,
  template: html`
    <span>{{astate}}</span>
  `
})
class AtomComponent extends CustomElement {
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
    this.setState('astate', model);
  }
}

export { AtomComponent };
