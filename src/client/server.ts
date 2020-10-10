
import { HomeComponent } from './app/view/home';
import { TestBedComponent } from './app/view/test';
import { PerformanceTestComponent } from './app/view/perf';

// mock BroadcastChannel for SSR
function BroadcastChannel(channel) { }
global['BroadcastChannel'] = BroadcastChannel as any;
global['observer$'] = {
  observe: () => {}
};

const routes = [
    { path: '/', component: HomeComponent },
    { path: '/test', component: TestBedComponent },
    { path: '/perf', component: PerformanceTestComponent }
];

export { routes };