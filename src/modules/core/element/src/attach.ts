import { ElementMeta } from './../../decorator';

function closestRoot(base: Element) {
  function __closestFrom(el: any): Element | HTMLHeadElement {
    if (el.getRootNode()) {
      return el.getRootNode();
    } else {
      return document.head;
    }
  }
  return __closestFrom(base);
}

function attachShadow(instance: any, options?: any) {
  if (!instance.template) {
    return;
  }
  const shadowRoot: ShadowRoot = instance.attachShadow(options || {});
  const t = document.createElement('template');
  t.innerHTML = instance.template;
  shadowRoot.appendChild(t.content.cloneNode(true));
  instance.bindTemplate();
}

function attachDOM(instance: any, options?: any) {
  if (!instance.elementMeta) {
    return;
  }
  const t = document.createElement('template');
  t.innerHTML = instance.elementMeta.template;
  instance.appendChild(t.content.cloneNode(true));
  instance.bindTemplate();
}

function attachStyle(instance: any, options?: any) {
  if (!instance.elementMeta) {
    return;
  }
  const id = `${instance.elementMeta.selector}`;
  const closest: any = closestRoot(instance);
  if (closest.tagName === 'HEAD' && document.getElementById(`${id}-x`)) {
    return;
  }
  if (closest.getElementById && closest.getElementById(`${id}-x`)) {
    return;
  }
  const t = document.createElement('style');
  t.setAttribute('id', `${id}-x`);
  t.innerText = instance.elementMeta.style;
  t.innerText = t.innerText.replace(/:host/gi, `[is=${id}]`);
  closest.appendChild(t);
}

function define(instance: any, meta: ElementMeta) {
  if (meta.autoDefine === true) {
    if (meta.selector && !meta.custom) {
      customElements.define(meta.selector, instance.contructor);
    } else if (meta.selector && meta.custom) {
      customElements.define(meta.selector, instance.contructor, meta.custom);
    } else {
      customElements.define(meta.selector, instance.contructor);
    }
  }
}

export { attachDOM, attachStyle, attachShadow, define };
