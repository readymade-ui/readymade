import { ElementMeta, EventDispatcher } from './../../core';

export interface RouteComponent extends HTMLElement {
  emitter?: EventDispatcher;
  elementMeta?: ElementMeta;
  onInit?(): void;
  bindEmitters?(): void;
  bindListeners?(): void;
  bindState?(): void;

  setState?(property: string, model: any): void;
  onNavigate?(route: Route): void;
  onUpdate?(): void;
  onDestroy?(): void;
}

export interface Route {
  path: string;
  component: string | RouteComponent;
  queryParams?: { [key: string]: string };
  title?: string;
  description?: string;

  schema?: any;
}

class Router {
  rootElement: Element;
  routes: Array<Route>;
  currentRoute: Route;
  constructor(root: string, routes: Route[]) {
    if (document.querySelector(root) === null) {
      console.error(`[Router] Root element '${root}' does not exist.`);
    }
    if (!routes) {
      console.error(`[Router] initialized without any routes.`);
    }
    this.rootElement = document.querySelector(root);
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

  decodeQuery() {
    if (location.search.length === 0) {
      return {};
    }
    const search = location.search.substring(1);
    return JSON.parse(
      '{"' +
        decodeURI(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}',
    );
  }

  parseQuery(route: Route) {
    return new URLSearchParams(route.queryParams);
  }

  matchRoute(path: string) {
    return this.routes.find((route) => route.path === path);
  }

  navigate(path: string) {
    const route = this.matchRoute(path);
    if (!route) {
      console.error(`[Router] Route '${path}' does not exist.`);
      return;
    }
    this.resolve(route);
  }

  resolve(route: Route) {
    const locationParams = this.decodeQuery();
    const component: RouteComponent = document.createElement(
      route.component as string,
    );

    if (Object.keys(locationParams).length) {
      route.queryParams = locationParams;
    } else if (route.queryParams) {
      window.history.replaceState(
        {},
        '',
        `${location.pathname}?${this.parseQuery(route)}`,
      );
    }

    if (route.title) {
      document.title = route.title;
    }

    if (route.description) {
      const description = document.querySelector('meta[name="description"]');
      if (description) {
        description.setAttribute('content', route.description);
      }
    }

    if (route.schema) {
      const script = document.querySelector('[type="application/ld+json"]');
      if (script) {
        script.innerHTML = route.schema;
      }
    }

    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(component);
    this.currentRoute = route;

    if (component.onNavigate) {
      component.onNavigate(this.currentRoute);
    }
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

export { Router };
