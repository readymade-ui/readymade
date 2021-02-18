import { Component, css, html, Listen } from './../../../core';
import { InputComponent } from './../../../dom';

@Component({
  selector: 'rd-switch',
  custom: { extends: 'input' },
  style: css`
    :host {
      display: flex;
      width: 72px;
      height: 36px;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
    :host:before {
      content: '';
      width: 100%;
      border: 2px solid var(--color-border);
      background-color: var(--color-bg);
      border-radius: 1em;
      color: var(--color-default);
      padding: 1px 0px;
      background-image: var(--icon-switch);
      background-size: 22px 22px;
      background-repeat: no-repeat;
      background-position: left 2px top 50%;
    }
    :host:checked:before {
      background-image: var(--icon-switch);
      background-size: 22px 22px;
      background-repeat: no-repeat;
      background-position: right 2px top 50%;
    }
    :host:hover:before,
    :host:focus:before,
    :host:active:before {
      border: 2px solid var(--color-highlight);
    }
    :host:active {
      outline: 0px;
      outline-offset: 0px;
    }
    :host:active:before {
      background-color: var(--color-selected);
      border: 2px solid var(--color-highlight);
    }
  `
})
class RdSwitch extends InputComponent {
  constructor() {
    super();
  }
}

export { RdSwitch };
