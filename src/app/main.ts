// import { App } from './app';

// const app = new App().bootstrap();

import { RMainNavComponent } from './components/main-nav.component.js';
import { RSideNavComponent } from './components/side-nav.component.js';
import { RHeadlineComponent } from './components/headline.component.js';
import { RLogoComponent } from './components/logo.component.js';
import { RStatsComponent } from './components/stats.component.js';
import { RCodeComponent } from './components/code.component.js';


// Library Components
export { RMainNavComponent } from './components/main-nav.component.js';
export { RSideNavComponent } from './components/side-nav.component.js';
export { RHeadlineComponent } from './components/headline.component.js';
export { RLogoComponent } from './components/logo.component.js';
export { RStatsComponent } from './components/stats.component.js';
export { RCodeComponent } from './components/code.component.js';


customElements.define('r-logo', RLogoComponent);
customElements.define('r-headline', RHeadlineComponent);

// export { MyButtonComponent } from './lib/components/button/button.component.js';
// export { MyInputComponent } from './lib/components/input/input.component.js';
// export { MyItemComponent } from './lib/components/item/item.component.js';
// export { MyListComponent } from './lib/components/list/list.component.js';
// View Components
// export { HomeView } from './view/home.view';
// export { ChapterOneView } from './view/chapter1.view';
