import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { NextFunction, Request, Response } from "express";
import { tokenValidation } from "../validators/ValidateToken";
import { RandomGeneratorService } from "../services/RandomGenerator.service";
import { ServiceError } from "../utils/Service.error";

@Controller()
class RandomGeneratorController {
  constructor(private randomGeneratorService: RandomGeneratorService) {}

  @Route("get", "/random-item", tokenValidation)
  async getRandomItem(req: Request, res: Response, next: NextFunction) {
    try {
      const type: number = Number(req.body.type);

      const randomItems =
        await this.randomGeneratorService.getRandomItems(type);

      return res.status(200).json([...randomItems]);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
