import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { getAllCyphers } from "../services/Cypher.service";
import { tokenValidation } from "../validators/ValidateToken";

@Controller()
class CypherController {
  @Route("post", "/cyphers/all") async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getAllCyphers(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
