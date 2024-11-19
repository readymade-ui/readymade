import { Component, StructuralElement, html, css } from '@readymade/core';
import { RdControlSurface } from '../control';
import { RdSurfaceElement } from './element';
@Component({
  selector: 'rd-surface',
  style: css``,
  template: html``,
})
class RdSurface extends StructuralElement {
  constructor() {
    super();
  }

  setStyle(surface: Partial<RdControlSurface>) {
    if (!surface) {
      return;
    }
    if (surface.classes) {
      this.setAttribute('class', '');
      surface.classes.forEach((className) => this.classList.add(className));
    }

    if (surface.style) {
      for (const styleName in surface.style) {
        if (surface.style.hasOwnProperty(styleName)) {
          this.style[styleName] = surface.style[styleName];
        }
      }
    }
  }

  setControlSurface(surface: Partial<RdControlSurface>) {
    if (!surface) {
      return;
    }

    this.setStyle(surface);

    for (let i = 0; i <= surface.controls.length; i++) {
      const element = (<unknown>(
        document.createElement('div', { is: 'rd-element' })
      )) as RdSurfaceElement;

      element.setAttribute('is', 'rd-element');
      element.setControlSurface(surface.controls[i]);
      this.appendChild(element);
    }
  }
}

export { RdSurface };
