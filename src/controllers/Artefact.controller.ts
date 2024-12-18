import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { getAllArtefacts, getArtefact } from "../services/Artefact.service";
import { tokenValidation } from "../validators/ValidateToken";

@Controller()
class ArtefactController {
  @Route("get", "/artefacts/all") async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getAllArtefacts(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("get", "/artefacts/:id") async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getArtefact(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default ArtefactController;
