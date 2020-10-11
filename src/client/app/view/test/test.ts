import { CustomElement, Component } from './../../../../modules/core';

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
}

export { TestBedComponent };
