import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { getAllVehicles } from "../services/Vehicle.service";
import { tokenValidation } from "../validators/ValidateToken";

@Controller()
class VehicleController {
  @Route("post", "/vehicles/all") async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getAllVehicles(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
