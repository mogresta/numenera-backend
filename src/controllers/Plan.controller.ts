import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { getAllPlans } from "../services/Plan.service";
import { tokenValidation } from "../validators/ValidateToken";

@Controller()
class PlanController {
  @Route("post", "/plans/all") async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getAllPlans(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
