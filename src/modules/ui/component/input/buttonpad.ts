import {
  Component,
  Emitter,
  Listen,
  EventDispatcher,
  FormElement,
  html,
  css,
  State
} from './../../../core';

export const StandardKeyboardModifiers = {
  'Shift+Backquote': { key: '~', code: 'Shift+Backquote', label: '~' },
  'Shift+Digit1': { key: '!', code: 'Digit1', label: '!' },
  'Shift+Digit2': { key: '@', code: 'Digit2', label: '@' },
  'Shift+Digit3': { key: '#', code: 'Digit3', label: '#' },
  'Shift+Digit4': { key: '$', code: 'Digit4', label: '$' },
  'Shift+Digit5': { key: '%', code: 'Digit5', label: '%' },
  'Shift+Digit6': { key: '^', code: 'Digit6', label: '^' },
  'Shift+Digit7': { key: '&', code: 'Digit7', label: '&' },
  'Shift+Digit8': { key: '*', code: 'Digit8', label: '*' },
  'Shift+Digit9': { key: '(', code: 'Digit9', label: '(' },
  'Shift+Digit0': { key: ')', code: 'Digit0', label: ')' },
  'Shift+Minus': { key: '-', code: 'Minus', label: '-' },
  'Shift+Equal': { key: '+', code: 'Equal', label: '+' },
  'Shift+Comma': { key: '<', code: 'Comma', label: '<' },
  'Shift+Period': { key: '>', code: 'Period', label: '>' },
  'Shift+Slash': { key: '?', code: 'Slash', label: '?' },
  'Shift+Semicolon': { key: ':', code: 'Semicolon', label: ':' },
  'Shift+Quote': { key: '"', code: 'Quote', label: '"' },
  'Shift+BracketLeft': { key: '{', code: 'BracketLeft', label: '{' },
  'Shift+BracketRight': { key: '}', code: 'BracketRight', label: '}' },
  'Shift+Backslash': { key: '|', code: 'Backslash', label: '|' },
  'Shift+KeyQ': { key: 'Q', code: 'KeyQ', label: 'q' },
  'Shift+KeyW': { key: 'W', code: 'KeyW', label: 'w' },
  'Shift+KeyE': { key: 'E', code: 'KeyE', label: 'e' },
  'Shift+KeyR': { key: 'R', code: 'KeyR', label: 'r' },
  'Shift+KeyT': { key: 'T', code: 'KeyT', label: 't' },
  'Shift+KeyY': { key: 'Y', code: 'KeyY', label: 'y' },
  'Shift+KeyU': { key: 'U', code: 'KeyU', label: 'u' },
  'Shift+KeyI': { key: 'I', code: 'KeyI', label: 'i' },
  'Shift+KeyO': { key: 'O', code: 'KeyO', label: 'o' },
  'Shift+KeyP': { key: 'P', code: 'KeyP', label: 'p' },
  'Shift+KeyA': { key: 'A', code: 'KeyA', label: 'a' },
  'Shift+KeyS': { key: 'S', code: 'KeyS', label: 's' },
  'Shift+KeyD': { key: 'D', code: 'KeyD', label: 'd' },
  'Shift+KeyF': { key: 'F', code: 'KeyF', label: 'f' },
  'Shift+KeyG': { key: 'G', code: 'KeyG', label: 'g' },
  'Shift+KeyH': { key: 'H', code: 'KeyH', label: 'h' },
  'Shift+KeyJ': { key: 'J', code: 'KeyJ', label: 'j' },
  'Shift+KeyK': { key: 'K', code: 'KeyK', label: 'k' },
  'Shift+KeyL': { key: 'L', code: 'KeyL', label: 'l' },
  'Shift+KeyZ': { key: 'Z', code: 'KeyZ', label: 'z' },
  'Shift+KeyX': { key: 'X', code: 'KeyX', label: 'x' },
  'Shift+KeyC': { key: 'C', code: 'KeyC', label: 'c' },
  'Shift+KeyV': { key: 'V', code: 'KeyV', label: 'v' },
  'Shift+KeyB': { key: 'B', code: 'KeyB', label: 'b' },
  'Shift+KeyN': { key: 'N', code: 'KeyN', label: 'n' },
  'Shift+KeyM': { key: 'M', code: 'KeyM', label: 'm' }
};

