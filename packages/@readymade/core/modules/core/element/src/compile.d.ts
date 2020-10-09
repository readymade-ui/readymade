import { OnStateChange } from './../../component/component.js';
import { ElementMeta } from './../../decorator/decorator.js';
export declare const STRING_VALUE_REGEX: RegExp;
export declare const STRING_DOT_REGEX: RegExp;
export declare const TEMPLATE_BIND_REGEX: RegExp;
export declare const BRACKET_START_REGEX: RegExp;
export declare const BRACKET_END_REGEX: RegExp;
export declare const BIND_SUFFIX = " __state";
export declare const NODE_KEY: string;
export declare const HANDLER_KEY: string;
interface Node {
    cloneNode(deep?: boolean): this;
    $init?: boolean;
}
declare const isObject: (val: any) => boolean;
declare const findValueByString: (o: any, s: string) => any;
declare function setValueByString(obj: any, path: string, value: any): void;
declare function templateId(): string;
declare function uuidv4(): string;
declare class NodeTree {
    $parent: any;
    $parentId: string;
    $flatMap: any;
    constructor(parentNode?: Node);
    setNode(node: Node, key?: string, value?: any): void;
    changeNode(node: Node, key: string, value: any): void;
    updateNode(node: Node, key: string, value: any): void;
    getElementByAttribute(node: Element): Attr[];
    update(key: string, value: any): any;
}
declare class BoundNode {
    $parent: any;
    $tree: NodeTree;
    templateTree: NodeTree;
    constructor(parent: any);
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
export { isObject, findValueByString, setValueByString, templateId, uuidv4, bindTemplate, compileTemplate, setState, BoundHandler, BoundNode, };
