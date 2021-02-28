import {
  Component,
  Emitter,
  EventDispatcher,
  FormElement,
  html,
  css
} from './../../../core';

@Component({
  selector: 'rd-textarea',
  delegatesFocus: true,
  style: css`
    :host {
      display: inline-block;
      outline: none;
    }
    :host textarea {
      background-color: var(--color-bg);
      border: 2px solid var(--color-border);
      border-radius: 1em;
      color: var(--color-default);
      font: var(--font-family);
      outline: none;
      overflow: auto;
      padding: 1em;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-image: var(--icon-expand);
      background-position: bottom 0.5em right 0.5em;
      background-repeat: no-repeat;
    }
    :host textarea:hover,
    :host textarea:focus,
    :host textarea:active {
      border: 2px solid var(--color-highlight);
      outline: none;
      box-shadow: none;
    }
    textarea::-webkit-resizer {
      display: none;
    }
  `,
  template: html`
    <textarea></textarea>
  `
})
class RdTextArea extends FormElement {
  private emitter: EventDispatcher;
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

  get value(): boolean {
    return this.$elem.value;
  }

  set value(value) {
    this.$elem.value = value;
  }

  get $elem() {
    return this.shadowRoot.querySelector('textarea');
  }
}

export { RdTextArea };
