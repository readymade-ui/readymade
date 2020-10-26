import { CustomElement, OnStateChange } from './../../component';
import { ElementMeta } from './../../decorator';

export const STRING_VALUE_REGEX = /\[(\w+)\]/g;
export const STRING_DOT_REGEX = /^\./;
export const ARRAY_REGEX = /(?<=\[)(.*)(\])/;
export const DOT_BRACKET_NOTATION_REGEX = /\.|\[[0-9]*\]|(?:\['|'\])/g
export const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
export const BRACKET_START_REGEX = new RegExp(`\\[`, 'g');
export const BRACKET_END_REGEX = new RegExp(`\\]`, 'g');
export const TEMPLATE_START_REGEX = new RegExp(`{{`);
export const TEMPLATE_END_REGEX = new RegExp(`}}`);
export const BIND_SUFFIX = '__state';
export const NODE_KEY = 'node' + BIND_SUFFIX;
export const HANDLER_KEY = 'handler' + BIND_SUFFIX;

interface Node {
  cloneNode(deep?: boolean): this;
  $init?: boolean;
}

const isObject = function(val) {
  if (val === null) {
    return false;
  }
  return typeof val === 'function' || typeof val === 'object';
};

const findValueByString = function(o: any, s: string) {
  s = s.replace(STRING_VALUE_REGEX, '.$1');
  s = s.replace(STRING_DOT_REGEX, '');
  const a = s.split(DOT_BRACKET_NOTATION_REGEX).filter(s => s.length > 0);
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

function setValueByString(obj: any, path: string, value: any) {
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

function filter(fn: any, a: Array<any>){
  const f = [];
  for (let i = 0; i < a.length; i++) {
    if (fn(a[i])) {
      f.push(a[i]);
    }
  }
  return f;
};

function templateId() {
  let str = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  while (str.length < 3) {
    str += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return str;
}

/* tslint:disable */
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(24);
  });
}
/* tslint:enable */

function stripKey(key: string): string {
  key = key.replace(BRACKET_START_REGEX, `\\[`);
  key = key.replace(BRACKET_END_REGEX, `\\]`);
  return key;
}


function stripTemplateString(key: string): string {
  key = key.replace(TEMPLATE_START_REGEX, ``);
  key = key.replace(TEMPLATE_END_REGEX, ``);
  return key;
}

function templateRegExp(key: string): RegExp {
  return new RegExp(`\{\{(\b*)(${key})(\b*)\}\}`, 'g')
}

function getTextNodesByContent(node: Element, key: string) {
  if (!node.childNodes) {
    return [];
  }
  const nodes = [];
  for (const child of node.childNodes) {
    if (child.nodeType === Node.TEXT_NODE && child.textContent === key) {
      nodes.push(child);
    }
  }
  return nodes;
}

function getElementByAttribute(node: Element) {
  if (!node.attributes) {
    return [];
  }
  let matches = [];
  for (let i = 0; i < node.attributes.length; i++) {
    if (
      /[A-Za-z0-9]{3}-[A-Za-z0-9]{6}/gm.test(
        node.attributes[i].nodeName || node.attributes[i].name
      )
    ) {
      matches.push(node.attributes[i]);
    }
  }
  return matches;
}

