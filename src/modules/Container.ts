export class Container {
  private static services = new Map<string, any>();

  static registerServices(services: any[]) {
    console.log(
      "Registering services:",
      services.map((s) => s.name),
    );

    services.forEach((Service) => {
      const isService = Reflect.getMetadata("serviceType", Service);
      console.log(`Checking ${Service.name}:`, { isService });

      if (isService) {
        const instance = new Service();
        this.services.set(Service.name, instance);
        console.log(`Registered service: ${Service.name}`);
      }
    });

    console.log("Registered services:", Array.from(this.services.keys()));
  }

  static get(name: string) {
    const service = this.services.get(name);
    if (!service) {
      console.log(
        `Service "${name}" not found. Available services:`,
        Array.from(this.services.keys()),
      );
    }
    return service;
  }
}
