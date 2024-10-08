import { CustomElement, Component } from './../../../../modules/core';

import style from './perf.scss?raw';
import template from './perf.html?raw';

@Component({
  selector: 'app-perftest',
  style,
  template,
})
class PerformanceTestComponent extends CustomElement {
  constructor() {
    super();
  }
}

const render = () => `
  <app-perftest>
    <template shadowroot="open">
      <style>
        ${style}
      </style>
      ${template}
    </template>
  </app-perftest>
`;

export { PerformanceTestComponent, render };
