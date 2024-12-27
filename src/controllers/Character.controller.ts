import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { Validate } from "../decorators/Validator";
import { tokenValidation } from "../validators/ValidateToken";
import {
  characterCreateValidation,
  characterDeleteValidation,
  characterUpdateValidation,
} from "../validators/CharacterValidator";
import {
  getAllCharacters,
  getCharacter,
  createCharacter,
  deleteCharacter,
  updateCharacter,
} from "../services/Character.service";

@Controller()
class CharacterController {
  @Route("post", "/characters/all", tokenValidation) async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    await getAllCharacters(req, res, next);
  }

  @Route("get", "/characters/:id", tokenValidation) async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    await getCharacter(req, res, next);
  }

  @Route("post", "/characters/create", tokenValidation)
  @Validate(characterCreateValidation)
  async create(req: Request, res: Response, next: NextFunction) {
    await createCharacter(req, res, next);
  }

  @Route("delete", "/characters/delete/:id", tokenValidation)
  @Validate(characterDeleteValidation)
  async delete(req: Request, res: Response, next: NextFunction) {
    await deleteCharacter(req, res, next);
  }

  @Route("patch", "/characters/update", tokenValidation)
  @Validate(characterUpdateValidation)
  async update(req: Request, res: Response, next: NextFunction) {
    await updateCharacter(req, res, next);
  }
}

export default CharacterController;
