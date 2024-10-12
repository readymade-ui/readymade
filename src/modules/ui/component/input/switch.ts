import { Component, html, css } from '@readymade/core';

import { RdCheckBox } from './checkbox';

@Component({
  selector: 'rd-switch',
  delegatesFocus: true,
  style: css`
    :host {
      display: inline-block;
      width: 72px;
      height: 36px;
      outline: none;
    }
    :host input[type='checkbox'] {
      display: flex;
      width: 72px;
      height: 36px;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
    :host input[type='checkbox']:before {
      content: '';
      width: 100%;
      border: 2px solid var(--ready-color-border);
      background-color: var(--ready-color-bg);
      border-radius: 1em;
      color: var(--ready-color-default);
      padding: 1px 0px;
      background-image: var(--ready-icon-switch);
      background-size: 22px 22px;
      background-repeat: no-repeat;
      background-position: left 2px top 50%;
    }
    :host input[type='checkbox']:checked:before {
      background-image: var(--ready-icon-switch);
      background-size: 22px 22px;
      background-repeat: no-repeat;
      background-position: right 2px top 50%;
    }
    :host input[type='checkbox']:hover:before,
    :host input[type='checkbox']:focus:before,
    :host input[type='checkbox']:active:before {
      border: 2px solid var(--ready-color-highlight);
    }
    :host input[type='checkbox']:focus,
    :host input[type='checkbox']:active {
      outline: 0px;
      outline-offset: 0px;
    }
    :host input[type='checkbox']:active:before {
      background-color: var(--ready-color-selected);
      border: 2px solid var(--ready-color-highlight);
    }
    :host input[type='checkbox'][disabled]:before {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      background-image: var(--ready-icon-switch);
      background-size: 22px 22px;
      background-repeat: no-repeat;
      background-position: left 2px top 50%;
      cursor: not-allowed;
    }
    :host input[type='checkbox'][disabled]:checked:before {
      background-image: var(--ready-icon-switch);
      background-size: 22px 22px;
      background-repeat: no-repeat;
      background-position: right 2px top 50%;
    }
    :host input[type='checkbox'][disabled]:hover:before,
    :host input[type='checkbox'][disabled]:focus:before,
    :host input[type='checkbox'][disabled]:active:before {
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    :host input[type='checkbox'].required:before,
    :host input[type='checkbox'].required:hover:before,
    :host input[type='checkbox'].required:focus:before,
    :host input[type='checkbox'].required:active:before {
      border: 2px solid var(--ready-color-error);
      outline: none;
      box-shadow: none;
    }
  `,
  template: html` <input type="checkbox" /> `,
})
class RdSwitch extends RdCheckBox {
  constructor() {
    super();
  }
}

export { RdSwitch };
