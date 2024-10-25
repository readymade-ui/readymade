import {
  Component,
  css,
  html,
  Emitter,
  FormElement,
  Listen,
} from '@readymade/core';
import { RdControl } from './../control';

export interface RdDialAttributes {
  stops?: number[];
  min: number;
  max: number;
  size?: string;
  position?: string;
  x?: number;
  y?: number;
  transform?: string;
  height?: number;
  width?: number;
  numberType?: 'int' | 'float';
}

@Component({
  selector: 'rd-dial',
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
      border: 2px solid var(--ready-color-border);
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
      border: 2px solid var(--ready-color-highlight);
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
      border: 2px solid var(--ready-color-border);
      outline: none;
      box-shadow: none;
    }
    :host.required .slider .draggable,
    :host.required .slider .draggable[disabled]:hover, 
    :host.required .slider .draggable[disabled].active {
      border: 2px solid var(--ready-color-error);
      outline: none;
      box-shadow: none;
    }
  }
  `,
  template: html`
    <div class="slider joystick circle">
      <div class="draggable">
        <div class="range">
          <div class="handle"></div>
        </div>
      </div>
    </div>
  `,
})
class RdDial extends FormElement {
  private _rect: DOMRect;
  private _joystickPos: number[];
  private _touchItem: number | null;
  private _angle: number;
  private _revolutions: number = 0;
  private _numberType: 'int' | 'float';
  private _type = 'dial';
  private _lastAngle: number;
  private _limit = false;
  public control: RdControl<RdDialAttributes>;
  public channel: BroadcastChannel;
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['size', 'control', 'channel', 'control'];
  }

  public attributeChangedCallback(name, old, next) {
    switch (name) {
      case 'size':
        this.shadowRoot.querySelector('.slider').classList.add(next);
        break;
      case 'control':
        if (!next.startsWith('{{')) {
          this.control = JSON.parse(next);
          this.onSliderInit();
          this.updateControl(this.value);
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
    setTimeout(() => this.updateControl(controlValue));
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

    this._rect = this.getBoundingClientRect();
    this.control.attributes.height = this.clientHeight;
    this.control.attributes.width = this.clientWidth;

    if (this.control.attributes.numberType) {
      this._numberType = this.control.attributes.numberType;
    } else {
      this._numberType = 'float';
    }
    this.style.maxWidth = '200px';
    this.style.maxHeight = '200px';

    if (!this.control.attributes.stops) {
      this.control.attributes.stops = [-90, 270];
    }

    // TODO init based on this.control.currentValue
  }

  @Listen('mouseleave')
  onMouseLeave() {
    // this.control.hasUserInput = false;
  }

  @Listen('mouseenter')
  onMouseEnter() {
    if (this.control?.isActive) {
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

    this.setPosition();
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
    this.control.attributes.x = e.offsetX;
    this.control.attributes.y = e.offsetY;

    this.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));

    this.setPosition();
  }

  // Handle drag event
  onTouchMove(e: TouchEvent) {
    e.preventDefault();
    // this.$handle.style.opacity = '0.8';

    if (this._touchItem === null) {
      this._touchItem = e.touches.length - 1; // make this touch = the latest touch in the touches list instead of using event
    }

    this.control.attributes.x =
      (this.getBoundingClientRect().left - e.touches[this._touchItem].pageX) *
      -1;
    this.control.attributes.y =
      (this.offsetTop - e.touches[this._touchItem].pageY) * -1;

    if (this.control.hasUserInput && this.control.isActive) {
      this.setPosition();
      this.control.currentValue = this.mapValue();
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

    this.control.attributes.x =
      (this.getBoundingClientRect().left - e.pageX) * -1;
    this.control.attributes.y = (this.offsetTop - e.pageY) * -1;

    if (this.control.hasUserInput && this.control.isActive) {
      this.setPosition();
      this.control.currentValue = this.mapValue();
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
    const radius = xRange[1] - center[0];
    x = x - center[0];
    y = y - center[1];
    const radians = Math.atan2(y, x);

    const angle = this.scale(
      this.radiansToDegrees(radians),
      -180,
      180,
      0.000000000000000000000000001,
      359.9999999999999999999999999,
    );

    if (radians < 0 && this._lastAngle > 0 && angle > 0 && angle < 10) {
      this._revolutions = this._revolutions + 1;
    }
    if (radians > 0 && this._lastAngle < 0 && angle < 365 && angle > 355) {
      this._revolutions = this._revolutions - 1;
    }
    this._angle = Math.round(angle);
    this._lastAngle = radians;

    return [
      Math.cos(radians) * radius + center[0],
      Math.sin(radians) * radius + center[1],
    ];
  }

  radiansToDegrees(radians: number): number {
    return Math.floor(radians * (180 / Math.PI));
  }

  degreesToCoordinates(angle: number) {
    // Offset the angle so 0 is left most edge
    angle = (angle - 180) % 360;

    const xRange = [0, this.clientWidth - this.$handle.offsetWidth];
    const yRange = [0, this.clientHeight - this.$handle.offsetHeight];
    const center = this.getCenter(xRange, yRange);
    const radius = xRange[1] - center[0];

    // Convert angle from degrees to radians
    const radians = angle * (Math.PI / 180);

    // Calculate the x and y coordinates
    const x = center[0] + radius * Math.cos(radians);
    const y = center[1] + radius * Math.sin(radians);

    return [x, y];
  }

  clamp(value: number, range: Array<number>) {
    return Math.max(Math.min(value, range[1]), range[0]);
  }

  setActualPosition(pos: string) {
    if (this._limit) {
      return;
    }
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

  mapValue() {
    const rotationalValue = 360 * this._revolutions + this._angle;

    const min = this.control.attributes.min as number;
    const max = this.control.attributes.max as number;

    const value: number = this.scale(
      rotationalValue,
      this.control.attributes.stops[0],
      this.control.attributes.stops[1],
      min,
      max,
    );

    let currentValue: number;

    if (value > max) {
      currentValue = this.control.attributes.max as number;
      this._limit = true;
    } else if (value < min) {
      currentValue = this.control.attributes.min as number;
      this._limit = true;
    } else {
      currentValue = value;
      this._limit = false;
    }

    if (this._numberType === 'int') {
      currentValue = Math.trunc(currentValue);
    }

    return currentValue;
  }

  // Move handle, within elem
  setPosition() {
    this._joystickPos = this.circularBounds(
      this.control.attributes.x,
      this.control.attributes.y,
      [0, this.clientWidth - this.$handle.offsetWidth],
      [0, this.clientHeight - this.$handle.offsetHeight],
    );
    this.control.attributes.x = this.clamp(this._joystickPos[0], [
      0,
      this.clientWidth - this.$handle.offsetWidth,
    ]);
    this.control.attributes.y = this.clamp(this._joystickPos[1], [
      0,
      this.clientHeight - this.$handle.offsetHeight,
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
  }

  updateControl(controlValue: number | number[]) {
    let angle = this.scale(
      controlValue as number,
      this.control.attributes.min as number,
      this.control.attributes.max as number,
      this.control.attributes.stops[0],
      this.control.attributes.stops[1],
    );
    const coords = this.degreesToCoordinates(angle as number);
    this.control.attributes.x = coords[0];
    this.control.attributes.y = coords[1];
    this.setPosition();
    this.control.currentValue = controlValue;
  }

  setChannel(name: string) {
    this.channel = new BroadcastChannel(name);
  }

  setControl(control: RdControl<RdDialAttributes>) {
    this.control = control;
    this.onSliderInit();
    this.setAttribute('name', control.name);
    // this.setAttribute('type', control.type);
    if (this.control.attributes.size) {
      this.shadowRoot
        .querySelector('.slider')
        .classList.add(this.control.attributes.size);
    }

    if (control.currentValue) {
      this.value = control.currentValue as number | number[];
    }
  }
}

export { RdDial };
