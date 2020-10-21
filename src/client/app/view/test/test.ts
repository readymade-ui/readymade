import { CustomElement, State, Component } from './../../../../modules/core';

import style from './test.scss';
import template from './test.html';

@Component({
  selector: 'app-testbed',
  style: style,
  template: template
})
class TestBedComponent extends CustomElement {
  constructor() {
    super();
  }

  @State()
  public getState() {
    return { items: JSON.stringify([1, 2, 3, 4, 5]),
             message: 'message' };
  }

}

export { TestBedComponent };
