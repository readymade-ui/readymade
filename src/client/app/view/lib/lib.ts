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

import documentation from './docs';

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
          hint: {
            template: documentation.dial,
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
          hint: {
            template: documentation.input,
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
          hint: {
            template: documentation.textarea,
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
          hint: {
            template: documentation.button,
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
          hint: {
            template: documentation.dropdown,
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
          hint: {
            template: documentation.checkbox,
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
          hint: {
            template: documentation.switch,
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
          hint: {
            template: documentation.radio,
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
          hint: {
            template: documentation.slider,
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
          hint: {
            template: documentation.slider,
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
          hint: {
            template: documentation.buttonpad,
          },
        },
      ],
    };
    const surface = this.shadowRoot?.querySelectorAll(
      'rd-surface',
    )[0] as RdSurface;

    const videoGameController = this.shadowRoot?.querySelectorAll(
      'rd-surface',
    )[1] as RdSurface;

    const videoGameControllerSurface: RdControlSurface = {
      style: {
        display: 'grid',
        gridTemplateColumns:
          '[column1] 67px [column2] 67px [column3] 67px [column4] 60px [column5] 67px [column6] 67px [column7] 67px [column8]',
        gridTemplateRows:
          '[row1] 44px [row2] 44px [row3] 44px [row4] 44px [row5] 67px [row6] 67px [row7] 67px [row8]',
        columnGap: '0px',
        rowGap: '0px',
        padding: '44px',
        paddingLeft: '20px',
        width: 'auto',
        overflowX: 'hidden',
      },
      controls: [
        {
          selector: 'rd-slider',
          channel: this.channelName,
          style: {
            gridColumnStart: 'column1',
            gridColumnEnd: 'column4',
            gridRowStart: 'row5',
            gridRowEnd: 'row8',
          },
          control: {
            type: 'joystick',
            name: 'left-joystick',
            currentValue: [0, 0],
            attributes: {
              orient: 'is--joystick',
              min: [0, 0],
              max: [1024, 1024],
              numberType: 'int',
            },
          },
        },
        {
          selector: 'rd-button',
          channel: this.channelName,
          style: {
            gridColumnStart: 'column2',
            gridColumnEnd: 'column3',
            gridRowStart: 'row3',
            gridRowEnd: 'row4',
          },
          control: {
            name: 'start-button',
            attributes: {
              width: '44px',
              height: '16px',
            },
          },
        },
        {
          selector: 'rd-button',
          channel: this.channelName,
          style: {
            gridColumnStart: 'column3',
            gridColumnEnd: 'column4',
            gridRowStart: 'row3',
            gridRowEnd: 'row4',
          },
          control: {
            name: 'select-button',
            attributes: {
              width: '44px',
              height: '16px',
            },
          },
        },
        {
          selector: 'rd-button',
          channel: this.channelName,
          style: {
            gridColumnStart: 'column5',
            gridColumnEnd: 'column6',
            gridRowStart: 'row2',
            gridRowEnd: 'row3',
          },
          control: {
            name: 'A',
            attributes: {
              width: '44px',
              height: '44px',
            },
          },
        },
        {
          selector: 'rd-button',
          channel: this.channelName,
          style: {
            gridColumnStart: 'column6',
            gridColumnEnd: 'column7',
            gridRowStart: 'row1',
            gridRowEnd: 'row2',
          },
          control: {
            name: 'B',
            attributes: {
              width: '44px',
              height: '44px',
            },
          },
        },
        {
          selector: 'rd-button',
          channel: this.channelName,
          style: {
            gridColumnStart: 'column6',
            gridColumnEnd: 'column7',
            gridRowStart: 'row3',
            gridRowEnd: 'row4',
          },
          control: {
            name: 'X',
            attributes: {
              width: '44px',
              height: '44px',
            },
          },
        },
        {
          selector: 'rd-button',
          channel: this.channelName,
          style: {
            gridColumnStart: 'column7',
            gridColumnEnd: 'column8',
            gridRowStart: 'row2',
            gridRowEnd: 'row3',
          },
          control: {
            name: 'Y',
            attributes: {
              width: '44px',
              height: '44px',
            },
          },
        },
        {
          selector: 'rd-slider',
          channel: this.channelName,
          style: {
            gridColumnStart: 'column5',
            gridColumnEnd: 'column8',
            gridRowStart: 'row5',
            gridRowEnd: 'row8',
          },
          control: {
            type: 'joystick',
            name: 'right-joystick',
            currentValue: [0, 0],
            attributes: {
              orient: 'is--joystick',
              min: [0, 0],
              max: [1024, 1024],
              numberType: 'int',
            },
          },
        },
      ],
    };

    setTimeout(() => {
      surface.setControlSurface(controlSurface);
      videoGameController.setControlSurface(videoGameControllerSurface);
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
