import { Component, html, css } from './../../../core';

import { RdInput } from './input';

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
    :host textarea[disabled] {
      opacity: var(--opacity-disabled);
      background: var(--color-disabled);
      cursor: not-allowed;
    }
    :host textarea[disabled]:hover,
    :host textarea[disabled]:focus,
    :host textarea[disabled]:active {
      border: 2px solid var(--color-border);
      outline: none;
      box-shadow: none;
    }
    :host textarea.required,
    :host textarea.required:hover,
    :host textarea.required:focus,
    :host textarea.required:active {
      border: 2px solid var(--color-error);
      outline: none;
      box-shadow: none;
    }
    textarea::-webkit-resizer {
      display: none;
    }
  `,
  template: html` <textarea></textarea> `,
})
class RdTextArea extends RdInput {
  constructor() {
    super();
  }
  get $elem() {
    return this.shadowRoot.querySelector('textarea');
  }
}

export { RdTextArea };
