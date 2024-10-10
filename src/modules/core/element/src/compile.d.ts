import { CustomElement, OnStateChange } from './../../component';
import { ElementMeta } from './../../decorator';
export declare const STRING_VALUE_REGEX: RegExp;
export declare const STRING_DOT_REGEX: RegExp;
export declare const ARRAY_REGEX: RegExp;
export declare const DOT_BRACKET_NOTATION_REGEX: RegExp;
export declare const TEMPLATE_BIND_REGEX: RegExp;
export declare const BRACKET_START_REGEX: RegExp;
export declare const BRACKET_END_REGEX: RegExp;
export declare const TEMPLATE_START_REGEX: RegExp;
export declare const TEMPLATE_END_REGEX: RegExp;
export declare const BIND_SUFFIX = '__state';
export declare const NODE_KEY: string;
export declare const HANDLER_KEY: string;
export interface Node {
  cloneNode(deep?: boolean): this;
  $init?: boolean;
}
export declare const isObject: (val: any) => boolean;
export declare const findValueByString: (o: any, s: string) => any;
export declare function setValueByString(
  obj: any,
  path: string,
  value: any,
): any;
export declare function filter(fn: any, a: Array<any>): any[];
export declare function templateId(): string;
export declare function uuidv4(): string;
export declare function stripKey(key: string): string;
export declare function stripTemplateString(key: string): string;
export declare function templateRegExp(key: string): RegExp;
export declare function getTextNodesByContent(
  node: Element,
  key: string,
): any[];
export declare function getElementByAttribute(node: Element): any[];
export declare class NodeTree {
  $parent: Node;
  $parentId: string;
  $flatMap: any;
  constructor(parentNode?: Node);
  setNode(node: Node, key?: string, value?: any, attrID?: string): any;
  changeNode(node: Node, key: string, value: any, protoNode: any): void;
  updateNode(node: Node | Element, key: string, value: any): void;
  update(key: string, value: any): Node;
}
export declare class BoundNode {
  $elem: CustomElement | Element;
  $tree: NodeTree;
  templateTree: NodeTree;
  constructor(elem: Element);
  update(key: string, value: any): void;
}
export declare class BoundHandler {
  $prop: string;
  $parent: any;
  onStateChange: OnStateChange;
  constructor(obj: Element);
  set(target: any, key: string, value: any): boolean;
}
export declare function bindTemplate(): void;
export declare function setState(prop: string, model: any): void;
export declare function compileTemplate(
  elementMeta: ElementMeta,
  target: any,
): any;
