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
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}

export class PseudoElement extends HTMLElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}

export class CustomElement extends HTMLElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}

export class AllCollectionComponent extends HTMLAllCollection {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class AnchorComponent extends HTMLAnchorElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class AreaComponent extends HTMLAreaElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class AudioComponent extends HTMLAudioElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class BRComponent extends HTMLBRElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class BodyComponent extends HTMLBodyElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
export class ButtonComponent extends HTMLButtonElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class CanvasComponent extends HTMLCanvasElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class CollectionComponent extends HTMLCollection {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
// export class ContentComponent extends HTMLContentElement {
//   onInit: OnInit;
//   setState: SetState;
//   onDestroy: OnDestroy;
//   constructor() {
//     super();
//     if (this.onInit) { this.onInit(); }
//   }
// }
export class DListComponent extends HTMLDListElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class DataComponent extends HTMLDataElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class DataListComponent extends HTMLDataListElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class DetailsComponent extends HTMLDetailsElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class DialogComponent extends HTMLDialogElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}

export class DivComponent extends HTMLDivElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
// export class DocumentComponent extends HTMLDocumentElement {
//     onInit: OnInit;
//     setState: SetState;
//     onDestroy: OnDestroy;
//     constructor() {
//         super();
//         attachShadow(this);
//     }
// }
export class EmbedComponent extends HTMLEmbedElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class FieldSetComponent extends HTMLFieldSetElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class FormControlsComponent extends HTMLFormControlsCollection {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class FormComponent extends HTMLFormElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class HRComponent extends HTMLHRElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class HeadComponent extends HTMLHeadElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class HeadingComponent extends HTMLHeadingElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
export class HtmlComponent extends HTMLHtmlElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class IFrameComponent extends HTMLIFrameElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class ImageComponent extends HTMLImageElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class InputComponent extends HTMLInputElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class LIComponent extends HTMLLIElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class LabelComponent extends HTMLLabelElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class LegendComponent extends HTMLLegendElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class LinkComponent extends HTMLLinkElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class MapComponent extends HTMLMapElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}

export class MediaComponent extends HTMLMediaElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class MenuComponent extends HTMLMenuElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class MetaComponent extends HTMLMetaElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class MeterComponent extends HTMLMeterElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class ModComponent extends HTMLModElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class OListComponent extends HTMLOListElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class ObjectComponent extends HTMLObjectElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class OptGroupComponent extends HTMLOptGroupElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class OptionComponent extends HTMLOptionElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class OptionsCollectionComponent extends HTMLOptionsCollection {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class OutputComponent extends HTMLOutputElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class ParagraphComponent extends HTMLParagraphElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
export class ParamComponent extends HTMLParamElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class PictureComponent extends HTMLPictureElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class PreComponent extends HTMLPreElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class ProgressComponent extends HTMLProgressElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class QuoteComponent extends HTMLQuoteElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class ScriptComponent extends HTMLScriptElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class SelectComponent extends HTMLSelectElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
// export class ShadowComponent extends HTMLShadowElement {
//   onInit: OnInit;
//   setState: SetState;
//   onDestroy: OnDestroy;
//   constructor() {
//     super();
//     if (this.onInit) { this.onInit(); }
//   }
// }
export class SlotComponent extends HTMLSlotElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class SourceComponent extends HTMLSourceElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class SpanComponent extends HTMLSpanElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
export class StyleComponent extends HTMLStyleElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TableCaptionComponent extends HTMLTableCaptionElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TableCellComponent extends HTMLTableCellElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TableColComponent extends HTMLTableColElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TableComponent extends HTMLTableElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}

export class TableRowComponent extends HTMLTableRowElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class TableSectionComponent extends HTMLTableSectionElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class TemplateComponent extends HTMLTemplateElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
// export class TextareaComponent extends HTMLTextareaElement {
//     onInit: OnInit;
//     setState: SetState;
//     onDestroy: OnDestroy;
//     constructor() {
//         super();
//     }
// }
export class TimeComponent extends HTMLTimeElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class TitleComponent extends HTMLTitleElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TrackComponent extends HTMLTrackElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class UListComponent extends HTMLUListElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class UnknownComponent extends HTMLUnknownElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}

export class VideoComponent extends HTMLVideoElement {
  onInit: OnInit;
  setState: SetState;
  onDestroy: OnDestroy;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
