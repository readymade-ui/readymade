import { Router } from '../../modules/router';

const routing = [
  { path: '/', component: 'app-home' },
  { path: '/test', component: 'app-testbed' },
  { path: '/perf', component: 'app-perftest' },
  {
    path: '/router',
    component: 'app-query',
    queryParams: {
      contentType: 'post',
      page: '1',
      header: '1'
    }
  }
];

export { Router, routing };
