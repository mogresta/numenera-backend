import { Express, RequestHandler } from "express";
import { RouteHandler } from "../library/Routes";

export function defineRoutes(controllers: any, app: Express) {
  console.log("------------------------------");
  for (let i = 0; i < controllers.length; i++) {
    const controller = new controllers[i]();

    const routeHandlers: RouteHandler = Reflect.getMetadata(
      "routeHandlers",
      controller,
    );
    const controllerPath: string = Reflect.getMetadata(
      "baseRoute",
      controller.constructor,
    );
    const methods = Array.from(routeHandlers.keys());

    methods.forEach((method: keyof Express) => {
      const routes = routeHandlers.get(method);

      if (routes) {
        const routeNames = Array.from(routes.keys());

        routeNames.forEach((routeName: string) => {
          const handlers = routes.get(routeName);

          if (handlers) {
            app[method](controllerPath + routeName, handlers);
            console.log("Route: ", method, controllerPath + routeName);
          }
        });
      }
    });
  }
  console.log("------------------------------");
}
