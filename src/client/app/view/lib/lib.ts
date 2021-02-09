import { Component, CustomElement } from './../../../../modules/core';
import template from './lib.html';
import style from './lib.scss';

@Component({
  selector: 'app-library',
  style: style,
  template: template
})
class LibraryComponent extends CustomElement {
  constructor() {
    super();
  }
}

export { LibraryComponent };
