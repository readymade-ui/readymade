import {
  Component,
  CustomElement,
  html,
  State,
  Emitter,
  Listen,
} from '@readymade/core';

class HelloState {
  public model: string = 'Hello World';
}

@Component({
  selector: 'hello-state',
  template: html` <span>{{model}}</span> `,
})
class HelloStateComponent extends CustomElement {
  constructor() {
    super();
  }

  @State()
  public getState() {
    return new HelloState();
  }
  @Emitter('bang')
  @Listen('click')
  public onClick() {
    this.emitter.broadcast('bang');
  }
  @Listen('keyup')
  public onKeyUp(event) {
    if (event.key === 'Enter') {
      this.emitter.broadcast('bang');
    }
  }
}

export { HelloState, HelloStateComponent };
