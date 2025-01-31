import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { tokenValidation } from "../validators/ValidateToken";
import { GroupInventoryService } from "../services/GroupInventory.service";
import { ServiceError } from "../utils/Service.error";

@Controller()
class InventoryController {
  constructor(private groupInventoryService: GroupInventoryService) {}

  @Route("get", "/group-inventory", tokenValidation) async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const inventory = await this.groupInventoryService.getGroupInventory();

      return res.status(200).json({ inventory: [...inventory] });
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("post", "/group-inventory/add", tokenValidation) async addItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const item: number = Number(req.body.item);
      const inventoryItemId: number | undefined = Number(
        req.body.groupInventory,
      );

      await this.groupInventoryService.addItemToGroupInventory(
        item,
        inventoryItemId,
      );

      return res.status(201).json({
        success: true,
        message: "Item successfully added to group inventory.",
      });
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("patch", "/group-inventory/lend", tokenValidation) async loanItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const groupInventory: number = Number(req.body.groupInventory);
      const character: number = Number(req.body.character);

      await this.groupInventoryService.loanItemFromGroupInventory(
        groupInventory,
        character,
      );

      return res.status(201).json({
        success: true,
        message: "Item successfully loaned from group inventory.",
      });
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default InventoryController;
