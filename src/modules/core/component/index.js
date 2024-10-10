import { EMIT_KEY, LISTEN_KEY } from '../decorator';
import { attachDOM, attachShadow, attachStyle } from '../element';
export function bindListeners(target) {
  for (const prop in target) {
    if (prop.includes(LISTEN_KEY)) {
      this[prop].onListener.call(this);
    }
  }
}
export function bindEmitters(target) {
  for (const prop in target) {
    if (prop.includes(EMIT_KEY)) {
      target[prop].call(target);
    }
  }
}
export class StructuralElement extends HTMLElement {
  constructor() {
    super();
    if (this.bindEmitters) {
      this.bindEmitters();
    }
    if (this.bindListeners) {
      this.bindListeners();
    }
    if (this.onInit) {
      this.onInit();
    }
  }
  get$(selector) {
    return this.shadowRoot
      ? this.shadowRoot.querySelector(selector)
      : this.querySelector(selector);
  }
  getAll$(selector) {
    return this.shadowRoot
      ? this.shadowRoot.querySelectorAll(selector)
      : this.querySelectorAll(selector);
  }
  wait$(selector, timeout = 60000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const interval = 100; // Check every 100 milliseconds
      const checkForElement = () => {
        const elapsedTime = Date.now() - startTime;
        const root = this.shadowRoot ? this.shadowRoot : this;
        const element = root.querySelector(selector);
        if (element) {
          resolve(element);
        } else if (elapsedTime >= timeout) {
          reject(
            new Error(
              `Element with selector "${selector}" did not appear within ${timeout} milliseconds`,
            ),
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
  waitAll$(selector, timeout = 60000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const interval = 100; // Check every 100 milliseconds
      const checkForElement = () => {
        const elapsedTime = Date.now() - startTime;
        const root = this.shadowRoot ? this.shadowRoot : this;
        const element = root.querySelectorAll(selector);
        if (element && element.length) {
          resolve(element);
        } else if (elapsedTime >= timeout) {
          reject(
            new Error(
              `Elements with selector "${selector}" did not appear within ${timeout} milliseconds`,
            ),
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
}
export class PseudoElement extends HTMLElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) {
      this.bindEmitters();
    }
    if (this.bindListeners) {
      this.bindListeners();
    }
    if (this.onInit) {
      this.onInit();
    }
  }
  get$(selector) {
    return this.shadowRoot
      ? this.shadowRoot.querySelector(selector)
      : this.querySelector(selector);
  }
  getAll$(selector) {
    return this.shadowRoot
      ? this.shadowRoot.querySelectorAll(selector)
      : this.querySelectorAll(selector);
  }
  wait$(selector, timeout = 60000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const interval = 100; // Check every 100 milliseconds
      const checkForElement = () => {
        const elapsedTime = Date.now() - startTime;
        const root = this.shadowRoot ? this.shadowRoot : this;
        const element = root.querySelector(selector);
        if (element) {
          resolve(element);
        } else if (elapsedTime >= timeout) {
          reject(
            new Error(
              `Element with selector "${selector}" did not appear within ${timeout} milliseconds`,
            ),
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
  waitAll$(selector, timeout = 60000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const interval = 100; // Check every 100 milliseconds
      const checkForElement = () => {
        const elapsedTime = Date.now() - startTime;
        const root = this.shadowRoot ? this.shadowRoot : this;
        const element = root.querySelectorAll(selector);
        if (element && element.length) {
          resolve(element);
        } else if (elapsedTime >= timeout) {
          reject(
            new Error(
              `Elements with selector "${selector}" did not appear within ${timeout} milliseconds`,
            ),
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
}
export class CustomElement extends HTMLElement {
  constructor() {
    super();
    attachShadow(this, {
      mode: this.elementMeta?.mode || 'open',
      delegatesFocus: this.elementMeta?.delegatesFocus || false,
    });
    if (this.bindEmitters) {
      this.bindEmitters();
    }
    if (this.bindListeners) {
      this.bindListeners();
    }
    if (this.onInit) {
      this.onInit();
    }
  }
  get$(selector) {
    return this.shadowRoot
      ? this.shadowRoot.querySelector(selector)
      : this.querySelector(selector);
  }
  getAll$(selector) {
    return this.shadowRoot
      ? this.shadowRoot.querySelectorAll(selector)
      : this.querySelectorAll(selector);
  }
  wait$(selector, timeout = 60000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const interval = 100; // Check every 100 milliseconds
      const checkForElement = () => {
        const elapsedTime = Date.now() - startTime;
        const root = this.shadowRoot ? this.shadowRoot : this;
        const element = root.querySelector(selector);
        if (element) {
          resolve(element);
        } else if (elapsedTime >= timeout) {
          reject(
            new Error(
              `Element with selector "${selector}" did not appear within ${timeout} milliseconds`,
            ),
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
  waitAll$(selector, timeout = 60000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const interval = 100; // Check every 100 milliseconds
      const checkForElement = () => {
        const elapsedTime = Date.now() - startTime;
        const root = this.shadowRoot ? this.shadowRoot : this;
        const element = root.querySelectorAll(selector);
        if (element && element.length) {
          resolve(element);
        } else if (elapsedTime >= timeout) {
          reject(
            new Error(
              `Elements with selector "${selector}" did not appear within ${timeout} milliseconds`,
            ),
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
}
export class FormElement extends CustomElement {
  static get formAssociated() {
    return true;
  }
  constructor() {
    super();
    this.$internals = this.attachInternals();
  }
}
