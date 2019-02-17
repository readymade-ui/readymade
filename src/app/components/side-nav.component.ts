import { Component, css, html, CustomElement, StateChange, Listen } from './../../modules/core/index.js';

@Component({
  selector: 'r-side-nav',
  template: html`
    <div class="background"></div>
    <nav>
      <ul class="top">
        <li><span>getting started</span></li>
        <li><span>components</span></li>
        <li><span>events</span></li>
        <li><span>data binding </span></li>
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
      left: -320px;
      height: 100%;
      width: 320px;
      max-width: 320px;
      font-family: 'Major Mono Display', serif;
      z-index: 8888;
      color: #000;
      overflow: visible;
		}
    .background {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 200%;
        height: 500%;
        transform: translateX(-520px) translateY(2000px) rotate(-45deg);
        background: rgba(255,255,255,0.97);
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
      opacity: 0.8;
      cursor: pointer;
      padding-inline-start: 0px;
      width: 100%;
      max-width: 320px;
      font-weight: 700;
    }
    ul li > span {
      display: inline-block;
      position: relative;
      opacity: 0.8;
      height: 22px;
      width: calc(100% - 56px);
      margin-left: 56px;
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 0px;
      padding-right: 0px;
      color: #222222;
    }
    ul li:hover span {
      opacity: 1.0;
      color: #000000;
    }
    ul.top {
      position: absolute;
      top: 0px;
      margin-top: 240px;
    }
    ul.top li {

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
  public background: Element;
  constructor() {
    super();
  }
  connectedCallback() {
    this.background = this.shadowRoot.querySelector('.background');
    // document.addEventListener('click', (ev) => {
    //   if (ev.target !== this.shadowRoot && !this.shadowRoot.contains(ev.target)) {
    //     this.close({});
    //   } else {
    //     console.log('in nav');
    //   }
    // })
  }
  @Listen('close', 'sidenav')
  public close(ev) {
    if (this.status === 'is--inactive') return;
    this.status = 'is--inactive';

    this.animate([
      { left: '0px' },
      { left: '-320px' }
    ], { duration: 150, fill: 'forwards' });
    this.background.animate([
      { transform: `translateX(520px) translateY(-200px) rotate(-30deg)`},
      { transform: `translateX(-520px) translateY(2000px) rotate(-45deg)`}
    ], { duration: 150, fill: 'forwards' });
  }
  @Listen('open', 'sidenav')
  public open(ev) {
    if (this.status === 'is--active') return;
    this.status = 'is--active';
    this.animate([
      { left: '-320px' },
      { left: '0px' }
    ],{ duration: 150, fill: 'forwards' });
    this.background.animate([
      { transform: `translateX(-520px) translateY(2000px) rotate(-45deg)`},
      { transform: `translateX(520px) translateY(-200px) rotate(-30deg)`}
    ], { duration: 150, fill: 'forwards' });

  }

}

customElements.define('r-side-nav', RSideNavComponent);

export { RSideNavComponent };