export const StandardKeyboard = [
  { key: '`', code: 'Backquote', label: '`' },
  { key: '1', code: 'Digit1', label: '1' },
  { key: '2', code: 'Digit2', label: '2' },
  { key: '3', code: 'Digit3', label: '3' },
  { key: '4', code: 'Digit4', label: '4' },
  { key: '5', code: 'Digit5', label: '5' },
  { key: '6', code: 'Digit6', label: '6' },
  { key: '7', code: 'Digit7', label: '7' },
  { key: '8', code: 'Digit8', label: '8' },
  { key: '9', code: 'Digit9', label: '9' },
  { key: '0', code: 'Digit0', label: '0' },
  { key: '-', code: 'Minus', label: '-' },
  { key: '=', code: 'Equal', label: '=' },
  { key: 'Backspace', code: 'Backspace', label: '⌫' },
  { key: 'Tab', code: 'Tab', label: '⇥' },
  { key: 'q', code: 'KeyQ', label: 'q' },
  { key: 'w', code: 'KeyW', label: 'w' },
  { key: 'e', code: 'KeyE', label: 'e' },
  { key: 'r', code: 'KeyR', label: 'r' },
  { key: 't', code: 'KeyT', label: 't' },
  { key: 'y', code: 'KeyY', label: 'y' },
  { key: 'u', code: 'KeyU', label: 'u' },
  { key: 'i', code: 'KeyI', label: 'i' },
  { key: 'o', code: 'KeyO', label: 'o' },
  { key: 'p', code: 'KeyP', label: 'p' },
  { key: '[', code: 'BracketLeft', label: '[' },
  { key: ']', code: 'BracketRight', label: ']' },
  { key: '\\', code: 'Backslash', label: '\\' },
  { key: 'CapsLock', code: 'CapsLock', label: '⇪' },
  { key: 'a', code: 'KeyA', label: 'a' },
  { key: 's', code: 'KeyS', label: 's' },
  { key: 'd', code: 'KeyD', label: 'd' },
  { key: 'f', code: 'KeyF', label: 'f' },
  { key: 'g', code: 'KeyG', label: 'g' },
  { key: 'h', code: 'KeyH', label: 'h' },
  { key: 'j', code: 'KeyJ', label: 'j' },
  { key: 'k', code: 'KeyK', label: 'k' },
  { key: 'l', code: 'KeyL', label: 'l' },
  { key: ';', code: 'Semicolon', label: ';' },
  { key: "'", code: 'Quote', label: "'" },
  { key: 'Enter', code: 'Enter', label: '↵' },
  { key: 'Shift', code: 'ShiftLeft', label: '⇧' },
  { key: 'z', code: 'KeyZ', label: 'z' },
  { key: 'x', code: 'KeyX', label: 'x' },
  { key: 'c', code: 'KeyC', label: 'c' },
  { key: 'v', code: 'KeyV', label: 'v' },
  { key: 'b', code: 'KeyB', label: 'b' },
  { key: 'n', code: 'KeyN', label: 'n' },
  { key: 'm', code: 'KeyM', label: 'm' },
  { key: ',', code: 'Comma', label: ',' },
  { key: '.', code: 'Period', label: '.' },
  { key: '/', code: 'Slash', label: '/' },
  { key: 'Shift', code: 'ShiftRight', label: '⇧' },
  { key: 'ArrowUp', code: 'ArrowUp', label: '↑' },
  { key: '', code: 'NULL', label: '' },
  { key: 'Control', code: 'ControlLeft', label: '⌃' },
  { key: 'Alt', code: 'AltLeft', label: '⌥' },
  { key: 'Meta', code: 'MetaLeft', label: '⌘' },
  { key: 'Space', code: 'Space', label: '␣' },
  { key: 'Meta', code: 'MetaRight', label: '⌘' },
  { key: 'Alt', code: 'AltRight', label: '⌥' },
  { key: 'Context', code: 'ContextMenu', label: '≣' },
  { key: 'Control', code: 'ControlRight', label: '⌃' },
  { key: '', code: 'NULL', label: '' },
  { key: 'ArrowLeft', code: 'ArrowLeft', label: '←' },
  { key: 'ArrowDown', code: 'ArrowDown', label: '↓' },
  { key: 'ArrowRight', code: 'ArrowRight', label: '→' }
];

