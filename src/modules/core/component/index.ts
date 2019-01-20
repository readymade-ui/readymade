import { attachDOM, attachShadow, attachStyle } from './../element/index';

export class StructuralElement extends HTMLElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}

export class PseudoElement extends HTMLElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}

export class CustomElement extends HTMLElement {
  onInit: Function;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}

export class AllCollectionComponent extends HTMLAllCollection {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class AnchorComponent extends HTMLAnchorElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class AreaComponent extends HTMLAreaElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class AudioComponent extends HTMLAudioElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class BRComponent extends HTMLBRElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class BodyComponent extends HTMLBodyElement {
  onInit: Function;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
export class ButtonComponent extends HTMLButtonElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class CanvasComponent extends HTMLCanvasElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class CollectionComponent extends HTMLCollection {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
// export class ContentComponent extends HTMLContentElement {
//   onInit: Function;
//   constructor() {
//     super();
//     if (this.onInit) { this.onInit(); }
//   }
// }
export class DListComponent extends HTMLDListElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class DataComponent extends HTMLDataElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class DataListComponent extends HTMLDataListElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class DetailsComponent extends HTMLDetailsElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class DialogComponent extends HTMLDialogElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}

export class DivComponent extends HTMLDivElement {
  onInit: Function;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
// export class DocumentComponent extends HTMLDocumentElement {
//     onInit: Function;
//     constructor() {
//         super();
//         attachShadow(this);
//     }
// }
export class EmbedComponent extends HTMLEmbedElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class FieldSetComponent extends HTMLFieldSetElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class FormControlsComponent extends HTMLFormControlsCollection {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class FormComponent extends HTMLFormElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class HRComponent extends HTMLHRElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class HeadComponent extends HTMLHeadElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class HeadingComponent extends HTMLHeadingElement {
  onInit: Function;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
export class HtmlComponent extends HTMLHtmlElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class IFrameComponent extends HTMLIFrameElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class ImageComponent extends HTMLImageElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class InputComponent extends HTMLInputElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class LIComponent extends HTMLLIElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class LabelComponent extends HTMLLabelElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class LegendComponent extends HTMLLegendElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class LinkComponent extends HTMLLinkElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class MapComponent extends HTMLMapElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}

export class MediaComponent extends HTMLMediaElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class MenuComponent extends HTMLMenuElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class MetaComponent extends HTMLMetaElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class MeterComponent extends HTMLMeterElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class ModComponent extends HTMLModElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class OListComponent extends HTMLOListElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class ObjectComponent extends HTMLObjectElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class OptGroupComponent extends HTMLOptGroupElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class OptionComponent extends HTMLOptionElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class OptionsCollectionComponent extends HTMLOptionsCollection {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class OutputComponent extends HTMLOutputElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class ParagraphComponent extends HTMLParagraphElement {
  onInit: Function;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
export class ParamComponent extends HTMLParamElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class PictureComponent extends HTMLPictureElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class PreComponent extends HTMLPreElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class ProgressComponent extends HTMLProgressElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class QuoteComponent extends HTMLQuoteElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class ScriptComponent extends HTMLScriptElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class SelectComponent extends HTMLSelectElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
// export class ShadowComponent extends HTMLShadowElement {
//   onInit: Function;
//   constructor() {
//     super();
//     if (this.onInit) { this.onInit(); }
//   }
// }
export class SlotComponent extends HTMLSlotElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class SourceComponent extends HTMLSourceElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class SpanComponent extends HTMLSpanElement {
  onInit: Function;
  constructor() {
    super();
    attachShadow(this, { mode: 'open' });
    if (this.onInit) { this.onInit(); }
  }
}
export class StyleComponent extends HTMLStyleElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TableCaptionComponent extends HTMLTableCaptionElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TableCellComponent extends HTMLTableCellElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TableColComponent extends HTMLTableColElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TableComponent extends HTMLTableElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}

export class TableRowComponent extends HTMLTableRowElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class TableSectionComponent extends HTMLTableSectionElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class TemplateComponent extends HTMLTemplateElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
// export class TextareaComponent extends HTMLTextareaElement {
//     onInit: Function;
//     constructor() {
//         super();
//     }
// }
export class TimeComponent extends HTMLTimeElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class TitleComponent extends HTMLTitleElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class TrackComponent extends HTMLTrackElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}
export class UListComponent extends HTMLUListElement {
  onInit: Function;
  constructor() {
    super();
    attachDOM(this);
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
export class UnknownComponent extends HTMLUnknownElement {
  onInit: Function;
  constructor() {
    super();
    if (this.onInit) { this.onInit(); }
  }
}

export class VideoComponent extends HTMLVideoElement {
  onInit: Function;
  constructor() {
    super();
    attachStyle(this);
    if (this.onInit) { this.onInit(); }
  }
}
