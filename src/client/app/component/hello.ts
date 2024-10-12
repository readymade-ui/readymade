import { Component, CustomElement } from '@readymade/core';

@Component({
  selector: 'hello-world',
  template: ` <span>Hello World</span> `,
})
export class HelloComponent extends CustomElement {}
