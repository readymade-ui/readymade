import { ElementMeta } from './../../decorator';

export function closestRoot(base: Element) {
  function __closestFrom(el: any): Element | HTMLHeadElement {
    if (el.getRootNode()) {
      return el.getRootNode();
    } else {
      return document.head;
    }
  }
  return __closestFrom(base);
}

export function attachShadow(instance: any, options?: any) {
  if (!instance.template) {
    return;
  }
  if (!instance.shadowRoot) {
    const shadowRoot: ShadowRoot = instance.attachShadow(options || {});
    const t = document.createElement('template');
    t.innerHTML = instance.template;
    shadowRoot.appendChild(t.content.cloneNode(true));
  }
  instance.bindTemplate();
}

export function attachDOM(instance: any) {
  if (!instance.elementMeta) {
    return;
  }
  const t = document.createElement('template');
  t.innerHTML = instance.elementMeta.template;
  instance.appendChild(t.content.cloneNode(true));
  instance.bindTemplate();
}

export function attachStyle(instance: any) {
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

export function define(instance: any, meta: ElementMeta) {
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
