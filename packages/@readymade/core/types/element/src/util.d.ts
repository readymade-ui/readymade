declare function getParent(el: any): any;
declare function getChildNodes(template?: any): Element[];
declare function getSiblings(el: Element): unknown[];
declare function querySelector(selector: string): Element;
declare function querySelectorAll(selector: string): Element[];
declare function getElementIndex(el: any): number;
export { getParent, getChildNodes, getSiblings, querySelector, querySelectorAll, getElementIndex };
