import { ElementMeta } from '../../core/decorator';
import { attachDOM, attachShadow, attachStyle } from '../../core/element';
import { EventDispatcher } from '../../core/event';

export class AllCollectionComponent extends HTMLAllCollection {
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
  public setState?(property: string, model: any): void;
  public onUpdate?(): void;
  public onDestroy?(): void;
}
export class AnchorComponent extends HTMLAnchorElement {
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
export class AreaComponent extends HTMLAreaElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class AudioComponent extends HTMLAudioElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class BRComponent extends HTMLBRElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class BodyComponent extends HTMLBodyElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
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
  public onInit?(): void;
  public bindEmitters?(): void;
  public bindListeners?(): void;
  public bindState?(): void;
  public setState?(property: string, model: any): void;
  public onUpdate?(): void;
  public onDestroy?(): void;
}
export class ButtonComponent extends HTMLButtonElement {
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
export class CanvasComponent extends HTMLCanvasElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class CollectionComponent extends HTMLCollection {
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

export class DListComponent extends HTMLDListElement {
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
export class DataComponent extends HTMLDataElement {
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
export class DetailsComponent extends HTMLDetailsElement {
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

export class DivComponent extends HTMLDivElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
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
  public onInit?(): void;
  public bindEmitters?(): void;
  public bindListeners?(): void;
  public bindState?(): void;
  public setState?(property: string, model: any): void;
  public onUpdate?(): void;
  public onDestroy?(): void;
}

export class EmbedComponent extends HTMLEmbedElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class FieldSetComponent extends HTMLFieldSetElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class FormControlsComponent extends HTMLFormControlsCollection {
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
export class FormComponent extends HTMLFormElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class HRComponent extends HTMLHRElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class HeadComponent extends HTMLHeadElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
    if (this.onInit) {
      this.onInit();
    }
  }
  public onInit?(): void;
  public onUpdate?(): void;
  public onDestroy?(): void;
}
export class HeadingComponent extends HTMLHeadingElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
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
  public onInit?(): void;
  public bindEmitters?(): void;
  public bindListeners?(): void;
  public bindState?(): void;
  public setState?(property: string, model: any): void;
  public onUpdate?(): void;
  public onDestroy?(): void;
}
export class HtmlComponent extends HTMLHtmlElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
    if (this.onInit) {
      this.onInit();
    }
  }
  public onInit?(): void;
  public setState?(property: string, model: any): void;
  public onUpdate?(): void;
  public onDestroy?(): void;
}
export class IFrameComponent extends HTMLIFrameElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class ImageComponent extends HTMLImageElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class InputComponent extends HTMLInputElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class LIComponent extends HTMLLIElement {
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
export class LabelComponent extends HTMLLabelElement {
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
export class LegendComponent extends HTMLLegendElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class LinkComponent extends HTMLLinkElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class MapComponent extends HTMLMapElement {
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

export class MediaComponent extends HTMLMediaElement {
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
export class MenuComponent extends HTMLMenuElement {
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
export class MetaComponent extends HTMLMetaElement {
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
export class MeterComponent extends HTMLMeterElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class ModComponent extends HTMLModElement {
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
export class OListComponent extends HTMLOListElement {
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
export class ObjectComponent extends HTMLObjectElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class OptGroupComponent extends HTMLOptGroupElement {
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
export class OptionComponent extends HTMLOptionElement {
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
export class OptionsCollectionComponent extends HTMLOptionsCollection {
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
export class OutputComponent extends HTMLOutputElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class ParagraphComponent extends HTMLParagraphElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
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
  public onInit?(): void;
  public bindEmitters?(): void;
  public bindListeners?(): void;
  public bindState?(): void;
  public setState?(property: string, model: any): void;
  public onUpdate?(): void;
  public onDestroy?(): void;
}
export class ParamComponent extends HTMLParamElement {
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
export class PictureComponent extends HTMLPictureElement {
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
export class PreComponent extends HTMLPreElement {
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
export class ProgressComponent extends HTMLProgressElement {
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
export class QuoteComponent extends HTMLQuoteElement {
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
export class ScriptComponent extends HTMLScriptElement {
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
export class SelectComponent extends HTMLSelectElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
  public onUpdate?(): void;
  public onDestroy?(): void;
}

export class SlotComponent extends HTMLSlotElement {
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
export class SourceComponent extends HTMLSourceElement {
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
export class SpanComponent extends HTMLSpanElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
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
  public onInit?(): void;
  public bindEmitters?(): void;
  public bindListeners?(): void;
  public bindState?(): void;
  public setState?(property: string, model: any): void;
  public onUpdate?(): void;
  public onDestroy?(): void;
}
export class StyleComponent extends HTMLStyleElement {
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
export class TableCaptionComponent extends HTMLTableCaptionElement {
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
export class TableCellComponent extends HTMLTableCellElement {
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
export class TableColComponent extends HTMLTableColElement {
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
export class TableComponent extends HTMLTableElement {
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

export class TableRowComponent extends HTMLTableRowElement {
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
export class TableSectionComponent extends HTMLTableSectionElement {
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
export class TemplateComponent extends HTMLTemplateElement {
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

export class TextAreaComponent extends HTMLTextAreaElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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

export class TimeComponent extends HTMLTimeElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
export class TitleComponent extends HTMLTitleElement {
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
export class TrackComponent extends HTMLTrackElement {
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
export class UListComponent extends HTMLUListElement {
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
export class UnknownComponent extends HTMLUnknownElement {
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

export class VideoComponent extends HTMLVideoElement {
  public emitter: EventDispatcher;
  public elementMeta: ElementMeta;
  constructor() {
    super();
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
