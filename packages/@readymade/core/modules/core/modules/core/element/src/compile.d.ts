import { OnStateChange } from './../../component/component.js';
import { ElementMeta } from './../../decorator/decorator.js';
export declare const TEMPLATE_BIND_REGEX: RegExp;
export declare const BIND_SUFFIX = " __state";
interface Node {
    cloneNode(deep?: boolean): this;
}
declare class NodeTree {
    $parent: any;
    $parentId: string;
    $flatMap: any;
    constructor(parentNode?: any);
    setNode(node: Node, key?: string, value?: any): void;
    updateNode(node: Node, key: string, value: any): void;
    create(): void;
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
declare function compileTemplate(elementMeta: ElementMeta, target: any): void;
export { bindTemplate, compileTemplate, BoundHandler, BoundNode, };
