import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { getAllAutomatons } from "../services/Automaton.service";
import { tokenValidation } from "../validators/ValidateToken";

@Controller()
class AutomatonController {
  @Route("post", "/automatons/all") async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getAllAutomatons(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
