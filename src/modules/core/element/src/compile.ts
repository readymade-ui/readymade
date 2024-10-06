import { CustomElement, OnStateChange } from './../../component';
import { ElementMeta } from './../../decorator';
import { isNode } from './util';

export const STRING_VALUE_REGEX = /\[(\w+)\]/g;
export const STRING_DOT_REGEX = /^\./;
export const ARRAY_REGEX = /(\[)(.*)(\])/;
export const DOT_BRACKET_NOTATION_REGEX = /\.|\[[0-9]*\]|(?:\['|'\])/g;
export const TEMPLATE_BIND_REGEX = /\{\{\s*(.*?)\s*\}\}/g;
export const BRACKET_START_REGEX = /\[/g;
export const BRACKET_END_REGEX = /\]/g;
export const TEMPLATE_START_REGEX = /\{\{\s?/g;
export const TEMPLATE_END_REGEX = /\s?\}\}/g;
export const BIND_SUFFIX = '__state';
export const NODE_KEY = 'node' + BIND_SUFFIX;
export const HANDLER_KEY = 'handler' + BIND_SUFFIX;

export interface Node {
  cloneNode(deep?: boolean): this;
  $init?: boolean;
}

export const isObject = function (val) {
  if (val === null) {
    return false;
  }
  return typeof val === 'function' || typeof val === 'object';
};

export const findValueByString = function (o: any, s: string) {
  s = s.replace(STRING_VALUE_REGEX, '.$1');
  s = s.replace(STRING_DOT_REGEX, '');
  const a = s.split(DOT_BRACKET_NOTATION_REGEX).filter((s) => s.length > 0);
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

export function setValueByString(obj: any, path: string, value: any) {
  const pList = path.split(DOT_BRACKET_NOTATION_REGEX);
  const len = pList.length;
  for (let i = 0; i < len - 1; i++) {
    const elem = pList[i];
    if (!obj[elem]) {
      obj[elem] = {};
    }
    obj = obj[elem];
  }
  obj[pList[len - 1]] = value;
  return obj;
}

export function filter(fn: any, a: Array<any>) {
  const f = [];
  for (let i = 0; i < a.length; i++) {
    if (fn(a[i])) {
      f.push(a[i]);
    }
  }
  return f;
}

export function templateId() {
  let str = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  while (str.length < 3) {
    str += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return str;
}

/* eslint:disable */
export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(24);
  });
}
/* eslint:enable */

export function stripKey(key: string): string {
  key = key.replace(BRACKET_START_REGEX, `\\[`);
  key = key.replace(BRACKET_END_REGEX, `\\]`);
  return key;
}

export function stripTemplateString(key: string): string {
  key = key.replace(TEMPLATE_START_REGEX, ``);
  key = key.replace(TEMPLATE_END_REGEX, ``);
  return key;
}

export function templateRegExp(key: string): RegExp {
  return new RegExp(`\\{\\{\\s*(${key})\\s*\\}\\}`, 'g');
}

export function getTextNodesByContent(node: Element, key: string) {
  if (!node.childNodes) {
    return [];
  }
  const nodes = [];
  for (const child of node.childNodes) {
    if (
      child.nodeType === Node.TEXT_NODE &&
      templateRegExp(key).exec(child.textContent)
    ) {
      nodes.push(child);
    }
  }
  return nodes;
}

export function getElementByAttribute(node: Element) {
  if (!node.attributes) {
    return [];
  }
  const matches = [];
  for (let i = 0; i < node.attributes.length; i++) {
    if (
      /[A-Za-z0-9]{3}-[A-Za-z0-9]{6}/gm.test(
        node.attributes[i].nodeName || node.attributes[i].name,
      )
    ) {
      matches.push(node.attributes[i]);
    }
  }
  return matches;
}

export class NodeTree {
  public $parent: Node;
  public $parentId: string;

  public $flatMap: any = {};
  constructor(parentNode?: Node) {
    this.$parent = parentNode;
    this.$flatMap = {};
    this.$parentId = templateId();
  }

  public setNode(node: Node, key?: string, value?: any, attrID?: string) {
    if (this.$flatMap[attrID]) {
      return this.$flatMap[attrID];
    }
    const id = attrID ? attrID : this.$parentId + '-' + uuidv4().slice(0, 6);
    const clone = node.cloneNode(true);
    if (!(node as Element).setAttribute) {
      (node as Element).setAttribute = function () {};
    }
    (node as Element).setAttribute(id, '');
    if (!(clone as Element).setAttribute) {
      (clone as Element).setAttribute = function () {};
    }
    (clone as Element).setAttribute(id, '');
    this.$flatMap[id] = {
      id,
      node: clone,
    };
    node.$init = true;
    return this.$flatMap[id];
  }

