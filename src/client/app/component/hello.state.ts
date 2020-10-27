import {
  Component,
  CustomElement,
  html,
  State
} from './../../../modules/core';

class HelloState {
  public model: string = 'Hello World';
}

@Component({
  selector: 'hello-state',
  template: html`
    <span>{{model}}</span>
  `
})
class HelloStateComponent extends CustomElement {
  constructor() {
    super();
  }

  @State()
  public getState() {
    return new HelloState();
  }
}

export { HelloState, HelloStateComponent };
