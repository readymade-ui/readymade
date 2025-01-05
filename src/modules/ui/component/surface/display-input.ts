import { Component, html, css } from '@readymade/core';
import { RdControl } from '../control';
import { RdInput, RdInputAttributes } from '../input/input';

@Component({
  selector: 'rd-displayinput',
  delegatesFocus: true,
  style: css`
    :host {
      display: inline-block;
      outline: none;
      padding: 0;
    }
    :host input {
      height: 16px;
      width: 36px;
      background-color: var(--ready-color-bg);
      border: var(--ready-border-width) solid var(--ready-color-border);
      border-radius: var(--ready-border-radius);
      color: var(--ready-color-default);
      font: var(--font-family);
      min-height: 2em;
      padding: 0em 1em;
    }
    :host input:hover,
    :host input:focus,
    :host input:active {
      border: var(--ready-border-width) solid var(--ready-color-highlight);
      outline: none;
      box-shadow: none;
    }
    :host input[disabled] {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
    }
    :host input[disabled]:hover,
    :host input[disabled]:focus,
    :host input[disabled]:active {
      border: var(--ready-border-width) solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    :host input.required,
    :host input.required:hover,
    :host input.required:focus,
    :host input.required:active {
      border: var(--ready-border-width) solid var(--ready-color-error);
      outline: none;
      box-shadow: none;
    }
  `,
  template: html` <input type="text" /> `,
})
class RdDisplayInput extends RdInput {
  channel: BroadcastChannel;
  control: RdControl<RdInputAttributes>;
  constructor() {
    super();
  }
}

export { RdDisplayInput };
