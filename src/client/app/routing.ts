import { Router } from '../../modules/router';

const routing = [
  { path: '/', component: 'app-home', title: 'Readymade' },
  { path: '/test', component: 'app-testbed', title: 'Readymade Test Page' },
  { path: '/lib', component: 'app-library', title: 'Readymade UI' },
  {
    path: '/perf',
    component: 'app-perftest',
    title: 'Readymade Performance Test'
  },
  {
    path: '/router',
    component: 'app-query',
    queryParams: {
      contentType: 'post',
      page: '1',
      header: '1'
    },
    title: 'Readymade Router Test'
  }
];

export { Router, routing };
