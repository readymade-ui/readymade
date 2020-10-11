import { HomeComponent } from './app/view/home';
import { TestBedComponent } from './app/view/test';
import { PerformanceTestComponent } from './app/view/perf';

function BroadcastChannel(channel: any) {}
// @ts-ignore
global['BroadcastChannel'] = BroadcastChannel;
global['observer$'] = {
  observe: () => {}
};

const routes = [
  { path: '/', component: HomeComponent },
  { path: '/test', component: TestBedComponent },
  { path: '/perf', component: PerformanceTestComponent }
];

export { routes };
