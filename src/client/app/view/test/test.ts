import { Component, CustomElement, State } from './../../../../modules/core';
import template from './test.html';
import style from './test.scss';

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
  template: template
})
class TestBedComponent extends CustomElement {
  constructor() {
    super();
    //     setTimeout(
    //       () => this.setState('subitems', JSON.stringify(['one', 'two'])),
    //       5000
    //     );
    //
    //     setTimeout(
    //       () =>
    //         this.setState(
    //           'items',
    //           JSON.stringify([
    //             {
    //               index: 1,
    //               title: 'Item 1'
    //             }
    //           ])
    //         ),
    //       7500
    //     );
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

export { TestBedComponent };
