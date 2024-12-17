import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { getAllArtefacts } from "../services/Artefact.service";
import { tokenValidation } from "../validators/ValidateToken";

@Controller()
class ArtefactController {
  @Route("post", "/artefacts/all") async register(
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
}
