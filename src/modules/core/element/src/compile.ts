import { getChildNodes } from './util.js';
import { ElementMeta } from './../../decorator/index.js';
import { OnStateChange, StateChange } from './../../component/index.js';

const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
const BIND_SUFFIX = ' __state';


interface Node {
    cloneNode(deep?: boolean): this;
}

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
  previousNode: Element;
  constructor (node) {
    this.template = document.createElement('div');
    this.template.innerHTML = node.innerHTML;
    this.node = node;
  }
  update(data: any, target: any) {
    (<Element>this.node) = setTemplate(this.node, this.template.innerHTML.replace(TEMPLATE_BIND_REGEX, (match, variable) => {
      if (match === undefined || match === null) match = '';
      return (<any>Object).byString(data, /\{\{(\s*)(.*?)(\s*)\}\}/.exec(match)[2]) || '';
    }));
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
    this.model.elementMeta.boundState['node' + BIND_SUFFIX].update(this.model, target);
    if (target.onStateChange) target.onStateChange(change);
    return true;
  }
}

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


// support setting global state for now, what about descendant properties?
function setState(prop: string, model: any) {
    this.state[prop] = model;
}

function compileTemplate(elementMeta: ElementMeta, target: any) {
  target.prototype.elementMeta = Object.assign({}, elementMeta);
  target.prototype.elementMeta.eventMap = {};
  target.prototype.template = document.createElement('template');
  target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
  target.prototype.getChildNodes = getChildNodes;
  target.prototype.bindTemplateNodes = bindTemplateNodes;
  target.prototype.bindTemplate = bindTemplate;
  target.prototype.setState = setState;
}

export {
  StateChange,
  bindTemplate,
  bindTemplateNodes,
  compileTemplate
}