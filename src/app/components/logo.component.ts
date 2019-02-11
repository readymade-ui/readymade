import { Component, css, html, CustomElement, StateChange } from './../../modules/core/index.js';

@Component({
  selector: 'r-logo',
  template: html`
    <r-headline headline="{{heading}}" size="{{size}}"></r-headline>
    <r-headline headline="{{heading2}}"></r-headline>
	`,
  style: css`
      :host {
        display: block;
      }
	`
})
class RLogoComponent extends CustomElement {
  public sizes: string[] = ['is--small', 'is--medium', 'is--large'];
  public state: {
    heading: string;
    heading2: string;
    size: string;
  }
  public letters : string[];
  constructor() {
    super();
    this.state.heading = 'R';
    this.state.heading2 = 'readymade';
    // window.requestAnimationFrame(this.update.bind(this));
  }

  static get observedAttributes() {
    return ['size'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'size':
        this.setSize(newValue);
        break;
    }
  }
  setSize(size: string) {
    if (this.sizes.includes(size)) {
      this.setState('size', size);
    }
  }
  update() {
    this.state.heading = Math.round(Math.random()*100).toString();
    this.state.heading2 =  Math.round(Math.random()*100).toString();
    //window.requestAnimationFrame(this.update.bind(this));
  }
}

customElements.define('r-logo', RLogoComponent);

export { RLogoComponent };
