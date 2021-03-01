import { Component, CustomElement, State } from './../../../../modules/core';
import template from './lib.html';
import style from './lib.scss';

@Component({
  selector: 'app-library',
  style: style,
  template: template
})
class LibraryComponent extends CustomElement {
  theme: string = 'light';
  constructor() {
    super();
  }
  connectedCallback() {
    this.shadowRoot.querySelector('.theme__toggle').classList.add(this.theme);
    this.shadowRoot
      .querySelector('.theme__toggle')
      .addEventListener('click', () => {
        this.toggleTheme();
      });
    this.shadowRoot.querySelector('rd-radiogroup').onchange = (ev: Event) => {
      console.log(ev.target.value);
    };

    this.shadowRoot.querySelector('rd-switch').onchange = (ev: Event) => {
      console.log(ev.target.checked);
    };
    this.shadowRoot.querySelector('rd-checkbox').onchange = (ev: Event) => {
      console.log(ev.target.checked);
    };
    this.shadowRoot.querySelector('rd-input').oninput = (ev: Event) => {
      console.log(ev.target.value);
    };
    this.shadowRoot.querySelector('rd-input').onchange = (ev: Event) => {
      console.log(ev.target.value);
    };
    this.shadowRoot.querySelector('rd-textarea').oninput = (ev: Event) => {
      console.log(ev.target.value);
    };
    this.shadowRoot.querySelector('rd-textarea').onchange = (ev: Event) => {
      console.log(ev.target.value);
    };
    this.shadowRoot.querySelector('rd-dropdown').onchange = (ev: Event) => {
      console.log(ev.target.value);
    };

    this.shadowRoot.querySelector('rd-button').onclick = (ev: Event) => {
      console.log(ev);
    };

    this.shadowRoot.querySelector('[type="joystick"]').oninput = (
      ev: Event
    ) => {
      console.log(ev.detail.currentValue);
    };
    this.shadowRoot.querySelector('[type="vert"]').oninput = (ev: Event) => {
      console.log(ev.detail.currentValue);
    };
    this.shadowRoot.querySelector('[type="hor"]').oninput = (ev: Event) => {
      console.log(ev.detail.currentValue);
    };
    this.shadowRoot.querySelector('form').onsubmit = (ev: Event) => {
      ev.preventDefault();
      // const items = Array.from();
      const values = Array.from(
        this.shadowRoot.querySelectorAll('.form__item')
      ).map(item => {
        return {
          tag: item.tagName,
          value: item.value
        };
      });
      console.log(values);
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
        gridArea: '1 / 1 / span 3 / span 1'
      }),
      horControl: JSON.stringify({
        type: 'slider',
        name: 'h',
        orient: 'is--hor',
        min: 0,
        max: 1000,
        gridArea: '1 / 3 / span 1 / span 3'
      }),
      joyControl: JSON.stringify({
        type: 'slider',
        name: 'joystick',
        orient: 'is--joystick',
        min: [0, 0],
        max: [255, 255],
        snapToCenter: true,
        gridArea: '1 / 2 / span 4 / span 1'
      })
    };
  }
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', this.theme);
    this.shadowRoot.querySelector('.theme__toggle').classList.remove('light');
    this.shadowRoot.querySelector('.theme__toggle').classList.remove('dark');
    this.shadowRoot.querySelector('.theme__toggle').classList.add(this.theme);
  }
}

export { LibraryComponent };
