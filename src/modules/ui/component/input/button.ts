import { Component, FormElement, html, css } from './../../../core';

@Component({
  selector: 'rd-button',
  delegatesFocus: true,
  style: css`
    :host {
      display: inline-block;
      outline: none;
    }
    :host button {
      width: 72px;
      height: 36px;
      border: 2px solid var(--color-border);
      background-color: var(--color-bg);
      border-radius: 14px;
      color: var(--color-default);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    :host button .icon {
      display: block;
      width: 22px;
      height: 22px;
    }
    :host button.is--small {
      min-height: 18px;
      border-radius: 8px;
    }
    :host button.is--small .icon {
      display: inline-block;
      width: 12px;
      height: 12px;
    }
    :host button.is--medium {
      min-height: 32px;
      border-radius: 14px;
    }
    :host button.is--medium .icon {
      display: inline-block;
      width: 22px;
      height: 22px;
    }
    :host button.is--large {
      min-height: 44px;
      border-radius: 18px;
    }
    :host button.is--large .icon {
      display: inline-block;
      width: 32px;
      height: 32px;
    }
    :host button:hover {
      background-color: var(--color-bg);
      border: 2px solid var(--color-highlight);
    }
    :host button:focus {
      outline: 0px;
      outline-offset: 0px;
      background-color: var(--color-bg);
      border: 2px solid var(--color-highlight);
    }
    :host button:active {
      outline: 0px;
      outline-offset: 0px;
      background-color: var(--color-selected);
      border: 2px solid var(--color-highlight);
    }
  `,
  template: html`
    <button>
      <span class="icon"><slot name="icon"></slot></span>
      <span class="label"><slot name="label"></slot></span>
    </button>
  `
})
class RdButton extends FormElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(name: string, old: string, next: string) {
    switch (name) {
      case 'type':
        this.type = next;
        break;
      case 'value':
        this.value = next;
        break;
    }
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

  get type() {
    return this.$elem.type || 'button';
  }

  set type(value) {
    this.$elem.type = value;
  }

  get value() {
    return this.$elem.value;
  }

  set value(value) {
    this.$elem.value = value;
  }

  get $elem() {
    return this.shadowRoot.querySelector('button');
  }
}

export { RdButton };
