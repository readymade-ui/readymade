import { Component, CustomElement, State } from './../../../../modules/core';
import { Route } from './../../../../modules/router';
import html from './query.html?raw';
import style from './query.scss?raw';

@Component({
  selector: 'app-query',
  style: style,
  template: html
})
class QueryComponent extends CustomElement {
  constructor() {
    super();
  }

  @State()
  public getState() {
    return {
      params: {}
    };
  }

  onNavigate(route: Route) {
    this.setState('params', JSON.stringify(route.queryParams));
  }
}

const template = () => html;

export { QueryComponent, template };
