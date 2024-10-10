import { Component, FormElement, html, css } from '@readymade/core';

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
  `,
  template: html` <div class="group"><slot></slot></div> `,
})
class RdRadioGroup extends FormElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.$elem.forEach((elem: HTMLInputElement) => {
      elem.onblur = () => {
        this.onValidate();
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
}

export { RdRadioGroup };
