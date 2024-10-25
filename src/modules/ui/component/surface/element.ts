import { Component, html, css } from '@readymade/core';
import { RdControlSurfaceElement } from '../control';
import { BlockComponent } from '@readymade/dom';

@Component({
  selector: 'rd-element',
  style: css`
    :host {
      display: flex;
      flex-direction: column;
    }
    .surface-label {
      margin-bottom: 1em;
    }
  `,
  // template: html`<slot></slot>`,
  custom: { extends: 'div' },
})
class RdSurfaceElement extends BlockComponent {
  constructor() {
    super();
  }

  setControlSurface(surface: RdControlSurfaceElement<any>) {
    if (!surface) {
      return;
    }
    if (surface.classes) {
      this.setAttribute('class', '');
      surface.classes.forEach((className) => this.classList.add(className));
    }

    if (surface.style) {
      for (let styleName in surface.style) {
        if (surface.style.hasOwnProperty(styleName)) {
          this.style[styleName] = surface.style[styleName];
        }
      }
    }

    const element = document.createElement(surface.selector);
    const label = document.createElement('label');
    label.classList.add('surface-label');
    label.textContent = surface.label;

    this.appendChild(label);
    this.appendChild(element);

    (element as any).setControl(surface.control);

    if (surface.channel) {
      (element as any).setChannel(surface.channel);
    }
  }
}

export { RdSurfaceElement };
