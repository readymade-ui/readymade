import { Component, Emitter, FormElement, html, css } from './../../../core';

@Component({
  selector: 'rd-input',
  delegatesFocus: true,
  style: css`
    :host {
      display: inline-block;
      outline: none;
    }
    :host input {
      background-color: var(--color-bg);
      border: 2px solid var(--color-border);
      border-radius: 1em;
      color: var(--color-default);
      font: var(--font-family);
      max-width: 280px;
      min-height: 2em;
      padding: 0em 1em;
    }
    :host input:hover,
    :host input:focus,
    :host input:active {
      border: 2px solid var(--color-highlight);
      outline: none;
      box-shadow: none;
    }
  `,
  template: html`
    <input type="text" />
  `
})
class RdInput extends FormElement {
  constructor() {
    super();
  }

  @Emitter('change')
  connectedCallback() {
    this.$elem.onchange = (ev: Event) => {
      if (this.onchange) {
        this.onchange(ev);
      }
    };
  }

  get type() {
    return 'text';
  }

  get form() {
    return this.$internals.form;
  }

  get name() {
    return this.getAttribute('name');
  }

  get validity() {
    return this.$internals.validity;
  }

  get validationMessage() {
    return this.$internals.validationMessage;
  }

  get willValidate() {
    return this.$internals.willValidate;
  }

  get value(): boolean {
    return this.$elem.value;
  }

  set value(value) {
    this.$elem.value = value;
  }

  get $elem() {
    return this.shadowRoot.querySelector('input');
  }
}

export { RdInput };
