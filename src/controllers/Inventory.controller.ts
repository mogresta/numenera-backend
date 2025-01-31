import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { tokenValidation } from "../validators/ValidateToken";
import { InventoryService } from "../services/Inventory.service";
import { ServiceError } from "../utils/Service.error";

@Controller()
class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Route("post", "/inventory", tokenValidation) async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const character = Number(req.body.character);

      const inventory = await this.inventoryService.getInventory(character);

      return res.status(200).json({ inventory });
    } catch (error) {
      if (error instanceof ServiceError) {
        console.log(error.originalError);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("post", "/inventory/add", tokenValidation) async addItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const character = Number(req.body.character);
      const item = Number(req.body.item);

      await this.inventoryService.addItemToInventory(character, item);

      return res.status(201).json({
        success: true,
        message: "Item successfully added to inventory.",
      });
    } catch (error) {
      if (error instanceof ServiceError) {
        console.log(error.originalError);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("patch", "/inventory/expend", tokenValidation) async expendItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id: number = Number(req.body.id);

      await this.inventoryService.expendItemFromInventory(id);

      return res.status(201).json({
        success: true,
        message: "Item successfully expended.",
      });
    } catch (error) {
      if (error instanceof ServiceError) {
        console.log(error.originalError);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default InventoryController;
