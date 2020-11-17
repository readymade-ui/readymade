import { Component, CustomElement, State } from './../../../../modules/core';
import { Route } from './../../../../modules/router';
import template from './query.html';
import style from './query.scss';

@Component({
  selector: 'app-query',
  style: style,
  template: template
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

export { QueryComponent };
