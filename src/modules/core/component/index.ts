import { attachDOM, attachShadow, attachStyle } from './../element/index';

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

export class StructuralElement extends HTMLElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class PseudoElement extends HTMLElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class CustomElement extends HTMLElement {

  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class AllCollectionComponent extends HTMLAllCollection {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class AnchorComponent extends HTMLAnchorElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class AreaComponent extends HTMLAreaElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class AudioComponent extends HTMLAudioElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class BRComponent extends HTMLBRElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class BodyComponent extends HTMLBodyElement {
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ButtonComponent extends HTMLButtonElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class CanvasComponent extends HTMLCanvasElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class CollectionComponent extends HTMLCollection {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class DListComponent extends HTMLDListElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class DataComponent extends HTMLDataElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class DataListComponent extends HTMLDataListElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class DetailsComponent extends HTMLDetailsElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class DialogComponent extends HTMLDialogElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class DivComponent extends HTMLDivElement {
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class EmbedComponent extends HTMLEmbedElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class FieldSetComponent extends HTMLFieldSetElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class FormControlsComponent extends HTMLFormControlsCollection {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class FormComponent extends HTMLFormElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class HRComponent extends HTMLHRElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class HeadComponent extends HTMLHeadElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class HeadingComponent extends HTMLHeadingElement {
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class HtmlComponent extends HTMLHtmlElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class IFrameComponent extends HTMLIFrameElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ImageComponent extends HTMLImageElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class InputComponent extends HTMLInputElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class LIComponent extends HTMLLIElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class LabelComponent extends HTMLLabelElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class LegendComponent extends HTMLLegendElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class LinkComponent extends HTMLLinkElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class MapComponent extends HTMLMapElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class MediaComponent extends HTMLMediaElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class MenuComponent extends HTMLMenuElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class MetaComponent extends HTMLMetaElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class MeterComponent extends HTMLMeterElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ModComponent extends HTMLModElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class OListComponent extends HTMLOListElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ObjectComponent extends HTMLObjectElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class OptGroupComponent extends HTMLOptGroupElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class OptionComponent extends HTMLOptionElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class OptionsCollectionComponent extends HTMLOptionsCollection {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class OutputComponent extends HTMLOutputElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ParagraphComponent extends HTMLParagraphElement {
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ParamComponent extends HTMLParamElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class PictureComponent extends HTMLPictureElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class PreComponent extends HTMLPreElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ProgressComponent extends HTMLProgressElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class QuoteComponent extends HTMLQuoteElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class ScriptComponent extends HTMLScriptElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class SelectComponent extends HTMLSelectElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class SlotComponent extends HTMLSlotElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class SourceComponent extends HTMLSourceElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class SpanComponent extends HTMLSpanElement {
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class StyleComponent extends HTMLStyleElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TableCaptionComponent extends HTMLTableCaptionElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TableCellComponent extends HTMLTableCellElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TableColComponent extends HTMLTableColElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TableComponent extends HTMLTableElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class TableRowComponent extends HTMLTableRowElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TableSectionComponent extends HTMLTableSectionElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TemplateComponent extends HTMLTemplateElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class TimeComponent extends HTMLTimeElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TitleComponent extends HTMLTitleElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class TrackComponent extends HTMLTrackElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class UListComponent extends HTMLUListElement {
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
export class UnknownComponent extends HTMLUnknownElement {
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}

export class VideoComponent extends HTMLVideoElement {
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
  onInit?() : void;
  setState?(property: string, model: any) : void;
  onDestroy?() : void;
}
