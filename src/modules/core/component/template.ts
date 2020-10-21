import { TemplateComponent } from './component';
import { Component } from './../decorator/decorator';
import { isObject, stripTemplateString, findValueByString, templateRegExp, DOT_BRACKET_NOTATION_REGEX } from './../element/src/compile';

@Component({
  selector: 'r-repeater',
  custom: { extends: 'template' },
  template: '<slot></slot>'
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
  public changeNode(protoNode: Element, key: string, regex: RegExp, value: any, index?: number) {
    const node = document.importNode(protoNode, true);
    let attr: string = '';

    node.removeAttribute('repeat');

    if (protoNode.textContent.startsWith(`{{${key}`)) {
      const path = stripTemplateString(protoNode.textContent);
      const template = path.substring(path.search(DOT_BRACKET_NOTATION_REGEX));
      node.textContent = protoNode.textContent.replace(
        protoNode.textContent,
        isObject(value) ? findValueByString(value, template) : value
      )
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
              protoNode.setAttribute = function (i: string, v: string) { };
            }
            const path = stripTemplateString(attribute.nodeValue);
            const template = path.substring(path.search(DOT_BRACKET_NOTATION_REGEX));
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
            node.setAttribute = function (i: string, v: string) { };
          }
          const path = stripTemplateString(attributeValue);
          const template = path.substring(path.search(DOT_BRACKET_NOTATION_REGEX));
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
  public render(items: string): void {

    const bound = items.match(/(\w*)(?:\s)(?:of)(?:\s)(?:\{\{(?:\s*)(.*?)(?:\s*)\}\})/);

    if (bound && bound.length) {
      return;
    }

    if (!this.parentNode) {
      return;
    }

    const key = items.split('of')[0].trim();
    const model = JSON.parse(items.split('of')[1].trim());
    const regex = templateRegExp(key);

    const clone = this.content.cloneNode(true);
    const protoNode = (clone as Element).querySelector(`[repeat="${key}"]`);

    if (Array.isArray(model)) {
      for (let index = 0; index < model.length; index++) {
        this.changeNode(protoNode, key, regex, model[index], index);
      }
    }

    protoNode.parentNode.removeChild(protoNode);
    this.parentNode.appendChild(clone);

  }

  public bindTemplate?(): void;
  public setState?(prop: string, model: any): void;

}