  public changeNode(node: Node, key: string, value: any, protoNode: any) {
    key = stripKey(key);
    const regex = templateRegExp(key);
    const nodes = getTextNodesByContent(protoNode, key);
    if (nodes.length) {
      for (const textNode of nodes) {
        if (textNode.parentNode === protoNode) {
          (node as Element).textContent = protoNode.textContent.replace(
            regex,
            value,
          );
        }
      }
    }
    if (protoNode.attributes.length === 1) {
      return;
    }
    let attr: string = '';
    for (const attribute of protoNode.attributes) {
      attr = attribute.nodeName || attribute.name;
      if (attr.includes('attr.')) {
        if (!protoNode.getAttribute(attr.replace('attr.', ''))) {
          if (attribute.nodeName) {
            attr = attribute.nodeName.replace('attr.', '');
          } else if (attribute.name) {
            attr = attribute.name.replace('attr.', '');
          }
          if (!protoNode.setAttribute) {
            protoNode.setAttribute = function () {};
          }
          protoNode.setAttribute(
            attr,
            attribute.nodeValue.replace(TEMPLATE_BIND_REGEX, ''),
          );
          const remove = attribute.nodeName || attribute.name;
          (node as Element).removeAttribute(remove);
        }
      }
      const attributeValue = attribute.nodeValue || attribute.value;
      if (attributeValue.match(regex, 'gi')) {
        if ((node as Element).getAttribute(attr) !== value) {
          if (!(node as Element).setAttribute) {
            (node as Element).setAttribute = function () {};
          }
          (node as Element).setAttribute(
            attr,
            attributeValue.replace(regex, value),
          );
        }
      }
      const check = attribute.nodeName || attribute.name;
      if (check.includes('attr.')) {
        (node as Element).removeAttribute(check);
      }
    }
  }

  public updateNode(node: Node | Element, key: string, value: any) {
    const attr = getElementByAttribute(node as Element)[0];
    const attrId = attr ? attr.nodeName || attr.name : null;
    const entry = this.setNode(node, key, value, attrId);
    const protoNode = entry.node;
    let templateStrings = null;

    if (protoNode.outerHTML) {
      templateStrings = protoNode.outerHTML
        .toString()
        .match(TEMPLATE_BIND_REGEX);
    }
    if (protoNode._nodeValue) {
      templateStrings = protoNode._nodeValue.match(TEMPLATE_BIND_REGEX);
    }

    if (templateStrings == null) {
      return;
    }
    for (let index = 0; index < templateStrings.length; index++) {
      templateStrings[index] = stripTemplateString(templateStrings[index]);
    }
    const matches = filter((str) => str.startsWith(key), templateStrings);
    if (matches.length === 0) {
      return;
    }
    if (isObject(value) || Array.isArray(value)) {
      for (let index = 0; index < matches.length; index++) {
        this.changeNode(
          node,
          templateStrings[index],
          findValueByString(
            value,
            templateStrings[index].substring(
              templateStrings[index].search(DOT_BRACKET_NOTATION_REGEX),
            ),
          ),
          protoNode,
        );
      }
    } else {
      this.changeNode(node, key, value, protoNode);
    }
  }

  public update(key: string, value: any) {
    const walk = document.createTreeWalker(
      this.$parent as Element,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode() {
          return NodeFilter.FILTER_ACCEPT;
        },
      },
    );
    while (walk.nextNode()) {
      this.updateNode(walk.currentNode, key, value);
    }
    return this.$parent;
  }
}

export class BoundNode {
  public $elem: CustomElement | Element;
  public $tree: NodeTree;
  public templateTree: NodeTree;
  constructor(elem: Element) {
    this.$elem = elem;
    this.$tree = new NodeTree(this.$elem);
  }

  public update(key: string, value: any) {
    if (value == undefined) {
      return;
    }
    this.$tree.update(key, value);
    if ((this.$elem as CustomElement).onUpdate) {
      (this.$elem as CustomElement).onUpdate();
    }
  }
}

export class BoundHandler {
  public $prop: string;

  public $parent: any;
  public onStateChange: OnStateChange;
  constructor(obj: Element) {
    this.$parent = obj;
  }

  public set(target: any, key: string, value: any) {
    if (value === 'undefined') {
      return true;
    }

    const ex = new RegExp(TEMPLATE_BIND_REGEX).exec(value);
    const capturedGroup = ex && ex[2] ? ex[2] : false;
    const change = {
      [key]: {
        previousValue: target[key],
        newValue: value,
      },
    };

    if (capturedGroup) {
      if (
        target.parentNode &&
        target.parentNode.host &&
        target.parentNode.mode === 'open'
      ) {
        target[key] = findValueByString(target.parentNode.host, capturedGroup);
      } else if (capturedGroup && target.parentNode) {
        target[key] = findValueByString(target.parentNode, capturedGroup);
      }
    } else {
      target[key] = value;
    }

    this.$parent.ɵɵstate[NODE_KEY].update(key, target[key]);

    if (!isNode) {
      this.$parent.ɵɵstate.$changes.dispatchEvent(
        new CustomEvent('change', { detail: change }),
      );
    }

    if (this.$parent.onStateChange) {
      this.$parent.onStateChange(change);
    }

    return true;
  }
}

export function bindTemplate() {
  if (this.bindState) {
    this.bindState();
  }
}

export function setState(prop: string, model: any) {
  setValueByString(this.ɵstate, prop, model);
  this.ɵɵstate[NODE_KEY].update(prop, model);
}

export function compileTemplate(elementMeta: ElementMeta, target: any): any {
  if (!elementMeta.style) {
    elementMeta.style = [''];
  }
  if (!elementMeta.template) {
    elementMeta.template = [''];
  }
  target.prototype.elementMeta = Object.assign(
    target.elementMeta ? target.elementMeta : {},
    elementMeta,
  );
  target.prototype.elementMeta.eventMap = {};
  target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
  target.prototype.bindTemplate = bindTemplate;
  return target;
}
