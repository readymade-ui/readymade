import { Component, css, html } from './../../../core';
import { SelectComponent } from './../../../dom';

@Component({
  selector: 'rd-select',
  custom: { extends: 'select' },
  style: css`
    :host {
      display: block;
      background-color: var(--color-bg);
      border: 2px solid var(--color-border);
      border-radius: 1em;
      color: var(--color-default);
      font: var(--font-family);
      line-height: 1.3;
      padding: 0.3em 1.4em 0.3em 0.8em;
      max-width: 280px;
      height: 36px;
      box-sizing: border-box;
      margin: 0;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-image: var(--icon-menu);
      background-repeat: no-repeat;
      background-position: right 0.7em top 50%, 0 0;
      background-size: 10px 9px;
    }
    :host:hover,
    :host:focus,
    :host:active {
      border: 2px solid var(--color-highlight);
      outline: none;
      box-shadow: none;
    }
    *[dir='rtl'] :host,
    :root:lang(ar) :host,
    :root:lang(iw) :host {
      background-position: left 0.7em top 50%, 0 0;
      padding: 0.3em 0.8em 0.3em 1.4em;
    }
    :host::-ms-expand {
      display: none;
    }
  `
})
class RdSelect extends SelectComponent {
  constructor() {
    super();
  }
}

export { RdSelect };
