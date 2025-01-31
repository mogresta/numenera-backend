import { Container } from "../modules/Container";

export function Controller(baseRoute: string = "") {
  return function (target: any) {
    const original = target;

    const newConstructor: any = function (...args: any[]) {
      const serviceName = target.name.replace("Controller", "Service");
      const service = Container.get(serviceName);

      if (!service) {
        console.log(
          `No service found for ${target.name}, continuing without service`,
        );
        return new original();
      }

      return new original(service);
    };

    newConstructor.prototype = original.prototype;

    const metadataKeys = Reflect.getMetadataKeys(target);
    metadataKeys.forEach((key) => {
      const metadata = Reflect.getMetadata(key, target);
      Reflect.defineMetadata(key, metadata, newConstructor);
    });

    Reflect.defineMetadata("baseRoute", baseRoute, newConstructor);
    Reflect.defineMetadata("baseRoute", baseRoute, newConstructor.prototype);

    return newConstructor;
  };
}
