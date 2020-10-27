import {
  Component,
  css,
  CustomElement,
  html,
  State
} from './../../../modules/core';

export class LogoState {
  public heading: string = 'R';
  public heading2: string = 'readymade';
  public size: string = '';
  public sizes: string[] = ['is--small', 'is--medium', 'is--large'];
}

export const _logoState = new LogoState();

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
  `
})
class RLogoComponent extends CustomElement {
  public letters: string[];
  constructor() {
    super();
  }

  @State()
  public getState() {
    return _logoState;
  }

  static get observedAttributes() {
    return ['size'];
  }

  public attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'size':
        this.setSize(newValue);
        break;
    }
  }

  public setSize(size: string) {
    this.setState('size', size);
  }
  
}

export { RLogoComponent };
