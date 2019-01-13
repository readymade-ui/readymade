// Configure the client side SPA router here.

export interface RouteConfig {
  path: string;
  component: string;
}

export const routeConfig: RouteConfig[] = [{ path: '/', component: 'home-view' },
                                           { path: '/chapter-1', component: 'chapter1-view' }];
