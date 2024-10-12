import { Router } from '@readymade/router';

const routing = [
  { path: '/', component: 'app-home', title: 'Readymade' },
  { path: '/test', component: 'app-testbed', title: 'Readymade Test Page' },
  { path: '/lib', component: 'app-library', title: 'Readymade UI' },
  {
    path: '/perf',
    component: 'app-perftest',
    title: 'Readymade Performance Test',
  },
  {
    path: '/router',
    component: 'app-query',
    queryParams: {
      contentType: 'post',
      page: '1',
      header: '1',
    },
    title: 'Readymade Router Test',
  },
  {
    path: '/404',
    component: 'app-notfound',
    title: 'File Not Found',
  },
];

export { Router, routing };
