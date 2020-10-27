import { Component, CustomElement } from './../../../modules/core';

@Component({
  selector: 'hello-world',
  template: `
    <span>Hello World</span>
  `,
})
export class HelloComponent extends CustomElement {}
