import { ElementMeta, EMIT_KEY, LISTEN_KEY } from '../decorator';
import { attachDOM, attachShadow, attachStyle } from '../element';
import { EventDispatcher } from '../event';

export type OnInit = () => void;

/**
 * Taken from https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/818/files
 * until these type definitions make it into dom.d.ts
 */

export interface ValidityStateFlags {
  badInput?: boolean;
  customError?: boolean;
  patternMismatch?: boolean;
  rangeOverflow?: boolean;
  rangeUnderflow?: boolean;
  stepMismatch?: boolean;
  tooLong?: boolean;
  tooShort?: boolean;
  typeMismatch?: boolean;
  valueMissing?: boolean;
}

interface IElementInternals extends ElementInternals {
  /**
   * Returns the form owner of internals's target element.
   */
  readonly form: HTMLFormElement | null;
  /**
   * Returns a NodeList of all the label elements that internals's target element is associated with.
   */
  readonly labels: NodeList;
  /**
   * Returns the error message that would be shown to the user if internals's target element was to be checked for validity.
   */
  readonly validationMessage: string;
  /**
   * Returns the ValidityState object for internals's target element.
   */
  readonly validity: ValidityState;
  /**
   * Returns true if internals's target element will be validated when the form is submitted; false otherwise.
   */
  readonly willValidate: boolean;
  /**
   * Returns true if internals's target element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.
   */
  checkValidity(): boolean;
  /**
   * Returns true if internals's target element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user.
   */
  reportValidity(): boolean;
  /**
   * Sets both the state and submission value of internals's target element to value.
   *
   * If value is null, the element won't participate in form submission.
   */
  setFormValue(
    value: File | string | FormData | null,
    state?: File | string | FormData | null
  ): void;
  /**
   * Marks internals's target element as suffering from the constraints indicated by the flags argument, and sets the element's validation message to message. If anchor is specified, the user agent might use it to indicate problems with the constraints of internals's target element when the form owner is validated interactively or reportValidity() is called.
   */
  setValidity(
    flags: ValidityStateFlags,
    message?: string,
    anchor?: HTMLElement
  ): void;
}

export declare var IElementInternals: {
  prototype: IElementInternals;
  new (): IElementInternals;
};

export interface StateChange {
  [key: string]: {
    previousValue: any;
    newValue: any;
  };
}

export type OnStateChange = (
  change: StateChange,
  cb: (change: StateChange) => void
) => void;

export type SetState = (property: string, model: any) => void;

export type OnDestroy = () => void;

export function bindListeners(target: any) {
  for (const prop in target) {
    if (prop.includes(LISTEN_KEY)) {
      this[prop].onListener.call(this);
    }
  }
}

export function bindEmitters(target: any) {
  for (const prop in target) {
    if (prop.includes(EMIT_KEY)) {
      target[prop].call(target);
    }
  }
}

export class StructuralElement extends HTMLElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
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
  public onInit?(): void;
  public bindEmitters?(): void;
  public bindListeners?(): void;
  public bindState?(): void;
  public onUpdate?(): void;
  public onDestroy?(): void;
  public get$(selector: string) {
    return this.shadowRoot
      ? this.shadowRoot.querySelector(selector)
      : this.querySelector(selector);
  }
  public getAll$(selector: string) {
    return this.shadowRoot
      ? this.shadowRoot.querySelectorAll(selector)
      : this.querySelectorAll(selector);
  }
  public wait$(selector: string, timeout = 60000): Promise<any> {
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
              `Element with selector "${selector}" did not appear within ${timeout} milliseconds`
            )
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
  public waitAll$(selector: string, timeout = 60000): Promise<any> {
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
              `Elements with selector "${selector}" did not appear within ${timeout} milliseconds`
            )
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
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
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
  public onInit?(): void;
  public bindEmitters?(): void;
  public bindListeners?(): void;
  public bindState?(): void;
  public setState?(property: string, model: any): void;
  public onUpdate?(): void;
  public onDestroy?(): void;
  public get$(selector: string) {
    return this.shadowRoot
      ? this.shadowRoot.querySelector(selector)
      : this.querySelector(selector);
  }
  public getAll$(selector: string) {
    return this.shadowRoot
      ? this.shadowRoot.querySelectorAll(selector)
      : this.querySelectorAll(selector);
  }
  public wait$(selector: string, timeout = 60000): Promise<any> {
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
              `Element with selector "${selector}" did not appear within ${timeout} milliseconds`
            )
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
  public waitAll$(selector: string, timeout = 60000): Promise<any> {
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
              `Elements with selector "${selector}" did not appear within ${timeout} milliseconds`
            )
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
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
    attachShadow(this, {
      mode: this.elementMeta?.mode || 'open',
      delegatesFocus: this.elementMeta?.delegatesFocus || false
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
  public onInit?(): void;
  public bindEmitters?(): void;
  public bindListeners?(): void;
  public bindState?(): void;
  public setState?(property: string, model: any): void;
  public onUpdate?(): void;
  public onDestroy?(): void;
  public get$(selector: string) {
    return this.shadowRoot
      ? this.shadowRoot.querySelector(selector)
      : this.querySelector(selector);
  }
  public getAll$(selector: string) {
    return this.shadowRoot
      ? this.shadowRoot.querySelectorAll(selector)
      : this.querySelectorAll(selector);
  }
  public wait$(selector: string, timeout = 60000): Promise<any> {
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
              `Element with selector "${selector}" did not appear within ${timeout} milliseconds`
            )
          );
        } else {
          setTimeout(checkForElement, interval);
        }
      };
      checkForElement();
    });
  }
  public waitAll$(selector: string, timeout = 60000): Promise<any> {
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
              `Elements with selector "${selector}" did not appear within ${timeout} milliseconds`
            )
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
  $internals?: IElementInternals;
  static get formAssociated() {
    return true;
  }
  constructor() {
    super();
    this.$internals = this.attachInternals();
  }
  onValidate?(): void;
}
