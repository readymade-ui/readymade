import { CustomElement, Component } from '@readymade/core';

import style from './perf.scss';
import template from './perf.html';

@Component({
    selector: 'app-perftest',
    style: style,
    template: template,
})
class PerformanceTestComponent extends CustomElement {

    constructor() {
        super();
    }
}

export { PerformanceTestComponent };
