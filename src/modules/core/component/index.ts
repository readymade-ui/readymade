import { attachDOM, attachShadow, attachStyle } from './../element/index';

export class StructuralElement extends HTMLElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}

export class PseudoElement extends HTMLElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}

export class CustomElement extends HTMLElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}

export class AllCollectionComponent extends HTMLAllCollection {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class AnchorComponent extends HTMLAnchorElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class AreaComponent extends HTMLAreaElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class AudioComponent extends HTMLAudioElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class BRComponent extends HTMLBRElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class BodyComponent extends HTMLBodyElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
export class ButtonComponent extends HTMLButtonElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class CanvasComponent extends HTMLCanvasElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class CollectionComponent extends HTMLCollection {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
// export class ContentComponent extends HTMLContentElement {
//   onInit: Function;
setState: Function;
//   constructor() {
//     super();
//     if (this.onInit) { this.onInit(); }
//   }
// }
export class DListComponent extends HTMLDListElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class DataComponent extends HTMLDataElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class DataListComponent extends HTMLDataListElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class DetailsComponent extends HTMLDetailsElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class DialogComponent extends HTMLDialogElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}

export class DivComponent extends HTMLDivElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
// export class DocumentComponent extends HTMLDocumentElement {
//     onInit: Function;
setState: Function;
//     constructor() {
//         super();
//         attachShadow(this);
//     }
// }
export class EmbedComponent extends HTMLEmbedElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class FieldSetComponent extends HTMLFieldSetElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class FormControlsComponent extends HTMLFormControlsCollection {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class FormComponent extends HTMLFormElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class HRComponent extends HTMLHRElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class HeadComponent extends HTMLHeadElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class HeadingComponent extends HTMLHeadingElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
export class HtmlComponent extends HTMLHtmlElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class IFrameComponent extends HTMLIFrameElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class ImageComponent extends HTMLImageElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class InputComponent extends HTMLInputElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class LIComponent extends HTMLLIElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class LabelComponent extends HTMLLabelElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class LegendComponent extends HTMLLegendElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class LinkComponent extends HTMLLinkElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class MapComponent extends HTMLMapElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}

export class MediaComponent extends HTMLMediaElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class MenuComponent extends HTMLMenuElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class MetaComponent extends HTMLMetaElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class MeterComponent extends HTMLMeterElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class ModComponent extends HTMLModElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class OListComponent extends HTMLOListElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class ObjectComponent extends HTMLObjectElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class OptGroupComponent extends HTMLOptGroupElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class OptionComponent extends HTMLOptionElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class OptionsCollectionComponent extends HTMLOptionsCollection {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class OutputComponent extends HTMLOutputElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class ParagraphComponent extends HTMLParagraphElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
export class ParamComponent extends HTMLParamElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class PictureComponent extends HTMLPictureElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class PreComponent extends HTMLPreElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class ProgressComponent extends HTMLProgressElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class QuoteComponent extends HTMLQuoteElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class ScriptComponent extends HTMLScriptElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class SelectComponent extends HTMLSelectElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
// export class ShadowComponent extends HTMLShadowElement {
//   onInit: Function;
setState: Function;
//   constructor() {
//     super();
//     if (this.onInit) { this.onInit(); }
//   }
// }
export class SlotComponent extends HTMLSlotElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class SourceComponent extends HTMLSourceElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class SpanComponent extends HTMLSpanElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
export class StyleComponent extends HTMLStyleElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TableCaptionComponent extends HTMLTableCaptionElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TableCellComponent extends HTMLTableCellElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TableColComponent extends HTMLTableColElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TableComponent extends HTMLTableElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}

export class TableRowComponent extends HTMLTableRowElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class TableSectionComponent extends HTMLTableSectionElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class TemplateComponent extends HTMLTemplateElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
// export class TextareaComponent extends HTMLTextareaElement {
//     onInit: Function;
setState: Function;
//     constructor() {
//         super();
//     }
// }
export class TimeComponent extends HTMLTimeElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class TitleComponent extends HTMLTitleElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TrackComponent extends HTMLTrackElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class UListComponent extends HTMLUListElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class UnknownComponent extends HTMLUnknownElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}

export class VideoComponent extends HTMLVideoElement {
  onInit: Function;
  setState: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
