import { Component, CustomElement, FormElement, State } from '@readymade/core';
import template from './lib.html?raw';
import style from './lib.css?raw';
import {
  StandardKeyboard,
  StandardKeyboardNumPad,
  RdSlider,
  RdRadioGroup,
  RdDial,
} from '@readymade/ui';

@Component({
  selector: 'app-library',
  style,
  template,
})
class LibraryComponent extends CustomElement {
  theme: string = 'dark';
  mode: 'form' | 'channel' = 'form';
  channelName = 'rd-messages';
  channel: BroadcastChannel;
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

    const modeRadio = (<unknown>(
      this.shadowRoot?.querySelectorAll('rd-radiogroup')[0]
    )) as FormElement;

    modeRadio.onchange = (ev: Event) => {
      this.mode = (ev.target as any).value;
      this.onModeChange();
    };

    const buttonPad = (<unknown>(
      this.shadowRoot?.querySelector('rd-buttonpad')
    )) as FormElement;
    const buttonNumberPad = (<unknown>(
      this.shadowRoot?.querySelectorAll('rd-buttonpad')[1]
    )) as FormElement;
    const dial = (<unknown>(
      this.shadowRoot?.querySelector('[name="dial"]')
    )) as RdSlider;
    const squareJoystick = (<unknown>(
      this.shadowRoot?.querySelector('[type="joystick"]')
    )) as RdSlider;
    const vertSlider = (<unknown>(
      this.shadowRoot?.querySelector('[type="vert"]')
    )) as RdSlider;
    const horizontalSlider = (<unknown>(
      this.shadowRoot?.querySelector('[type="hor"]')
    )) as RdSlider;

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

    setTimeout(() => (vertSlider.value = 100));
    setTimeout(() => (horizontalSlider.value = 1000));
    setTimeout(() => (dial.value = 0.1));
    setTimeout(() => (squareJoystick.value = [140, 140]));

    this.onModeChange();
    (modeRadio as RdRadioGroup).value = this.mode;
  }
  @State()
  public getState() {
    return {
      vertControl: JSON.stringify({
        type: 'slider',
        name: 'slider',
        selector: 'rd-slider',
        orient: 'is--vert',
        min: 0,
        max: 255,
        size: 'small',
        gridArea: '1 / 1 / span 3 / span 1',
      }),
      horControl: JSON.stringify({
        type: 'slider',
        name: 'h',
        selector: 'rd-slider',
        orient: 'is--hor',
        min: 0,
        max: 1000,
        gridArea: '1 / 3 / span 1 / span 3',
      }),
      dialControl: JSON.stringify({
        type: 'dial',
        name: 'dial',
        selector: 'rd-dial',
        min: 0.0,
        max: 1.0,
        gridArea: '1 / 2 / span 4 / span 1',
      }),
      joySquareControl: JSON.stringify({
        type: 'slider',
        name: 'square-joystick',
        selector: 'rd-slider',
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
  onModeChange() {
    const form = this.shadowRoot?.querySelector('form');
    const radio = (<unknown>(
      this.shadowRoot?.querySelectorAll('rd-radiogroup')[1]
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
    const dial = (<unknown>(
      this.shadowRoot?.querySelector('[name="dial"]')
    )) as RdDial;
    const squareJoystick = (<unknown>(
      this.shadowRoot?.querySelector('[type="joystick"]')
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
    if (this.mode === 'form') {
      this.channel?.close();
      radio.onchange = (ev: Event) => {
        console.log((ev.target as any).value);
      };
      toggle.onchange = (ev: Event) => {
        console.log((ev.target as any).checked);
      };
      checkbox.onchange = (ev: Event) => {
        console.log((ev.target as any).checked);
      };
      input.oninput = (ev: Event) => {
        console.log((ev.target as any).value);
      };
      input.onchange = (ev: Event) => {
        console.log((ev.target as any).value);
      };
      textarea.oninput = (ev: Event) => {
        console.log((ev.target as any).value);
      };
      textarea.onchange = (ev: Event) => {
        console.log((ev.target as any).value);
      };
      select.onchange = (ev: Event) => {
        console.log((ev.target as any).value);
      };
      button.onclick = (ev: Event) => {
        console.log(ev);
      };
      buttonPad.onclick = (ev: Event) => {
        if ((ev.target as HTMLElement).tagName === 'RD-BUTTON') {
          console.dir((form[16] as HTMLInputElement).value);
        }
      };
      buttonNumberPad.onclick = (ev: Event) => {
        if ((ev.target as HTMLElement).tagName === 'RD-BUTTON') {
          console.dir((form[17] as HTMLInputElement).value);
        }
      };
      dial.oninput = (ev: CustomEvent) => {
        console.log((ev.target as any).value);
      };
      squareJoystick.oninput = (ev: CustomEvent) => {
        console.log((ev.target as any).value);
      };
      vertSlider.oninput = (ev: CustomEvent) => {
        console.log((ev.target as any).value);
      };
      horizontalSlider.oninput = (ev: CustomEvent) => {
        console.log((ev.target as any).value);
      };
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
      };
    }
    if (this.mode === 'channel') {
      this.channel = new BroadcastChannel(this.channelName);
      radio.setAttribute('channel', this.channelName);
      toggle.setAttribute('channel', this.channelName);
      checkbox.setAttribute('channel', this.channelName);
      input.setAttribute('channel', this.channelName);
      textarea.setAttribute('channel', this.channelName);
      select.setAttribute('channel', this.channelName);
      button.setAttribute('channel', this.channelName);
      buttonPad.setAttribute('channel', this.channelName);
      buttonNumberPad.setAttribute('channel', this.channelName);
      dial.setAttribute('channel', this.channelName);
      squareJoystick.setAttribute('channel', this.channelName);
      vertSlider.setAttribute('channel', this.channelName);
      horizontalSlider.setAttribute('channel', this.channelName);
      submit.setAttribute('channel', this.channelName);
      this.channel.onmessage = (event) => {
        console.log(event.data);
      };
      radio.onchange = () => {};
      toggle.onchange = () => {};
      checkbox.onchange = () => {};
      input.oninput = () => {};
      input.onchange = () => {};
      textarea.oninput = () => {};
      textarea.onchange = () => {};
      select.onchange = () => {};
      button.onclick = () => {};
      buttonPad.onclick = () => {};
      buttonNumberPad.onclick = () => {};
      dial.oninput = () => {};
      squareJoystick.oninput = () => {};
      vertSlider.oninput = () => {};
      horizontalSlider.oninput = () => {};
      submit.onclick = () => {};
    }
  }
}

const render = () => `
  <app-library>
    <template shadowrootmode="open">
      <style>
        ${style}
      </style>
      ${template}
    </template>
  </app-library>
`;

export { LibraryComponent, render };
