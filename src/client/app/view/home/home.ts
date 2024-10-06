import { CustomElement, Component } from './../../../../modules/core';
import style from './home.scss?raw';
import html from './home.html?raw';

@Component({
  selector: 'app-home',
  style: style,
  template: html
})
class HomeComponent extends CustomElement {
  constructor() {
    super();
  }
}

const template = () => `
<app-home>
  <template shadowroot="open">
  <style>
  ${style}
  </style>
  ${html}
  </template>
</app-home>
`;

export { HomeComponent, template };
