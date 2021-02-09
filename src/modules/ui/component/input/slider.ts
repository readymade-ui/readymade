import { Component, css, CustomElement } from './../../../core';

@Component({
  selector: 'rd-slider',
  style: css`
    :host {
      display: block;
    }
    :host:after {
      content: '';
      display: table;
      clear: both;
    }
    .draggable {
      display: block;
      z-index: 1000;
      background: var(--color-default);
      border-radius: 12px;
      transform: translateY(8px);
      cursor: pointer;
    }
    .draggable .range {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .draggable .handle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--icon-joy);
      background-repeat: no-repeat;
      transition: transform 0.175;
      pointer-events: none;
    }
    .slider.small .draggable {
      border: none;
    }  
    .slider.small .draggable.active {
      border: none;
    }
    .slider.hor {
      width: 100%;
      height: 32px;
    }
    .slider.hor .draggable {
      width: 100%;
      height: 32px;
      border-radius: 14px;
    }
    .slider.hor .draggable .handle {
      background: var(--icon-hor);
      background-position: 50% 0px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .slider.hor.small {
      width: 100%;
      height: 12px;
    }
    .slider.hor.small .draggable {
      width: 100%;
      height: 12px;
      border-radius: 6px;
    }
    .slider.vert {
      width: 32px;
      height: 100%;
      min-height: 240px;
    }
    .slider.vert .draggable {
      width: 32px;
      height: 100%;
      min-height: 240px;
      border-radius: 14px;
    }
    .slider.vert .draggable .handle {
      background: var(--icon-vert);
      background-position: 0px 50%;
      background-repeat: no-repeat;
    }
    .slider.vert.small {
      width: 12px;
      height: 100%;
    }
    .slider.vert.small .draggable {
      width: 12px;
      height: 100%;
      border-radius: 6px;
    }
    .slider.joystick {
      width: 200px;
      height: auto;
    }
    .slider.joystick .draggable {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      cursor: var(--icon-handle-bg) 0 0, pointer;
    }
    .slider.joystick .draggable .handle {
      position: absolute;
      background-size: 44px 44px;
      width: 44px;
      height: 44px;
    }
  }
  `,
  template: `
    <div class="slider">
      <div class="draggable">
        <div class="range">
          <div class="handle"></div>
        </div>
      </div>
    </div>
  `
})
class RdSlider extends CustomElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ['type', 'size'];
  }
  public attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'type':
        this.shadowRoot.querySelector('.slider').classList.add(newValue);
        break;
      case 'size':
        this.shadowRoot.querySelector('.slider').classList.add(newValue);
        break;
    }
  }
}

export { RdSlider };
