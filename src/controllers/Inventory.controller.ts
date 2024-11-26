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
  @Route("get", "/inventory") async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getInventory(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("post", "/inventory/add") async addItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await addItemToInventory(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("post", "/inventory/expend") async expendItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await expendItemFromInventory(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default InventoryController;
