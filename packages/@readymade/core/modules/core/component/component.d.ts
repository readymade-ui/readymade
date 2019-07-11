import { ElementMeta } from './../decorator/decorator.js';
import { EventDispatcher } from './../event/event.js';
export declare type OnInit = () => void;
export interface StateChange {
    [key: string]: {
        previousValue: any;
        newValue: any;
    };
}
export declare type OnStateChange = (change: StateChange) => void;
export declare type SetState = (property: string, model: any) => void;
export declare type OnDestroy = () => void;
export declare class StructuralElement extends HTMLElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
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
    onDestroy?(): void;
}
export declare class CustomElement extends HTMLElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class AllCollectionComponent extends HTMLAllCollection {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class AnchorComponent extends HTMLAnchorElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class AreaComponent extends HTMLAreaElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class AudioComponent extends HTMLAudioElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class BRComponent extends HTMLBRElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class BodyComponent extends HTMLBodyElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ButtonComponent extends HTMLButtonElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class CanvasComponent extends HTMLCanvasElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class CollectionComponent extends HTMLCollection {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class DListComponent extends HTMLDListElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class DataComponent extends HTMLDataElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class DetailsComponent extends HTMLDetailsElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class DivComponent extends HTMLDivElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class EmbedComponent extends HTMLEmbedElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class FieldSetComponent extends HTMLFieldSetElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class FormControlsComponent extends HTMLFormControlsCollection {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class FormComponent extends HTMLFormElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class HRComponent extends HTMLHRElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class HeadComponent extends HTMLHeadElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    onDestroy?(): void;
}
export declare class HeadingComponent extends HTMLHeadingElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class HtmlComponent extends HTMLHtmlElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class IFrameComponent extends HTMLIFrameElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ImageComponent extends HTMLImageElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class InputComponent extends HTMLInputElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class LIComponent extends HTMLLIElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class LabelComponent extends HTMLLabelElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class LegendComponent extends HTMLLegendElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class LinkComponent extends HTMLLinkElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class MapComponent extends HTMLMapElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class MediaComponent extends HTMLMediaElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class MenuComponent extends HTMLMenuElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class MetaComponent extends HTMLMetaElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class MeterComponent extends HTMLMeterElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ModComponent extends HTMLModElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class OListComponent extends HTMLOListElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ObjectComponent extends HTMLObjectElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class OptGroupComponent extends HTMLOptGroupElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class OptionComponent extends HTMLOptionElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class OptionsCollectionComponent extends HTMLOptionsCollection {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class OutputComponent extends HTMLOutputElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ParagraphComponent extends HTMLParagraphElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ParamComponent extends HTMLParamElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class PictureComponent extends HTMLPictureElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class PreComponent extends HTMLPreElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ProgressComponent extends HTMLProgressElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class QuoteComponent extends HTMLQuoteElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class ScriptComponent extends HTMLScriptElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class SelectComponent extends HTMLSelectElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class SlotComponent extends HTMLSlotElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class SourceComponent extends HTMLSourceElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class SpanComponent extends HTMLSpanElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class StyleComponent extends HTMLStyleElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class TableCaptionComponent extends HTMLTableCaptionElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class TableCellComponent extends HTMLTableCellElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class TableColComponent extends HTMLTableColElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class TableComponent extends HTMLTableElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TableRowComponent extends HTMLTableRowElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TableSectionComponent extends HTMLTableSectionElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TemplateComponent extends HTMLTemplateElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class TimeComponent extends HTMLTimeElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TitleComponent extends HTMLTitleElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class TrackComponent extends HTMLTrackElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class UListComponent extends HTMLUListElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class UnknownComponent extends HTMLUnknownElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    onDestroy?(): void;
}
export declare class VideoComponent extends HTMLVideoElement {
    emitter: EventDispatcher;
    elementMeta: ElementMeta;
    constructor();
    onInit?(): void;
    bindEmitters?(): void;
    bindListeners?(): void;
    bindState?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
