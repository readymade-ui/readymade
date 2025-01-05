import { Component, css } from '@readymade/core';
import { BlockComponent } from '@readymade/dom';
import { RdControlSurfaceElement } from '../control';

@Component({
  selector: 'rd-element',
  style: css`
    :host {
      display: flex;
      flex-direction: column;
    }
    .surface-label {
      display: flex;
      align-items: center;
      margin-bottom: 0.75em;
      height: 36px;
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
    .rd-display-value {
      height: 36px;
      &.hidden {
        display: none;
      }
    }
    rd-displayinput {
      display: inline-block;
      margin-left: 10px;
    }
    ::backdrop {
      background: var(--ready-popover-bg);
    }
  `,
  custom: { extends: 'div' },
})
class RdSurfaceElement extends BlockComponent {
  timeout$: any;
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

    if (surface.displayValue === true) {
      const displayValue = document.createElement('span');
      displayValue.classList.add('rd-display-value');
      label.appendChild(displayValue);
    }

    this.appendChild(label);
    this.appendChild(element);

    (element as any).setControl(surface.control);

    if (surface.channel) {
      (element as any).setChannel(surface.channel);
    }

    if (surface.displayValue === true) {
      (element as any).onchange = () => {
        const displayValue = this.querySelector('.rd-display-value');
        displayValue.classList.remove('hidden');
        window.clearTimeout(this.timeout$);
        if (displayValue) {
          let inputDebounce: any;
          displayValue.innerHTML = '';
          if (Array.isArray((element as any).value)) {
            (element as any).value.forEach((value, index) => {
              const input = document.createElement(
                'rd-displayinput',
              ) as HTMLInputElement;
              input.classList.add('rd-display-input');
              input.value = value;
              displayValue.appendChild(input);
              input.oninput = () => {
                window.clearTimeout(this.timeout$);
                inputDebounce = setTimeout(() => {
                  const inputValues = (element as any).value;
                  if (
                    surface.control.currentValue.some(
                      (val) => typeof val === 'number',
                    )
                  ) {
                    inputValues[index] = parseFloat(input.value);
                  } else {
                    inputValues[index] = input.value;
                  }
                  (element as any).value = inputValues;
                }, 400);
              };
            });
          } else {
            const input = document.createElement(
              'rd-displayinput',
            ) as HTMLInputElement;
            input.classList.add('rd-display-input');
            input.value = (element as any).value;
            displayValue.appendChild(input);
            input.oninput = () => {
              window.clearTimeout(inputDebounce);
              inputDebounce = setTimeout(() => {
                if (typeof surface.control.currentValue === 'number') {
                  (element as any).value = parseFloat(input.value);
                } else {
                  (element as any).value = input.value;
                }
              }, 400);
            };
          }
        }
        this.timeout$ = setTimeout(() => {
          displayValue.classList.add('hidden');
        }, 4000);
      };
    }
  }
}

export { RdSurfaceElement };
