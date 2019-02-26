function attachShadow(instance, options) {
    const shadowRoot = instance.attachShadow(options || {});
    const t = document.createElement('template');
    t.innerHTML = instance.template;
    shadowRoot.appendChild(t.content.cloneNode(true));
    instance.bindTemplate();
}
function attachDOM(instance, options) {
    const t = document.createElement('template');
    t.innerHTML = instance.elementMeta.template;
    instance.appendChild(t.content.cloneNode(true));
    instance.bindTemplate();
}
function attachStyle(instance, options) {
    const id = `${instance.elementMeta.selector}`;
    if (!document.getElementById(`${id}-x`)) {
        const t = document.createElement('style');
        t.setAttribute('id', `${id}-x`);
        t.innerText = instance.elementMeta.style;
        t.innerText = t.innerText.replace(/:host/gi, `[is=${id}]`);
        document.head.appendChild(t);
    }
}
export { attachDOM, attachStyle, attachShadow, };
