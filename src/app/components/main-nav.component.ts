import { Component, css, html, CustomElement, StateChange, Emitter, Listen } from './../../modules/core/index.js';

@Component({
  selector: 'r-main-nav',
  template: html`
    <nav>
      <ul class="left">
        <li link="side-nav">docs</li>
      </ul>
      <ul class="right">
        <li link="github">github</li>
      </ul>
    </nav>
  `,
  style: css`
		:host {
			display: block;
      position: fixed;
      top: 0px;
      width: 100%;
      height: 60px;
      margin-right: 40px;
      font-family: 'Major Mono Display', serif;
      font-weight: 700;
      z-index: 9999;
		}
    nav {
      width: 100%;
    }
    ul {
      margin-block-start: 0em;
      margin-block-end: 0em;
      padding-inline-start: 0px;
    }
    ul li {
      display: inline-block;
      cursor: pointer;
      height: 100%;
      padding: 1em;
      opacity: 0.8;
      cursor: pointer;
    }
    ul li:hover {
      opacity: 1.0;
    }
    ul.left {
      float: left;
    }
    ul.left li {
      margin-right: 10px;
    }
    ul.left li.is--dark {
      color: #222222;
    }
    ul.left li.is--dark:hover {
      color: #000000;
    }
    ul.right {
      float: right;
      margin-right: 0px;
    }
    ul.right li {
      margin-left: 10px;
    }
	`
})
class RMainNavComponent extends CustomElement {
  public isNavOpen: boolean;
  constructor() {
    super();
    this.isNavOpen = false;
  }
  @Emitter('open', {}, 'sidenav')
  @Emitter('close', {}, 'sidenav')
  connectedCallback() {

    const navLink = this.shadowRoot.querySelector('[link="side-nav"]');
    navLink.addEventListener('click', () => {

      if (this.isNavOpen === true) {
         this.isNavOpen = false;
         this.emitter.broadcast('close', 'sidenav');
         navLink.classList.remove('is--dark');
      } else if (this.isNavOpen === false) {
         this.isNavOpen = true;
         this.emitter.broadcast('open', 'sidenav');
         navLink.classList.add('is--dark');
      }
    });

  }
}

customElements.define('r-main-nav', RMainNavComponent);

export { RMainNavComponent };
