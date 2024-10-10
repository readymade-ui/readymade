import { Component, CustomElement, State } from '@readymade/core';
import { Route } from '@readymade/router';
import template from './query.html?raw';
import style from './query.css?raw';

@Component({
  selector: 'app-query',
  style,
  template,
})
class QueryComponent extends CustomElement {
  constructor() {
    super();
  }

  @State()
  public getState() {
    return {
      params: {},
    };
  }

  onNavigate(route: Route) {
    this.setState('params', JSON.stringify(route.queryParams));
  }
}

const render = () => `
<app-query>
  <template shadowroot="open">
    <style>
    ${style}
    </style>
    ${template}
  </template>
</app-query>
`;

export { QueryComponent, render };
