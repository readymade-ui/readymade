export function closestRoot(base) {
  function __closestFrom(el) {
    if (el.getRootNode()) {
      return el.getRootNode();
    } else {
      return document.head;
    }
  }
  return __closestFrom(base);
}
export function attachShadow(instance, options) {
  if (!instance.template) {
    return;
  }
  if (!instance.shadowRoot) {
    const shadowRoot = instance.attachShadow(options || {});
    const t = document.createElement('template');
    t.innerHTML = instance.template;
    shadowRoot.appendChild(t.content.cloneNode(true));
  }
  instance.bindTemplate();
}
export function attachDOM(instance) {
  if (!instance.elementMeta) {
    return;
  }
  const t = document.createElement('template');
  t.innerHTML = instance.elementMeta.template;
  instance.appendChild(t.content.cloneNode(true));
  instance.bindTemplate();
}
export function attachStyle(instance) {
  if (!instance.elementMeta) {
    return;
  }
  const id = `${instance.elementMeta.selector}`;
  const closest = closestRoot(instance);
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
export function define(instance, meta) {
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
