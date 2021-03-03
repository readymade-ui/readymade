import {
  Component,
  Emitter,
  EventDispatcher,
  FormElement,
  html,
  css
} from './../../../core';

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
    :host input[disabled] {
      opacity: var(--opacity-disabled);
      background: var(--color-disabled);
      cursor: not-allowed;
    }
    :host input[disabled]:hover,
    :host input[disabled]:focus,
    :host input[disabled]:active {
      border: 2px solid var(--color-border);
      outline: none;
      box-shadow: none;
    }
    :host input.required,
    :host input.required:hover,
    :host input.required:focus,
    :host input.required:active {
      border: 2px solid var(--color-error);
      outline: none;
      box-shadow: none;
    }
  `,
  template: html`
    <input type="text" />
  `
})
class RdInput extends FormElement {
  private emitter: EventDispatcher;
  public value: any;
  constructor() {
    super();
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
    this.$elem.oninput = (ev: Event) => {
      if (this.oninput) {
        this.oninput(ev);
      }
    };
    this.$elem.onblur = (ev: Event) => {
      this.onValidate();
    };
  }

  formDisabledCallback(disabled: boolean) {
    this.$elem.disabled = disabled;
  }

  formResetCallback() {
    this.value = '';
    this.$internals.setFormValue('');
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

  checkValidity() {
    return this.$internals.checkValidity();
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

  onValidate() {
    if (this.hasAttribute('required') && this.value.length <= 0) {
      this.$internals.setValidity({ customError: true }, 'required');
      this.$elem.classList.add('required');
    } else {
      this.$internals.setValidity({});
      this.$elem.classList.remove('required');
    }
  }
}

export { RdInput };
