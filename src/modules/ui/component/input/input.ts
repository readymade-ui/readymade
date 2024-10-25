import { Component, Emitter, FormElement, html, css } from '@readymade/core';
import { RdControl } from '../control';

export interface RdInputAttributes {
  value: string;
}

@Component({
  selector: 'rd-input',
  delegatesFocus: true,
  style: css`
    :host {
      display: inline-block;
      outline: none;
    }
    :host input {
      width: 100%;
      background-color: var(--ready-color-bg);
      border: 2px solid var(--ready-color-border);
      border-radius: 1em;
      color: var(--ready-color-default);
      font: var(--font-family);
      min-height: 2em;
      padding: 0em 1em;
    }
    :host input:hover,
    :host input:focus,
    :host input:active {
      border: 2px solid var(--ready-color-highlight);
      outline: none;
      box-shadow: none;
    }
    :host input[disabled] {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
    }
    :host input[disabled]:hover,
    :host input[disabled]:focus,
    :host input[disabled]:active {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    :host input.required,
    :host input.required:hover,
    :host input.required:focus,
    :host input.required:active {
      border: 2px solid var(--ready-color-error);
      outline: none;
      box-shadow: none;
    }
  `,
  template: html` <input type="text" /> `,
})
class RdInput extends FormElement {
  channel: BroadcastChannel;
  control: RdControl<RdInputAttributes>;
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['channel'];
  }

  attributeChangedCallback(name: string, old: string, next: string) {
    switch (name) {
      case 'channel':
        this.setChannel(next);
        break;
      case 'control':
        if (!next.startsWith('{{')) {
          this.setControl(JSON.parse(next));
        }
        break;
    }
  }

  @Emitter('change')
  connectedCallback() {
    this.$elem.onchange = (ev: Event) => {
      if (this.onchange) {
        this.onchange(ev);
      }
    };
    this.$elem.oninput = (ev: Event) => {
      this.emitter.emit(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: 'composed',
        }),
      );
      if (this.oninput) {
        this.oninput(ev);
      }
      if (this.channel) {
        this.control.currentValue = this.value;
        this.control.attributes.value = this.value;
        this.channel.postMessage(this.control);
      }
    };
    this.$elem.onblur = () => {
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

  onValidate() {
    if (this.hasAttribute('required') && this.value.length <= 0) {
      this.$internals.setValidity({ customError: true }, 'required');
      this.$elem.classList.add('required');
    } else {
      this.$internals.setValidity({});
      this.$elem.classList.remove('required');
    }
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

  get value(): string {
    return this.$elem.value;
  }

  set value(value) {
    this.$elem.value = value;
    if (this.control) {
      this.control.currentValue = value;
      this.control.attributes.value = value;
    }
  }

  get $elem(): HTMLInputElement | HTMLTextAreaElement {
    return this.shadowRoot.querySelector('input');
  }

  setChannel(name: string) {
    this.channel = new BroadcastChannel(name);
  }

  setControl(control: RdControl<RdInputAttributes>) {
    this.control = control;
    this.setAttribute('name', control.name);
    this.setAttribute('type', control.type);
    if (control.currentValue && typeof control.currentValue === 'string') {
      this.value = control.currentValue as string;
    }
  }
}

export { RdInput };
