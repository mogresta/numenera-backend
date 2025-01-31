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
import { CharacterService } from "../services/Character.service";
import { ServiceError } from "../utils/Service.error";

@Controller()
class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Route("post", "/characters/all", tokenValidation) async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId: number = req.body.user;

      const characters = await this.characterService.getAllCharacters(userId);

      return res.status(200).json([...characters]);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("get", "/characters/:id", tokenValidation) async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id: number = Number(req.params.id);

      const character = await this.characterService.getCharacter(id);

      return res.status(200).json({ ...character });
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("post", "/characters/create", tokenValidation)
  @Validate(characterCreateValidation)
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const tier: number = Number(req.body.tier);
      const user: number = Number(req.body.user);
      const characterTypeRef: number = Number(req.body.characterType);

      await this.characterService.createCharacter(
        name,
        description,
        tier,
        user,
        characterTypeRef,
      );

      return res.status(201).json({
        success: true,
        message: "Character successfully created.",
      });
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("patch", "/characters/update", tokenValidation)
  @Validate(characterUpdateValidation)
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.body.id);
      const { name, description } = req.body;
      const tier: number = Number(req.body.tier);
      const characterTypeRef: number = Number(req.body.characterType);

      await this.characterService.updateCharacter(
        id,
        name,
        description,
        tier,
        characterTypeRef,
      );

      return res.status(201).json({
        success: true,
        message: "Character successfully updated.",
      });
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("delete", "/characters/delete/:id", tokenValidation)
  @Validate(characterDeleteValidation)
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);

      await this.characterService.deleteCharacter(id);

      return res.status(201).json({
        success: true,
        message: "Character successfully deleted.",
      });
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default CharacterController;
