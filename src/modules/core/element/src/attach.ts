import { ElementMeta } from './../../decorator';

function attachShadow(instance: any, options?: any) {
  const shadowRoot: ShadowRoot = instance.attachShadow(options || {});
  const t = document.createElement('template');
  t.innerHTML = instance.template;
  shadowRoot.appendChild(t.content.cloneNode(true));
  instance.bindTemplate();
}

function attachDOM(instance: any, options?: any) {
  const t = document.createElement('template');
  t.innerHTML = instance.elementMeta.template;
  instance.appendChild(t.content.cloneNode(true));
  instance.bindTemplate();
}

function attachStyle(instance: any, options?: any) {
  const id = `${instance.elementMeta.selector}`;
  if (!document.getElementById(`${id}-x`)) {
    const t = document.createElement('style');
    t.setAttribute('id', `${id}-x`);
    t.innerText = instance.elementMeta.style;
    t.innerText = t.innerText.replace(/:host/gi, `[is=${id}]`);
    document.head.appendChild(t);
  }
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
