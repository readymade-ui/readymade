import { Component, css } from '@readymade/core';
import { RdControlSurfaceElement } from '../control';
import { BlockComponent } from '@readymade/dom';

@Component({
  selector: 'rd-element',
  style: css`
    :host {
      display: flex;
      flex-direction: column;
    }
    .surface-label {
      margin-bottom: 1em;
    }
    .surface-label .hint {
      display: inline-block;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      padding-right: 2px;
      background: var(--ready-color-selected);
      color: var(--ready-color-default);
      font-style: italic;
      font-size: 1em;
      text-align: center;
      margin-left: 0.5em;
      cursor: pointer;
      user-select: none;
    }
    [popover] {
      position: fixed;
      padding: 1em;
      border: 1px solid var(--ready-color-border);
      border-radius: 0.5em;
      background: var(--ready-popover-bg);
      color: var(--ready-color-default);
      width: 640px;
      height: 100vh;
      right: 0px;
      inset: auto;
      overflow: scroll;
    }
    ::backdrop {
      background: var(--ready-popover-bg);
    }
  `,
  custom: { extends: 'div' },
})
class RdSurfaceElement extends BlockComponent {
  constructor() {
    super();
  }

  setControlSurface(surface: RdControlSurfaceElement<any>) {
    if (!surface) {
      return;
    }
    if (surface.classes) {
      this.setAttribute('class', '');
      surface.classes.forEach((className) => this.classList.add(className));
    }

    if (surface.style) {
      for (const styleName in surface.style) {
        if (surface.style.hasOwnProperty(styleName)) {
          this.style[styleName] = surface.style[styleName];
        }
      }
    }

    const element = document.createElement(surface.selector);
    const label = document.createElement('label');
    label.classList.add('surface-label');
    label.textContent = surface.label;

    if (surface.hint) {
      const hint = document.createElement('span');
      hint.classList.add('hint');
      hint.textContent = 'i';
      hint.setAttribute('popovertarget', `${surface.control.name}-dialog`);
      label.appendChild(hint);
      const dialog = document.createElement('div');
      dialog.setAttribute('id', `${surface.control.name}-dialog`);
      dialog.setAttribute('popover', 'auto');
      dialog.innerHTML = surface.hint.template;

      hint.addEventListener('click', () => {
        dialog.togglePopover();
      });

      this.appendChild(dialog);
    }

    this.appendChild(label);
    this.appendChild(element);

    (element as any).setControl(surface.control);

    if (surface.channel) {
      (element as any).setChannel(surface.channel);
    }
  }
}

export { RdSurfaceElement };
