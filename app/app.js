// declare let Router: any; // imported in vendor.ts
// import { RouteConfig, routeConfig } from './app.routes';
export class App {
    // public configureRouter(config: RouteConfig, outletSelector?: string) {
    //   this.routes = config || routeConfig;
    //   this.rootSelector = outletSelector ? outletSelector : this.rootSelector ? this.rootSelector : '#app';
    //   const outlet = document.querySelector(this.rootSelector);
    //   const router = new Router(outlet);
    //   router.setRoutes(this.routes);
    // }
    bootstrap(selector) {
        // this.configureRouter(routeConfig, selector);
        return this;
    }
}
