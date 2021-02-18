import { Component, css, html } from './../../../core';
import { ButtonComponent } from './../../../dom';

@Component({
  selector: 'rd-button',
  custom: { extends: 'button' },
  style: css`
    :host {
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
    :host .icon {
      display: block;
      width: 22px;
      height: 22px;
    }
    :host.is--small {
      min-height: 18px;
      border-radius: 8px;
    }
    :host.is--small .icon {
      display: inline-block;
      width: 12px;
      height: 12px;
    }
    :host.is--medium {
      min-height: 32px;
      border-radius: 14px;
    }
    :host.is--medium .icon {
      display: inline-block;
      width: 22px;
      height: 22px;
    }
    :host.is--large {
      min-height: 44px;
      border-radius: 18px;
    }
    :host.is--large .icon {
      display: inline-block;
      width: 32px;
      height: 32px;
    }
    :host:hover {
      background-color: var(--color-bg);
      border: 2px solid var(--color-highlight);
    }
    :host:focus {
      outline: 0px;
      outline-offset: 0px;
      background-color: var(--color-bg);
      border: 2px solid var(--color-highlight);
    }
    :host:active {
      outline: 0px;
      outline-offset: 0px;
      background-color: var(--color-selected);
      border: 2px solid var(--color-highlight);
    }
  `,
  template: html`
    <span class="icon"></span>
  `
})
class RdButton extends ButtonComponent {
  constructor() {
    super();
  }
}

export { RdButton };
