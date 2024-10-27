import { Component, Emitter, FormElement, css, html } from '@readymade/core';
import { RdControl } from '../control';

export interface RdDropdownAttributes {
  options?: Array<string>;
}

@Component({
  selector: 'rd-dropdown',
  delegatesFocus: true,
  style: css`
    :host {
      display: inline-block;
      outline: none;
    }
    ::slotted(select) {
      display: block;
      width: 100%;
      background-color: var(--ready-color-bg);
      border: var(--ready-border-width) solid var(--ready-color-border);
      border-radius: var(--ready-border-radius);
      color: var(--ready-color-default);
      font: var(--font-family);
      line-height: 1.3;
      padding: 0.3em 1.6em 0.3em 0.8em;
      height: 36px;
      box-sizing: border-box;
      margin: 0;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-image: var(--ready-icon-menu);
      background-repeat: no-repeat;
      background-position:
        right 0.7em top 50%,
        0 0;
      background-size: 10px 9px;
    }
    ::slotted(select:hover),
    ::slotted(select:focus),
    ::slotted(select:active) {
      border: var(--ready-border-width) solid var(--ready-color-highlight);
      outline: none;
      box-shadow: none;
    }
    *[dir='rtl'] ::slotted(select),
    :root:lang(ar) ::slotted(select),
    :root:lang(iw) ::slotted(select) {
      background-position:
        left 0.7em top 50%,
        0 0;
      padding: 0.3em 0.8em 0.3em 1.4em;
    }
    ::slotted(select::-ms-expand) {
      display: none;
    }
    ::slotted(select[disabled]) {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      background-image: var(--ready-icon-menu);
      background-repeat: no-repeat;
      background-position:
        right 0.7em top 50%,
        0 0;
      background-size: 10px 9px;
      cursor: not-allowed;
    }
    ::slotted(select[disabled]:hover),
    ::slotted(select[disabled]:focus),
    ::slotted(select[disabled]:active) {
      border: var(--ready-border-width) solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    ::slotted(select.required),
    ::slotted(select.required:hover),
    ::slotted(select.required:focus),
    ::slotted(select.required:active) {
      border: var(--ready-border-width) solid var(--ready-color-error);
      outline: none;
      box-shadow: none;
    }
  `,
  template: html` <slot></slot> `,
})
class RdDropdown extends FormElement {
  channel: BroadcastChannel;
  control: RdControl<RdDropdownAttributes>;
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

  @Emitter('select')
  connectedCallback() {
    this.$elem.oninput = (ev: Event) => {
      this.emitter.emit(
        new CustomEvent('select', {
          bubbles: true,
          composed: true,
          detail: 'composed',
        }),
      );
      if (this.onselect) {
        this.onselect(ev);
      }
      if (this.oninput) {
        this.oninput(ev);
      }
      if (this.channel) {
        this.control.currentValue = (ev.target as HTMLSelectElement).value;
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
    this.$elem.selectedIndex = -1;
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
    }
  }

  get $elem(): HTMLSelectElement {
    return (
      this.shadowRoot
        .querySelector('slot')
        .assignedNodes() as HTMLSelectElement[]
    ).filter((elem) => elem.tagName === 'SELECT')[0];
  }

  setChannel(name: string) {
    this.channel = new BroadcastChannel(name);
  }

  setControl(control: RdControl<RdDropdownAttributes>) {
    this.control = control;
    this.setAttribute('name', control.name);
    this.setAttribute('type', control.type);
    if (control.attributes.options) {
      this.innerHTML = '';
      const select = document.createElement('select');
      for (let i = 0; i <= control.attributes.options.length; i++) {
        const option = document.createElement('option');
        option.textContent = control.attributes.options[i];
        select.appendChild(option);
      }
      this.appendChild(select);
    }
    if (control.currentValue && typeof control.currentValue === 'string') {
      this.value = control.currentValue as string;
    }
  }
}

export { RdDropdown };
