import { Component, CustomElement, State } from './../../../../modules/core';
import html from './test.html?raw';
import style from './test.scss?raw';

const objectModel = [
  {
    index: 1,
    title: 'Item 1'
  },
  {
    index: 2,
    title: 'Item 2'
  },
  {
    index: 3,
    title: 'Item 3'
  },
  {
    index: 4,
    title: 'Item 4'
  },
  {
    index: 5,
    title: 'Item 5'
  }
];

const arrayModel = [1, 'two', 3, 4, 'five'];

@Component({
  selector: 'app-testbed',
  style: style,
  template: html
})
class TestBedComponent extends CustomElement {
  constructor() {
    super();
  }

  @State()
  public getState() {
    return {
      items: JSON.stringify(objectModel),
      subitems: JSON.stringify(arrayModel),
      message: 'message'
    };
  }
}

const template = () => html;

export { TestBedComponent, template };
