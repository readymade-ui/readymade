import {
  Component,
  css,
  html,
  Emitter,
  FormElement,
  Listen,
} from './../../../core';
import { RdControl } from './../control';

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
      background-color: var(--color-bg);
      border: 2px solid var(--color-border);
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
      border-radius: 14px;
    }
    .slider.hor .draggable .handle {
      background: var(--icon-hor);
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
      border-radius: 14px;
    }
    .slider.vert .draggable .handle {
      background: var(--icon-vert);
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
      cursor: var(--icon-handle-bg) 0 0, pointer;
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
      border: 2px solid var(--color-highlight);
      outline: none;
      box-shadow: none;
    }
    .slider .draggable:hover .handle, 
    .slider .draggable.active .handle {
      -webkit-filter: grayscale(100%) brightness(5);
      filter: grayscale(100%) brightness(5); 
    }
    .slider .draggable[disabled] {
      opacity: var(--opacity-disabled);
      background: var(--color-disabled);
      cursor: not-allowed;
    }
    .slider .draggable[disabled]:hover, 
    .slider .draggable[disabled].active {
      border: 2px solid var(--color-border);
      outline: none;
      box-shadow: none;
    }
    :host.required .slider .draggable,
    :host.required .slider .draggable[disabled]:hover, 
    :host.required .slider .draggable[disabled].active {
      border: 2px solid var(--color-error);
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
  private _rect: ClientRect | DOMRect;
  private _joystickPos: number[];
  private _touchItem: number | null;
  private _handle: HTMLElement;
  private _timeout: number;
  private _animation: Animation;
  private _lastPos: { transform: string };
  private _joystickType: 'circle' | 'square';
  private _numberType: 'int' | 'float';
  public control: RdControl;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['type', 'size', 'control'];
  }

  public attributeChangedCallback(name, old, next) {
    switch (name) {
      case 'type':
        this.shadowRoot.querySelector('.slider').classList.add(next);
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
    return this.control.currentValue;
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

    this.control.height = this.clientHeight;
    this.control.width = this.clientWidth;

    if (this.control.numberType) {
      this._numberType = this.control.numberType;
    } else {
      this._numberType = 'float';
    }

    if (this.control.orient === 'is--hor') {
      this.style.maxWidth = '200px';
      this.control.currentValue = 0;
      this.control.position = 'translate(' + 0 + 'px' + ',' + 0 + 'px' + ')';
    } else if (this.control.orient === 'is--vert') {
      this.style.height = '200px';
      this.control.currentValue = 0;
      this.control.position = 'translate(' + 0 + 'px' + ',' + 0 + 'px' + ')';
    } else if (this.control.orient.includes('is--joystick')) {
      this.style.maxWidth = '200px';
      this.style.maxHeight = '200px';
      this.control.currentValue = [0, 0];
      this.control.x = this.control.y = 76;
      this.control.position = 'translate(' + 76 + 'px' + ',' + 76 + 'px' + ')';
      const joyStickType = this.control.orient.replace('is--joystick--', '');
      if (joyStickType === 'is--joystick') {
        this._joystickType = 'circle';
      } else {
        this._joystickType = joyStickType as 'circle' | 'square';
      }
      this.shadowRoot
        .querySelector('.slider')
        .classList.add(this._joystickType);
    }
    this._lastPos = { transform: this.control.position };
    this.setActualPosition(this.control.position);
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
    this.control.height = this.clientHeight;
    this.control.width = this.clientWidth;

    this.addEventListener('touchmove', this.onTouchMove.bind(this));
    this.addEventListener('touchend', this.onMouseUp.bind(this));

    if (this._touchItem === null) {
      // make this touch = the latest touch in the touches list instead of using event
      this._touchItem = e.touches.length - 1;
    }

    this.control.x =
      e.touches[this._touchItem].pageX -
      this._rect.left -
      this.$handle.clientWidth / 2;
    this.control.y =
      e.touches[this._touchItem].pageY -
      this._rect.top -
      this.$handle.clientHeight / 2;

    this.setPosition(this.control.x, this.control.y);
  }

  @Listen('mousedown')
  onMouseDown(e: MouseEvent) {
    e.preventDefault();

    this.control.isActive = true;
    this.control.hasUserInput = true;
    this.$elem.classList.add('active');

    this._rect = this.getBoundingClientRect();
    this.control.height = this.clientHeight;
    this.control.width = this.clientWidth;
    if (this._joystickType) {
      this.control.x = e.offsetX;
      this.control.y = e.offsetY;
    }

    this.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));

    this.setPosition(this.control.x, this.control.y);
  }

  // Handle drag event
  onTouchMove(e: TouchEvent) {
    e.preventDefault();
    // this.$handle.style.opacity = '0.8';

    if (this._touchItem === null) {
      this._touchItem = e.touches.length - 1; // make this touch = the latest touch in the touches list instead of using event
    }

    if (this._joystickType) {
      this.control.x =
        (this.getBoundingClientRect().left - e.touches[this._touchItem].pageX) *
        -1;
      this.control.y = (this.offsetTop - e.touches[this._touchItem].pageY) * -1;
    }

    if (this.control.orient === 'is--hor') {
      this.control.x =
        (this.getBoundingClientRect().left - e.touches[this._touchItem].pageX) *
          -1 -
        this.$handle.getBoundingClientRect().width / 2;
      this.control.y = 0;
    }

    if (this.control.orient === 'is--vert') {
      this.control.x = 0;
      this.control.y =
        (this.offsetTop - e.touches[this._touchItem].pageY) * -1 -
        this.$handle.getBoundingClientRect().height / 2;
    }

    if (this.control.hasUserInput && this.control.isActive) {
      this.setPosition(this.control.x, this.control.y);
      this.mapValue();
      this.control.timeStamp = e.timeStamp;
      this.onEvent();
    }
  }

  onMouseMove(e: MouseEvent) {
    if (!this.control.isActive) {
      return;
    }

    this.$elem.classList.add('active');

    if (this._joystickType) {
      this.control.x = (this.getBoundingClientRect().left - e.pageX) * -1;
      this.control.y = (this.offsetTop - e.pageY) * -1;
    }

    if (this.control.orient === 'is--hor') {
      this.control.x =
        (this.getBoundingClientRect().left - e.pageX) * -1 -
        this.$handle.getBoundingClientRect().width / 2;
      this.control.y = 0;
    }

    if (this.control.orient === 'is--vert') {
      this.control.x = 0;
      this.control.y =
        (this.offsetTop - e.pageY) * -1 -
        this.$handle.getBoundingClientRect().height / 2;
    }

    if (this.control.hasUserInput && this.control.isActive) {
      this.setPosition(this.control.x, this.control.y);
      this.mapValue();
      this.control.timeStamp = e.timeStamp;
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

    if (this._joystickType && this.control.snapToCenter === true) {
      const center = this.getCenter(
        [0, this.control.width - this.$handle.offsetWidth],
        [0, this.control.height - this.$handle.offsetHeight],
      );
      this.control.x = center[0];
      this.control.y = center[1];
      this.setPosition(center[0], center[1]);
    }
  }

  @Listen('touchend')
  onTouchEnd(e: TouchEvent) {
    this.onMouseUp(e);
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
    if (val < ((<unknown>this.control.min) as number)) {
      if (this._numberType === 'int') {
        return Math.trunc(this.control.min as number);
      }
      return this.control.min;
    }
    if (val > ((<unknown>this.control.max) as number)) {
      if (this._numberType === 'int') {
        return Math.trunc(this.control.max as number);
      }
      return this.control.max;
    }
    if (this._numberType === 'int') {
      val = Math.trunc(val);
    }
    return val;
  }

  clampJoystickX(val: number) {
    if (val < this.control.min[0]) {
      if (this._numberType === 'int') {
        return Math.trunc(this.control.min[0]);
      }
      return this.control.min[0];
    }
    if (val > this.control.max[0]) {
      if (this._numberType === 'int') {
        return Math.trunc(this.control.max[0]);
      }
      return this.control.max[0];
    }
    if (this._numberType === 'int') {
      val = Math.trunc(val);
    }
    return val;
  }

  clampJoystickY(val: number) {
    if (val < this.control.min[1]) {
      if (this._numberType === 'int') {
        return Math.trunc(this.control.min[1]);
      }
      return this.control.min[1];
    }
    if (val > this.control.max[1]) {
      if (this._numberType === 'int') {
        return Math.trunc(this.control.max[1]);
      }
      return this.control.max[1];
    }
    if (this._numberType === 'int') {
      val = Math.trunc(val);
    }
    return val;
  }

  mapValue() {
    if (this.control.orient === 'is--hor') {
      this.control.currentValue = this.clampSlider(
        this.scale(
          this.control.x as number,
          0,
          this.control.width - 44,
          <number>this.control.min,
          <number>this.control.max,
        ),
      );
    }
    if (this.control.orient === 'is--vert') {
      this.control.currentValue = this.clampSlider(
        this.scale(
          this.control.y as number,
          0,
          this.control.height - 44,
          <number>this.control.min,
          <number>this.control.max,
        ),
      );
    }
    if (this._joystickType) {
      this.control.currentValue = [
        this.clampJoystickX(
          this.scale(
            this.control.x as number,
            0,
            this.control.width - 44,
            this.control.min[0],
            this.control.max[0],
          ),
        ),
        this.clampJoystickY(
          this.scale(
            this.control.y as number,
            0,
            this.control.height - 44,
            this.control.min[1],
            this.control.max[1],
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

    if (this.control.orient === 'is--joystick') {
      this._joystickPos = this.circularBounds(
        this.control.x,
        this.control.y,
        [0, this.control.width - this.$handle.offsetWidth],
        [0, this.control.height - this.$handle.offsetHeight],
      );
      this.control.x = this.clamp(this._joystickPos[0], [
        0,
        this.control.width - this.$handle.offsetWidth,
      ]);
      this.control.y = this.clamp(this._joystickPos[1], [
        0,
        this.control.height - this.$handle.offsetHeight,
      ]);

      this.control.position =
        'translate(' +
        this.control.x +
        'px' +
        ',' +
        this.control.y +
        'px' +
        ')';

      this.setActualPosition(this.control.position);
    } else {
      if (x <= 0) {
        this.control.x = 0;
      } else if (x > this.clientWidth - this.$handle.offsetWidth) {
        this.control.x = this.clientWidth - this.$handle.offsetWidth;
      } else {
        this.control.x = x;
      }

      if (y <= 0) {
        this.control.y = 0;
      } else if (y > this.clientHeight - this.$handle.offsetHeight) {
        this.control.y = this.clientHeight - this.$handle.offsetHeight;
      } else {
        this.control.y = y;
      }

      this.control.position =
        'translate(' +
        clampPos(this.control.x) +
        'px' +
        ',' +
        clampPos(this.control.y) +
        'px' +
        ')';

      this.setActualPosition(this.control.position);
    }
  }

  updateControl(controlValue: number | number[]) {
    if (this._joystickType) {
      this.control.x = this.scale(
        controlValue[0] as number,
        this.control.min[0],
        this.control.max[0],
        0,
        this.clientWidth,
      );
      this.control.y = this.scale(
        controlValue[1] as number,
        this.control.min[1],
        this.control.max[1],
        0,
        this.clientHeight,
      );
    }

    if (this.control.orient === 'is--hor') {
      this.control.x = this.scale(
        controlValue as number,
        this.control.min as number,
        this.control.max as number,
        0,
        this.clientWidth,
      );
      this.control.y = 0;
    }

    if (this.control.orient === 'is--vert') {
      this.control.x = 0;
      this.control.y = this.scale(
        controlValue as number,
        this.control.min as number,
        this.control.max as number,
        0,
        this.clientHeight,
      );
    }

    this.setPosition(this.control.x, this.control.y);
    this.mapValue();
  }
}

export { RdSlider };
