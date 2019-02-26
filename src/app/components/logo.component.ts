<<<<<<< HEAD
import { Component, css, html, CustomElement, StateChange } from '@readymade/core';

@Component({
  selector: 'r-logo',
  template: html`
    <r-unit headline="{{headline}}" size="{{size}}"></r-unit>
	`,
  style: css`

	`
=======
import { Component, css, CustomElement, html, StateChange } from './../../modules/core/index.js';

@Component({
  selector: 'r-logo',
  style: css`
      :host {
        display: block;
        user-select: none;
      }
	`,
  template: html`
    <r-headline headline="{{heading}}" size="{{size}}"></r-headline>
    <r-headline headline="{{heading2}}"></r-headline>
	`,
>>>>>>> dev
})
class RLogoComponent extends CustomElement {
  public sizes: string[] = ['is--small', 'is--medium', 'is--large'];
  public state: {
<<<<<<< HEAD
    headline: string;
  }
  constructor() {
    super();
    this.state.headline = 'R';
=======
    heading: string;
    heading2: string;
    size: string;
  };
  public letters: string[];
  constructor() {
    super();
    this.state.heading = 'R';
    this.state.heading2 = 'readymade';
    // setInterval(this.update.bind(this), 4000);
>>>>>>> dev
  }

  static get observedAttributes() {
    return ['size'];
  }

<<<<<<< HEAD
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'size':
        this.setSize(this.getAttribute('size'));
        break;
    }
  }
  setSize(size: string) {
=======
  public attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'size':
        this.setSize(newValue);
        break;
    }
  }
  public setSize(size: string) {
>>>>>>> dev
    if (this.sizes.includes(size)) {
      this.setState('size', size);
    }
  }
<<<<<<< HEAD
=======
  public update() {
    this.state.heading = Math.round(Math.random() * 100).toString();
    this.state.heading2 = Math.round(Math.random() * 100).toString();
  }
>>>>>>> dev
}

customElements.define('r-logo', RLogoComponent);

export { RLogoComponent };
