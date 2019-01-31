import { Component, css, html, CustomElement, StateChange, Listen } from './../../modules/core/index.js';

@Component({
  selector: 'r-side-nav',
  template: html`
    <nav>
      <ul class="top">
        <li><span>getting started</span></li>
        <li><span>components</span></li>
        <li><span>events</span></li>
        <li><span>data binding</span></li>
        <li><span>treeshaking</span></li>
        <li><span>typescript</span></li>
        <li><span>bundling</span></li>
      </ul>
      <ul class="bottom">
        <li><span>gitter</span></li>
      </ul>
    </nav>
  `,
  style: css`
		:host {
			display: block;
      position: fixed;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 0px;
      max-width: 320px;
      background: rgba(2,2,2,0.97);
      font-family: 'Major Mono Display', serif;
      overflow-x: hidden;
      z-index: 8888;
		}
    nav {
      width: 320px;
      height: 100%;
    }
    ul {
      margin-block-start: 0em;
      margin-block-end: 0em;
      padding-inline-start: 0px;
      width: 320px;
      display: block;
    }
    ul li {
      display: block;
      cursor: pointer;
      width: 100%;
      padding: 1em;
      opacity: 0.8;
      cursor: pointer;
      padding-left: 56px;
      background: rgba(10,10,10,0.0);
      width: 100%;
      max-width: 320px;
      padding-left: 0px;
      padding-right: 0px;
      padding-inline-start: 0px;
    }
    ul li span {
      width: 100%;
      display: block;
      padding-left: 56px;
    }
    ul li:hover {
      opacity: 1.0;
      background: rgba(10,10,10,1.0);
    }
    ul.top {
      position: absolute;
      top: 0px;
      margin-top: 120px;
    }
    ul.top li {
      margin-top: 10px;
    }
    ul.bottom {
      position: absolute;
      bottom: 0px;
    }
    ul.bottom li {
      margin-bottom: 10px;
    }
	`
})
class RSideNavComponent extends CustomElement {
  public status: string
  constructor() {
    super();
  }
  connectedCallback() {
    // document.addEventListener('click', (ev) => {
    //   if (ev.target !== this.shadowRoot && !this.shadowRoot.contains(ev.target)) {
    //     this.close();
    //   } else {
    //     console.log('in nav');
    //   }
    // })
  }
  @Listen('close', 'sidenav')
  public close(ev) {

    if (this.status === 'is--inactive') return;
    this.status = 'is--inactive';
    this.animate(
      [
        { width: '320px' },
        { width: '0px' }
      ], {
        duration: 150,
        fill: 'forwards'
      }
    );
  }
  @Listen('open', 'sidenav')
  public open(ev) {

     this.status = 'is--active';
      this.animate(
        [
          { width: '0' },
          { width: '320px' }
        ], {
          duration: 150,
          fill: 'forwards'
        }
      );
  }

}

customElements.define('r-side-nav', RSideNavComponent);

export { RSideNavComponent };
