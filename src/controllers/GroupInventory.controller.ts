import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { tokenValidation } from "../validators/ValidateToken";
import {
  addItemToGroupInventory,
  loanItemFromGroupInventory,
  getGroupInventory,
} from "../services/GroupInventory.service";

@Controller()
class InventoryController {
  @Route("get", "/group-inventory", tokenValidation) async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    await getGroupInventory(req, res, next);
  }

  @Route("post", "/group-inventory/add", tokenValidation) async addItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    await addItemToGroupInventory(req, res, next);
  }

  @Route("patch", "/group-inventory/lend", tokenValidation) async loanItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    await loanItemFromGroupInventory(req, res, next);
  }
}

export default InventoryController;
