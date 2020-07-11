import { Component, css, CustomElement, getElementIndex, getSiblings, html, Listen  } from '../../../../modules/core/index.js';

@Component({
  selector: 'my-list',
  style: css`
		:host {
			display: block;
			background: rgba(24, 24, 24, 1);
			width: 200px;
			height: 200px;
			color: white;
			padding: 1em;
			border-radius: 8px;
		}
	`,
  template: html`
		<slot name="menu"></slot>
	`,
})
class MyListComponent extends CustomElement {
  public currentIndex: number;
  constructor() {
    super();
    this.currentIndex = 0;
  }
  public deactivateElement(elem: Element) {
    elem.setAttribute('tabindex', '-1');
    elem.querySelector('my-item').setAttribute('state', '');
  }
  public activateElement(elem: Element) {
    elem.setAttribute('tabindex', '0');
    elem.querySelector('my-item').setAttribute('state', '--selected');
  }
  public connectedCallback() {
    this.setAttribute('tabindex', '0');
  }
  @Listen('focus')
  public onFocus(ev: FocusEvent) {
      for (const li of this.children[0].children) {
        if (li === this.children[0].children[this.currentIndex]) {
          this.activateElement(li);
        } else {
          this.deactivateElement(li);
        }
        li.addEventListener('click', (clickEv: MouseEvent) => {
          getSiblings(li).forEach((elem: HTMLElement) => {
            this.deactivateElement(elem);
          });
          this.activateElement(li);
          this.onSubmit(clickEv);
        });
      }
  }
  @Listen('keydown')
  public onKeydown(ev: KeyboardEvent) {
      const currentElement = this.querySelector('[tabindex]:not([tabindex="-1"])');
      const siblings = getSiblings(currentElement);
      this.currentIndex = getElementIndex(currentElement);
      if (ev.keyCode === 13) {
        this.onSubmit(ev);
      }
      if (ev.keyCode === 38) {
        // up
        if (this.currentIndex === 0) {
          this.currentIndex = siblings.length - 1;
        } else {
          this.currentIndex -= 1;
        }
        siblings.forEach((elem: HTMLElement) => {
          if (getElementIndex(elem) === this.currentIndex) {
            this.activateElement(elem);
          } else {
            this.deactivateElement(elem);
          }
        });
      }
      if (ev.keyCode === 40) {
        // down
        if (this.currentIndex === siblings.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex += 1;
        }
        siblings.forEach((elem: HTMLElement) => {
          if (getElementIndex(elem) === this.currentIndex) {
            this.activateElement(elem);
          } else {
            this.deactivateElement(elem);
          }
        });
      }
  }
  public onSubmit(event) {
    // console.log(this, event);
  }
}

export { MyListComponent };
