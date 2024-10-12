import { Router, routing } from './app/routing';

if (import.meta.env.DEV) {
  window['clientRouter'] = new Router('#root', routing, true);
}

export { Router, routing } from './app/routing';
export { TemplateRepeater, Repeater } from '@readymade/dom';
export {
  MyButtonComponent,
  RCodeComponent,
  MyCounter,
  RHeadlineComponent,
  MyInputComponent,
  MyItemComponent,
  MyListComponent,
  RLogoComponent,
  RMainNavComponent,
  RMeterComponent,
  RSideNavComponent,
  RStatsComponent,
  AtomComponent,
  NodeComponent,
  TreeComponent,
  HomeComponent,
  PerformanceTestComponent,
  QueryComponent,
  TestBedComponent,
  LibraryComponent,
} from './app';
