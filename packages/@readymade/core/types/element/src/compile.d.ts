import { CustomElement, OnStateChange } from './../../component/component';
import { ElementMeta } from './../../decorator/decorator';
export declare const STRING_VALUE_REGEX: RegExp;
export declare const STRING_DOT_REGEX: RegExp;
export declare const TEMPLATE_BIND_REGEX: RegExp;
export declare const BRACKET_START_REGEX: RegExp;
export declare const BRACKET_END_REGEX: RegExp;
export declare const TEMPLATE_START_REGEX: RegExp;
export declare const TEMPLATE_END_REGEX: RegExp;
export declare const BIND_SUFFIX = "__state";
export declare const NODE_KEY: string;
export declare const HANDLER_KEY: string;
interface Node {
    cloneNode(deep?: boolean): this;
    $init?: boolean;
}
declare const isObject: (val: any) => boolean;
declare const findValueByString: (o: any, s: string) => any;
declare function setValueByString(obj: any, path: string, value: any): any;
declare function templateId(): string;
declare function uuidv4(): string;
declare class NodeTree {
    $parent: Node;
    $parentId: string;
    $flatMap: any;
    constructor(parentNode?: Node);
    setNode(node: Node, key?: string, value?: any, attrID?: string): any;
    changeNode(node: Node, key: string, value: any, protoNode: any): void;
    updateNode(node: Node | Element, key: string, value: any): void;
    getElementByAttribute(node: Element): any[];
    update(key: string, value: any): Node;
}
declare class BoundNode {
    $elem: CustomElement | Element;
    $tree: NodeTree;
    templateTree: NodeTree;
    constructor(elem: Element);
    update(key: string, value: any): void;
}
declare class BoundHandler {
    $prop: string;
    $parent: any;
    onStateChange: OnStateChange;
    constructor(obj: Element);
    set(target: any, key: string, value: any): boolean;
}
declare function bindTemplate(): void;
declare function setState(prop: string, model: any): void;
declare function compileTemplate(elementMeta: ElementMeta, target: any): void;
export { isObject, findValueByString, setValueByString, templateId, uuidv4, bindTemplate, compileTemplate, setState, BoundHandler, BoundNode };
