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
      min-width: 72px;
      border: 2px solid var(--color-border);
      background-color: var(--color-bg);
      border-radius: 14px;
      color: var(--color-default);
      padding: 1px 0px;
      cursor: pointer;
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
      background-color: var(--color-selected);
      border: 2px solid var(--color-highlight);
    }
    .left,
    .right {
      display: inline-block;
      transform: translateY(1px);
      width: 28px;
      height: 28px;
      border-radius: 14px;
    }
    .left.active,
    .right.active {
      background-color: var(--color-selected);
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
  connectedCallback() {
    this.setActive(false);
  }
  @Listen('click')
  onClick(active: boolean) {
    this.setActive(this.active === false ? true : false);
  }
  setActive(active: boolean) {
    this.active = active;
    this.updateView();
  }
  updateView() {
    if (this.active === true) {
      this.querySelector('.right').classList.add(ACTIVE_CLASS);
      this.querySelector('.left').classList.remove(ACTIVE_CLASS);
    }
    if (this.active === false) {
      this.querySelector('.right').classList.remove(ACTIVE_CLASS);
      this.querySelector('.left').classList.add(ACTIVE_CLASS);
    }
  }
}

export { RdSwitch };