export const StandardKeyboardNumPad = [
  { key: 'Clear', code: 'NumLock', label: 'clear' },
  { key: '=', code: 'NumpadEqual', label: '=' },
  { key: '/', code: 'NumpadDivide', label: '/' },
  { key: '*', code: 'NumpadMultiply', label: '*' },
  { key: '7', code: 'Numpad7', label: '7' },
  { key: '8', code: 'Numpad8', label: '8' },
  { key: '9', code: 'Numpad9', label: '9' },
  { key: '-', code: 'NumpadSubtract', label: '-' },
  { key: '4', code: 'Numpad4', label: '4' },
  { key: '5', code: 'Numpad5', label: '5' },
  { key: '6', code: 'Numpad6', label: '6' },
  { key: '+', code: 'NumpadAdd', label: '+' },
  { key: '1', code: 'Numpad1', label: '1' },
  { key: '2', code: 'Numpad2', label: '2' },
  { key: '3', code: 'Numpad3', label: '3' },
  { key: 'Enter', code: 'NumpadEnter', label: '↵' },
  { key: '0', code: 'Numpad0', label: '0' },
  { key: '.', code: 'NumpadDecimal', label: '.' }
];

export const StandardKeyboardModifierCodeKeyMap = {
  ShiftLeft: 'Shift',
  ShiftRight: 'Shift',
  ControlLeft: 'Control',
  ControlRight: 'Control',
  AltLeft: 'Alt',
  AltRight: 'Alt',
  MetaLeft: 'Meta',
  MetaRight: 'Meta'
};

export function buttonPadKeyPress(elem: Element) {
  return elem.getAttribute('modifier')
    ? StandardKeyboardModifiers[
        `${elem.getAttribute('modifier')}+${elem.getAttribute('code')}`
      ].key
    : elem.getAttribute('key');
}

