import {
  Component,
  CustomElement,
  Emitter,
  FormElement,
  css,
  html
} from './../../../core';

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
      background-color: var(--color-bg);
      border: 2px solid var(--color-border);
      border-radius: 1em;
      color: var(--color-default);
      font: var(--font-family);
      line-height: 1.3;
      padding: 0.3em 1.6em 0.3em 0.8em;
      height: 36px;
      box-sizing: border-box;
      margin: 0;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-image: var(--icon-menu);
      background-repeat: no-repeat;
      background-position: right 0.7em top 50%, 0 0;
      background-size: 10px 9px;
    }
    ::slotted(select:hover),
    ::slotted(select:focus),
    ::slotted(select:active) {
      border: 2px solid var(--color-highlight);
      outline: none;
      box-shadow: none;
    }
    *[dir='rtl'] ::slotted(select),
    :root:lang(ar) ::slotted(select),
    :root:lang(iw) ::slotted(select) {
      background-position: left 0.7em top 50%, 0 0;
      padding: 0.3em 0.8em 0.3em 1.4em;
    }
    ::slotted(select::-ms-expand) {
      display: none;
    }
    ::slotted(select[disabled]) {
      opacity: var(--opacity-disabled);
      background: var(--color-disabled);
      background-image: var(--icon-menu);
      background-repeat: no-repeat;
      background-position: right 0.7em top 50%, 0 0;
      background-size: 10px 9px;
      cursor: not-allowed;
    }
    ::slotted(select[disabled]:hover),
    ::slotted(select[disabled]:focus),
    ::slotted(select[disabled]:active) {
      border: 2px solid var(--color-border);
      outline: none;
      box-shadow: none;
    }
    ::slotted(select.required),
    ::slotted(select.required:hover),
    ::slotted(select.required:focus),
    ::slotted(select.required:active) {
      border: 2px solid var(--color-error);
      outline: none;
      box-shadow: none;
    }
  `,
  template: html`
    <slot></slot>
  `
})
class RdDropdown extends FormElement {
  constructor() {
    super();
  }

  @Emitter('select')
  connectedCallback() {
    this.$elem.onselect = (ev: Event) => {
      this.emitter.emit(
        new CustomEvent('select', {
          bubbles: true,
          composed: true,
          detail: 'composed'
        })
      );
      if (this.onselect) {
        this.onselect(ev);
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
  }

  get $elem(): HTMLSelectElement {
    return (this.shadowRoot
      .querySelector('slot')
      .assignedNodes() as HTMLSelectElement[]).filter(
      elem => elem.tagName === 'SELECT'
    )[0];
  }
}

export { RdDropdown };
