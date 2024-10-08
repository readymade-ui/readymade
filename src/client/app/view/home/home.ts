import { CustomElement, Component } from './../../../../modules/core';
import template from './home.html?raw';
import style from './home.scss?raw';

@Component({
  selector: 'app-home',
  style,
  template,
})
class HomeComponent extends CustomElement {
  constructor() {
    super();
  }
}

const render = () => `
  <app-home>
    <template shadowroot="open">
      <style>
        ${style}
      </style>
      ${template}
    </template>
  </app-home>
`;

export { HomeComponent, render };