@Component({
  selector: 'rd-buttonpad',
  delegatesFocus: true,
  style: css`
    :host {
      display: inline-block;
      outline: none;
      user-select: none;
      border-radius: 14px;
    }
    :host([disabled]) {
      opacity: var(--opacity-disabled);
      background: var(--color-disabled);
      cursor: not-allowed;
      pointer-events: none;
    }
    :host([disabled]):hover,
    :host([disabled]):focus,
    :host([disabled]):active,
    :host([disabled]).active {
      border: 2px solid var(--color-border);
      outline: none;
      box-shadow: none;
    }
    [target] {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
    }
  `,
  template: html`
    <template is="r-repeat" items="item of buttons" force="true">
      <rd-button
        repeat="item"
        label="{{item.label}}"
        key="{{item.key}}"
        code="{{item.code}}"
      ></rd-button>
    </template>
  `
})
class RdButtonPad extends FormElement {
  currentKey: string | null = null;
  currentModifier: string | null = null;
  disabled: false;
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['grid', 'buttons', 'disabled'];
  }

  attributeChangedCallback(name: string, old: string, next: string) {
    switch (name) {
      case 'disabled':
        if (!next.length) {
          next = 'true';
        }
        this.disabled = Boolean(next);
        if (this.disabled === true) {
          this.setAttribute('tabindex', '-1');
        } else {
          this.removeAttribute('tabindex');
        }
        break;
      case 'grid':
        this.grid = JSON.parse(next);
        break;
      case 'buttons':
        this.buttons = JSON.parse(next);
        break;
    }
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  @State()
  public getState() {
    return {
      grid: JSON.stringify({
        gap: '4px',
        columns: {
          count: 4
        }
      }),
      buttons: []
    };
  }

  @Listen('click')
  onClick(ev) {
    if (ev.target === this) {
      this.focus();
    }
  }

  connectedCallback() {
    this.waitAll$('rd-button')
      .then(elems => {
        for (let i = 0; i < elems.length; i++) {
          elems[i].addEventListener('click', this.click$.bind(this));
          elems[i].addEventListener(
            'touchstart',
            this.buttonPressModifier$.bind(this)
          );
          elems[i].addEventListener('touchend', this.buttonPress$.bind(this));
        }
      })
      .catch(err => console.error(err));
  }

  updateVisualGrid(elem: Element, grid: any) {
    if (grid.gap) {
      elem.style.gridGap = grid.gap;
    }
    if (grid.columns?.count) {
      elem.style.gridTemplateColumns = `repeat(${grid.columns.count}, 1fr)`;
    }
    if (grid.cells) {
      for (let i = 0; i < grid.cells.length; i++) {
        const cell = grid.cells[i];
        const cellElem = this.shadowRoot.querySelector(cell.selector);
        for (let styleProp in cell.styles) {
          // check for cellElem.style.hasOwnProperty(styleProp) fails in Safari and breaks layout
          if (cell.styles.hasOwnProperty(styleProp)) {
            if (styleProp === 'width' || styleProp === 'height') {
              cellElem.setAttribute(styleProp, cell.styles[styleProp]);
            } else {
              cellElem.style[styleProp] = cell.styles[styleProp];
            }
          }
        }
      }
    }
  }

  get form() {
    return this.$internals.form;
  }

  get name() {
    return this.getAttribute('name');
  }

  checkValidity() {
    return this.$internals.checkValidity();
  }

  get validity() {
    return this.$internals.validity;
  }

  get validationMessage() {
    return this.$internals.validationMessage;
  }

  get type() {
    return 'button';
  }

  get value() {
    return this.currentKey;
  }

  set value(value) {
    this.currentKey = value;
  }

  get grid() {
    return this.getState().grid;
  }
  set grid(grid: any) {
    setTimeout(() => {
      this.wait$('[target]').then(elem => {
        this.updateVisualGrid(elem, grid);
        this.setState('grid', JSON.stringify(grid));
      });
    });
  }

  get buttons() {
    return this.getState().buttons;
  }
  set buttons(buttons: any) {
    this.setState('buttons', JSON.stringify(buttons));
  }

  click$(ev: MouseEvent) {
    if (this.onclick) {
      let value = ev.target.getAttribute('key');
      if (
        this.currentModifier &&
        StandardKeyboardModifiers[
          `${this.currentModifier}+${ev.target.getAttribute('code')}`
        ]
      ) {
        value =
          StandardKeyboardModifiers[
            `${this.currentModifier}+${ev.target.getAttribute('code')}`
          ].key;
      }
      this.value = value;
      this.onclick(ev);
    }
  }

  @Listen('keyup')
  press$(ev: KeyboardEvent) {
    let code = ev.code;
    let modifier = false;
    if (code === 'NULL') {
      return;
    }
    if (StandardKeyboardModifierCodeKeyMap[code]) {
      this.currentModifier = null;
    } else {
      if (
        this.currentModifier &&
        StandardKeyboardModifiers[`${this.currentModifier}+${code}`]
      ) {
        code =
          StandardKeyboardModifiers[`${this.currentModifier}+${code}`].code;
        modifier = this.currentModifier;
      }
      this.value = ev.key;
      const keyElem = this.get$(`[code="${code}"]`);
      keyElem?.dispatchEvent(
        new CustomEvent('press', { detail: { modifier } })
      );
    }
  }

  @Listen('keydown')
  pressModifier$(ev: KeyboardEvent) {
    let code = ev.code;
    if (StandardKeyboardModifierCodeKeyMap[code]) {
      this.currentModifier = StandardKeyboardModifierCodeKeyMap[code];
      const keyElem = this.get$(`[code="${code}"]`);
      keyElem?.dispatchEvent(new CustomEvent('press'));
    }
  }

  buttonPress$(ev: TouchEvent) {
    let code = ev.target.getAttribute('code');
    let modifier = false;
    if (code === 'NULL') {
      return;
    }
    if (StandardKeyboardModifierCodeKeyMap[code]) {
      this.currentModifier = null;
    } else {
      if (
        this.currentModifier &&
        StandardKeyboardModifiers[`${this.currentModifier}+${code}`]
      ) {
        code =
          StandardKeyboardModifiers[`${this.currentModifier}+${code}`].code;
        modifier = this.currentModifier;
      }
      this.value = ev.target.getAttribute('key');
      const keyElem = ev.target;
      keyElem?.dispatchEvent(
        new CustomEvent('press', { detail: { modifier } })
      );
    }
  }

  buttonPressModifier$(ev: TouchEvent) {
    let code = ev.target.getAttribute('code');
    if (StandardKeyboardModifierCodeKeyMap[code]) {
      this.currentModifier = StandardKeyboardModifierCodeKeyMap[code];
    }
  }
}

export { RdButtonPad };
