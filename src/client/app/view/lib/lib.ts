import {
  Component,
  CustomElement,
  FormElement,
  State,
} from './../../../../modules/core';
import { RdSlider } from './../../../../modules/ui';
import template from './lib.html?raw';
import style from './lib.scss?raw';
import {
  StandardKeyboard,
  StandardKeyboardNumPad,
} from './../../../../modules/ui/component/input/buttonpad';

@Component({
  selector: 'app-library',
  style,
  template,
})
class LibraryComponent extends CustomElement {
  theme: string = 'dark';
  constructor() {
    super();
  }
  connectedCallback() {
    this.shadowRoot?.querySelector('.theme__toggle')?.classList.add(this.theme);
    this.shadowRoot
      ?.querySelector('.theme__toggle')
      ?.addEventListener('click', () => {
        this.toggleTheme();
      });
    const form = this.shadowRoot?.querySelector('form');
    const radio = (<unknown>(
      this.shadowRoot?.querySelector('rd-radiogroup')
    )) as FormElement;
    const toggle = (<unknown>(
      this.shadowRoot?.querySelector('rd-switch')
    )) as FormElement;
    const checkbox = (<unknown>(
      this.shadowRoot?.querySelector('rd-checkbox')
    )) as FormElement;
    const input = (<unknown>(
      this.shadowRoot?.querySelector('rd-input')
    )) as FormElement;
    const textarea = (<unknown>(
      this.shadowRoot?.querySelector('rd-textarea')
    )) as FormElement;
    const select = (<unknown>(
      this.shadowRoot?.querySelector('rd-dropdown')
    )) as FormElement;
    const button = (<unknown>(
      this.shadowRoot?.querySelector('rd-button')
    )) as FormElement;
    const buttonPad = (<unknown>(
      this.shadowRoot?.querySelector('rd-buttonpad')
    )) as FormElement;
    const buttonNumberPad = (<unknown>(
      this.shadowRoot?.querySelectorAll('rd-buttonpad')[1]
    )) as FormElement;
    const joystick = (<unknown>(
      this.shadowRoot?.querySelector('[type="joystick"]')
    )) as RdSlider;
    const squareJoystick = (<unknown>(
      this.shadowRoot?.querySelectorAll('[type="joystick"]')[1]
    )) as RdSlider;
    const vertSlider = (<unknown>(
      this.shadowRoot?.querySelector('[type="vert"]')
    )) as RdSlider;
    const horizontalSlider = (<unknown>(
      this.shadowRoot?.querySelector('[type="hor"]')
    )) as RdSlider;
    const submit = (<unknown>(
      this.shadowRoot?.querySelector('[type="submit"]')
    )) as FormElement;
    radio.onchange = (ev: Event) => {
      console.log((ev.target as any).value);
    };
    toggle.onchange = (ev: Event) => {
      console.log((ev.target as any).checked);
      // console.dir(form);
    };
    checkbox.onchange = (ev: Event) => {
      console.log((ev.target as any).checked);
      // console.dir(form);
    };
    input.oninput = (ev: Event) => {
      console.log((ev.target as any).value);
      // console.dir(form);
    };
    input.onchange = (ev: Event) => {
      console.log((ev.target as any).value);
      // console.dir(form);
    };
    textarea.oninput = (ev: Event) => {
      console.log((ev.target as any).value);
      // console.dir(form);
    };
    textarea.onchange = (ev: Event) => {
      console.log((ev.target as any).value);
      // console.dir(form);
    };
    select.onchange = (ev: Event) => {
      console.log((ev.target as any).value);
      // console.dir(form);
    };
    button.onclick = (ev: Event) => {
      console.log(ev);
      // console.dir(form);
    };
    buttonPad.setAttribute(
      'grid',
      JSON.stringify({
        gap: '4px',
        columns: {
          count: 14,
        },
        cells: [
          {
            selector: '[key="Space"]',
            styles: {
              width: '100%',
              gridColumn: 'span 3',
            },
          },
          {
            selector: '[key="Enter"]',
            styles: {
              width: '100%',
              gridColumn: 'span 2',
            },
          },
        ],
      }),
    );
    buttonPad.setAttribute('buttons', JSON.stringify(StandardKeyboard));
    buttonPad.onclick = (ev: Event) => {
      if ((ev.target as HTMLElement).tagName === 'RD-BUTTON') {
        console.dir((form[16] as HTMLInputElement).value);
      }
    };
    buttonNumberPad.setAttribute(
      'grid',
      JSON.stringify({
        gap: '4px',
        columns: {
          count: 4,
        },
        cells: [
          {
            selector: '[key="0"]',
            styles: {
              width: '100%',
              gridColumn: 'span 2',
            },
          },
          {
            selector: '[key="Enter"]',
            styles: {
              height: '100%',
              gridRow: 'span 2',
            },
          },
        ],
      }),
    );
    buttonNumberPad.setAttribute(
      'buttons',
      JSON.stringify(StandardKeyboardNumPad),
    );
    buttonNumberPad.onclick = (ev: Event) => {
      if ((ev.target as HTMLElement).tagName === 'RD-BUTTON') {
        console.dir((form[17] as HTMLInputElement).value);
      }
    };
    joystick.oninput = (ev: CustomEvent) => {
      console.log((ev.target as any).value);
      // console.dir(form);
    };
    squareJoystick.oninput = (ev: CustomEvent) => {
      console.log((ev.target as any).value);
      // console.dir(form);
    };
    vertSlider.oninput = (ev: CustomEvent) => {
      console.log((ev.target as any).value);
      // console.dir(form);
    };
    horizontalSlider.oninput = (ev: CustomEvent) => {
      console.log((ev.target as any).value);
      // console.dir(form);
    };
    setTimeout(() => (vertSlider.value = 100), 0);
    setTimeout(() => (horizontalSlider.value = 1000), 0);
    setTimeout(() => (joystick.value = [140, 140]), 0);
    setTimeout(() => (squareJoystick.value = [140, 140]), 0);
    submit.onclick = (ev: Event) => {
      ev.preventDefault();
      const values = Array.from(
        this.shadowRoot?.querySelectorAll('.form__item'),
      ).map((item: any) => {
        if (item.onValidate) {
          item.onValidate();
        }
        return {
          tag: item.tagName,
          value: item.value,
          validity: item.checkValidity ? item.checkValidity() : null,
        };
      });
      console.log(values);
      // console.dir(form);
    };
  }
  @State()
  public getState() {
    return {
      vertControl: JSON.stringify({
        type: 'slider',
        name: 'slider',
        orient: 'is--vert',
        min: 0,
        max: 255,
        size: 'small',
        gridArea: '1 / 1 / span 3 / span 1',
      }),
      horControl: JSON.stringify({
        type: 'slider',
        name: 'h',
        orient: 'is--hor',
        min: 0,
        max: 1000,
        gridArea: '1 / 3 / span 1 / span 3',
      }),
      joyControl: JSON.stringify({
        type: 'slider',
        name: 'joystick',
        orient: 'is--joystick',
        min: [0.0, 0.0],
        max: [255.0, 255.0],
        snapToCenter: false,
        gridArea: '1 / 2 / span 4 / span 1',
      }),
      joySquareControl: JSON.stringify({
        type: 'slider',
        name: 'square-joystick',
        orient: 'is--joystick--square',
        min: [0, 0],
        max: [12, 12],
        snapToCenter: false,
        gridArea: '1 / 2 / span 4 / span 1',
        numberType: 'int',
      }),
    };
  }
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', this.theme);
    this.shadowRoot?.querySelector('.theme__toggle').classList.remove('light');
    this.shadowRoot?.querySelector('.theme__toggle').classList.remove('dark');
    this.shadowRoot?.querySelector('.theme__toggle').classList.add(this.theme);
  }
}

const render = () => `
  <app-library>
    <template shadowroot="open">
      <style>
        ${style}
      </style>
      ${template}
    </template>
  </app-library>
`;

export { LibraryComponent, render };
