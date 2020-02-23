import { OnStateChange } from './../../component/component.js';
import { ElementMeta } from './../../decorator/decorator.js';

export const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
export const BIND_SUFFIX = ' __state';

interface Node {
    cloneNode(deep?: boolean): this;
}

function templateId() {
  let str = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  while (str.length < 3) {
    str += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return str;
}

/* tslint:disable */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(24);
  });
}
/* tslint:enable */

class NodeTree {
  public $parent: any;
  public $parentId: string;
  public $flatMap: any = {};
  constructor(parentNode?: any) {
    this.$parent = parentNode;
    this.$flatMap = {};
    this.$parentId = templateId();
    this.create();
  }
  public setNode(node: Node, key?: string, value?: any) {
      const id = this.$parentId + '-' + uuidv4().slice(0, 6);
      const clone = node.cloneNode(true);
      (node as Element).setAttribute(id, '');
      (clone as Element).setAttribute(id, '');
      if (!this.$flatMap[id]) {
        this.$flatMap[id] = {
          id,
          node: clone,
        };
        if (key && value) {
          this.updateNode(node, key, value);
        }
      }
  }
  public updateNode(node: Node, key: string, value: any) {

    const regex = new RegExp(`\{\{(\s*)(${key})(\s*)\}\}`, 'gi');
    const attrId = this.getElementByAttribute((node as Element))[0].nodeName;
    const protoNode = this.$flatMap[attrId].node;
    let attr;
    for (const attribute of protoNode.attributes) {
      attr = attribute.nodeName;
      if (attr.includes('attr.') && !protoNode.getAttribute(attribute.nodeName.replace('attr.', ''))) {
        attr = attribute.nodeName.replace('attr.', '');
        protoNode.setAttribute(attr, attribute.nodeValue.replace(TEMPLATE_BIND_REGEX, ''));
        (node as Element).removeAttribute(attribute.nodeName);
      }
      if (attribute.nodeValue.match(regex, 'gi')) {
        (node as Element).setAttribute(attr, attribute.nodeValue.replace(regex, value));
      }
      if (attribute.nodeName.includes('attr.')) {
        (node as Element).removeAttribute(attribute.nodeName);
      }
    }
    if (protoNode.textContent.match(regex)) {
      (node as Element).textContent = protoNode.textContent.replace(regex, value);
    }
  }
  public create() {
    const walk = document.createTreeWalker(
      this.$parent,
      NodeFilter.SHOW_ELEMENT,
      { acceptNode(node) { return NodeFilter.FILTER_ACCEPT; } },
      false,
    );
    while (walk.nextNode()) {
      this.setNode(walk.currentNode);
    }
  }
  public getElementByAttribute(node: Element) {
    return Array.from(node.attributes).filter((attr) => {
      return /[A-Za-z0-9]{3}-[A-Za-z0-9]{6}/gm.test(attr.nodeName);
    });
  }
  public update(key: string, value: any) {
    const walk = document.createTreeWalker(
      this.$parent,
      NodeFilter.SHOW_ELEMENT,
      { acceptNode(node) { return NodeFilter.FILTER_ACCEPT; } },
      false,
    );
    while (walk.nextNode()) {
      if (this.getElementByAttribute((walk.currentNode as Element)).length > 0) {
         this.updateNode(walk.currentNode, key, value);
      } else {
         this.setNode(walk.currentNode, key, value);
      }
    }
    return this.$parent;
  }
}

class BoundNode {
  public $parent: any;
  public $tree: NodeTree;
  public templateTree: NodeTree;
  constructor(parent) {
    this.$parent = parent;
    this.$tree = new NodeTree(this.$parent);
  }
  public update(key: string, value: any) {
    this.$tree.update(key, value);
    if (this.$parent.onUpdate) { this.$parent.onUpdate(); }
  }
}

class BoundHandler {
  public $prop: string;
  public $parent: any;
  public onStateChange: OnStateChange;
  constructor(obj: Element) {
    this.$parent = obj;
  }
  public set(target: any, key: string, value: any) {
    const change = {
      [key]: {
        previousValue : target[key],
        newValue: value,
      },
    };

    target[key] = value;
    this.$parent.$$state['node' + BIND_SUFFIX].update(key, target[key]);
    if (target.onStateChange) { target.onStateChange(change); }
    return true;
  }
}

function bindTemplate() {
  if (this.bindState) { this.bindState(); }
}

function setState(prop: string, model: any) {
  this.$state[prop] = model;
}

function compileTemplate(elementMeta: ElementMeta, target: any) {
  if (!elementMeta.style) {
    elementMeta.style = '';
  }
  if (!elementMeta.template) {
    elementMeta.template = '';
  }
  target.prototype.elementMeta = Object.assign(target.elementMeta ? target.elementMeta : {}, elementMeta);
  target.prototype.elementMeta.eventMap = {};
  target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
  target.prototype.bindTemplate = bindTemplate;
  target.prototype.setState = setState;
}

export {
  bindTemplate,
  compileTemplate,
  BoundHandler,
  BoundNode,
};
