import { EntityManager, RequestContext } from "@mikro-orm/core";
import { ServiceError } from "../utils/Service.error";

export abstract class BaseService {
  protected getEntityManager(): EntityManager {
    const em = RequestContext.getEntityManager();
    if (!em) {
      throw new ServiceError("Entity manager not available");
    }
    return em;
  }
}
