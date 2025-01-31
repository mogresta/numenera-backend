import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { ItemService } from "../services/Item.service";
import { tokenValidation } from "../validators/ValidateToken";
import { ServiceError } from "../utils/Service.error";

@Controller()
class ItemController {
  constructor(private itemService: ItemService) {}

  @Route("get", "/items/all", tokenValidation) async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const sources: number[] = req.query.sources
        ? String(req.query.sources).split(",").map(Number)
        : [];
      const types: number[] = req.query.types
        ? String(req.query.types).split(",").map(Number)
        : [];
      const planTypes: number[] = req.query.types
        ? String(req.query.planTypes).split(",").map(Number)
        : [];

      const items = await this.itemService.getAllItems(
        sources,
        types,
        planTypes,
      );

      return res.status(200).json({ items });
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("get", "/items/:id", tokenValidation)
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const item = await this.itemService.getItem(id);

      return res.status(200).json({ item });
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("post", "/items/search", tokenValidation)
  async findItem(req: Request, res: Response, next: NextFunction) {
    try {
      const name = req.body.name;

      const items = await this.itemService.findItem(name);

      return res.status(200).json({ items });
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ItemController;
