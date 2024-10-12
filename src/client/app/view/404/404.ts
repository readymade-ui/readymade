import { Component, CustomElement } from '@readymade/core';
import template from './404.html?raw';
import style from './404.css?raw';

@Component({
  selector: 'app-notfound',
  style,
  template,
})
class NotFoundComponent extends CustomElement {
  constructor() {
    super();
  }
  public connectedCallback() {
    this.animateIn();
  }
  public animateIn() {
    if (!this.shadowRoot.querySelector) return;
    this.shadowRoot.querySelector('.app__icon').animate(
      [
        { opacity: '0', transform: 'translateZ(-1000px)' },
        { opacity: '1', transform: 'translateZ(0px)' },
      ],
      {
        duration: 2000,
        easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
        fill: 'forwards',
      },
    );
  }
}

const render = () => `
<app-notfound>
  <template shadowrootmode="open">
    <style>
    ${style}
    </style>
    ${template}
  </template>
</app-notfound>
`;

export { NotFoundComponent, render };
