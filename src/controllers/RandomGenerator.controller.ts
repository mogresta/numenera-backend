import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { NextFunction, Request, Response } from "express";
import { tokenValidation } from "../validators/ValidateToken";
import { getRandomItem } from "../services/RandomGenerator.service";

@Controller()
class RandomGeneratorController {
  @Route("get", "/random-item", tokenValidation)
  async getRandomItem(req: Request, res: Response, next: NextFunction) {
    await getRandomItem(req, res, next);
  }
}
