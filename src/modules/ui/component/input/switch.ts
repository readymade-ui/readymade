import { Component, css, html, Listen } from './../../../core';
import { ButtonComponent } from './../../../dom';

const ACTIVE_CLASS: string = 'active';

@Component({
  selector: 'rd-switch',
  custom: { extends: 'button' },
  style: css`
    :host {
      width: 100%;
      min-height: 36px;
      min-width: 88px;
      border: 2px solid var(--color-border);
      background-color: var(--color-bg);
      border-radius: 14px;
      color: var(--color-default);
      cursor: pointer;
      display: flex;
      align-items: stretch;
    }
    :host {
      width: 22px;
      height: 22px;
    }
    :host.is--small {
      min-height: 18px;
      border-radius: 8px;
    }
    :host.is--small {
      display: inline-block;
      width: 12px;
      height: 12px;
    }
    :host.is--medium {
      min-height: 32px;
      border-radius: 14px;
    }
    :host.is--medium {
      display: inline-block;
      width: 22px;
      height: 22px;
    }
    :host.is--large {
      min-height: 44px;
      border-radius: 18px;
    }
    :host.is--large {
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
      background-color: var(--color-highlight);
      border: 2px solid var(--color-highlight);
    }
    .left,
    .right {
      display: block;
      width: calc(50% - 4px);
      height: 100%;
      border-radius: 50%;
    }
    .left.active,
    .right.active {
      background-color: var(--color-highlight);
    }
  `,
  template: html`
    <span class="left"></span>
    <span class="right"></span>
  `
})
class RdSwitch extends ButtonComponent {
  active: boolean = false;
  constructor() {
    super();
  }
  connectedCallback() {}
  @Listen('click')
  setStatus() {
    this.active = this.active === false ? true : false;
    if (this.active === true) {
      this.querySelector('.left').classList.add(ACTIVE_CLASS);
      this.querySelector('.right').classList.remove(ACTIVE_CLASS);
    }
    if (this.active === false) {
      this.querySelector('.left').classList.remove(ACTIVE_CLASS);
      this.querySelector('.right').classList.add(ACTIVE_CLASS);
    }
  }
}

export { RdSwitch };
