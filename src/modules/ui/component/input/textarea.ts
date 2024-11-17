import { Component, html, css } from '@readymade/core';
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
      background-color: var(--ready-color-bg);
      border: var(--ready-border-width) solid var(--ready-color-border);
      border-radius: var(--ready-border-radius);
      color: var(--ready-color-default);
      font: var(--font-family);
      outline: none;
      overflow: auto;
      padding: 1em;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-image: var(--ready-icon-expand);
      background-position: bottom 0.5em right 0.5em;
      background-repeat: no-repeat;
    }
    :host textarea:hover,
    :host textarea:focus,
    :host textarea:active {
      border: var(--ready-border-width) solid var(--ready-color-highlight);
      outline: none;
      box-shadow: none;
    }
    :host textarea[disabled] {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
    }
    :host textarea[disabled]:hover,
    :host textarea[disabled]:focus,
    :host textarea[disabled]:active {
      border: var(--ready-border-width) solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    :host textarea.required,
    :host textarea.required:hover,
    :host textarea.required:focus,
    :host textarea.required:active {
      border: var(--ready-border-width) solid var(--ready-color-error);
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
