import { Component, Listen, FormElement, html, css } from '@readymade/core';

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
      border: 2px solid var(--ready-color-border);
      background-color: var(--ready-color-bg);
      border-radius: 14px;
      color: var(--ready-color-default);
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
      background-color: var(--ready-color-bg);
      border: 2px solid var(--ready-color-highlight);
    }
    :host button:focus {
      outline: 0px;
      outline-offset: 0px;
      background-color: var(--ready-color-bg);
      border: 2px solid var(--ready-color-highlight);
    }
    :host button:active,
    :host button.active {
      outline: 0px;
      outline-offset: 0px;
      background-color: var(--ready-color-selected);
      border: 2px solid var(--ready-color-highlight);
    }
    :host button[disabled] {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
    }
    :host button[disabled]:hover,
    :host button[disabled]:focus,
    :host button[disabled]:active,
    :host button[disabled].active {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
  `,
  template: html`
    <button>
      <span class="icon"><slot name="icon"></slot></span>
      <span class="label"><slot name="label"></slot></span>
    </button>
  `,
})
class RdButton extends FormElement {
  channel: BroadcastChannel;
  _type: 'submit' | 'reset' | 'button' = 'button';
  constructor() {
    super();
    this.type = 'button';
  }

  static get observedAttributes() {
    return ['type', 'label', 'width', 'height', 'channel'];
  }

  attributeChangedCallback(name: string, old: string, next: string) {
    switch (name) {
      case 'type':
        this._type = next as 'submit' | 'reset' | 'button';
        this.type = next as 'submit' | 'reset' | 'button';
        break;
      case 'value':
        this.value = next;
        break;
      case 'label':
        (this.shadowRoot.querySelector('.label') as HTMLSpanElement).innerText =
          next;
        break;
      case 'width':
        this.shadowRoot.querySelector('button').style.width = next;
        break;
      case 'height':
        this.shadowRoot.querySelector('button').style.height = next;
        break;
      case 'channel':
        this.setChannel(next);
        break;
    }
  }

  formDisabledCallback(disabled: boolean) {
    this.$elem.disabled = disabled;
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('span').forEach((spanElem) => {
      const slot = spanElem.querySelector('slot');
      if (slot && slot.assignedNodes().length === 0) {
        spanElem.classList.add('is--empty');
      }
    });
    this.$elem.onclick = () => {
      if (this.channel) {
        this.channel.postMessage({
          type: this.type,
          name: this.name,
          value: this.value.length ? this.value : 'bang',
        });
      }
    };
    if (this.type === 'submit') {
      this.$elem.onsubmit = (ev: Event) => {
        this.emitter.emit(
          new CustomEvent('submit', {
            bubbles: true,
            composed: true,
            detail: 'composed',
          }),
        );
        if (this.onsubmit) {
          this.onsubmit(ev as SubmitEvent);
        }
      };
    }
  }

  @Listen('press')
  onPress(ev: CustomEvent) {
    if (ev.detail?.modifier) {
      this.setAttribute('modifier', ev.detail?.modifier);
    }
    this.simulatePress();
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
    return this.$elem.type || this._type;
  }

  set type(value: 'submit' | 'reset' | 'button') {
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

  setChannel(name: string) {
    this.channel = new BroadcastChannel(name);
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
