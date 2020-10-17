import { CustomElement, Component } from './../../../../modules/core';

import style from './home.scss';
import template from './home.html';

@Component({
  selector: 'app-home',
  style: style,
  template: template
})
class HomeComponent extends CustomElement {
  constructor() {
    super();
  }
}

export { HomeComponent };
