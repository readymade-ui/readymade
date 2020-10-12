export interface RdRoute {
  path: string;
  component: string;
}

class RdRouter {
  rootElement: HTMLElement;
  routes: any[];
  constructor(root: string, routes: RdRoute[]) {
    if (document.querySelector(root) === null) {
      console.error(`[RdRouter] Root element '${root}' does not exist.`);
    }
    if (!routes) {
      console.error(`[RdRouter] initialized without any routes.`);
    }
    this.rootElement = document.querySelector(root) as HTMLElement;
    this.routes = routes;
    this.listen();
  }

  init() {
    this.onLocationChange();
  }

  listen() {
    if (this.isPushState()) {
      window.addEventListener('popstate', this.onLocationChange.bind(this));
    } else if (this.isHashChange()) {
      window.addEventListener('hashchange', this.onLocationChange.bind(this));
    }
    this.init();
  }

  onLocationChange() {
    let path: string = window.location.pathname.replace(/\/$/, '');
    if (path === '') {
      path = '/';
    }
    if (this.matchRoute(path)) {
      this.navigate(path);
    }
  }

  matchRoute(path: string) {
    return this.routes.find(route => route.path === path);
  }

  navigate(path: string) {
    const route = this.matchRoute(path);
    if (!route) {
      console.error(`[RdRouter] Route '${path}' does not exist.`);
      return;
    }
    this.resolve(route);
  }

  resolve(route: RdRoute) {
    const component = document.createElement(route.component);
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(component);
  }

  private isHashChange() {
    return typeof window !== 'undefined' && 'onhashchange' in window;
  }

  private isPushState() {
    return !!(
      typeof window !== 'undefined' &&
      window.history &&
      window.history.pushState
    );
  }
}

export { RdRouter };
