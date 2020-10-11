import { RdRouter } from './router/index';

const routing = [
  { path: '/', component: 'app-home' },
  { path: '/test', component: 'app-testbed' },
  { path: '/perf', component: 'app-perftest' }
];

const rdrouter = new RdRouter('#root', routing);

export { rdrouter };
