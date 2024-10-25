import { Component, css, CustomElement, html } from '@readymade/core';

@Component({
  selector: 'hello-world',
  style: css`
    :host {
      display: block;
    }
  `,
  template: html` <p>Hello World</p> `,
})
class HelloWorldComponent extends CustomElement {
  constructor() {
    super();
  }
}

export { HelloWorldComponent };
