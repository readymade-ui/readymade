import { Component, css, CustomElement, html, State } from '@readymade/core';

export class TreeState {
  public arrayModel = [
    'aaa',
    'Node 1',
    'Node 2',
    'Node 3',
    'Node 4',
    'Node 5',
    'Node 6',
    'Node 7',
    ['far', 'fiz', 'faz', 'fuz'],
  ];
  public objectModel = {
    foo: {
      bar: {
        baz: 'bbb',
      },
      far: {
        fiz: {
          faz: {
            fuz: 'fuz',
          },
        },
      },
      mar: {
        maz: 'mmm',
      },
    },
  };
  public ax = 'aaa';
  public bx = 'bbb';
  public cx = 'ccc';
  public dx = 'ddd';
  public ex = 'eee';
  public fx = 'fff';
  public gx = 'ggg';
  public hx = 'hhh';
  public state: {
    foo: {
      bar: 'x';
    };
  };
}

@Component({
  selector: 'x-tree',
  autoDefine: false,
  style: css`
    :host {
      display: grid;
      font-size: 2em;
    }
  `,
  template: html`
    <x-node model="{{arrayModel[0]}}"></x-node>
    <x-node model="{{arrayModel[8][1]}}"></x-node>
    <x-node model="{{objectModel.foo.bar.baz}}"></x-node>
    <x-node model="{{objectModel['foo']['far'].fiz['faz'].fuz}}"></x-node>
    <x-node model="{{dx}}"></x-node>
    <x-node model="{{ex}}"></x-node>
    <x-node model="{{fx}}"></x-node>
    <x-node model="{{gx}}"></x-node>
    <x-node model="{{hx}}"></x-node>
    <x-node model="{{state.foo.bar}}"></x-node>
  `,
})
class TreeComponent extends CustomElement {
  constructor() {
    super();
  }

  @State()
  public getState() {
    return {
      arrayModel: [
        'aaa',
        'Node 1',
        'Node 2',
        'Node 3',
        'Node 4',
        'Node 5',
        'Node 6',
        'Node 7',
        ['far', 'fiz', 'faz', 'fuz'],
      ],
      objectModel: {
        foo: {
          bar: {
            baz: 'bbb',
          },
          far: {
            fiz: {
              faz: {
                fuz: 'fuz',
              },
            },
          },
          mar: {
            maz: 'mmm',
          },
        },
      },
      ax: 'aaa',
      bx: 'bbb',
      cx: 'ccc',
      dx: 'ddd',
      ex: 'eee',
      fx: 'fff',
      gx: 'ggg',
      hx: 'hhh',
      state: {
        foo: {
          bar: 'x',
        },
      },
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
    this.setState('state.foo.bar', model);
  }
}

customElements.define('x-tree', TreeComponent);

export { TreeComponent };
