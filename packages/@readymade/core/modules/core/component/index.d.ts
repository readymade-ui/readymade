import { EventDispatcher } from './../event/index.js';
export interface OnInit {
    (): void;
}
export interface StateChange {
    [key: string]: {
        previousValue: any;
        newValue: any;
    };
}
export interface OnStateChange {
    (change: StateChange): void;
}
export interface SetState {
    (property: string, model: any): void;
}
export interface OnDestroy {
    (): void;
}
export declare class StructuralElement extends HTMLElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class PseudoElement extends HTMLElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class CustomElement extends HTMLElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class AllCollectionComponent extends HTMLAllCollection {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class AnchorComponent extends HTMLAnchorElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class AreaComponent extends HTMLAreaElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class AudioComponent extends HTMLAudioElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class BRComponent extends HTMLBRElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class BodyComponent extends HTMLBodyElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ButtonComponent extends HTMLButtonElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class CanvasComponent extends HTMLCanvasElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class CollectionComponent extends HTMLCollection {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class DListComponent extends HTMLDListElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class DataComponent extends HTMLDataElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class DataListComponent extends HTMLDataListElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class DetailsComponent extends HTMLDetailsElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class DialogComponent extends HTMLDialogElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class DivComponent extends HTMLDivElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class EmbedComponent extends HTMLEmbedElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class FieldSetComponent extends HTMLFieldSetElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class FormControlsComponent extends HTMLFormControlsCollection {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class FormComponent extends HTMLFormElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class HRComponent extends HTMLHRElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class HeadComponent extends HTMLHeadElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class HeadingComponent extends HTMLHeadingElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class HtmlComponent extends HTMLHtmlElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class IFrameComponent extends HTMLIFrameElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ImageComponent extends HTMLImageElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class InputComponent extends HTMLInputElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class LIComponent extends HTMLLIElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class LabelComponent extends HTMLLabelElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class LegendComponent extends HTMLLegendElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class LinkComponent extends HTMLLinkElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class MapComponent extends HTMLMapElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class MediaComponent extends HTMLMediaElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class MenuComponent extends HTMLMenuElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class MetaComponent extends HTMLMetaElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class MeterComponent extends HTMLMeterElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ModComponent extends HTMLModElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class OListComponent extends HTMLOListElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ObjectComponent extends HTMLObjectElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class OptGroupComponent extends HTMLOptGroupElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class OptionComponent extends HTMLOptionElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class OptionsCollectionComponent extends HTMLOptionsCollection {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class OutputComponent extends HTMLOutputElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ParagraphComponent extends HTMLParagraphElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ParamComponent extends HTMLParamElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class PictureComponent extends HTMLPictureElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class PreComponent extends HTMLPreElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ProgressComponent extends HTMLProgressElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class QuoteComponent extends HTMLQuoteElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class ScriptComponent extends HTMLScriptElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class SelectComponent extends HTMLSelectElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class SlotComponent extends HTMLSlotElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class SourceComponent extends HTMLSourceElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class SpanComponent extends HTMLSpanElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class StyleComponent extends HTMLStyleElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TableCaptionComponent extends HTMLTableCaptionElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TableCellComponent extends HTMLTableCellElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TableColComponent extends HTMLTableColElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TableComponent extends HTMLTableElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TableRowComponent extends HTMLTableRowElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TableSectionComponent extends HTMLTableSectionElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TemplateComponent extends HTMLTemplateElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TimeComponent extends HTMLTimeElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TitleComponent extends HTMLTitleElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class TrackComponent extends HTMLTrackElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class UListComponent extends HTMLUListElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class UnknownComponent extends HTMLUnknownElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
export declare class VideoComponent extends HTMLVideoElement {
    emitter: EventDispatcher;
    constructor();
    onInit?(): void;
    setState?(property: string, model: any): void;
    onDestroy?(): void;
}
