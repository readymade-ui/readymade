import { Component, css, html, CustomElement, StateChange, Emitter, Listen } from './../../modules/core/index.js';

@Component({
  selector: 'r-side-nav',
  template: html`
  <svg class="background" width="44px" height="44px">
          <clipPath id="clipPath">
                <polygon stroke-width="3"
                class="polygon"
                points="{{points}}"></polygon>
          </clipPath>
          <g stroke="none" fill="none" fill-rule="evenodd">
              <polygon stroke="{{strokeColor}}"
                        fill="{{fillColor}}"
                        stroke-width="3"
                        class="polygon"
                        points="{{points}}"></polygon>
          </g>
    </svg>
    <nav>
      <ul class="top">
        <li><span><a href="#intro">Intro</a></span></li>
        <li><span><a href="#started">Getting Started</a></span></li>
        <li><span><a href="#docs">Using Readymade</a></span></li>
      </ul>
      <!-- <ul class="bottom">
        <li><span>gitter</span></li>
      </ul> -->
    </nav>
  `,
  style: css`
		:host {
			display: block;
      position: fixed;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 320px;
      max-width: 320px;
      z-index: 8888;
      color: #000;
      overflow: visible;
      clip-path: url(#clipPath);
		}
    svg {
      overflow: visible;
      transform: translateX(0px);
    }
    nav {
      width: 100%;
      height: 100%;
       clip-path: url(#clipPath);
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
      color: #222222;
      text-decoration: none;
    }
    ul li:hover a:link, ul li:hover a:visited {
      opacity: 1.0;
      color: #000000;
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
	`
})
class RSideNavComponent extends CustomElement {
  public direction: string;
  public status: string
  public background: Element;
  public player: any;
  public points: string;
  public currentPointValue: {
    a: number;
    b: number;
  }
  public state: {
     points: string;
     strokeColor: string;
     fillColor: string;
     size: string;
  }
  constructor() {
    super();
    this.direction = 'forwards';
    this.state.size = '10000px';
    this.state.strokeColor = '#cdcdcd';
    this.state.fillColor = '#cdcdcd';
    this.state.points = `7 9 7 54 44 54`;
    this.currentPointValue = {
      a: 54,
      b: 44
    }
  }
  @Emitter('close', {}, 'sidenav')
  connectedCallback() {
    this.background = this.shadowRoot.querySelector('.background');
    Array.from(this.shadowRoot.querySelectorAll('a')).forEach((a) => {
      a.addEventListener('click', (ev) => {
        this.emitter.broadcast('close');
      });
    });
  }
  @Listen('close', 'sidenav')
  public close() {
    if (this.status === 'is--inactive') return;
    this.status = 'is--inactive';
    this.direction = 'reverse';
    this.player = this.animate([
      { x: 0 },
      { x: 100 }
    ], { duration: 1000, fill: 'forwards' });
    this.player.play();
    this.update();
  }
  @Listen('open', 'sidenav')
  public open(ev) {
    if (this.status === 'is--active') return;
    this.direction = 'forwards';
    this.status = 'is--active';
    this.player = this.animate([
      { x: 100 },
      { x: 0 }
    ],{ duration: 1000, fill: 'forwards' });
    this.player.play();
    this.update();

  }

  scale(v: number, min: number, max: number, gmin: number, gmax: number) {
    return ((v - min) / (max - min)) * (gmax - gmin) + gmin;
  }

  update() {
      if (this.direction === 'forwards') {
        this.currentPointValue.a = this.scale(this.player.currentTime, 0, 1000, 54, 2400);
        this.currentPointValue.b = this.scale(this.player.currentTime, 0, 1000, 44, 2400);
      }
      if (this.direction === 'reverse') {
        this.currentPointValue.a = this.scale(this.player.currentTime, 1000, 0, 54, 2400);
        this.currentPointValue.b = this.scale(this.player.currentTime, 1000, 0, 44, 2400);
      }
      this.state.points = `7 9 7 ${this.currentPointValue.a} ${this.currentPointValue.b} ${this.currentPointValue.a}`;
      window.requestAnimationFrame(this.update.bind(this));
  }

}

customElements.define('r-side-nav', RSideNavComponent);

export { RSideNavComponent };
