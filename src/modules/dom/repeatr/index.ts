import { Component, PseudoElement } from '../../core';
import { TemplateComponent } from '../custom';
import {
  isObject,
  stripTemplateString,
  findValueByString,
  templateRegExp,
  DOT_BRACKET_NOTATION_REGEX
} from '../../core/element/src/compile';

function changeNode(
  protoNode: Element,
  key: string,
  regex: RegExp,
  value: any,
  index?: number
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
  elem: Repeater | TemplateRepeater,
  template: HTMLTemplateElement,
  items: string
): void {
  const bound = items.match(
    /(\w*)(?:\s)(?:of)(?:\s)(?:\{\{(?:\s*)(.*?)(?:\s*)\}\})/
  );

  if (bound && bound.length) {
    return;
  }

  if (!elem.parentNode) {
    return;
  }

  const key = items.split('of')[0].trim();
  const model = JSON.parse(items.split('of')[1].trim());
  const regex = templateRegExp(key);

  const clone = template.content.cloneNode(true);
  const protoNode = (clone as Element).querySelector(`[repeat="${key}"]`);

  if (Array.isArray(model)) {
    for (let index = 0; index < model.length; index++) {
      changeNode(protoNode, key, regex, model[index], index);
    }
  }

  protoNode.parentNode.removeChild(protoNode);

  if (elem instanceof TemplateRepeater) {
    elem.appendChild(clone);
  } else {
    elem.parentNode.appendChild(clone);
  }
}

@Component({
  selector: 'r-repeat',
  custom: { extends: 'template' }
})
export class Repeater extends TemplateComponent {
  constructor() {
    super();
    this.bindTemplate();
  }

  static get observedAttributes() {
    return ['items'];
  }

  attributeChangedCallback(name, prev, next) {
    switch (name) {
      case 'items':
        this.render(next);
        break;
    }
  }
  public render(items: string): void {
    renderTemplate(this, this, items);
  }

  public bindTemplate?(): void;
}

@Component({
  selector: 'r-repeatr'
})
export class TemplateRepeater extends PseudoElement {
  $templateId: string;
  $items: string;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['items', 'template'];
  }

  attributeChangedCallback(name, prev, next) {
    switch (name) {
      case 'template':
        this.setTemplate(next);
        break;
      case 'items':
        this.setItems(next);
        break;
    }
  }

  public setItems(items: string): void {
    this.$items = items;
    this.render();
  }

  public render() {
    const template = document.querySelector(
      `[id="${this.$templateId}"]`
    ) as HTMLTemplateElement;
    if (template && this.$items) {
      renderTemplate(this, template, this.$items);
    }
  }

  public setTemplate(id: string) {
    this.$templateId = id;
    this.render();
  }
}
