import { Component, css, html, CustomElement } from '@readymade/core';

@Component({
  selector: 'rd-button',
  style: css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: left;
    }
    .title {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      transform: translateY(-4px);
      user-select: none;
    }
    .title .control__name {
      color: var(--color-default);
      font-size: 12px;
      font-weight: 700;
    }
    .title.is--small .control__name {
      font-size: 10px;
    }
    .title .slave__indicator {
      width: 8px;
      height: 8px;
      border-radius: 50% 50%;
      background: var(--color-bg);
      transform: translateX(4px) translateY(3px);
      display: none;
    }
    .title .slave__indicator.is--visible {
      display: block;
    }
    .button {
      width: 100%;
      min-height: 32px;
      border: 2px solid transparent;
      background: var(--color-default);
      border-radius: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .button .button__icon {
      display: block;
      width: 22px;
      height: 22px;
    }
    .button.is--small {
      min-height: 18px;
      border-radius: 8px;
    }
    .button.is--small .button__icon {
      display: block;
      width: 12px;
      height: 12px;
    }
    .button.is--active {
      background: var(--color-highlight);
      border: 2px solid transparent;
    }
  `,
  template: html`
  <div class="title">
    <span class="control__name">Button</span>
    <span class="slave__indicator"></span>
  </div>
  <div class="button">
    <span class="button__icon"></span>
  </div>
  `
})
class RdButton extends CustomElement {
  constructor() {
    super();
  }
}

export { RdButton };
