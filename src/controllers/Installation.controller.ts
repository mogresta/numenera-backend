import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import {
  getAllInstallations,
  getInstallation,
} from "../services/Installation.service";
import { tokenValidation } from "../validators/ValidateToken";

@Controller()
class InstallationController {
  @Route("get", "/Installations/all") async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getAllInstallations(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("get", "/installations/:id") async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getInstallation(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default InstallationController;
