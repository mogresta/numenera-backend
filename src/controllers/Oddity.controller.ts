import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { getAllOddities, getOddity } from "../services/Oddity.service";
import { tokenValidation } from "../validators/ValidateToken";

@Controller()
class OddityController {
  @Route("get", "/oddities/all") async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getAllOddities(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("get", "/oddities/:id") async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getOddity(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default OddityController;
