import { Component, CustomElement, css, html } from './../../../modules/core';

@Component({
  selector: 'r-meter',
  style: css`
    :host {
      display: block;
      width: 100%;
      margin-bottom: 4px;
    }
    label {
      display: block;
      font-size: 1em;
      margin-bottom: 4px;
    }
    .label {
      margin-right: 4px;
      opacity: 0.8;
      font-weight: 500;
    }
    .meter {
      display: block;
      width: 100%;
      height: 20px;
      overflow: hidden;
    }
    .progress {
      display: inline-block;
      width: 0%;
      height: 100%;
      border-radius: 4px;
      transition: width 2s ease-out;
    }
  `,
  template: html`
    <label><span class="label"></span><span class="value"></span></label>
    <div class="meter">
      <div class="progress"></div>
    </div>
  `,
})
class RMeterComponent extends CustomElement {
  min: number;
  max: number;
  value: number;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['label', 'max', 'value', 'color'];
  }

  public attributeChangedCallback(name, old, next) {
    switch (name) {
      case 'label':
        this.setLabel(next);
        break;
      case 'max':
        this.max = parseFloat(next);
        this.setValue();
        break;
      case 'value':
        this.value = parseFloat(next);
        this.setValue();
        break;
      case 'color':
        this.setColor(next);
        break;
    }
  }

  canSet() {
    if (this.max === undefined || this.value === undefined) {
      return false;
    }
    return true;
  }

  setValue() {
    if (this.canSet()) {
      (
        (<unknown>this.shadowRoot.querySelector('.progress')) as HTMLElement
      ).style.width = `${(this.value / this.max) * 100}%`;
      (
        (<unknown>this.shadowRoot.querySelector('.value')) as HTMLElement
      ).innerText = `${this.value}Kb`;
    }
  }

  setLabel(val: string) {
    (
      (<unknown>this.shadowRoot.querySelector('.label')) as HTMLElement
    ).innerText = val;
  }

  setColor(val: string) {
    (
      (<unknown>this.shadowRoot.querySelector('.progress')) as HTMLElement
    ).style.background = val;
  }
}

export { RMeterComponent };
