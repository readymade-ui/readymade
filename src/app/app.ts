declare let Router: any; // imported in vendor.ts

// import { RouteConfig, routeConfig } from './app.routes';

export class App {

  public routes: RouteConfig[] = [];
  public rootSelector: string;

  // public configureRouter(config: RouteConfig, outletSelector?: string) {
  //   this.routes = config || routeConfig;
  //   this.rootSelector = outletSelector ? outletSelector : this.rootSelector ? this.rootSelector : '#app';
  //   const outlet = document.querySelector(this.rootSelector);
  //   const router = new Router(outlet);
  //   router.setRoutes(this.routes);
  // }

  public bootstrap(selector?: string) {

    //this.configureRouter(routeConfig, selector);
    return this;

  }
}
