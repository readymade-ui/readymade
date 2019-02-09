import { attachDOM, attachShadow, attachStyle } from './../element/element.js';
import { EventDispatcher } from './../event/event.js';
import { ElementMeta } from './../decorator/decorator.js';

export interface OnInit {
    () : void;
}

export interface StateChange {
  [key: string] : {
    previousValue: any,
    newValue: any
  }
}

export interface OnStateChange {
    (change: StateChange) : void;
}

export interface SetState {
    (property: string, model: any) : void;
}

export interface OnDestroy {
    () : void;
}

function bindListeners(target: any) {
  for (let prop in target) {
    if (prop.includes('$listen')) {
      this[prop].onListener.call(this);
    }
  }
}

function bindEmitters(target: any) {
  for (let prop in target) {
    if (prop.includes('$emit')) {
      target[prop].call(target);
    }
  }
}

export class StructuralElement extends HTMLElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class PseudoElement extends HTMLElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}


export class CustomElement extends HTMLElement {
  emitter: EventDispatcher;
  elementMeta: ElementMeta;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class AllCollectionComponent extends HTMLAllCollection {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class AnchorComponent extends HTMLAnchorElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class AreaComponent extends HTMLAreaElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class AudioComponent extends HTMLAudioElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class BRComponent extends HTMLBRElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class BodyComponent extends HTMLBodyElement {
  emitter: EventDispatcher;
  elementMeta: ElementMeta;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ButtonComponent extends HTMLButtonElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class CanvasComponent extends HTMLCanvasElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class CollectionComponent extends HTMLCollection {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class DListComponent extends HTMLDListElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class DataComponent extends HTMLDataElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class DataListComponent extends HTMLDataListElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class DetailsComponent extends HTMLDetailsElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class DialogComponent extends HTMLDialogElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class DivComponent extends HTMLDivElement {
  emitter: EventDispatcher;
  elementMeta: ElementMeta;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class EmbedComponent extends HTMLEmbedElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class FieldSetComponent extends HTMLFieldSetElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class FormControlsComponent extends HTMLFormControlsCollection {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class FormComponent extends HTMLFormElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class HRComponent extends HTMLHRElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class HeadComponent extends HTMLHeadElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class HeadingComponent extends HTMLHeadingElement {
  emitter: EventDispatcher;
  elementMeta: ElementMeta;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class HtmlComponent extends HTMLHtmlElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class IFrameComponent extends HTMLIFrameElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ImageComponent extends HTMLImageElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class InputComponent extends HTMLInputElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class LIComponent extends HTMLLIElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class LabelComponent extends HTMLLabelElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class LegendComponent extends HTMLLegendElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class LinkComponent extends HTMLLinkElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class MapComponent extends HTMLMapElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class MediaComponent extends HTMLMediaElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class MenuComponent extends HTMLMenuElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class MetaComponent extends HTMLMetaElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class MeterComponent extends HTMLMeterElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ModComponent extends HTMLModElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class OListComponent extends HTMLOListElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ObjectComponent extends HTMLObjectElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class OptGroupComponent extends HTMLOptGroupElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class OptionComponent extends HTMLOptionElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class OptionsCollectionComponent extends HTMLOptionsCollection {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class OutputComponent extends HTMLOutputElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ParagraphComponent extends HTMLParagraphElement {
  emitter: EventDispatcher;
  elementMeta: ElementMeta;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ParamComponent extends HTMLParamElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class PictureComponent extends HTMLPictureElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class PreComponent extends HTMLPreElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ProgressComponent extends HTMLProgressElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class QuoteComponent extends HTMLQuoteElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ScriptComponent extends HTMLScriptElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class SelectComponent extends HTMLSelectElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class SlotComponent extends HTMLSlotElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class SourceComponent extends HTMLSourceElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class SpanComponent extends HTMLSpanElement {
  emitter: EventDispatcher;
  elementMeta: ElementMeta;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class StyleComponent extends HTMLStyleElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TableCaptionComponent extends HTMLTableCaptionElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TableCellComponent extends HTMLTableCellElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TableColComponent extends HTMLTableColElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TableComponent extends HTMLTableElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class TableRowComponent extends HTMLTableRowElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TableSectionComponent extends HTMLTableSectionElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TemplateComponent extends HTMLTemplateElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class TimeComponent extends HTMLTimeElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TitleComponent extends HTMLTitleElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TrackComponent extends HTMLTrackElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class UListComponent extends HTMLUListElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class UnknownComponent extends HTMLUnknownElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class VideoComponent extends HTMLVideoElement {
  emitter: EventDispatcher;
  constructor() {
    super();
    attachStyle(this);
    if (this.bindEmitters) this.bindEmitters();
    if (this.bindListeners) this.bindListeners();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  bindEmitters?() : void;
  bindListeners?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
