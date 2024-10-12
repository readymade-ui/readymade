import { Component, css, html, CustomElement, State } from '@readymade/core';

@Component({
  selector: 'x-node',
  style: css`
    :host {
      display: flex;
    }
  `,
  template: html` <x-atom model="{{xnode}}"></x-atom> `,
})
class NodeComponent extends CustomElement {
  constructor() {
    super();
  }

  @State()
  public getState() {
    return {
      xnode: '',
    };
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
    this.setState('xnode', model);
  }
}

export { NodeComponent };
