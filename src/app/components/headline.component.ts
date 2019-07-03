import { Component, css, CustomElement, html, StateChange, State } from './../../modules/core/index.js';

export class HeadlineState {
  public copy: string | number;
  public copySize: string;
}

@Component({
  selector: 'r-headline',
  style: css`
    h1 {
      font-family: 'Major Mono Display', sans-serif;
      padding-left: 1.0em;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-margin-before: 0px;
      -webkit-margin-after: 0px;
    }
 	  h1, span {
      font-size: 1em;
      letter-spacing: -0.04em;
      margin-block-start: 0em;
      margin-block-end: 0em;
    }
    h1.is--small, span.is--small {
        font-size: 12px;
    }
    h1.is--medium, span.is--medium {
        font-size: 6em;
    }
    h1.is--large, span.is--large {
        font-size: 12em;
        padding-left: 0em;
    }
	`,
  template: html`
    <h1 class="{{copySize}}">{{copy}}</h1>
	`,
})
class RHeadlineComponent extends CustomElement {

  public hyperNode: any;

  constructor() {
    super();
  }

  @State()
  static get getState() {
    return new HeadlineState();
  }
  static get observedAttributes() {
    return ['headline', 'size'];
  }
  public attributeChangedCallback(name, oldValue, newValue) {

    switch (name) {
      case 'headline':
        this.setState('copy', newValue);
        break;
      case 'size':
        this.setState('copySize', newValue);
        break;
    }
  }
}

customElements.define('r-headline', RHeadlineComponent);

export { RHeadlineComponent };
