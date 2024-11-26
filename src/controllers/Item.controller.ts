import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { getAllItems, getItem } from "../services/Item.service";
import { tokenValidation } from "../validators/ValidateToken";

@Controller()
class ItemController {
  @Route("get", "/items/all") async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getAllItems(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("get", "/items/:id") async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getItem(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default ItemController;
