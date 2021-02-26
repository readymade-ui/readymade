import { Component, html, css, FormElement } from './../../../core';
import { InputComponent } from './../../../dom';

@Component({
  selector: 'rd-checkbox',
  custom: { extends: 'input' },
  style: css`
    :host {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
    }
    :host:before {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      border: 2px solid var(--color-border);
      border-radius: 6px;
      background: var(--color-bg);
    }
    :host:checked:before {
      background-image: var(--icon-check);
      background-repeat: no-repeat;
      background-position: center;
    }
    :host:focus,
    :host:active {
      outline: 0px;
      outline-offset: 0px;
    }
    :host:hover:before,
    :host:focus:before,
    :host:active:before {
      border: 2px solid var(--color-highlight);
    }
  `
})
class RdCheckBox extends InputComponent {
  constructor() {
    super();
  }
}

@Component({
  delegatesFocus: true,
  selector: 'rd-formcheckbox',
  style: css`
    :host {
      display: inline-block;
      width: 28px;
      height: 28px;
      outline: none;
    }
    :host input[type='checkbox'] {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
    :host input[type='checkbox']:before {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      border: 2px solid var(--color-border);
      border-radius: 6px;
      background: var(--color-bg);
    }
    :host input[type='checkbox']:checked:before {
      background-image: var(--icon-check);
      background-repeat: no-repeat;
      background-position: center;
    }
    :host input[type='checkbox']:focus,
    :host input[type='checkbox']:active {
      outline: 0px;
      outline-offset: 0px;
    }
    :host input[type='checkbox']:hover:before,
    :host input[type='checkbox']:focus:before,
    :host input[type='checkbox']:active:before {
      border: 2px solid var(--color-highlight);
    }
  `,
  template: html`
    <input type="checkbox" />
  `
})
class RdFormCheckBox extends FormElement {
  constructor() {
    super();
  }

  get form() {
    return this._internals.form;
  }

  get name() {
    return this.getAttribute('name');
  }

  get type() {
    return 'checkbox';
  }

  get validity() {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage;
  }

  get willValidate() {
    return this._internals.willValidate;
  }

  get checked() {
    return this._inputElement.checked;
  }

  set checked(value) {
    this._inputElement.checked = value;
  }

  get _inputElement() {
    return this.shadowRoot.querySelector('input');
  }
}
export { RdCheckBox, RdFormCheckBox };
