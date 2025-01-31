import { Express } from "express";
import { RouteHandler } from "../library/Routes";

export class Routes {
  static defineRoutes(controllers: any[], app: Express) {
    console.log("------------------------------");
    for (const Controller of controllers) {
      // Get the base route from the controller class itself
      const controllerPath: string =
        Reflect.getMetadata("baseRoute", Controller) || "";

      // Get route handlers from the prototype
      const routeHandlers: RouteHandler = Reflect.getMetadata(
        "routeHandlers",
        Controller.prototype,
      );

      if (!routeHandlers) {
        console.log(`No routes defined for ${Controller.name}`);
        continue;
      }

      const methods = Array.from(routeHandlers.keys());

      methods.forEach((method: keyof Express) => {
        const routes = routeHandlers.get(method);

        if (routes) {
          const routeNames = Array.from(routes.keys());

          routeNames.forEach((routeName: string) => {
            const handlers = routes.get(routeName);

            if (handlers) {
              const fullPath = `${controllerPath}${routeName}`;
              app[method](
                fullPath,
                ...handlers.map((handler) => handler.bind(new Controller())),
              );
              console.log(`Route: ${String(method).toUpperCase()} ${fullPath}`);
            }
          });
        }
      });
    }
    console.log("------------------------------");
  }
}
