import { ElementMeta, EMIT_KEY, LISTEN_KEY } from '../decorator';
import { attachDOM, attachShadow, attachStyle } from '../element';
import { EventDispatcher } from '../event';

export type OnInit = () => void;

export interface StateChange {
  [key: string]: {
    previousValue: any;
    newValue: any;
  };
}

export interface Aom {
  ariaAtomic: string;
  ariaAutoComplete: string;
  ariaBusy: string;
  ariaChecked: string;
  ariaColCount: string;
  ariaColIndex: string;
  ariaColSpan: string;
  ariaCurrent: string;
  ariaDisabled: string;
  ariaExpanded: string;
  ariaHasPopup: string;
  ariaHidden: string;
  ariaKeyShortcuts: string;
  ariaLabel: string;
  ariaLevel: string;
  ariaLive: string;
  ariaModal: string;
  ariaMultiLine: string;
  ariaMultiSelectable: string;
  ariaOrientation: string;
  ariaPlaceholder: string;
  ariaPosInSet: string;
  ariaPressed: string;
  ariaReadOnly: string;
  ariaRelevant: string;
  ariaRequired: string;
  ariaRoleDescription: string;
  ariaRowCount: string;
  ariaRowIndex: string;
  ariaRowSpan: string;
  ariaSelected: string;
  ariaSort: string;
  ariaValueMax: string;
  ariaValueMin: string;
  ariaValueNow: string;
  ariaValueText: string;
}

export interface ElementInternals extends Aom {
  checkValidity: () => boolean;
  form: HTMLFormElement;
  labels: NodeListOf<HTMLLabelElement> | [];
  reportValidity: () => boolean;
  setFormValue: (value: string | FormData) => void;
  setValidity: (
    validityChanges: Partial<globalThis.ValidityState>,
    validationMessage?: string,
    anchor?: HTMLElement
  ) => void;
  validationMessage: string;
  validity: globalThis.ValidityState;
  willValidate: boolean;
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
}

export class CustomElement extends HTMLElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
    attachShadow(this, {
      mode: this.elementMeta.mode || 'open',
      delegatesFocus: this.elementMeta.delegatesFocus || false
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
}

export class FormElement extends CustomElement {
  ariaAtomic: string;
  ariaAutoComplete: string;
  ariaBusy: string;
  ariaChecked: string;
  ariaColCount: string;
  ariaColIndex: string;
  ariaColSpan: string;
  ariaCurrent: string;
  ariaDisabled: string;
  ariaExpanded: string;
  ariaHasPopup: string;
  ariaHidden: string;
  ariaKeyShortcuts: string;
  ariaLabel: string;
  ariaLevel: string;
  ariaLive: string;
  ariaModal: string;
  ariaMultiLine: string;
  ariaMultiSelectable: string;
  ariaOrientation: string;
  ariaPlaceholder: string;
  ariaPosInSet: string;
  ariaPressed: string;
  ariaReadOnly: string;
  ariaRelevant: string;
  ariaRequired: string;
  ariaRoleDescription: string;
  ariaRowCount: string;
  ariaRowIndex: string;
  ariaRowSpan: string;
  ariaSelected: string;
  ariaSort: string;
  ariaValueMax: string;
  ariaValueMin: string;
  ariaValueNow: string;
  ariaValueText: string;
  form: HTMLFormElement;
  labels: NodeListOf<HTMLLabelElement> | [];
  validationMessage: string;
  validity: globalThis.ValidityState;
  willValidate: boolean;
  disabled?: boolean;
  $elem?: any;
  name?: string;
  value?: any;
  checked?: boolean;
  $internals?: ElementInternals;
  static get formAssociated() {
    return true;
  }
  constructor() {
    super();
    this.$internals = this.attachInternals();
  }
  reportValidity?(): boolean;
  setFormValue?(value: string | FormData): void;
  setValidity?(
    validityChanges: Partial<globalThis.ValidityState>,
    validationMessage?: string,
    anchor?: HTMLElement
  ): void;
  checkValidity?(): boolean;
  formDisabledCallback?(disabled: boolean): void;
  formResetCallback?(): void;
  formAssociatedCallback?(form: HTMLFormElement): void;
  onValidate?(): void;
}
