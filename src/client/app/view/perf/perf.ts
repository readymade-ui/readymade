import { CustomElement, Component } from './../../../../modules/core';

import style from './perf.scss?raw';
import html from './perf.html?raw';

@Component({
  selector: 'app-perftest',
  style: style,
  template: html
})
class PerformanceTestComponent extends CustomElement {
  constructor() {
    super();
  }
}

const template = () => html;

export { PerformanceTestComponent, template };
