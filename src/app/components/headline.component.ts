import { Component, css, html, CustomElement, StateChange } from './../../modules/core/index';

@Component({
  selector: 'r-headline',
  template: html`
    <h1 class="{{size}}">{{headline}}</h1>
	`,
  style: css`
 	  h1, span {
      font-size: 1em;
    }
    h1.is--small, span.is--small {
        font-size: 12px;
    }
    h1.is--medium, span.is--medium {
        font-size: 6em;
    }
    h1.is--large, span.is--large {
        font-size: 12em;
    }
	`
})
class RHeadlineComponent extends CustomElement {
  public state: {
    headline: string | number;
  }
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['headline', 'size'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'headline':
        this.setState('headline', this.getAttribute('headline'));
        break;
      case 'size':
        this.setState('size', this.getAttribute('size'));
        break;
    }
  }
}

customElements.define('r-headline', RHeadlineComponent);

export { RHeadlineComponent };