class NodeTree {
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
      // tslint:disable-next-line: only-arrow-functions, no-empty
      (node as Element).setAttribute = function(i: string, v: string) {};
    }
    (node as Element).setAttribute(id, '');
    if (!(clone as Element).setAttribute) {
      // tslint:disable-next-line: only-arrow-functions, no-empty
      (clone as Element).setAttribute = function(i: string, v: string) {};
    }
    (clone as Element).setAttribute(id, '');
    this.$flatMap[id] = {
      id,
      node: clone
    };
    node.$init = true;
    return this.$flatMap[id];
  }
  public changeNode(node: Node, key: string, value: any, protoNode: any) {
    key = stripKey(key);
    const regex = templateRegExp(key);
    const nodes = getTextNodesByContent(protoNode, `{{${key}}}`);
    if (nodes.length) {
      for (const textNode of nodes) {
        if (textNode.parentNode === protoNode) {
          (node as Element).textContent = protoNode.textContent.replace(
            regex,
            value
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
            // tslint:disable-next-line: only-arrow-functions, no-empty
            protoNode.setAttribute = function(i: string, v: string) {};
          }
          protoNode.setAttribute(
            attr,
            attribute.nodeValue.replace(TEMPLATE_BIND_REGEX, '')
          );
          const remove = attribute.nodeName || attribute.name;
          (node as Element).removeAttribute(remove);
        }
      }
      const attributeValue = attribute.nodeValue || attribute.value;
      if (attributeValue.match(regex, 'gi')) {
        if ((node as Element).getAttribute(attr) !== value) {
          if (!(node as Element).setAttribute) {
            // tslint:disable-next-line: only-arrow-functions, no-empty
            (node as Element).setAttribute = function(i: string, v: string) {};
          }
          (node as Element).setAttribute(
            attr,
            attributeValue.replace(regex, value)
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
    let entry = this.setNode(node, key, value, attrId);
    let protoNode = entry.node;
    let templateStrings = null;

    if ( protoNode.outerHTML ) {
      templateStrings = protoNode.outerHTML.toString().match(TEMPLATE_BIND_REGEX);
    }
    if ( protoNode._nodeValue ) {
      templateStrings = protoNode._nodeValue.match(TEMPLATE_BIND_REGEX);
    }

    if (templateStrings == null) {
      return;
    }
    for (let index = 0; index < templateStrings.length; index++) {
      templateStrings[index] = stripTemplateString(templateStrings[index]);
    }
    let matches = filter(str => str.startsWith(key), templateStrings);
    if (matches.length === 0) {
      return;
    }
    if (isObject(value) || Array.isArray(value)) {
      for (let index = 0; index < matches.length; index++) {
        this.changeNode(node, templateStrings[index], findValueByString(value,templateStrings[index].substring(templateStrings[index].search(DOT_BRACKET_NOTATION_REGEX))), protoNode);
      }
    } else {
      this.changeNode(node, key, value, protoNode);
    }
  }
  public update(key: string, value: any) {
    const walk = document.createTreeWalker(
      (this.$parent as Element),
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode(node) {
          return NodeFilter.FILTER_ACCEPT;
        }
      },
      false
    );
    while (walk.nextNode()) {
      this.updateNode(walk.currentNode, key, value);
    }
    return this.$parent;
  }
}

class BoundNode {
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

class BoundHandler {
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
        newValue: value
      }
    };

    if (capturedGroup) {
      if (target.parentNode &&
          target.parentNode.host &&
          target.parentNode.mode === 'open') {
            target[key] = findValueByString(target.parentNode.host, capturedGroup);
          } else if (capturedGroup && target.parentNode) {
            target[key] = findValueByString(target.parentNode, capturedGroup);
          }
    } else {
      target[key] = value;
    }

    this.$parent.ɵɵstate[NODE_KEY].update(key, target[key]);

    if (target.onStateChange) {
      target.onStateChange(change);
    }

    return true;
  }
}

function bindTemplate() {
  if (this.bindState) {
    this.bindState();
  }
}

function setState(prop: string, model: any) {
  setValueByString(this.ɵstate, prop, model);
  this.ɵɵstate[NODE_KEY].update(prop, model);
}

function compileTemplate(elementMeta: ElementMeta, target: any) {
  if (!elementMeta.style) {
    elementMeta.style = '';
  }
  if (!elementMeta.template) {
    elementMeta.template = '';
  }
  target.prototype.elementMeta = Object.assign(
    target.elementMeta ? target.elementMeta : {},
    elementMeta
  );
  target.prototype.elementMeta.eventMap = {};
  target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
  target.prototype.bindTemplate = bindTemplate;
  target.prototype.setState = setState;
}

export {
  isObject,
  findValueByString,
  setValueByString,
  templateId,
  uuidv4,
  stripKey,
  stripTemplateString,
  templateRegExp,
  bindTemplate,
  compileTemplate,
  getTextNodesByContent,
  getElementByAttribute,
  setState,
  BoundHandler,
  BoundNode
};
