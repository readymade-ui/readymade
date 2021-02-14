import { Component, css } from './../../../core';
import { TextAreaComponent } from './../../../dom';

@Component({
  selector: 'rd-textarea',
  custom: { extends: 'textarea' },
  style: css`
    :host {
      background-color: var(--color-bg);
      border: 2px solid var(--color-border);
      border-radius: 1em;
      color: var(--color-default);
      font: var(--font-family);
      outline: none;
      overflow: auto;
      max-width: 280px;
      padding: 1em;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-image: var(--icon-expand);
      background-position: bottom 0.5em right 0.5em;
      background-repeat: no-repeat;
    }
    :host:hover,
    :host:focus,
    :host:active {
      border: 2px solid var(--color-highlight);
      outline: none;
      box-shadow: none;
    }
  `
})
class RdTextArea extends TextAreaComponent {
  constructor() {
    super();
  }
}

export { RdTextArea };
