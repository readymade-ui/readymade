import { Component, css, html, PseudoElement, StateChange } from '../../modules/core/index';

@Component({
  selector: 'r-logo',
  template: html`
    <r-template>
      <h1>{{headline}}</h1>
    </r-template>
	`,
  style: css`
	  h1 {
      font-size: 1em;
    }
    h1.is--small {
        font-size: 12px;
    }
    h1.is--medium {
        font-size: 6em;
    }
    h1.is--large {
        font-size: 12em;
    }
	`
})
class RLogoComponent extends PseudoElement {
  public sizes: string[] = ['is--small', 'is--medium', 'is--large'];
  public state: {
    headline: string | number;
  }
  constructor() {
    super();
    //this.state.headline = 'R';
    this.state.headline = Math.floor(Math.random()*100)
    setInterval(()=>{ this.state.headline = Math.floor(Math.random()*100) },1000);
  }
  static get observedAttributes() {
    return ['size'];
  }
  onStateChange(change: StateChange) {
    // console.log(change);
    // this.setSize(this.getAttribute('size'));
  }
  setRandomNumber() {
    this.state.headline = 'R';
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'size':
        this.setSize(this.getAttribute('size'));
        break;
    }
  }
  setSize(size: string) {
    if (this.sizes.indexOf(size) > -1) {
      for (const item in this.sizes) {
         this.querySelector('h1').classList.remove(this.sizes[item]);
      }
      this.querySelector('h1').classList.add(size);
    }
  }
}

customElements.define('r-logo', RLogoComponent);

export { RLogoComponent };
