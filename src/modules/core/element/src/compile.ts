<<<<<<< HEAD
import { getChildNodes } from './util';
import { ElementMeta } from './../../decorator/index';

declare let htmldiff: any;
=======
import { OnStateChange } from './../../component/component.js';
import { ElementMeta } from './../../decorator/decorator.js';
import { getChildNodes } from './util.js';
>>>>>>> dev

const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
const BIND_SUFFIX = ' __state';

<<<<<<< HEAD
interface StateChange {
  [key: string] : {
    previousValue: any,
    newValue: any
  }
}

=======
>>>>>>> dev
interface Node {
    cloneNode(deep?: boolean): this;
}

<<<<<<< HEAD
(<any>Object).byString = function(o: any, s: string) {
    if(!s) return o;
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

function setTemplate(elem: Element, html: string): Element {
    // const _elem = (<Node>elem).cloneNode(false);
    // (<Element>_elem).innerHTML = html;
    // (<Element>elem).parentNode.replaceChild((<Element>_elem), (<Element>elem));
    // return (<Element>_elem);
    elem.innerHTML = html;
    return (<Element>elem);
}

// testing copying attributes from element to template
function copyAttributes(node: any, template: any) {
  const _template = getChildNodes(template);
  const _node = node.host ? getChildNodes(node.shadowRoot) : getChildNodes(node);
  let index = 0;
  do {
      let aIndex = 0;
      const _attributes = _node[index].attributes;
      while(aIndex < _attributes.length) {
          _template[index].setAttribute(_attributes[aIndex].nodeName, _attributes[aIndex].nodeValue);
          aIndex++;
      }
      index++;
  }
  while(index < _node.length);
}

class BoundNode {
  template: Element;
  node: Element;
  templateNode: any;
  previousNode: Element;
  constructor (node) {
    this.template = document.createElement('div');
    this.template.innerHTML = node.innerHTML;
    this.node = node;
  }
  update(data: any, target: any) {
    (<Element>this.node) = setTemplate(this.node, this.template.innerHTML.replace(TEMPLATE_BIND_REGEX, (match, variable) => {
      if (match === undefined || match === null) match = ''; // return empty string for null or undefined
      return (<any>Object).byString(data, /\{\{(\s*)(.*?)(\s*)\}\}/.exec(match)[2]) || '';
    }));
=======
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
>>>>>>> dev
  }
}

class BoundHandler {
<<<<<<< HEAD
  model: any;
  onStateChange: Function;
  constructor(obj) {
    this.model = obj;
  }
  set(target, key, value) {
    const change = {
      [key]: {
        previousValue : target[key],
        newValue: value
      }
    };
    target[key] = value;
    this.model.elementMeta.boundState['node' + BIND_SUFFIX].update(this.model, target);
    if (target.onStateChange) target.onStateChange(change);
=======
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
    this.$parent.$state['node' + BIND_SUFFIX].update(key, target[key]);
    if (target.onStateChange) { target.onStateChange(change); }
>>>>>>> dev
    return true;
  }
}

<<<<<<< HEAD
function bindTemplate() {
  if (!this.elementMeta) this.elementMeta = {};
  this.elementMeta.templateRegex = TEMPLATE_BIND_REGEX;
  this.elementMeta.boundState = {
      ['node' + BIND_SUFFIX]: new BoundNode(this.shadowRoot ? this.shadowRoot : this),
      ['handler' + BIND_SUFFIX]: new BoundHandler(this)
  }
  this.state = new Proxy(this, this.elementMeta.boundState['handler' + BIND_SUFFIX]);
}

function bindTemplateNodes() {
  if (!this.elementMeta) this.elementMeta = {};
   this.elementMeta.boundNodes = this.getChildNodes()
  .map((node: any) => {
    if (!node.elementMeta) node.elementMeta = {};
      node.elementMeta.templateRegex = TEMPLATE_BIND_REGEX;
      node.elementMeta.boundState = {
          ['node' + BIND_SUFFIX]: new BoundNode(node),
          ['handler' + BIND_SUFFIX]: new BoundHandler(node)
      }
      node.state = new Proxy(node, node.elementMeta.boundState['handler' + BIND_SUFFIX]);
      return node;

    });
}


=======
>>>>>>> dev
// support setting global state for now, what about descendant properties?
function setState(prop: string, model: any) {
    this.state[prop] = model;
}

function compileTemplate(elementMeta: ElementMeta, target: any) {
<<<<<<< HEAD
  target.prototype.elementMeta = Object.assign({}, elementMeta);
  target.prototype.elementMeta.eventMap = {};
  target.prototype.template = document.createElement('template');
  target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
  target.prototype.getChildNodes = getChildNodes;
  target.prototype.bindTemplateNodes = bindTemplateNodes;
=======
  target.prototype.elementMeta = Object.assign(target.elementMeta ? target.elementMeta : {}, elementMeta);
  target.prototype.elementMeta.eventMap = {};
  target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
>>>>>>> dev
  target.prototype.bindTemplate = bindTemplate;
  target.prototype.setState = setState;
}

<<<<<<< HEAD
export {
  StateChange,
  bindTemplate,
  bindTemplateNodes,
  compileTemplate
}
=======
function bindTemplate() {
  this.$state = {};
  this.$state['handler' + BIND_SUFFIX] = new BoundHandler(this);
  this.$state['node' + BIND_SUFFIX] = new BoundNode(this.shadowRoot ? this.shadowRoot : this);
  this.state = new Proxy(this, this.$state['handler' + BIND_SUFFIX]);
}

export {
  bindTemplate,
  compileTemplate,
};
>>>>>>> dev
