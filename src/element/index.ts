// template binding
const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
const BIND_SUFFIX = ' __state';

Object.byString = function(o, s) {
    if(!s) return o;
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
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

// utility methods

function getChildNodes() {
    function getChildren(node: Element, path: Element[] = [], result: Element[] = []){
        if(!node.children.length)
            result.push(path.concat(node));
        for(const child of node.children)
            getChildren(child, path.concat(child), result);
        return result;
    }
   const nodes : Element[] = getChildren(this, []).reduce((nodes, curr) => {
     return nodes.concat(curr);
   },[]);
   return nodes.filter((item, index) => { return nodes.indexOf(item) >= index; });
}

function bindTemplate() {
  if (!this.elementMeta) this.elementMeta = {};
  this.elementMeta.templateRegex = TEMPLATE_BIND_REGEX;
  this.elementMeta.boundState = {
      ['node' + BIND_SUFFIX]: new BoundNode(this),
      ['handler' + BIND_SUFFIX]: new BoundHandler(this)
  }
  this.state = new Proxy(this, this.elementMeta.boundState['handler' + BIND_SUFFIX]);
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

function getParent(el) {
  return el.parentNode;
}

function querySelector(selector: string) {
  return document.querySelector(selector);
}

function querySelectorAll(selector: string) {
  return Array.from(document.querySelectorAll(selector));
}

function getSiblings(el, filter) {
  if (!filter) {
    filter = [];
  }
  return Array.from(getParent(el).children).filter((elem) => {
    return elem.tagName !== 'TEXT' && elem.tagName !== 'STYLE';
  });
}

function getElementIndex(el) {
  return getSiblings(el).indexOf(el);
}

// handle template
function attachShadow(instance: any, options: any) {
  const shadowRoot: ShadowRoot = instance.attachShadow(options || {});
  const t = document.createElement('template');
  t.innerHTML = instance.template;
  shadowRoot.appendChild(t.content.cloneNode(true));
  instance.bindTemplate();
}

function attachDOM(instance: any, options: any) {
  const t = document.createElement('template');
  t.innerHTML = instance.elementMeta.template;
  instance.appendChild(t.content.cloneNode(true));
  instance.bindTemplate();
}

function attachStyle(instance: any, options: any) {
  const id = `${instance.elementMeta.selector}`;
  if (!document.getElementById(`${id}-x`)) {
    const t = document.createElement('style');
    t.setAttribute('id', `${id}-x`);
    t.innerText = instance.elementMeta.style;
    t.innerText = t.innerText.replace(/:host/gi, `[is=${id}]`);
    document.head.appendChild(t);
  }
}


export {
  attachDOM,
  attachStyle,
  attachShadow,
  getSiblings,
  getElementIndex,
  getParent,
  querySelector,
  querySelectorAll,
  getChildNodes,
  bindTemplate,
  bindTemplateNodes,
  compileTemplate
};
