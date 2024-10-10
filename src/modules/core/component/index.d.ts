import { ElementMeta } from '../decorator';
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
    state?: File | string | FormData | null,
  ): void;
  /**
   * Marks internals's target element as suffering from the constraints indicated by the flags argument, and sets the element's validation message to message. If anchor is specified, the user agent might use it to indicate problems with the constraints of internals's target element when the form owner is validated interactively or reportValidity() is called.
   */
  setValidity(
    flags: ValidityStateFlags,
    message?: string,
    anchor?: HTMLElement,
  ): void;
}
export declare const IElementInternals: {
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
  cb: (change: StateChange) => void,
) => void;
export type SetState = (property: string, model: any) => void;
export type OnDestroy = () => void;
export declare function bindListeners(target: any): void;
export declare function bindEmitters(target: any): void;
export declare class StructuralElement extends HTMLElement {
  emitter: EventDispatcher;
  elementMeta: ElementMeta;
  constructor();
  onInit?(): void;
  bindEmitters?(): void;
  bindListeners?(): void;
  bindState?(): void;
  onUpdate?(): void;
  onDestroy?(): void;
  get$(selector: string): Element;
  getAll$(selector: string): NodeListOf<Element>;
  wait$(selector: string, timeout?: number): Promise<any>;
  waitAll$(selector: string, timeout?: number): Promise<any>;
}
export declare class PseudoElement extends HTMLElement {
  emitter: EventDispatcher;
  elementMeta: ElementMeta;
  constructor();
  onInit?(): void;
  bindEmitters?(): void;
  bindListeners?(): void;
  bindState?(): void;
  setState?(property: string, model: any): void;
  onUpdate?(): void;
  onDestroy?(): void;
  get$(selector: string): Element;
  getAll$(selector: string): NodeListOf<Element>;
  wait$(selector: string, timeout?: number): Promise<any>;
  waitAll$(selector: string, timeout?: number): Promise<any>;
}
export declare class CustomElement extends HTMLElement {
  emitter: EventDispatcher;
  elementMeta: ElementMeta;
  shadowRoot: ShadowRoot;
  constructor();
  onInit?(): void;
  bindEmitters?(): void;
  bindListeners?(): void;
  bindState?(): void;
  setState?(property: string, model: any): void;
  onUpdate?(): void;
  onDestroy?(): void;
  get$(selector: string): Element;
  getAll$(selector: string): NodeListOf<Element>;
  wait$(selector: string, timeout?: number): Promise<any>;
  waitAll$(selector: string, timeout?: number): Promise<any>;
}
export declare class FormElement extends CustomElement {
  $internals?: IElementInternals;
  static get formAssociated(): boolean;
  constructor();
  onValidate?(): void;
}
export {};
