export function Service() {
  return function (target: any) {
    Reflect.defineMetadata("serviceType", true, target);
  };
}
