import {
  Component,
  CustomElement,
  Emitter,
  Listen,
  State,
} from '@readymade/core';

export class MainNavState {
  public resourceLinkFillColor: string = '#cfcfcf';
  public size: string = '44px';
}

const template = `
  <nav>
    <ul class="left">
      <li link="side-nav"></li>
    </ul>
    <ul class="right">
      <li link="resource">
        <a
          href="https://github.com/readymade-ui/readymade"
          target="_blank"
          rel="noreferrer"
        >
          <svg width="25px" height="25px" viewBox="0 0 25 25">
            <title>Stephen Belovarich Github Profile</title>
            <defs></defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g
                transform="translate(3.000000, 2.000000)"
                fill="{{resourceLinkFillColor}}"
                fill-rule="nonzero"
              >
                <path
                  d="M3.94399028,5.10104103 C2.92388422,5.10104103 2.04650906,5.44611145 1.3097658,6.134109 C0.545735749,6.87140233 0.161621741,7.79087569 0.161621741,8.89252909 C0.161621741,9.62767912 0.369421122,10.31782 0.789217852,10.9608083 C1.16493593,11.5587875 1.55534688,11.9424372 2.06959788,12.1096142 L2.06959788,12.1546234 C1.55534688,12.3689528 1.32655767,12.9047765 1.32655767,13.7620943 C1.32655767,14.4200857 1.55534688,14.9109002 2.06959788,15.2323944 L2.06959788,15.2774036 C0.650684932,15.7510716 0,16.634109 0,17.9200857 C0,19.0388855 0.476469289,19.857624 1.40841803,20.3784446 C2.14306231,20.7921004 3.08760495,21 4.22735307,21 C7.00220946,21 8.39383562,19.8126148 8.39383562,17.4378445 C8.39383562,15.9525413 7.32335395,15.0394979 5.17819266,14.7030006 C4.68283252,14.625842 4.30921343,14.4415187 4.05313743,14.1521739 C3.85793195,13.9528475 3.7613787,13.7535211 3.7613787,13.5541947 C3.7613787,12.988365 4.06153336,12.6582976 4.66184269,12.5661359 C5.57699956,12.4289651 6.32423774,11.9960196 6.90145824,11.2672994 C7.47867875,10.5385793 7.76833849,9.68554807 7.76833849,8.70606246 C7.76833849,8.39957134 7.67808219,8.06950398 7.55844012,7.71800367 C7.94885108,7.62584201 8.22171896,7.54225352 8.42741935,7.46509492 L8.42741935,5.10104103 C7.5227574,5.46968769 6.67896597,5.65186773 5.95901458,5.65186773 C5.32931949,5.28536436 4.67863456,5.10104103 3.94399028,5.10104103 Z M4.19167035,16.5698102 C5.45106054,16.5698102 6.08285462,16.9598898 6.08285462,17.7421923 C6.08285462,18.569504 5.50563411,18.9831598 4.34909412,18.9831598 C3.02883341,18.9831598 2.36765356,18.584507 2.36765356,17.7872015 C2.36765356,16.9748928 2.97635882,16.5698102 4.19167035,16.5698102 Z M4.03424658,10.5021433 C3.08970393,10.5021433 2.61533363,9.97274954 2.61533363,8.91610533 C2.61533363,7.78230251 3.08760495,7.21647275 4.03424658,7.21647275 C4.48342908,7.21647275 4.83605833,7.3922229 5.09213433,7.7458665 C5.3020327,8.06736069 5.40698188,8.45101041 5.40698188,8.89467238 C5.40698188,9.96631966 4.94940345,10.5021433 4.03424658,10.5021433 Z M10.8748343,0 C10.4403447,0 10.0688246,0.169320269 9.76027397,0.505817514 C9.45172338,0.842314758 9.29849757,1.24954072 9.29849757,1.72320882 C9.29849757,2.18187385 9.45172338,2.58052664 9.76027397,2.91916718 C10.0688246,3.25566442 10.4382457,3.42498469 10.8748343,3.42498469 C11.294631,3.42498469 11.6598542,3.25566442 11.9663058,2.91916718 C12.2748564,2.58266993 12.4280822,2.18401715 12.4280822,1.72320882 C12.4280822,1.24739743 12.2748564,0.842314758 11.9663058,0.505817514 C11.6598542,0.169320269 11.29673,0 10.8748343,0 Z M12.1363235,5.25107165 L9.59235528,5.25107165 C9.62174105,5.544703 9.57976138,5.99050827 9.57976138,6.71065524 L9.57976138,13.8585426 C9.57976138,14.5936926 9.62174105,15.1873852 9.59235528,15.418861 L12.1363235,15.418861 C12.1069377,15.0823637 12.0271763,14.5036742 12.0271763,13.7213717 L12.0271763,6.66350276 C12.0271763,5.99050827 12.1069377,5.544703 12.1363235,5.25107165 Z M17.7448078,13.2134109 C17.0836279,13.2134109 16.7582855,12.6990202 16.7582855,11.6745254 L16.7582855,7.43508879 L17.7595007,7.43508879 C17.9400133,7.43508879 18.101635,7.42437232 18.3052364,7.43937538 C18.5088378,7.45437844 18.5885992,7.44366197 18.6935484,7.44366197 L18.6935484,5.25107165 L16.7603844,5.25107165 L16.7603844,4.27372933 C16.7603844,3.90508267 16.817057,3.57072872 16.8611357,3.36068585 L14.25,3.36068585 C14.2940787,3.57072872 14.2898807,3.8922229 14.2898807,4.32088181 L14.2898807,5.25107165 L13.1585285,5.25107165 L13.1585285,7.44580527 C13.4670791,7.40079608 13.742046,7.37721984 13.9372514,7.37721984 L14.2898807,7.40079608 L14.2898807,7.41365585 L14.2898807,11.5609308 C14.2898807,12.8469075 14.4494034,13.7899571 14.764251,14.3879363 C15.1840477,15.1852419 15.920791,15.5838947 17.0164605,15.5838947 C17.7972824,15.5838947 18.485749,15.4317208 19,15.1252296 L19,12.8233313 C18.5906982,13.0826699 18.2107821,13.2134109 17.7448078,13.2134109 Z"
                ></path>
              </g>
            </g>
          </svg>
        </a>
      </li>
    </ul>
  </nav>
`;

