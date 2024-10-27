import { Component, CustomElement, FormElement, State } from '@readymade/core';
import template from './lib.html?raw';
import style from './lib.css?raw';
import {
  StandardKeyboard,
  RdSlider,
  RdRadioGroup,
  RdDial,
  RdButtonPad,
  RdButton,
  RdDropdown,
  RdCheckBox,
  RdSwitch,
  RdInput,
  RdTextArea,
  RdSurface,
  RdControlSurface,
} from '@readymade/ui';

@Component({
  selector: 'app-library',
  style,
  template,
})
class LibraryComponent extends CustomElement {
  theme: string = 'dark';
  mode: 'form' | 'channel' = 'channel';
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
      this.shadowRoot?.querySelectorAll('rd-radiogroup.form__item')[0]
    )) as FormElement;

    modeRadio.onchange = (ev: Event) => {
      this.mode = (ev.target as any).value;
      this.onModeChange();
    };

    const controlSurface: RdControlSurface = {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30% [col-start])',
        columnGap: '88px',
        rowGap: '44px',
        paddingTop: '44px',
        paddingLeft: '20px',
        width: '100%',
        overflowX: 'hidden',
      },
      controls: [
        {
          label: 'Dial',
          selector: 'rd-dial',
          channel: this.channelName,
          control: {
            type: 'dial',
            name: 'dial',
            currentValue: 0.0,
            attributes: {
              min: 0.0,
              max: 1.0,
            },
          },
        },
        {
          label: 'Input',
          selector: 'rd-input',
          channel: this.channelName,
          style: {
            width: '290px',
          },
          control: {
            name: 'input',
            attributes: {},
          },
        },
        {
          label: 'Textarea',
          selector: 'rd-textarea',
          channel: this.channelName,
          control: {
            name: 'textarea',
            attributes: {},
          },
        },
        {
          label: 'Button',
          selector: 'rd-button',
          channel: this.channelName,
          control: {
            name: 'button',
            attributes: {},
          },
        },
        {
          label: 'Select',
          selector: 'rd-dropdown',
          channel: this.channelName,
          style: {
            width: '320px',
          },
          control: {
            name: 'dropdown',
            attributes: {
              options: [
                'Option 1',
                'Option 2',
                'Option 3',
                'Option With Really, Really, Really, Really, Really Long Name',
              ],
            },
          },
        },
        {
          label: 'Checkbox',
          selector: 'rd-checkbox',
          channel: this.channelName,
          control: {
            name: 'checkbox',
            attributes: {},
          },
        },
        {
          label: 'Switch',
          selector: 'rd-switch',
          channel: this.channelName,
          control: {
            name: 'swtich',
            attributes: {},
          },
        },
        {
          label: 'Radio Group',
          selector: 'rd-radiogroup',
          channel: this.channelName,
          control: {
            name: 'radio-group',
            attributes: {
              direction: 'vertical',
              inputs: [
                {
                  value: 'hue',
                  label: 'Hue',
                  name: 'radio-group',
                },
                {
                  value: 'saturation',
                  label: 'Saturation',
                  name: 'radio-group',
                },
                {
                  value: 'brightness',
                  label: 'Brightness',
                  name: 'radio-group',
                },
              ],
            },
          },
        },
        {
          label: 'Slider',
          selector: 'rd-slider',
          channel: this.channelName,
          control: {
            type: 'vert',
            name: 'slider',
            currentValue: 100,
            attributes: {
              orient: 'is--vert',
              min: 0,
              max: 255,
            },
          },
        },
        {
          label: 'Joystick',
          selector: 'rd-slider',
          channel: this.channelName,
          control: {
            type: 'joystick',
            name: 'square-joystick',
            currentValue: [0, 0],
            attributes: {
              orient: 'is--joystick',
              min: [0, 0],
              max: [1024, 1024],
              snapToCenter: true,
              numberType: 'int',
            },
          },
        },
        {
          label: 'Button Pad',
          selector: 'rd-buttonpad',
          channel: this.channelName,
          style: {
            gridColumn: '2 / span 2',
            marginRight: '124px',
          },
          control: {
            name: 'keyboard',
            attributes: {
              buttons: StandardKeyboard,
              grid: {
                gap: '4px',
                columns: {
                  count: 14,
                },
                buttonStyles: {
                  width: '64px',
                  height: '64px',
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
              },
            },
          },
        },
      ],
    };
    const surface = this.shadowRoot?.querySelector('rd-surface') as RdSurface;

    setTimeout(() => {
      surface.setControlSurface(controlSurface);
      this.onModeChange();
    });

    (modeRadio as RdRadioGroup).value = this.mode;
  }
  @State()
  public getState() {
    return {};
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
    )) as RdRadioGroup;
    const toggle = (<unknown>(
      this.shadowRoot?.querySelector('rd-switch')
    )) as RdSwitch;
    const checkbox = (<unknown>(
      this.shadowRoot?.querySelector('rd-checkbox')
    )) as RdCheckBox;
    const input = (<unknown>(
      this.shadowRoot?.querySelector('rd-input')
    )) as RdInput;
    const textarea = (<unknown>(
      this.shadowRoot?.querySelector('rd-textarea')
    )) as RdTextArea;
    const select = (<unknown>(
      this.shadowRoot?.querySelector('rd-dropdown')
    )) as RdDropdown;
    const button = (<unknown>(
      this.shadowRoot?.querySelector('rd-button')
    )) as RdButton;
    const buttonNumberPad = (<unknown>(
      this.shadowRoot?.querySelectorAll('rd-buttonpad')
    )) as RdButtonPad;
    const dial = (<unknown>(
      this.shadowRoot?.querySelector('[name="dial"]')
    )) as RdDial;
    const squareJoystick = (<unknown>(
      this.shadowRoot?.querySelector('[type="joystick"]')
    )) as RdSlider;
    const vertSlider = (<unknown>(
      this.shadowRoot?.querySelector('[type="vert"]')
    )) as RdSlider;
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
      // buttonPad.onclick = (ev: Event) => {
      //   if ((ev.target as HTMLElement).tagName === 'RD-BUTTON') {
      //     console.dir((form[16] as HTMLInputElement).value);
      //   }
      // };
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
      // horizontalSlider.oninput = (ev: CustomEvent) => {
      //   console.log((ev.target as any).value);
      // };
      // submit.onclick = (ev: Event) => {
      //   ev.preventDefault();
      //   const values = Array.from(
      //     this.shadowRoot?.querySelectorAll('.form__item'),
      //   ).map((item: any) => {
      //     if (item.onValidate) {
      //       item.onValidate();
      //     }
      //     return {
      //       tag: item.tagName,
      //       value: item.value,
      //       validity: item.checkValidity ? item.checkValidity() : null,
      //     };
      //   });
      //   console.log(values);
      // };
    }
    if (this.mode === 'channel') {
      this.channel = new BroadcastChannel(this.channelName);
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
      buttonNumberPad.onclick = () => {};
      dial.oninput = () => {};
      squareJoystick.oninput = () => {};
      vertSlider.oninput = () => {};
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
