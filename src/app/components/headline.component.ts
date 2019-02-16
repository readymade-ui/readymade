import { Component, css, html, CustomElement, StateChange } from './../../modules/core/index.js';

@Component({
  selector: 'r-headline',
  template: html`
    <h1 class="{{copySize}}">{{copy}}</h1>
	`,
  style: css`
    h1 {
      font-family: 'Major Mono Display', sans-serif;
      padding-left: 1.0em;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
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
	`
})
class RHeadlineComponent extends CustomElement {
  public state: {
    copy: string | number;
    copySize: string;
  }
  public hyperNode: any;

  constructor() {
    super();
    this.state.copy = '';
    this.state.copySize = '';
  }

  static get observedAttributes() {
    return ['headline', 'size'];
  }
  attributeChangedCallback(name, oldValue, newValue) {

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