const style = `
  :host {
    display: block;
    position: fixed;
    top: 0px;
    width: 100%;
    height: 60px;
    margin-right: 40px;
    font-weight: 700;
    z-index: 9999;
    user-select: none;
  }
  nav {
    width: 100%;
  }
  ul {
    margin-block-start: 0em;
    margin-block-end: 0em;
    padding-inline-start: 0px;
    padding: 0;
    margin: 0;
    list-style: none;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
    -webkit-margin-before: 0px;
    -webkit-margin-after: 0px;
  }
  ul li {
    display: inline-block;
    cursor: pointer;
    height: 100%;
    padding: 1em;
    width: 44px;
    height: 44px;
    cursor: pointer;
  }
  ul.left {
    float: left;
  }
  ul.left li {
    margin-right: 0px;
    padding: 0px;
    width: 44px;
    height: 44px;
    position: absolute;
    left: 4px;
    top: 4px;
  }
  ul.left li.is--dark {
    color: #222222;
  }
  ul.left li.is--dark:hover {
    color: #000000;
  }
  ul.right {
    float: right;
    margin-right: 2px;
  }
  ul.right li {
    margin-left: 0px;
    padding-right: 10px;
    text-align: right;
    transform: translateY(-10px);
  }
`;

@Component({
  selector: 'r-main-nav',
  style,
  template,
})
class RMainNavComponent extends CustomElement {
  public isNavOpen: boolean;
  constructor() {
    super();
    this.isNavOpen = false;
  }
  @State()
  public getState() {
    return new MainNavState();
  }

  @Emitter('open', {}, 'sidenav')
  @Emitter('close', {}, 'sidenav')
  public connectedCallback() {
    const navLink = this.shadowRoot.querySelector('[link="side-nav"]');
    const resourceLink = this.shadowRoot.querySelector('[link="resource"]');
    resourceLink.addEventListener('mouseenter', () => {
      this.setState('resourceLinkFillColor', '#efefef');
    });
    resourceLink.addEventListener('mouseleave', () => {
      this.setState('resourceLinkFillColor', '#cfcfcf');
    });
    navLink.addEventListener('click', () => {
      if (navLink.classList.contains('is--dark')) {
        this.emitter.broadcast('close', 'sidenav');
        navLink.classList.remove('is--dark');
      } else {
        this.emitter.broadcast('open', 'sidenav');
        navLink.classList.add('is--dark');
      }
    });
  }

  @Listen('close', 'sidenav')
  public onClose() {
    this.shadowRoot
      .querySelector('[link="side-nav"]')
      .classList.remove('is--dark');
  }
}

const render = () => `
  <r-main-nav>
    <template shadowrootmode="open">
    <style>
    ${style}
    </style>
    ${template}
    </template>
  </r-main-nav>
`;

export { RMainNavComponent, render };
