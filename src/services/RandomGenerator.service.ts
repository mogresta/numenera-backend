import { Item } from "../entities/Item.entity";
import { BaseService } from "./Base.service";
import { NotFoundError } from "../utils/NotFound.error";
import { ServiceError } from "../utils/Service.error";

export class RandomGeneratorService extends BaseService {
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async getRandomItems(type: number) {
    const em = this.getEntityManager();

    const allItems = await em.find(Item, { type: { $eq: type } });

    if (!allItems) {
      throw new NotFoundError("No items found");
    }

    try {
      const randomItems: Item[] = [];
      for (let i = 1; i <= 10; ) {
        const randomIndex: number = this.getRandomInt(0, allItems.length - 1);
        if (randomItems.includes(allItems[randomIndex])) {
          continue;
        }

        randomItems.push(allItems[randomIndex]);
        i++;
      }

      return randomItems;
    } catch (error) {
      throw new ServiceError("Error generating random items");
    }
  }
}
