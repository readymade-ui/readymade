import {
  Component,
  CustomElement,
  FormElement,
  State
} from './../../../../modules/core';
import { RdSlider } from './../../../../modules/ui';
import template from './lib.html';
import style from './lib.scss';

@Component({
  selector: 'app-library',
  style: style,
  template: template
})
class LibraryComponent extends CustomElement {
  theme: string = 'dark';
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
    const form = this.shadowRoot.querySelector('form');
    const radio = (<unknown>(
      this.shadowRoot.querySelector('rd-radiogroup')
    )) as FormElement;
    const dropdown = (<unknown>(
      this.shadowRoot.querySelector('rd-switch')
    )) as FormElement;
    const checkbox = (<unknown>(
      this.shadowRoot.querySelector('rd-checkbox')
    )) as FormElement;
    const input = (<unknown>(
      this.shadowRoot.querySelector('rd-input')
    )) as FormElement;
    const textarea = (<unknown>(
      this.shadowRoot.querySelector('rd-textarea')
    )) as FormElement;
    const select = (<unknown>(
      this.shadowRoot.querySelector('rd-dropdown')
    )) as FormElement;
    const button = (<unknown>(
      this.shadowRoot.querySelector('rd-button')
    )) as FormElement;
    const joystick = (<unknown>(
      this.shadowRoot.querySelector('[type="joystick"]')
    )) as RdSlider;
    const vertSlider = (<unknown>(
      this.shadowRoot.querySelector('[type="vert"]')
    )) as RdSlider;
    const horizontalSlider = (<unknown>(
      this.shadowRoot.querySelector('[type="hor"]')
    )) as RdSlider;
    const submit = (<unknown>(
      this.shadowRoot.querySelector('[type="submit"]')
    )) as FormElement;
    radio.onchange = (ev: Event) => {
      console.log((ev.target as any).value);
    };
    dropdown.onchange = (ev: Event) => {
      console.log((ev.target as any).value);
      console.dir(form);
    };
    checkbox.onchange = (ev: Event) => {
      console.log((ev.target as any).value);
      console.dir(form);
    };
    input.oninput = (ev: Event) => {
      console.log((ev.target as any).value);
      console.dir(form);
    };
    input.onchange = (ev: Event) => {
      console.log((ev.target as any).value);
      console.dir(form);
    };
    textarea.oninput = (ev: Event) => {
      console.log((ev.target as any).value);
      console.dir(form);
    };
    textarea.onchange = (ev: Event) => {
      console.log((ev.target as any).value);
      console.dir(form);
    };
    dropdown.onchange = (ev: Event) => {
      console.log((ev.target as any).value);
      console.dir(form);
    };
    button.onclick = (ev: Event) => {
      console.log(ev);
      console.dir(form);
    };
    joystick.oninput = (ev: CustomEvent) => {
      console.log((ev.target as any).value);
      console.dir(form);
    };
    vertSlider.oninput = (ev: CustomEvent) => {
      console.log((ev.target as any).value);
      console.dir(form);
    };
    horizontalSlider.oninput = (ev: CustomEvent) => {
      console.log((ev.target as any).value);
      console.dir(form);
    };
    setTimeout(() => (vertSlider.value = 100), 0);
    setTimeout(() => (horizontalSlider.value = 1000), 0);
    setTimeout(() => (joystick.value = [140, 140]), 0);
    submit.onclick = (ev: Event) => {
      ev.preventDefault();
      const values = Array.from(
        this.shadowRoot.querySelectorAll('.form__item')
      ).map((item: any) => {
        item.onValidate();
        return {
          tag: item.tagName,
          value: item.value,
          validity: item.checkValidity ? item.checkValidity() : null
        };
      });
      console.log(values);
      console.dir(form);
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
        snapToCenter: false,
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
