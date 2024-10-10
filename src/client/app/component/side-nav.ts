import {
  Component,
  css,
  CustomElement,
  Emitter,
  html,
  Listen,
  State,
} from '@readymade/core';

export class SideNavState {
  public shadowPoints: string = `7,34 22,32 24,22`;
  public triPoints: string = `7,9 7,34 24,22`;
  public strokeColor: string = '#cfcfcf';
  public fillColor: string = '#cfcfcf';
  public shadowColor: string = '#c0c0c0';
  public size: string = '10000px';
}

const template = html`
  <svg class="background" width="54px" height="60px">
    <clipPath id="c1">
      <polygon
        stroke-width="3"
        class="polygon"
        attr.points="{{triPoints}}"
      ></polygon>
    </clipPath>
    <g stroke="none" fill="none" fill-rule="evenodd">
      <polygon
        fill="{{shadowColor}}"
        stroke-width="0"
        class="shadow"
        attr.points="{{shadowPoints}}"
      ></polygon>
      <polygon
        fill="{{fillColor}}"
        stroke-width="0"
        class="polygon"
        attr.points="{{triPoints}}"
      ></polygon>
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
      <li>
        <span><a href="/lib">@readymade/ui</a></span>
      </li>
    </ul>
  </nav>
`;

const style = css`
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
  ul li a:link,
  ul li a:visited {
    opacity: 0.8;
    color: #000000;
    text-decoration: none;
  }
  ul li:hover a:link,
  ul li:hover a:visited {
    opacity: 1;
    color: #ffffff;
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
`;

@Component({
  selector: 'r-side-nav',
  style,
  template,
})
class RSideNavComponent extends CustomElement {
  public direction: string;
  public status: string;
  public background: Element;
  public nav: HTMLElement;
  public shadow: Element;
  public player: any;
  public points: any;
  public triPoints: {
    a: number;
    b: number;
    c: number;
  };
  public shadowPoints: {
    a: number;
    b: number;
    c: number;
    d: number;
  };

  constructor() {
    super();
    this.direction = 'forwards';
    this.points = {
      tri: {
        a: 34,
        b: 24,
        c: 22,
      },
      shadow: {
        a: 34,
        b: 24,
        c: 22,
        d: 32,
      },
    };
  }
  @State()
  public getState() {
    return new SideNavState();
  }
  @Emitter('close', {}, 'sidenav')
  public connectedCallback() {
    this.nav = this.shadowRoot.querySelector('nav');
    this.background = this.shadowRoot.querySelector('.background');
    this.shadow = this.shadowRoot.querySelector('.shadow');
    Array.from(this.shadowRoot.querySelectorAll('a')).forEach((a) => {
      a.addEventListener('click', (ev) => {
        document
          .querySelector('app-home')
          .shadowRoot.querySelector(
            (ev.target as Element).getAttribute('data-link'),
          )
          .scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        this.close();
      });
    });
  }
  @Listen('close', 'sidenav')
  public close() {
    if (this.status === 'is--inactive') {
      return;
    }
    this.status = 'is--inactive';
    this.direction = 'reverse';
    this.emitter.broadcast('close', 'sidenav');
    this.player = this.animate([{ x: 0 }, { x: 100 }], {
      duration: 150,
      fill: 'forwards',
      easing: 'cubic-bezier(0.42, 0, 0.88, 1)',
    });
    setTimeout(() => {
      this.classList.remove('is--active');
    }, 50);
    setTimeout(() => {
      this.shadow.classList.remove('is--hidden');
    }, 100);
    setTimeout(() => {
      this.nav.classList.remove('is--active');
    }, 50);
    this.player.play();
    this.update();
  }
  @Listen('open', 'sidenav')
  public open() {
    if (this.status === 'is--active') {
      return;
    }
    this.direction = 'forwards';
    this.status = 'is--active';
    this.player = this.animate([{ x: 100 }, { x: 0 }], {
      duration: 1500,
      fill: 'forwards',
      easing: 'cubic-bezier(0.42, 0, 0.88, 1)',
    });
    this.classList.add('is--active');
    this.shadow.classList.add('is--hidden');
    this.nav.classList.add('is--active');
    this.player.play();
    this.update();
  }

  public scale(
    v: number,
    min: number,
    max: number,
    gmin: number,
    gmax: number,
  ) {
    return ((v - min) / (max - min)) * (gmax - gmin) + gmin;
  }

  public update() {
    const time = this.player.currentTime;
    if (this.direction === 'forwards') {
      this.points.tri.a = this.scale(time, 0, 350, 34, 3444);
      this.points.tri.b = this.scale(time, 0, 350, 24, 2444);
      this.points.tri.c = this.scale(time, 0, 350, 22, 2222);
      this.points.shadow.d = this.scale(time, 0, 350, 32, 3222);
    }
    if (this.direction === 'reverse') {
      this.points.tri.a = this.scale(time, 0, 150, 3444, 34);
      this.points.tri.b = this.scale(time, 0, 150, 2444, 24);
      this.points.tri.c = this.scale(time, 0, 150, 2222, 22);
      this.points.shadow.d = this.scale(time, 0, 150, 3222, 32);
    }

    this.setState(
      'triPoints',
      `7,9 7,${this.points.tri.a} ${this.points.tri.b},${this.points.tri.c}`,
    );
    this.setState(
      'shadowPoints',
      `7,${this.points.tri.a} ${this.points.tri.c},${this.points.shadow.d} ${this.points.tri.b},${this.points.tri.c}`,
    );

    if (
      this.player.playState === 'running' ||
      this.player.playState === 'pending'
    ) {
      window.requestAnimationFrame(this.update.bind(this));
    }
  }
}

const render = () => `
  <r-side-nav>
    <template shadowrootmode="open">
      <style>
      ${style}
      </style>
      ${template}
    </template>
  </r-side-nav>
`;

export { RSideNavComponent, render };
