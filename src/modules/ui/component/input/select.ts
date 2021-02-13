import { Component, css, html } from './../../../core';
import { SelectComponent } from './../../../dom';

@Component({
  selector: 'rd-select',
  custom: { extends: 'select' },
  style: css`
    :host {
      background-color: var(--color-bg);
      border: 2px solid var(--color-border);
      border-radius: 14px;
      color: var(--color-default);
      font: var(--font-family);
      max-width: 280px;
      min-height: 36px;
      padding: 0px 14px;
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
class RdSelect extends SelectComponent {
  constructor() {
    super();
  }
}

export { RdSelect };
