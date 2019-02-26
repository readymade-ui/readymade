var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, css, CustomElement, Emitter, html, Listen } from './../../modules/core/index.js';
let RSideNavComponent = class RSideNavComponent extends CustomElement {
    constructor() {
        super();
        this.direction = 'forwards';
        this.state.size = '10000px';
        this.state.strokeColor = '#cfcfcf';
        this.state.fillColor = '#cfcfcf';
        this.state.points = `7 9 7 34 24 34`;
        this.currentPointValue = {
            a: 54,
            b: 44,
        };
    }
    connectedCallback() {
        this.nav = this.shadowRoot.querySelector('nav');
        this.background = this.shadowRoot.querySelector('.background');
        Array.from(this.shadowRoot.querySelectorAll('a')).forEach((a) => {
            a.addEventListener('click', (ev) => {
                this.close();
            });
        });
    }
    close() {
        if (this.status === 'is--inactive') {
            return;
        }
        this.status = 'is--inactive';
        this.direction = 'reverse';
        this.emitter.broadcast('close', 'sidenav');
        this.player = this.animate([
            { x: 0 },
            { x: 100 },
        ], { duration: 150, fill: 'forwards', easing: 'steps(7, end)' });
        setTimeout(() => { this.classList.remove('is--active'); }, 50);
        setTimeout(() => { this.nav.classList.remove('is--active'); }, 50);
        this.player.play();
        this.update();
    }
    open(ev) {
        if (this.status === 'is--active') {
            return;
        }
        this.direction = 'forwards';
        this.status = 'is--active';
        this.player = this.animate([
            { x: 100 },
            { x: 0 },
        ], { duration: 550, fill: 'forwards', easing: 'steps(7, end)' });
        setTimeout(() => { this.classList.add('is--active'); }, 0);
        setTimeout(() => { this.nav.classList.add('is--active'); }, 0);
        this.player.play();
        this.update();
    }
    scale(v, min, max, gmin, gmax) {
        return ((v - min) / (max - min)) * (gmax - gmin) + gmin;
    }
    update() {
        if (this.direction === 'forwards') {
            this.currentPointValue.a = this.scale(this.player.currentTime, 0, 350, 34, 2400);
            this.currentPointValue.b = this.scale(this.player.currentTime, 0, 350, 24, 2550);
        }
        if (this.direction === 'reverse') {
            this.currentPointValue.a = this.scale(this.player.currentTime, 0, 150, 2400, 34);
            this.currentPointValue.b = this.scale(this.player.currentTime, 0, 150, 2550, 24);
        }
        this.state.points = `7 9 7 ${this.currentPointValue.a} ${this.currentPointValue.b} ${this.currentPointValue.a}`;
        window.requestAnimationFrame(this.update.bind(this));
    }
};
__decorate([
    Emitter('close', {}, 'sidenav')
], RSideNavComponent.prototype, "connectedCallback", null);
__decorate([
    Listen('close', 'sidenav')
], RSideNavComponent.prototype, "close", null);
__decorate([
    Listen('open', 'sidenav')
], RSideNavComponent.prototype, "open", null);
RSideNavComponent = __decorate([
    Component({
        selector: 'r-side-nav',
        style: css `
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
      width: 320px;
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
        template: html `
    <svg class="background"
      width="54px"
      height="60px">
          <clipPath id="c1">
                <polygon stroke-width="3"
                class="polygon"
                attr.points="{{points}}"></polygon>
          </clipPath>
          <g stroke="none" fill="none" fill-rule="evenodd">
              <polygon stroke="{{strokeColor}}"
                        fill="{{fillColor}}"
                        stroke-width="3"
                        class="polygon"
                        attr.points="{{points}}"></polygon>
          </g>
    </svg>
    <nav>
      <ul class="top">
        <li>
          <span><a href="#intro">Intro</a></span>
        </li>
        <li>
          <span><a href="#started">Getting Started</a></span>
        </li>
        <li>
          <span><a href="#docs">Using Readymade</a></span>
        </li>
        <li>
          <span><a href="#resources">Resources</a></span>
        </li>
      </ul>
    </nav>
  `,
    })
], RSideNavComponent);
customElements.define('r-side-nav', RSideNavComponent);
export { RSideNavComponent };
