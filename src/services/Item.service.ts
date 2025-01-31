import { Item } from "../entities/Item.entity";
import { EntityManager } from "@mikro-orm/core";
import { Source } from "../entities/Source.entity";
import { Type } from "../entities/Type.entity";
import { Types } from "../enums/Type.enum";
import { Sources } from "../enums/Source.enum";
import { ServiceError } from "../utils/Service.error";
import { BaseService } from "./Base.service";
import { NotFoundError } from "../utils/NotFound.error";
import { Service } from "../decorators/Service";

@Service()
export class ItemService extends BaseService {
  async getAllItems(
    sources: number[] = [],
    types: number[] = [],
    planTypes: number[] = [],
  ) {
    const em = this.getEntityManager();

    const whereClause = await this.buildWhereClause(
      em,
      sources,
      types,
      planTypes,
    );

    try {
      return await em.find(Item, whereClause, {
        fields: ["id", "name", "type", "source", "planType"],
      });
    } catch (error) {
      throw new ServiceError("Error searching for items");
    }
  }

  async getItem(id: number) {
    const em = this.getEntityManager();

    try {
      const item = await em.findOne(Item, { id });
      if (!item) {
        throw new NotFoundError("Item not found");
      }
      return item;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new ServiceError("Error searching for item");
    }
  }

  async findItem(name: string) {
    const em = this.getEntityManager();

    try {
      const items = await em.find(Item, {
        name: { $like: `%${name}%` },
      });

      return items;
    } catch (error) {
      throw new ServiceError("Error searching for items");
    }
  }

  async buildWhereClause(
    em: EntityManager,
    sources: number[],
    types: number[],
    planTypes: number[],
  ) {
    const mappedSources: number[] = [];
    const mappedTypes: number[] = [];
    const mappedPlanTypes: number[] = [];
    const whereClause: any = {};

    if (sources.length > 0 && sources.every((source) => !isNaN(source))) {
      await Promise.all(
        sources.map((source) => {
          const sourceEnum: Sources = Number(source);
          const ref: Source = em.getReference(Source, sourceEnum);

          mappedSources.push(ref.id);
        }),
      );

      whereClause.source = { $in: [...mappedSources] };
    }

    if (types.length > 0 && types.every((type) => !isNaN(type))) {
      await Promise.all(
        types.map((type) => {
          const typeEnum: Types = Number(type);
          const ref: Type = em.getReference(Type, typeEnum);

          mappedTypes.push(ref.id);
        }),
      );

      whereClause.type = { $in: [...mappedTypes] };
    }

    if (
      planTypes.length > 0 &&
      planTypes.every((planType) => !isNaN(planType))
    ) {
      await Promise.all(
        planTypes.map((planType) => {
          const planTypeEnum: Types = Number(planType);
          const ref: Type = em.getReference(Type, planTypeEnum);

          mappedPlanTypes.push(ref.id);
        }),
      );

      whereClause.planType = { $in: [...mappedPlanTypes] };
    }

    return whereClause;
  }
}
