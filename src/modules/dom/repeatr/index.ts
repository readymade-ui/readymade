import { Component, PseudoElement, templateId, uuidv4 } from '../../core';
import {
    DOT_BRACKET_NOTATION_REGEX,
    findValueByString,
    isObject,
    stripTemplateString,
    templateRegExp
} from '../../core/element/src/compile';
import { TemplateComponent } from '../custom';

function changeNode(
  protoNode: Element,
  key: string,
  regex: RegExp,
  value: any,
  index?: number,
  elem?: TemplateRepeater | Repeater
) {
  const node = document.importNode(protoNode, true);
  let attr: string = '';

  node.removeAttribute('repeat');

  if (protoNode.textContent.startsWith(`{{${key}`)) {
    const path = stripTemplateString(protoNode.textContent);
    const template = path.substring(path.search(DOT_BRACKET_NOTATION_REGEX));
    node.textContent = protoNode.textContent.replace(
      protoNode.textContent,
      isObject(value) ? findValueByString(value, template) : value
    );
  }

  for (const attribute of protoNode.attributes) {
    attr = attribute.nodeName || attribute.name;
    if (attr !== 'repeat') {
      if (attr.includes('attr.')) {
        if (!protoNode.getAttribute(attr.replace('attr.', ''))) {
          if (attribute.nodeName) {
            attr = attribute.nodeName.replace('attr.', '');
          } else if (attribute.name) {
            attr = attribute.name.replace('attr.', '');
          }
          if (!protoNode.setAttribute) {
            // tslint:disable-next-line: only-arrow-functions, no-empty
            protoNode.setAttribute = function(i: string, v: string) {};
          }
          const path = stripTemplateString(attribute.nodeValue);
          const template = path.substring(
            path.search(DOT_BRACKET_NOTATION_REGEX)
          );
          protoNode.setAttribute(
            attr,
            isObject(value) ? findValueByString(value, template) : value
          );
          const remove = attribute.nodeName || attribute.name;
          node.removeAttribute(remove);
        }
      }
      const attributeValue = attribute.nodeValue || attribute.value;

      if (attributeValue.startsWith(`{{${key}`)) {
        if (!node.setAttribute) {
          // tslint:disable-next-line: only-arrow-functions, no-empty
          node.setAttribute = function(i: string, v: string) {};
        }
        const path = stripTemplateString(attributeValue);
        const template = path.substring(
          path.search(DOT_BRACKET_NOTATION_REGEX)
        );
        node.setAttribute(
          attr,
          attributeValue.replace(
            attributeValue,
            isObject(value) ? findValueByString(value, template) : value
          )
        );
      }
      const check = attribute.nodeName || attribute.name;
      if (check.includes('attr.')) {
        (node as Element).removeAttribute(check);
      }
    }
  }
  protoNode.parentNode.appendChild(node);
}

function renderTemplate(
  elem: any,
  template: HTMLTemplateElement,
  items: string
): void {
  if (!elem.parentNode) {
    return;
  }

  const bound = items.match(/(\w*)(?:\s)(?:of)(?:\s)(.*)/);

  if (!bound.length) {
    return;
  }

  // key = bound[1];
  // modelKey = bound[2];

  const regex = templateRegExp(bound[1]);
  const clone = template.content.cloneNode(true);
  const protoNode = (clone as Element).querySelector(`[repeat="${bound[1]}"]`);
  let $elem = elem;
  let model;

  for (; $elem && $elem !== document; $elem = $elem.parentNode) {
    if ($elem.host && $elem.host.$state && $elem.host.$state[bound[2]]) {
      model = JSON.parse($elem.host.$state[bound[2]]);
      elem.$key = bound[2];
      $elem.host.ɵɵstate.$changes.addEventListener('change', ev =>
        elem.onChange(ev.detail)
      );
    } else if ($elem.$state && $elem.$state[bound[2]]) {
      model = JSON.parse($elem.$state[bound[2]]);
      elem.$key = bound[2];
      $elem.ɵɵstate.$changes.addEventListener('change', ev =>
        elem.onChange(ev.detail)
      );
    }
  }

  if (!model) {
    return;
  }

  if (Array.isArray(model)) {
    for (let index = 0; index < model.length; index++) {
      changeNode(protoNode, bound[1], regex, model[index], index, elem);
    }
  }

  protoNode.parentNode.removeChild(protoNode);

  if (elem instanceof Repeater || elem.constructor.name === 'Repeater') {
    elem.appendChild(clone);
  } else if (
    elem instanceof TemplateRepeater ||
    elem.constructor.name === 'TemplateRepeater'
  ) {
    const div = document.createElement('div');
    div.appendChild(clone);
    div.setAttribute('target', elem.$id);
    elem.parentNode.appendChild(div);
  }
}

@Component({
  selector: 'r-repeat',
  custom: { extends: 'template' }
})
export class TemplateRepeater extends TemplateComponent {
  $id: string = templateId() + uuidv4().slice(0, 6);
  $key: string;
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['items'];
  }

  attributeChangedCallback(name: string, prev: string, next: string) {
    switch (name) {
      case 'items':
        this.render();
        break;
    }
  }

  public remove() {
    if (!this.parentNode) {
      return;
    }
    const target = this.parentNode.querySelector(`[target="${this.$id}"]`);
    if (target) {
      target.innerHTML = '';
      this.parentNode.removeChild(target);
    }
  }

  public render(): void {
    this.remove();
    renderTemplate(this, this, this.getAttribute('items'));
  }

  public onChange(change: any) {
    if (change[this.$key]) {
      this.render();
    }
  }
}

@Component({
  selector: 'r-repeatr'
})
export class Repeater extends PseudoElement {
  $id: string = templateId() + uuidv4().slice(0, 6);
  $key: string;
  $templateId: string;
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['items', 'template'];
  }

  attributeChangedCallback(name: string, prev: string, next: string) {
    switch (name) {
      case 'template':
        this.setTemplate(next);
        break;
      case 'items':
        this.render();
        break;
    }
  }

  public remove() {
    this.innerHTML = '';
  }

  public render() {
    const template = document.querySelector(
      `[id="${this.$templateId}"]`
    ) as HTMLTemplateElement;
    if (template) {
      this.remove();
      renderTemplate(this, template, this.getAttribute('items'));
    }
  }

  public onChange(change: any) {
    if (change[this.$key]) {
      this.render();
    }
  }

  public setTemplate(id: string) {
    this.$templateId = id;
    this.render();
  }
}
