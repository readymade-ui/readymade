import {
  Component,
  css,
  html,
  Emitter,
  FormElement,
  Listen,
} from '@readymade/core';
import { RdControl } from './../control';

export interface RdSliderAttributes {
  size?: string;
  height?: number;
  width?: number;
  orient?: string;
  min?: number | number[];
  max?: number | number[];
  position?: string;
  x?: number;
  y?: number;
  snapToCenter?: boolean;
  transform?: string;
  numberType?: 'int' | 'float';
}

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
      background-color: var(--ready-color-bg);
      border: var(--ready-border-width) solid var(--ready-color-border);
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
      background: var(--ready-icon-joy);
      background-repeat: no-repeat;
      transition: transform 0.175;
      pointer-events: none;
    }
    .slider {
      position: relative;
    }
    .slider.small .draggable {
      border: none;
    }  
    .slider.small .draggable.active {
      border: none;
    }
    .slider.hor {
      width: 100%;
      max-width: 280px;
    }
    .slider.hor .draggable {
      width: 100%;
      border-radius:  var(--ready-border-radius);
    }
    .slider.hor .draggable .handle {
      background: var(--ready-icon-hor);
      background-position: 50% 0px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 32px;
      width: 32px;
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
    }
    .slider.vert .draggable {
      width: 32px;
      height: 100%;
      min-height: 208px;
      border-radius:  var(--ready-border-radius);
    }
    .slider.vert .draggable .handle {
      background: var(--ready-icon-vert);
      background-position: 0px 50%;
      background-repeat: no-repeat;
      height: 32px;
      width: 32px;
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
      height: 200px;
    }
    .slider.joystick .draggable {
      width: 200px;
      height: 200px;
      cursor: var(--ready-icon-handle-bg) 0 0, pointer;
    }
    .slider.joystick.circle .draggable {
      border-radius: 50%;
    }
    .slider.joystick.square .draggable{
      border-radius: 22px;
    }
    .slider.joystick .draggable .handle {
      position: absolute;
      background-size: 44px 44px;
      width: 44px;
      height: 44px;
    }
    .slider .draggable:hover, 
    .slider .draggable.active {
      border: var(--ready-border-width) solid var(--ready-color-highlight);
      outline: none;
      box-shadow: none;
    }
    .slider .draggable:hover .handle, 
    .slider .draggable.active .handle {
      -webkit-filter: grayscale(100%) brightness(5);
      filter: grayscale(100%) brightness(5); 
    }
    .slider .draggable[disabled] {
      opacity: var(--ready-opacity-disabled);
      background: var(--ready-color-disabled);
      cursor: not-allowed;
    }
    .slider .draggable[disabled]:hover, 
    .slider .draggable[disabled].active {
      border: var(--ready-border-width) solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    :host.required .slider .draggable,
    :host.required .slider .draggable[disabled]:hover, 
    :host.required .slider .draggable[disabled].active {
      border: var(--ready-border-width) solid var(--ready-color-error);
      outline: none;
      box-shadow: none;
    }
  }
  `,
  template: html`
    <div class="slider">
      <div class="draggable">
        <div class="range">
          <div class="handle"></div>
        </div>
      </div>
    </div>
  `,
})
class RdSlider extends FormElement {
  private _rect: DOMRect;
  private _joystickPos: number[];
  private _touchItem: number | null;
  private _joystickType: 'circle' | 'square';
  private _numberType: 'int' | 'float';
  private _type: 'joystick' | 'slider';
  public control: RdControl<RdSliderAttributes>;
  public channel: BroadcastChannel;
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['type', 'size', 'control', 'channel'];
  }

  public attributeChangedCallback(name, old, next) {
    switch (name) {
      case 'type':
        this.shadowRoot.querySelector('.slider').classList.add(next);
        this._type = next === 'vert' || next === 'hor' ? 'slider' : 'joystick';
        break;
      case 'size':
        this.shadowRoot.querySelector('.slider').classList.add(next);
        break;
      case 'control':
        if (!next.startsWith('{{')) {
          this.control = JSON.parse(next);
          this.onSliderInit();
        }
        break;
      case 'channel':
        this.setChannel(next);
        break;
    }
  }

  formDisabledCallback(disabled: boolean) {
    if (disabled) {
      this.$elem.setAttribute('disabled', 'true');
    } else {
      this.$elem.removeAttribute('disabled');
    }
  }

  formResetCallback() {
    this.onSliderInit();
  }

  onValidate() {
    if (this.hasAttribute('required')) {
      this.$internals.setValidity({ customError: true }, 'required');
      this.$elem.classList.add('required');
    } else {
      this.$internals.setValidity({});
      this.$elem.classList.remove('required');
    }
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get form() {
    return this.$internals.form;
  }

  get name() {
    return this.getAttribute('name');
  }

  get validity() {
    return this.$internals.validity;
  }

  get validationMessage() {
    return this.$internals.validationMessage;
  }

  get willValidate() {
    return this.$internals.willValidate;
  }

  get value(): number | number[] {
    return this.control.currentValue as number | number[];
  }

  set value(controlValue: number | number[]) {
    this.updateControl(controlValue);
  }

  get $elem(): Element {
    return this.shadowRoot.querySelector('.draggable');
  }

  get $handle(): HTMLElement {
    return (<unknown>this.shadowRoot.querySelector('.handle')) as HTMLElement;
  }

  @Emitter('input')
  onSliderInit() {
    this._touchItem = null;

    this.control.attributes.height = this.clientHeight;
    this.control.attributes.width = this.clientWidth;

    if (this.control.attributes.numberType) {
      this._numberType = this.control.attributes.numberType;
    } else {
      this._numberType = 'float';
    }

    if (this.control.attributes.orient === 'is--hor') {
      this.style.maxWidth = '200px';
      this.control.currentValue = 0;
      this.control.attributes.position =
        'translate(' + 0 + 'px' + ',' + 0 + 'px' + ')';
    } else if (this.control.attributes.orient === 'is--vert') {
      this.style.height = '200px';
      this.control.currentValue = 0;
      this.control.attributes.position =
        'translate(' + 0 + 'px' + ',' + 0 + 'px' + ')';
    } else if (this.control.attributes.orient.includes('is--joystick')) {
      this.style.maxWidth = '200px';
      this.style.maxHeight = '200px';
      this.control.currentValue = [0, 0];
      this.control.attributes.x = this.control.attributes.y = 76;
      this.control.attributes.position =
        'translate(' + 76 + 'px' + ',' + 76 + 'px' + ')';
      const joyStickType = this.control.attributes.orient.replace(
        'is--joystick--',
        '',
      );
      if (joyStickType === 'is--joystick') {
        this._joystickType = 'circle';
      } else {
        this._joystickType = joyStickType as 'circle' | 'square';
      }
      this.shadowRoot
        .querySelector('.slider')
        .classList.add(this._joystickType);
    }
    this.setActualPosition(this.control.attributes.position);

    // TODO init based on this.control.currentValue
  }

  @Listen('mouseleave')
  onMouseLeave() {
    // this.control.hasUserInput = false;
  }

  @Listen('mouseenter')
  onMouseEnter() {
    if (this.control.isActive) {
      this.control.hasUserInput = true;
    }
  }

  @Listen('touchstart')
  onTouchStart(e: TouchEvent) {
    this.control.hasUserInput = true;
    this.onTouchDown(e);
  }

  onTouchDown(e: TouchEvent) {
    e.preventDefault();

    this.control.isActive = true;
    this.control.hasUserInput = true;
    this.$elem.classList.add('active');

    this._rect = this.getBoundingClientRect();
    this.control.attributes.height = this.clientHeight;
    this.control.attributes.width = this.clientWidth;

    this.addEventListener('touchmove', this.onTouchMove.bind(this));
    this.addEventListener('touchend', this.onMouseUp.bind(this));

    if (this._touchItem === null) {
      // make this touch = the latest touch in the touches list instead of using event
      this._touchItem = e.touches.length - 1;
    }

    this.control.attributes.x =
      e.touches[this._touchItem].pageX -
      this._rect.left -
      this.$handle.clientWidth / 2;
    this.control.attributes.y =
      e.touches[this._touchItem].pageY -
      this._rect.top -
      this.$handle.clientHeight / 2;

    this.setPosition(this.control.attributes.x, this.control.attributes.y);
  }

  @Listen('mousedown')
  onMouseDown(e: MouseEvent) {
    e.preventDefault();

    this.control.isActive = true;
    this.control.hasUserInput = true;
    this.$elem.classList.add('active');

    this._rect = this.getBoundingClientRect();
    this.control.attributes.height = this.clientHeight;
    this.control.attributes.width = this.clientWidth;
    if (this._joystickType) {
      this.control.attributes.x = e.offsetX;
      this.control.attributes.y = e.offsetY;
    }

    this.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));

    this.setPosition(this.control.attributes.x, this.control.attributes.y);
  }

  // Handle drag event
  onTouchMove(e: TouchEvent) {
    e.preventDefault();
    // this.$handle.style.opacity = '0.8';

    if (this._touchItem === null) {
      this._touchItem = e.touches.length - 1; // make this touch = the latest touch in the touches list instead of using event
    }

    if (this._joystickType) {
      this.control.attributes.x =
        (this.getBoundingClientRect().left - e.touches[this._touchItem].pageX) *
        -1;
      this.control.attributes.y =
        (this.offsetTop - e.touches[this._touchItem].pageY) * -1;
    }

    if (this.control.attributes.orient === 'is--hor') {
      this.control.attributes.x =
        (this.getBoundingClientRect().left - e.touches[this._touchItem].pageX) *
          -1 -
        this.$handle.getBoundingClientRect().width / 2;
      this.control.attributes.y = 0;
    }

    if (this.control.attributes.orient === 'is--vert') {
      this.control.attributes.x = 0;
      this.control.attributes.y =
        (this.offsetTop - e.touches[this._touchItem].pageY) * -1 -
        this.$handle.getBoundingClientRect().height / 2;
    }

    if (this.control.hasUserInput && this.control.isActive) {
      this.setPosition(this.control.attributes.x, this.control.attributes.y);
      this.mapValue();
      this.control.timeStamp = e.timeStamp;
      if (this.channel) {
        this.channel.postMessage(this.control);
      }
      this.onEvent();
    }
  }

  onMouseMove(e: MouseEvent) {
    if (!this.control.isActive) {
      return;
    }

    this.$elem.classList.add('active');

    if (this._joystickType) {
      this.control.attributes.x =
        (this.getBoundingClientRect().left - e.pageX) * -1;
      this.control.attributes.y = (this.offsetTop - e.pageY) * -1;
    }

    if (this.control.attributes.orient === 'is--hor') {
      this.control.attributes.x =
        (this.getBoundingClientRect().left - e.pageX) * -1 -
        this.$handle.getBoundingClientRect().width / 2;
      this.control.attributes.y = 0;
    }

    if (this.control.attributes.orient === 'is--vert') {
      this.control.attributes.x = 0;
      this.control.attributes.y =
        (this.offsetTop - e.pageY) * -1 -
        this.$handle.getBoundingClientRect().height / 2;
    }

    if (this.control.hasUserInput && this.control.isActive) {
      this.setPosition(this.control.attributes.x, this.control.attributes.y);
      this.mapValue();
      this.control.timeStamp = e.timeStamp;
      if (this.channel) {
        this.channel.postMessage(this.control);
      }
      this.onEvent();
    }
  }

  // Unbind drag events
  @Listen('mouseup')
  onMouseUp() {
    this.control.isActive = false;
    this.control.hasUserInput = false;
    this.$elem.classList.remove('active');
    // this.$handle.style.opacity = '0.3';

    if ('ontouchstart' in document.documentElement) {
      this._touchItem = null;
    } else {
      this.removeEventListener('mousemove', this.onMouseMove.bind(this));
      this.removeEventListener('mouseup', this.onMouseUp.bind(this));
    }

    if (this._joystickType && this.control.attributes.snapToCenter === true) {
      const center = this.getCenter(
        [0, this.control.attributes.width - this.$handle.offsetWidth],
        [0, this.control.attributes.height - this.$handle.offsetHeight],
      );
      this.control.attributes.x = center[0];
      this.control.attributes.y = center[1];
      this.setPosition(center[0], center[1]);
    }
  }

  @Listen('touchend')
  onTouchEnd() {
    this.onMouseUp();
  }

  onEvent() {
    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: this.control,
    });
    this.emitter.emit(event);
    if (this.onchange) {
      this.onchange(event);
    }
  }

  // Get Center of Circle
  getCenter(xRange: number[], yRange: number[]) {
    const cX = xRange[1] - (xRange[1] - xRange[0]) / 2;
    const cY = yRange[1] - (yRange[1] - yRange[0]) / 2;
    return [cX, cY];
  }

  // Distance Between Two Points
  distance(dot1: number[], dot2: number[]) {
    const x1 = dot1[0],
      y1 = dot1[1],
      x2 = dot2[0],
      y2 = dot2[1];
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  // Convert between two ranges, for outputting user value
  scale(v: number, min: number, max: number, gmin: number, gmax: number) {
    return ((v - min) / (max - min)) * (gmax - gmin) + gmin;
  }

  // Find if cursor is within radius of elem
  circularBounds(x: number, y: number, xRange: number[], yRange: number[]) {
    const center = this.getCenter(xRange, yRange);
    const dist = this.distance([x, y], center);
    const radius = xRange[1] - center[0];

    if (dist <= radius) {
      return [x, y];
    } else {
      x = x - center[0];
      y = y - center[1];
      const radians = Math.atan2(y, x);
      return [
        Math.cos(radians) * radius + center[0],
        Math.sin(radians) * radius + center[1],
      ];
    }
  }

  clamp(value, range) {
    return Math.max(Math.min(value, range[1]), range[0]);
  }

  setActualPosition(pos: string) {
    const transformRegex = new RegExp(/(\d+(\.\d+)?)/g);
    const positions = pos.match(transformRegex);
    if (positions) {
      this.$handle.style.transform =
        'matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,' +
        positions[0] +
        ',' +
        positions[1] +
        ',0,1)';
    }
  }

  // set currentValue on control
  clampSlider(val: number) {
    if (val < ((<unknown>this.control.attributes.min) as number)) {
      if (this._numberType === 'int') {
        return Math.trunc(this.control.attributes.min as number);
      }
      return this.control.attributes.min;
    }
    if (val > ((<unknown>this.control.attributes.max) as number)) {
      if (this._numberType === 'int') {
        return Math.trunc(this.control.attributes.max as number);
      }
      return this.control.attributes.max;
    }
    if (this._numberType === 'int') {
      val = Math.trunc(val);
    }
    return val;
  }

  clampJoystickX(val: number) {
    if (val < this.control.attributes.min[0]) {
      if (this._numberType === 'int') {
        return Math.trunc(this.control.attributes.min[0]);
      }
      return this.control.attributes.min[0];
    }
    if (val > this.control.attributes.max[0]) {
      if (this._numberType === 'int') {
        return Math.trunc(this.control.attributes.max[0]);
      }
      return this.control.attributes.max[0];
    }
    if (this._numberType === 'int') {
      val = Math.trunc(val);
    }
    return val;
  }

  clampJoystickY(val: number) {
    if (val < this.control.attributes.min[1]) {
      if (this._numberType === 'int') {
        return Math.trunc(this.control.attributes.min[1]);
      }
      return this.control.attributes.min[1];
    }
    if (val > this.control.attributes.max[1]) {
      if (this._numberType === 'int') {
        return Math.trunc(this.control.attributes.max[1]);
      }
      return this.control.attributes.max[1];
    }
    if (this._numberType === 'int') {
      val = Math.trunc(val);
    }
    return val;
  }

  mapValue() {
    if (this.control.attributes.orient === 'is--hor') {
      this.control.currentValue = this.clampSlider(
        this.scale(
          this.control.attributes.x as number,
          0,
          this.control.attributes.width - this.$handle.offsetWidth,
          <number>this.control.attributes.min,
          <number>this.control.attributes.max,
        ),
      );
    }
    if (this.control.attributes.orient === 'is--vert') {
      this.control.currentValue = this.clampSlider(
        this.scale(
          this.control.attributes.y as number,
          0,
          this.control.attributes.height - this.$handle.offsetHeight,
          <number>this.control.attributes.min,
          <number>this.control.attributes.max,
        ),
      );
    }
    if (this._joystickType) {
      this.control.currentValue = [
        this.clampJoystickX(
          this.scale(
            this.control.attributes.x as number,
            0,
            this.control.attributes.width - 44,
            this.control.attributes.min[0],
            this.control.attributes.max[0],
          ),
        ),
        this.clampJoystickY(
          this.scale(
            this.control.attributes.y as number,
            0,
            this.control.attributes.height - 44,
            this.control.attributes.min[1],
            this.control.attributes.max[1],
          ),
        ),
      ];
    }
  }

  // Move handle, within elem
  setPosition(x: number, y: number) {
    const clampPos = (val: number) => {
      if (val < 0) {
        val = 0;
      }
      return val;
    };

    if (this.control.attributes.orient === 'is--joystick') {
      this._joystickPos = this.circularBounds(
        this.control.attributes.x,
        this.control.attributes.y,
        [0, this.control.attributes.width - this.$handle.offsetWidth],
        [0, this.control.attributes.height - this.$handle.offsetHeight],
      );
      this.control.attributes.x = this.clamp(this._joystickPos[0], [
        0,
        this.control.attributes.width - this.$handle.offsetWidth,
      ]);
      this.control.attributes.y = this.clamp(this._joystickPos[1], [
        0,
        this.control.attributes.height - this.$handle.offsetHeight,
      ]);

      this.control.attributes.position =
        'translate(' +
        this.control.attributes.x +
        'px' +
        ',' +
        this.control.attributes.y +
        'px' +
        ')';

      this.setActualPosition(this.control.attributes.position);
    } else {
      if (x <= 0) {
        this.control.attributes.x = 0;
      } else if (x > this.clientWidth - this.$handle.offsetWidth) {
        this.control.attributes.x = this.clientWidth - this.$handle.offsetWidth;
      } else {
        this.control.attributes.x = x;
      }

      if (y <= 0) {
        this.control.attributes.y = 0;
      } else if (y > this.clientHeight - this.$handle.offsetHeight) {
        this.control.attributes.y =
          this.clientHeight - this.$handle.offsetHeight;
      } else {
        this.control.attributes.y = y;
      }

      this.control.attributes.position =
        'translate(' +
        clampPos(this.control.attributes.x) +
        'px' +
        ',' +
        clampPos(this.control.attributes.y) +
        'px' +
        ')';

      this.setActualPosition(this.control.attributes.position);
    }
  }

  updateControl(controlValue: number | number[]) {
    if (this._joystickType) {
      this.control.attributes.x = this.scale(
        controlValue[0] as number,
        this.control.attributes.min[0],
        this.control.attributes.max[0],
        0,
        this.clientWidth,
      );
      this.control.attributes.y = this.scale(
        controlValue[1] as number,
        this.control.attributes.min[1],
        this.control.attributes.max[1],
        0,
        this.clientHeight,
      );
    }

    if (this.control.attributes.orient === 'is--hor') {
      this.control.attributes.x = this.scale(
        controlValue as number,
        this.control.attributes.min as number,
        this.control.attributes.max as number,
        0,
        this.clientWidth,
      );
      this.control.attributes.y = 0;
    }

    if (this.control.attributes.orient === 'is--vert') {
      this.control.attributes.x = 0;
      this.control.attributes.y = this.scale(
        controlValue as number,
        this.control.attributes.min as number,
        this.control.attributes.max as number,
        0,
        this.clientHeight,
      );
    }

    this.setPosition(this.control.attributes.x, this.control.attributes.y);
    this.mapValue();
  }

  setChannel(name: string) {
    this.channel = new BroadcastChannel(name);
  }

  setControl(control: RdControl<RdSliderAttributes>) {
    this.control = control;
    this.setAttribute('name', control.name);
    this.setAttribute('type', control.type);
    if (this.control.attributes.size) {
      this.shadowRoot
        .querySelector('.slider')
        .classList.add(this.control.attributes.size);
    }
    if (control.currentValue !== undefined) {
      this.value = control.currentValue as number | number[];
    }
    this.onSliderInit();
  }
}

export { RdSlider };
