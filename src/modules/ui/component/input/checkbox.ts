import {
  Component,
  Emitter,
  EventDispatcher,
  FormElement,
  html,
  css
} from './../../../core';

@Component({
  selector: 'rd-checkbox',
  delegatesFocus: true,
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
class RdCheckBox extends FormElement {
  private emitter: EventDispatcher;
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['checked'];
  }

  attributeChangedCallback(name: string, old: string, next: string) {
    switch (name) {
      case 'checked':
        this.checked = next === 'true' || next === '' ? true : false;
        break;
    }
  }

  @Emitter('change')
  connectedCallback() {
    this.$elem.onchange = (ev: Event) => {
      this.emitter.emit(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: 'composed'
        })
      );
      if (this.onchange) {
        this.onchange(ev);
      }
    };
  }

  get type() {
    return 'checkbox';
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

  get checked(): boolean {
    return this.$elem.checked;
  }

  set checked(value) {
    this.$elem.checked = value;
  }

  get $elem() {
    return this.shadowRoot.querySelector('input');
  }
}

export { RdCheckBox };
