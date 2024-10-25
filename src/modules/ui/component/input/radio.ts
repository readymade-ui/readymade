import { Component, FormElement, html, css } from '@readymade/core';
import { RdControl } from '../control';

export interface RdRadioGroupAttributes {
  direction?: 'horizontal' | 'vertical';
  checked?: boolean;
  inputs?: Array<{ value: string; label: string }>;
}

@Component({
  selector: 'rd-radiogroup',
  style: css`
    :host {
      display: inline-block;
    }
    ::slotted(input[type='radio']) {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      margin: 0px 4px 0px 8px;
      transform: translateY(4px);
    }
    ::slotted(input[type='radio']):before {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      border: 2px solid var(--ready-color-border);
      border-radius: 50%;
      background: var(--ready-color-bg);
    }
    ::slotted(input[type='radio']:checked):before {
      background: radial-gradient(
        var(--ready-color-border) 0%,
        var(--ready-color-border) 50%,
        transparent 50%,
        transparent
      );
      border-color: var(--ready-color-highlight);
    }
    ::slotted(input[type='radio']:focus),
    ::slotted(input[type='radio']:active) {
      outline: 0px;
      outline-offset: 0px;
    }
    ::slotted(input[type='radio']:hover):before,
    ::slotted(input[type='radio']:focus):before,
    ::slotted(input[type='radio']:active):before {
      border: 2px solid var(--ready-color-highlight);
    }
    ::slotted(input[type='radio'][disabled]):before {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
    }
    ::slotted(input[type='radio'][disabled]:hover):before,
    ::slotted(input[type='radio'][disabled]:focus):before,
    ::slotted(input[type='radio'][disabled]:active):before {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    // this doesn't work in Safari
    ::slotted(label) {
      margin-top: 5px;
      margin-right: 8px;
    }
    .group {
      box-sizing: border-box:
      border: 2px solid transparent;
      padding: 12px;
      border-radius: 14px;
    }
    .group.required {
      border: 2px solid var(--ready-color-error);
    }
    .group.required ::slotted(input[type='radio']) {
     transform: translateX(-1px) translateY(3px);
    }
    .group.vertical {
      display: flex;
      flex-direction: column;
      padding-top: 24px;
      padding-right: 120px;
      padding-bottom: 0px;
      & ::slotted(input[type='radio']) {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        margin: 0px 0px 0px 8px;
        transform: translateY(-8px);
      }
      & ::slotted(label) {
        display: block;
        margin-top: 0px;
        margin-right: 0px;
        position: relative;
        left: 42px;
        top: -28px;
      }
      &.required {
        
      }
    }
  `,
  template: html` <div class="group"><slot></slot></div> `,
})
class RdRadioGroup extends FormElement {
  direction: 'horizontal' | 'vertical';
  channel: BroadcastChannel;
  control: RdControl<RdRadioGroupAttributes>;
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['direction', 'channel', 'control'];
  }

  attributeChangedCallback(name: string, old: string, next: string) {
    switch (name) {
      case 'direction':
        this.direction = next as 'horizontal' | 'vertical';
        if (this.direction === 'vertical') {
          this.shadowRoot?.querySelector('.group').classList.add('vertical');
        } else {
          this.shadowRoot?.querySelector('.group').classList.remove('vertical');
        }
        break;
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

  connectedCallback() {
    this.$elem.forEach((elem: HTMLInputElement) => {
      elem.onblur = () => {
        this.onValidate();
      };
      elem.onclick = (ev: MouseEvent) => {
        if (this.channel) {
          this.control.currentValue = (ev.target as HTMLInputElement).value;
          this.channel.postMessage(this.control);
        }
      };
    });
  }

  formDisabledCallback(disabled: boolean) {
    this.$elem.forEach((elem: HTMLInputElement) => (elem.disabled = disabled));
  }

  formResetCallback() {
    this.$elem.forEach((elem: HTMLInputElement) => (elem.checked = false));
    this.$internals.setFormValue('');
  }

  checkValidity() {
    return this.$internals.checkValidity();
  }

  onValidate() {
    if (
      this.hasAttribute('required') &&
      (!this.value || this.value.length <= 0)
    ) {
      this.$internals.setValidity({ customError: true }, 'required');
      this.$group.classList.add('required');
    } else {
      this.$internals.setValidity({});
      this.$group.classList.remove('required');
    }
  }

  get value(): string | undefined {
    const checked = this.$elem.filter(
      (elem: HTMLInputElement) => elem.checked,
    )[0];
    if (checked) {
      return (
        this.$elem.filter(
          (elem: HTMLInputElement) => elem.checked,
        )[0] as HTMLInputElement
      ).value;
    } else {
      return undefined;
    }
  }

  set value(value) {
    this.$elem.forEach((elem: HTMLInputElement) => {
      if (elem.value === value) {
        elem.checked = true;
      } else {
        elem.checked = false;
      }
    });
    if (this.control) {
      this.control.currentValue = value;
    }
  }

  get form() {
    return this.$internals.form;
  }

  get name() {
    return this.getAttribute('name');
  }

  get $group(): Element {
    return this.shadowRoot.querySelector('.group');
  }

  get $elem(): HTMLInputElement[] {
    return (
      this.shadowRoot
        .querySelector('slot')
        .assignedNodes() as HTMLInputElement[]
    ).filter(
      (elem: HTMLInputElement) =>
        elem.tagName === 'INPUT' && elem.type === 'radio',
    );
  }

  setChannel(name: string) {
    this.channel = new BroadcastChannel(name);
  }

  setControl(control: RdControl<RdRadioGroupAttributes>) {
    this.control = control;
    this.setAttribute('name', control.name);
    this.setAttribute('type', control.type);
    if (control.attributes.direction) {
      this.direction = control.attributes.direction;
      if (this.direction === 'vertical') {
        this.shadowRoot?.querySelector('.group').classList.add('vertical');
      } else {
        this.shadowRoot?.querySelector('.group').classList.remove('vertical');
      }
    }
    if (control.attributes.inputs) {
      this.innerHTML = '';
      for (let i = control.attributes.inputs.length - 1; i >= 0; i--) {
        const input = document.createElement('input');
        const label = document.createElement('label');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'control');
        input.setAttribute('value', control.attributes.inputs[i].value);
        label.setAttribute('for', control.attributes.inputs[i].value);
        label.textContent = control.attributes.inputs[i].label;
        this.appendChild(input);
        this.appendChild(label);
      }
      this.$elem.forEach((elem: HTMLInputElement) => {
        elem.onblur = () => {
          this.onValidate();
        };
        elem.onclick = (ev: MouseEvent) => {
          if (this.channel) {
            this.control.currentValue = (ev.target as HTMLInputElement).value;
            this.channel.postMessage(this.control);
          }
        };
      });
    }
    if (control.currentValue && typeof control.currentValue === 'string') {
      this.value = control.currentValue as string;
    }
  }
}

export { RdRadioGroup };
