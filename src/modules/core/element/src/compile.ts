import { getChildNodes } from './util';
import { ElementMeta } from './../../decorator/index';

const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
const BIND_SUFFIX = ' __state';

interface StateChange {
  [key: string] : {
    previousValue: any,
    newValue: any
  }
}

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

class BoundNode {
  template: string;
  node: Element;
  constructor (node) {
    this.template = node.querySelector('r-template').innerHTML;
    this.node = node.querySelector('r-template');
  }
  update(data) {
    console.log(this.template.slice(0), this.node);
    (<Element>this.node) = setTemplate(this.node, this.template.slice(0).replace(TEMPLATE_BIND_REGEX, (match, variable) => {
      return (<any>Object).byString(data, /\{\{(\s*)(.*?)(\s*)\}\}/.exec(match)[2]) || '';
    }))
  }
}

class BoundHandler {
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
    this.model.elementMeta.boundState['node' + BIND_SUFFIX].update(this.model);
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

function compileTemplate(elementMeta: ElementMeta, target: any) {
  target.prototype.elementMeta = Object.assign({}, elementMeta);
  target.prototype.elementMeta.eventMap = {};
  target.prototype.template = document.createElement('template');
  target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
  target.prototype.getChildNodes = getChildNodes;
  target.prototype.bindTemplateNodes = bindTemplateNodes;
  target.prototype.bindTemplate = bindTemplate;
}

export {
  StateChange,
  bindTemplate,
  bindTemplateNodes,
  compileTemplate
}