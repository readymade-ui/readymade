import { Component, CustomElement, State } from './../../../modules/core';
import { render as renderHeadline } from './headline';

export class LogoState {
  public heading: string = 'R';
  public heading2: string = 'readymade';
  public size: string = '';
  public sizes: string[] = ['is--small', 'is--medium', 'is--large'];
}

export const _logoState = new LogoState();

const style = `
  :host {
    display: block;
    user-select: none;
    font-size: 16px;
    font-family: Source Sans Pro, sans-serif;
  }
`;

const template = `
<r-headline headline="{{heading}}" size="{{size}}"></r-headline>
<r-headline headline="{{heading2}}"></r-headline>
`;

@Component({
  selector: 'r-logo',
  style,
  template,
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

const render = ({ size, classes }: { size: string; classes?: string }) => `
  <r-logo class="${classes ? classes : ''}">
    <template shadowrootmode="open">
      <style>
      ${style}
      </style>
      ${renderHeadline({ size, copy: _logoState.heading })}
      ${renderHeadline({ size: 'is--default', copy: _logoState.heading2 })}
    </template>
  </r-logo>
`;

export { RLogoComponent, render };
