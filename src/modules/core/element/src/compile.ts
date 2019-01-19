import { getChildNodes } from './util';

const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
const BIND_SUFFIX = ' __state';

Object.byString = function(o, s) {
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

function setTemplate(elem: Element, html: string) {
    const _elem = elem.cloneNode(false);
    _elem.innerHTML = html;
    elem.parentNode.replaceChild(_elem, elem);
}

class BoundNode {
  constructor (node) {
    this.template = node.innerHTML;
    this.node = node;
  }
  update(data) {
    let tempTemplate = this.template.slice(0);
    this.node.innerHTML = tempTemplate.replace(TEMPLATE_BIND_REGEX, (match, variable) => {
      return Object.byString(data, /\{\{(\s*)(.*?)(\s*)\}\}/.exec(match)[2]) || '';
    });
  }
}

class BoundHandler {
  constructor(obj) {
    this.model = obj;
  }
  set(target, key, value) {
    target[key] = value;
    this.model.elementMeta.boundState['node' + BIND_SUFFIX].update(this.model);
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
  .map((node: Element) => {
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
  bindTemplate,
  bindTemplateNodes,
  compileTemplate
};