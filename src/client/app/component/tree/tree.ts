import { Component, css, CustomElement, html, State } from './../../../../modules/core';

export class TreeState {
  public arrayModel = ['aaa', 'Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5', 'Node 6', 'Node 7'];
  public objectModel = {
    foo: {
      bar: {
        baz: 'bbb',
      },
    },
  };
  public a = 'aaa';
  public b = 'bbb';
  public c = 'ccc';
  public d = 'ddd';
  public e = 'eee';
  public f = 'fff';
  public g = 'ggg';
  public h = 'hhh';
  public state: {
    foo: 'foo',
  };
}

export const _treeState = new TreeState();

@Component({
  selector: 'x-tree',
  autoDefine: false,
  style: css`
      :host {
        display: grid;
      }
	`,
  template: html`
    <x-node model="{{arrayModel[0]}}"></x-node>
    <x-node model="{{objectModel.foo.bar.baz}}"></x-node>
    <x-node model="{{c}}"></x-node>
    <x-node model="{{d}}"></x-node>
    <x-node model="{{e}}"></x-node>
    <x-node model="{{f}}"></x-node>
    <x-node model="{{g}}"></x-node>
    <x-node model="{{h}}"></x-node>
    <x-node model="{{state.foo}}"></x-node>
	`,
})
class TreeComponent extends CustomElement {

  constructor() {
    super();
  }

  @State()
  public getState() {
    return _treeState;
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
    this.setState('state.foo', model);
  }
}
customElements.define('x-tree', TreeComponent);
export { TreeComponent };
