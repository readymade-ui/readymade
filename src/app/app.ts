<<<<<<< HEAD
declare let Router: any; // imported in vendor.ts
=======
// declare let Router: any; // imported in vendor.ts
>>>>>>> dev

// import { RouteConfig, routeConfig } from './app.routes';

export class App {

<<<<<<< HEAD
  public routes: RouteConfig[] = [];
=======
  // public routes: RouteConfig[] = [];
>>>>>>> dev
  public rootSelector: string;

  // public configureRouter(config: RouteConfig, outletSelector?: string) {
  //   this.routes = config || routeConfig;
  //   this.rootSelector = outletSelector ? outletSelector : this.rootSelector ? this.rootSelector : '#app';
  //   const outlet = document.querySelector(this.rootSelector);
  //   const router = new Router(outlet);
  //   router.setRoutes(this.routes);
  // }

  public bootstrap(selector?: string) {

<<<<<<< HEAD
    //this.configureRouter(routeConfig, selector);
=======
    // this.configureRouter(routeConfig, selector);
>>>>>>> dev
    return this;

  }
}
