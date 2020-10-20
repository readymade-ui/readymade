import { TemplateComponent } from './component';
import { Component, State } from './../decorator/decorator';
import { templateRegExp } from './../element/src/compile';

@Component({
  selector: 'r-repeater',
  custom: { extends: 'template' },
  template: '<slot></slot>'
})
export class Repeater extends TemplateComponent {
  private $state: {
    items: any[];
  }
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
  public changeNode(protoNode: Element, regex: RegExp, value: any) {
    const node = document.importNode(protoNode, true);
    let attr;

    node.removeAttribute('repeat');

    if (protoNode.textContent.match(regex)) {
      node.textContent = protoNode.textContent.replace(
        regex,
        value
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

            protoNode.setAttribute(
              attr,
              attribute.nodeValue.replace(regex, '')
            );
            
            const remove = attribute.nodeName || attribute.name;
            node.removeAttribute(remove);

          }
        }
        const attributeValue = attribute.nodeValue || attribute.value;
        if (attributeValue.match(regex)) {
          if (!node.setAttribute) {
            // tslint:disable-next-line: only-arrow-functions, no-empty
            node.setAttribute = function (i: string, v: string) { };
          }
          node.setAttribute(
            attr,
            attributeValue.replace(regex, value)
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

    if (!this.parentNode) {
      return;
    }

    const clone = this.content.cloneNode(true);
    const parsed = items.split(/\s/g);
    const key = parsed[0];

    if (parsed[2].startsWith('{{')) {
      return;
    }

    const model = JSON.parse(parsed[2]);
    const protoNode = (clone as Element).querySelector(`[repeat="${key}"]`);
    const regex = templateRegExp(key);

    if (Array.isArray(model)) {
      for (let index = 0; index < model.length; index++) {
        this.changeNode(protoNode, regex, model[index]);
      }
    }

    protoNode.parentNode.removeChild(protoNode);
    this.parentNode.appendChild(clone);
    this.setState('items', items);
  }

  @State()
  public getState() {
    return { items: [] };
  }

  public bindTemplate?(): void;
  public setState?(prop: string, model: any): void;

}