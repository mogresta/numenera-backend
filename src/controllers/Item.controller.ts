import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { findItem, getAllItems, getItem } from "../services/Item.service";
import { tokenValidation } from "../validators/ValidateToken";

@Controller()
class ItemController {
  @Route("get", "/items/all", tokenValidation) async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    await getAllItems(req, res, next);
  }

  @Route("get", "/items/:id", tokenValidation) async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    await getItem(req, res, next);
  }

  @Route("post", "/items/search", tokenValidation) async findItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    await findItem(req, res, next);
  }
}

export default ItemController;
