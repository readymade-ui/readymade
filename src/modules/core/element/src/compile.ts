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
    return v.toString(16);
  });
}

class NodeTree {
  $parent: any;
  $parentId: string;
  $flatMap: any = {};
  constructor(parentNode?: any, template?: any) {
    this.$flatMap = {};
    if (parentNode) {
      this.$parent = parentNode;
      this.$parentId = templateId();
      return this.create(template);
    }
    return this;
  }
  create(template) {

    const walk = document.createTreeWalker(
      this.$parent,
      NodeFilter.SHOW_ELEMENT,
      { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
      false
    );

    while(walk.nextNode()) {
        const id = this.$parentId+'-'+uuidv4().slice(0, 8);
        const clone = walk.currentNode.cloneNode(true);
        (<Element>walk.currentNode).setAttribute('r-id', id);
        (<Element>clone).setAttribute('r-id', id);
        if (!this.$flatMap[id]) {
          this.$flatMap[id] = {
            id: id,
            node: clone,
            parent: this.$parent
          }
        }
      }
      return this;
  }
  getAttributes(node) {
      const attr = [];
      for (let i=0; i < node.attributes.length; i++) {
        attr.push(node.attributes[i].nodeName);
      }
      return attr;
  }
  getVirtualNode(node) {
    return this.$flatMap[this.getAttributes(node).filter(attr => attr.includes(this.$parentId))[0]]
  }
  update(key, value, parent) {

    const regex = new RegExp(`\{\{(\s*)(${key})(\s*)\}\}`, 'gi');
    const walk = document.createTreeWalker(
      parent,
      NodeFilter.SHOW_ELEMENT,
      { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
      false
    );
    while(walk.nextNode()) {
      if ((<Element>walk.currentNode).getAttribute('r-id')) {
         const protoNode = this.$flatMap[(<Element>walk.currentNode).getAttribute('r-id')].node;
         for (let i = 0; i < protoNode.attributes.length; i++) {
            if (protoNode.attributes[i].nodeValue.match(regex, 'gi')) {
              (<Element>walk.currentNode).setAttribute(protoNode.attributes[i].nodeName, protoNode.attributes[i].nodeValue.replace(regex, value));
            }
         }
         if (protoNode.textContent.match(regex)) {
            walk.currentNode.textContent = protoNode.textContent.replace(regex, value);
         }
      }
    }
    return parent;
  }
}



class BoundNode {
  $parent: any;
  nodeTree: NodeTree;
  templateTree: NodeTree;
  constructor (parent) {
    this.$parent = parent;
    this.nodeTree = new NodeTree(this.$parent, this.templateTree);
  }
  update(key: string, value: any) {
    this.nodeTree.update(key, value, this.$parent);
    if (this.$parent.onUpdate) this.$parent.onUpdate();
  }
}

class BoundHandler {
  model: any;
  onStateChange: OnStateChange;
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
    this.model.elementMeta.boundState['node' + BIND_SUFFIX].update(key, target[key]);
    if (target.onStateChange) target.onStateChange(change);
    return true;
  }
}

function bindTemplate() {

  if (!this.elementMeta.boundState) {
    this.elementMeta.boundState = {};
  }
  this.elementMeta.boundState['handler' + BIND_SUFFIX] = new BoundHandler(this);
  this.elementMeta.boundState['node' + BIND_SUFFIX] = new BoundNode(this.shadowRoot ? this.shadowRoot : this);
  this.state = new Proxy(this, this.elementMeta.boundState['handler' + BIND_SUFFIX]);

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
  target.prototype.getChildNodes = getChildNodes;
  target.prototype.bindTemplate = bindTemplate;
  target.prototype.setState = setState;
}

export {
  StateChange,
  bindTemplate,
  compileTemplate
}