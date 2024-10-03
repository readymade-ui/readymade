import {
  Component,
  Emitter,
  Listen,
  EventDispatcher,
  FormElement,
  html,
  css
} from './../../../core';

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
    :host button .label {
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Standard syntax */
    }
    :host button .icon:not(.is--empty) {
      display: block;
      width: 22px;
      height: 22px;
    }
    :host button.is--small {
      min-height: 18px;
      border-radius: 8px;
    }
    :host button.is--small .icon:not(.is--empty) {
      display: inline-block;
      width: 12px;
      height: 12px;
    }
    :host button.is--medium {
      min-height: 32px;
      border-radius: 14px;
    }
    :host button.is--medium .icon:not(.is--empty) {
      display: inline-block;
      width: 22px;
      height: 22px;
    }
    :host button.is--large {
      min-height: 44px;
      border-radius: 18px;
    }
    :host button.is--large .icon:not(.is--empty) {
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
    :host button:active,
    :host button.active {
      outline: 0px;
      outline-offset: 0px;
      background-color: var(--color-selected);
      border: 2px solid var(--color-highlight);
    }
    :host button[disabled] {
      opacity: var(--opacity-disabled);
      background: var(--color-disabled);
      cursor: not-allowed;
    }
    :host button[disabled]:hover,
    :host button[disabled]:focus,
    :host button[disabled]:active,
    :host button[disabled].active {
      border: 2px solid var(--color-border);
      outline: none;
      box-shadow: none;
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
    return ['type', 'label', 'width', 'height'];
  }

  attributeChangedCallback(name: string, old: string, next: string) {
    switch (name) {
      case 'type':
        this.type = next;
        break;
      case 'value':
        this.value = next;
        break;
      case 'label':
        this.shadowRoot.querySelector('.label').innerText = next;
        break;
      case 'width':
        this.shadowRoot.querySelector('button').style.width = next;
        break;
      case 'height':
        this.shadowRoot.querySelector('button').style.height = next;
        break;
    }
  }

  formDisabledCallback(disabled: boolean) {
    this.$elem.disabled = disabled;
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('span').forEach(spanElem => {
      const slot = spanElem.querySelector('slot');
      if (slot && slot.assignedNodes().length === 0) {
        spanElem.classList.add('is--empty');
      }
    });
    if (this.type === 'submit') {
      this.$elem.onsubmit = (ev: Event) => {
        this.emitter.emit(
          new CustomEvent('submit', {
            bubbles: true,
            composed: true,
            detail: 'composed'
          })
        );
        if (this.onsubmit) {
          this.onsubmit(ev);
        }
      };
    }
  }

  @Listen('press')
  onPress(ev) {
    if (ev.detail?.modifier) {
      this.setAttribute('modifier', ev.detail?.modifier);
    }
    this.simulatePress(ev);
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

  get $elem(): HTMLButtonElement {
    return this.shadowRoot.querySelector('button');
  }

  simulatePress() {
    this.$elem.classList.add('active');
    this.$elem.click();
    setTimeout(() => {
      this.$elem.classList.remove('active');
      this.removeAttribute('modifier');
    }, 100);
  }
}

export { RdButton };
