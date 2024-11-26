import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { Validate } from "../decorators/Validator";
import { tokenValidation } from "../validators/ValidateToken";
import {
  characterDeleteValidation,
  characterPostValidation,
} from "../validators/CharacterValidator";
import {
  getAllCharacters,
  getCharacter,
  createCharacter,
  deleteCharacter,
} from "../services/Character.service";

@Controller()
class CharacterController {
  @Route("get", "/characters/all") async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getAllCharacters(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("get", "/characters/:id") async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    tokenValidation(req, res, next);

    try {
      await getCharacter(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("post", "/characters/create")
  @Validate(characterPostValidation)
  async create(req: Request, res: Response, next: NextFunction) {
    tokenValidation(req, res, next);

    try {
      await createCharacter(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("post", "/characters/delete/:id")
  @Validate(characterDeleteValidation)
  async delete(req: Request, res: Response, next: NextFunction) {
    tokenValidation(req, res, next);

    try {
      await deleteCharacter(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default CharacterController;
