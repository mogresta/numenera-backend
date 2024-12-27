import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { Validate } from "../decorators/Validator";
import { tokenValidation } from "../validators/ValidateToken";
import { getCharacter } from "../services/Character.service";
import {
  addItemToInventory,
  expendItemFromInventory,
  getInventory,
} from "../services/Inventory.service";

@Controller()
class InventoryController {
  @Route("post", "/inventory", tokenValidation) async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    await getInventory(req, res, next);
  }

  @Route("post", "/inventory/add", tokenValidation) async addItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    await addItemToInventory(req, res, next);
  }

  @Route("patch", "/inventory/expend", tokenValidation) async expendItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    await expendItemFromInventory(req, res, next);
  }
}

export default InventoryController;
