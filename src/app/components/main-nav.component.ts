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
      z-index: 9999;
		}
    nav {
      width: 100%;
    }
    ul {
      margin-block-start: 0em;
      margin-block-end: 0em;
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
    ul.right {
      float: right;
      margin-right: 56px;
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

    this.onUpdate();

  }
  onUpdate() {

    const navLink = this.shadowRoot.querySelector('[link="side-nav"]');
    navLink.addEventListener('click', () => {

      if (this.isNavOpen === true) {
         this.isNavOpen = false;
         this.emitter.broadcast(this.emitter.get('close'), 'sidenav');
      } else if (this.isNavOpen === false) {
         this.isNavOpen = true;
         this.emitter.broadcast(this.emitter.get('open'), 'sidenav');
      }
    });

    const navLink2 = this.shadowRoot.querySelector('[link="side-nav"]');
    navLink2.addEventListener('click', () => {

    });
    // console.log(navLink, navLink2);
  }
}

customElements.define('r-main-nav', RMainNavComponent);

export { RMainNavComponent };
