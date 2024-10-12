import { Component, CustomElement, State } from '@readymade/core';
import { render as renderLogo } from '../../component/logo';
import template from './test.html?raw';
import style from './test.css?raw';

const objectModel = [
  {
    index: 1,
    title: 'Item 1',
  },
  {
    index: 2,
    title: 'Item 2',
  },
  {
    index: 3,
    title: 'Item 3',
  },
  {
    index: 4,
    title: 'Item 4',
  },
  {
    index: 5,
    title: 'Item 5',
  },
];

const arrayModel = [1, 'two', 3, 4, 'five'];

@Component({
  selector: 'app-testbed',
  style,
  template,
})
class TestBedComponent extends CustomElement {
  constructor() {
    super();
  }

  @State()
  public getState() {
    return {
      items: objectModel,
      subitems: arrayModel,
      message: 'message',
    };
  }
}

const render = () => `
<app-testbed>
  <template shadowrootmode="open">
    <style>
    ${style}
    </style>
    <div class="testbed">
      <div>
        ${renderLogo({ size: 'is--large' })}
        <my-list>
          <ul slot="menu">
            <li>
              <my-item><span slot="msg">Item 1</span></my-item>
            </li>
            <li>
              <my-item><span slot="msg">Item 2</span></my-item>
            </li>
            <li>
              <my-item><span slot="msg">Item 3</span></my-item>
            </li>
            <li>
              <my-item><span slot="msg">Item 4</span></my-item>
            </li>
          </ul>
        </my-list>
    
        <br />
        <br />
        <button is="my-button"></button>
        <input is="my-input" type="text" />
      </div>
      <div>
        <x-tree model="deep"></x-tree>
      </div>
      <div>
        <ul class="is--large">
          <template is="r-repeat" items="item of items">
            <li repeat="item" foo="{{item.index}}">{{item.title}}</li>
          </template>
        </ul>
    
        <ul class="is--large">
          <template is="r-repeat" items="sub of subitems">
            <li repeat="sub" foo="{{sub}}">{{sub}}</li>
          </template>
        </ul>
    
        <r-repeatr template="object-repeater" items="item of items"></r-repeatr>
        <r-repeatr template="array-repeater" items="sub of subitems"></r-repeatr>
        <footer>{{message}}</footer>
      </div>
    </div>
  </template>
</app-testbed>
`;

export { TestBedComponent, render };
