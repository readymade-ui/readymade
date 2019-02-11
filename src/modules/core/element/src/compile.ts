import { getChildNodes } from './util.js';
import { ElementMeta } from './../../decorator/decorator.js';
import { OnStateChange, StateChange } from './../../component/component.js';

const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
const BIND_SUFFIX = ' __state';

interface Node {
    cloneNode(deep?: boolean): this;
}

function templateId() {
  let str = "";
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  while (str.length < 3) {
    str += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return str;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(24);
  });
}

class NodeTree {
  $parent: any;
  $parentId: string;
  $flatMap: any = {};
  constructor(parentNode?: any) {
    this.$parent = parentNode;
    this.$flatMap = {};
    this.$parentId = templateId();
    this.create();
  }
  create() {
    const walk = document.createTreeWalker(
      this.$parent,
      NodeFilter.SHOW_ELEMENT,
      { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
      false
    )
    while(walk.nextNode()) {
      const id = this.$parentId+'-'+uuidv4().slice(0, 6);
      const clone = walk.currentNode.cloneNode(true);
      (<Element>walk.currentNode).setAttribute(id, '');
      (<Element>clone).setAttribute(id, '');
      if (!this.$flatMap[id]) {
        this.$flatMap[id] = {
          id: id,
          node: clone,
          parent: this.$parent
        }
      }
    }
  }
  getElementByAttribute(node: Element) {
    return Array.from(node.attributes).filter((attr)=>{
      return /[A-Za-z0-9]{3}-[A-Za-z0-9]{6}/gm.test(attr.nodeName);
    })
  }
  update(key, value) {
    const regex = new RegExp(`\{\{(\s*)(${key})(\s*)\}\}`, 'gi');
    const walk = document.createTreeWalker(
      this.$parent,
      NodeFilter.SHOW_ELEMENT,
      { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
      false
    )
    while(walk.nextNode()) {
        const attrId = this.getElementByAttribute((<Element>walk.currentNode))[0].nodeName;
        const protoNode = this.$flatMap[attrId].node;
        this.$flatMap[attrId].currentNode = (<Element>walk.currentNode);
         for (let i = 0; i < protoNode.attributes.length; i++) {
            if (protoNode.attributes[i].nodeValue.match(regex, 'gi')) {
              (<Element>walk.currentNode).setAttribute(protoNode.attributes[i].nodeName,
                                                       protoNode.attributes[i].nodeValue.replace(regex, value));
            }
         }
         if (protoNode.textContent.match(regex)) {
            (<Element>walk.currentNode).textContent = protoNode.textContent.replace(regex, value);
         }
    }
    return this.$parent;
  }
}



class BoundNode {
  $parent: any;
  $tree: NodeTree;
  templateTree: NodeTree;
  constructor (parent) {
    this.$parent = parent;
    this.$tree = new NodeTree(this.$parent);
  }
  update(key: string, value: any) {
    this.$tree.update(key, value);
    if (this.$parent.onUpdate) this.$parent.onUpdate();
  }
}

class BoundHandler {
  $parent: any;
  onStateChange: OnStateChange;
  constructor(obj) {
    this.$parent = obj;
  }
  set(target, key, value) {
    const change = {
      [key]: {
        previousValue : target[key],
        newValue: value
      }
    };
    target[key] = value;
    this.$parent.$state['node' + BIND_SUFFIX].update(key, target[key]);
    if (target.onStateChange) target.onStateChange(change);
    return true;
  }
}

function bindTemplate() {
  this.$state = {};
  this.$state['handler' + BIND_SUFFIX] = new BoundHandler(this);
  this.$state['node' + BIND_SUFFIX] = new BoundNode(this.shadowRoot ? this.shadowRoot : this);
  this.state = new Proxy(this, this.$state['handler' + BIND_SUFFIX]);
}

// support setting global state for now, what about descendant properties?
function setState(prop: string, model: any) {
    this.state[prop] = model;
}

function compileTemplate(elementMeta: ElementMeta, target: any) {
  target.prototype.elementMeta = Object.assign(target.elementMeta ? target.elementMeta : {}, elementMeta);
  target.prototype.elementMeta.eventMap = {};
  target.prototype.template = document.createElement('template');
  target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
  target.prototype.bindTemplate = bindTemplate;
  target.prototype.setState = setState;
}

export {
  StateChange,
  bindTemplate,
  compileTemplate
}