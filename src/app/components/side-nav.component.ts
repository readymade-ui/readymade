import { Component, css, CustomElement, Emitter, html, Listen, StateChange } from './../../modules/core/index.js';

@Component({
  selector: 'r-side-nav',
  style: css`
		:host {
			display: block;
      position: fixed;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 0px;
      max-width: 320px;
      z-index: 8888;
      color: #000;
      overflow: visible;
		}
    :host.is--active {
      width: 320px;
    }
    .is--hidden {
      display: none;
    }
    svg {
      overflow: visible;
      transform: translateX(0px);
    }
    nav {
      display: block;
      position: relative;
      width: 0%;
      height: 100%;
      -webkit-clip-path: url(#c1);
      overflow: hidden;
    }
    nav.is--active {
      width: 1400px;
    }
    ul {
      margin-block-start: 0em;
      margin-block-end: 0em;
      padding-inline-start: 0px;
      width: 100%;
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
      height: 22px;
      width: calc(100% - 56px);
      margin-left: 20px;
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 0px;
      padding-right: 0px;
    }
    ul li a:link, ul li a:visited {
      opacity: 0.8;
      color: #000000;
      text-decoration: none;
    }
    ul li:hover a:link, ul li:hover a:visited {
      opacity: 1.0;
      color: #FFFFFF;
    }
    ul.top {
      position: absolute;
      top: 0px;
      margin-top: 240px;
    }
    ul.bottom {
      position: absolute;
      bottom: 0px;
    }
    ul.bottom li {
      margin-bottom: 10px;
    }
	`,
  template: html`
    <svg class="background"
      width="54px"
      height="60px">
          <clipPath id="c1">
                <polygon stroke-width="3"
                class="polygon"
                attr.points="{{points}}"></polygon>
          </clipPath>
          <g stroke="none" fill="none" fill-rule="evenodd">
              <polygon  fill="{{shadowColor}}"
                        stroke-width="0"
                        class="shadow"
                        points="7,34 22,32 24,22"></polygon>
              <polygon  fill="{{fillColor}}"
                        stroke-width="0"
                        class="polygon"
                        attr.points="{{points}}"></polygon>
          </g>
    </svg>
    <nav>
      <ul class="top">
        <li>
          <span><a data-link="#intro">Intro</a></span>
        </li>
        <li>
          <span><a data-link="#started">Getting Started</a></span>
        </li>
        <li>
          <span><a data-link="#docs">Using Readymade</a></span>
        </li>
        <li>
          <span><a data-link="#resources">Resources</a></span>
        </li>
      </ul>
    </nav>
  `,
})
class RSideNavComponent extends CustomElement {
  public direction: string;
  public status: string;
  public background: Element;
  public nav: Element;
  public shadow: Element;
  public player: any;
  public points: string;
  public currentPointValue: {
    a: number;
    b: number;
    c: number;
  };
  public state: {
     points: string;
     strokeColor: string;
     fillColor: string;
     shadowColor: string;
     size: string;
  };
  constructor() {
    super();
    this.direction = 'forwards';
    this.state.size = '10000px';
    this.state.strokeColor = '#cfcfcf';
    this.state.fillColor = '#cfcfcf';
    this.state.shadowColor = '#c0c0c0';
    this.state.points = `7,9 7,34 24,22`;
    this.currentPointValue = {
      a: 34,
      b: 24,
      c: 22
    };
  }
  @Emitter('close', {}, 'sidenav')
  public connectedCallback() {
    this.nav = this.shadowRoot.querySelector('nav');
    this.background = this.shadowRoot.querySelector('.background');
    this.shadow = this.shadowRoot.querySelector('.shadow');
    Array.from(this.shadowRoot.querySelectorAll('a')).forEach((a) => {
      a.addEventListener('click', (ev) => {
        document.querySelector((<Element>ev.target).getAttribute('data-link')).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        this.close();
      });
    });
  }
  @Listen('close', 'sidenav')
  public close() {
    if (this.status === 'is--inactive') { return; }
    this.status = 'is--inactive';
    this.direction = 'reverse';
    this.emitter.broadcast('close', 'sidenav');
    this.player = this.animate([
      { x: 0 },
      { x: 100 },
    ], { duration: 150, fill: 'forwards',  easing: 'steps(7, end)' });
    setTimeout(() => { this.classList.remove('is--active'); }, 50);
    setTimeout(() => { this.shadow.classList.remove('is--hidden'); }, 100);
    setTimeout(() => { this.nav.classList.remove('is--active'); }, 50);
    this.player.play();
    this.update();
  }
  @Listen('open', 'sidenav')
  public open(ev) {
    if (this.status === 'is--active') { return; }
    this.direction = 'forwards';
    this.status = 'is--active';
    this.player = this.animate([
      { x: 100 },
      { x: 0 },
    ], { duration: 1050, fill: 'forwards',  easing: 'steps(7, end)' });
    this.classList.add('is--active');
    this.shadow.classList.add('is--hidden');
    this.nav.classList.add('is--active');
    this.player.play();
    this.update();

  }

  public scale(v: number, min: number, max: number, gmin: number, gmax: number) {
    return ((v - min) / (max - min)) * (gmax - gmin) + gmin;
  }

  public update() {
    if (this.direction === 'forwards') {
      this.currentPointValue.a = this.scale(this.player.currentTime, 0, 350, 34, 3444);
      this.currentPointValue.b = this.scale(this.player.currentTime, 0, 350, 24, 2444);
      this.currentPointValue.c = this.scale(this.player.currentTime, 0, 350, 22, 2222);
    }
    if (this.direction === 'reverse') {
      this.currentPointValue.a = this.scale(this.player.currentTime, 0, 150, 6444, 34);
      this.currentPointValue.b = this.scale(this.player.currentTime, 0, 150, 4444, 24);
      this.currentPointValue.c = this.scale(this.player.currentTime, 0, 150, 4222, 22);
    }
    this.state.points = `7,9 7,${this.currentPointValue.a} ${this.currentPointValue.b},${this.currentPointValue.c}`;
    window.requestAnimationFrame(this.update.bind(this));
  }

}

customElements.define('r-side-nav', RSideNavComponent);

export { RSideNavComponent };
