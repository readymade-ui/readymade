import { installWindowOnGlobal } from '@lit-labs/ssr/lib/dom-shim.js';

const attributes = new WeakMap();
const attributesForElement = (element) => {
  let attrs = attributes.get(element);
  if (!attrs) {
    attributes.set(element, (attrs = new Map()));
  }
  return attrs;
};
class Element {}
class HTMLElement extends Element {
  get attributes() {
    return Array.from(attributesForElement(this)).map(([name, value]) => ({
      name,
      value,
    }));
  }
  setAttribute(name, value) {
    attributesForElement(this).set(name, value);
  }
  removeAttribute(name) {
    attributesForElement(this).delete(name);
  }
  hasAttribute(name) {
    return attributesForElement(this).has(name);
  }
  attachShadow() {
    return { host: this };
  }
  getAttribute(name) {
    const value = attributesForElement(this).get(name);
    return value === undefined ? null : value;
  }
}
class HTMLAnchorElement extends HTMLElement {}
class HTMLAreaElement extends HTMLElement {}
class HTMLAllCollection extends HTMLElement {}
class HTMLCollection extends HTMLElement {}
class HTMLAudioElement extends HTMLElement {}
class HTMLBaseElement extends HTMLElement {}
class HTMLBodyElement extends HTMLElement {}
class HTMLBRElement extends HTMLElement {}
class HTMLButtonElement extends HTMLElement {}
class HTMLDListElement extends HTMLElement {}
class HTMLCanvasElement extends HTMLElement {}
class HTMLDataElement extends HTMLElement {}
class HTMLDataListElement extends HTMLElement {}
class HTMLDetailsElement extends HTMLElement {}
class HTMLDialogElement extends HTMLElement {}
class HTMLDivElement extends HTMLElement {}
class HTMLEmbedElement extends HTMLElement {}
class HTMLFieldSetElement extends HTMLElement {}
class HTMLFormElement extends HTMLElement {}
class HTMLFormControlsCollection extends HTMLElement {}
class HTMLHeadingElement extends HTMLElement {}
class HTMLHeadElement extends HTMLElement {}
class HTMLHRElement extends HTMLElement {}
class HTMLHtmlElement extends HTMLElement {}
class HTMLIFrameElement extends HTMLElement {}
class HTMLImageElement extends HTMLElement {}
class HTMLInputElement extends HTMLElement {}
class HTMLLabelElement extends HTMLElement {}
class HTMLLegendElement extends HTMLElement {}
class HTMLLIElement extends HTMLElement {}
class HTMLLinkElement extends HTMLElement {}
class HTMLMapElement extends HTMLElement {}
class HTMLMediaElement extends HTMLElement {}
class HTMLMenuElement extends HTMLElement {}
class HTMLMetaElement extends HTMLElement {}
class HTMLMeterElement extends HTMLElement {}
class HTMLModElement extends HTMLElement {}
class HTMLOListElement extends HTMLElement {}
class HTMLObjectElement extends HTMLElement {}
class HTMLOptGroupElement extends HTMLElement {}
class HTMLOptionElement extends HTMLElement {}
class HTMLOptionsCollection extends HTMLElement {}
class HTMLOutputElement extends HTMLElement {}
class HTMLParagraphElement extends HTMLElement {}
class HTMLParamElement extends HTMLElement {}
class HTMLPictureElement extends HTMLElement {}
class HTMLPreElement extends HTMLElement {}
class HTMLProgressElement extends HTMLElement {}
class HTMLQuoteElement extends HTMLElement {}
class HTMLScriptElement extends HTMLElement {}
class HTMLSelectElement extends HTMLElement {}
class HTMLSlotElement extends HTMLElement {}
class HTMLSourceElement extends HTMLElement {}
class HTMLSpanElement extends HTMLElement {}
class HTMLStyleElement extends HTMLElement {}
class HTMLTableElement extends HTMLElement {}
class HTMLTableCaptionElement extends HTMLElement {}
class HTMLTableCellElement extends HTMLElement {}
class HTMLTableColElement extends HTMLElement {}
class HTMLTableRowElement extends HTMLElement {}
class HTMLTableSectionElement extends HTMLElement {}
class HTMLTemplateElement extends HTMLElement {}
class HTMLTextAreaElement extends HTMLElement {}
class HTMLTimeElement extends HTMLElement {}
class HTMLTitleElement extends HTMLElement {}
class HTMLTrackElement extends HTMLElement {}
class HTMLUListElement extends HTMLElement {}
class HTMLUnknownElement extends HTMLElement {}
class HTMLVideoElement extends HTMLElement {}

const installShimOnGlobal = (props = {}) => {
  installWindowOnGlobal({
    HTMLAnchorElement,
    HTMLAllCollection,
    HTMLCollection,
    HTMLAreaElement,
    HTMLAudioElement,
    HTMLBaseElement,
    HTMLBodyElement,
    HTMLBRElement,
    HTMLButtonElement,
    HTMLCanvasElement,
    HTMLDataElement,
    HTMLDataListElement,
    HTMLDetailsElement,
    HTMLDialogElement,
    HTMLDivElement,
    HTMLDListElement,
    HTMLEmbedElement,
    HTMLFormControlsCollection,
    HTMLFieldSetElement,
    HTMLFormElement,
    HTMLHeadingElement,
    HTMLHeadElement,
    HTMLHRElement,
    HTMLHtmlElement,
    HTMLIFrameElement,
    HTMLImageElement,
    HTMLInputElement,
    HTMLLabelElement,
    HTMLLegendElement,
    HTMLLIElement,
    HTMLLinkElement,
    HTMLMapElement,
    HTMLMediaElement,
    HTMLMenuElement,
    HTMLMetaElement,
    HTMLMeterElement,
    HTMLModElement,
    HTMLOListElement,
    HTMLObjectElement,
    HTMLOptGroupElement,
    HTMLOptionElement,
    HTMLOptionsCollection,
    HTMLOutputElement,
    HTMLParamElement,
    HTMLParagraphElement,
    HTMLPictureElement,
    HTMLPreElement,
    HTMLProgressElement,
    HTMLQuoteElement,
    HTMLScriptElement,
    HTMLSelectElement,
    HTMLSlotElement,
    HTMLSourceElement,
    HTMLSpanElement,
    HTMLStyleElement,
    HTMLTableElement,
    HTMLTableCaptionElement,
    HTMLTableCellElement,
    HTMLTableColElement,
    HTMLTableRowElement,
    HTMLTableSectionElement,
    HTMLTemplateElement,
    HTMLTextAreaElement,
    HTMLTimeElement,
    HTMLTitleElement,
    HTMLTrackElement,
    HTMLUListElement,
    HTMLUnknownElement,
    HTMLVideoElement,
    ...props,
  });
};
installShimOnGlobal();
export { installShimOnGlobal };
