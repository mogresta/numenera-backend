import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { Validate } from "../decorators/Validator";
import { tokenValidation } from "../validators/ValidateToken";
import {
  addItemToGroupInventory,
  loanItemFromGroupInventory,
  getGroupInventory,
  returnItemToGroupInventory,
} from "../services/GroupInventory.service";

@Controller()
class InventoryController {
  @Route("get", "/group-inventory") async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getGroupInventory(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("post", "/group-inventory/add") async addItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await addItemToGroupInventory(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("post", "/group-inventory/lend") async loanItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await loanItemFromGroupInventory(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("post", "/group-inventory/return") async returnItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await returnItemToGroupInventory(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default InventoryController;
