import { NextFunction, Request, Response } from "express";
import { Character } from "../entities/Character.entity";
import { NotFoundError } from "../utils/NotFound.error";
import CharacterInterface from "../interfaces/Character.interface";
import { Inventory } from "../entities/Inventory.entity";
import { CharacterType } from "../entities/CharacterType.entity";
import { CharacterTypes } from "../enums/CharacterType.enum";
import { User } from "../entities/User.entity";
import { ServiceError } from "../utils/Service.error";
import { BaseService } from "./Base.service";
import { Service } from "../decorators/Service";

@Service()
export class CharacterService extends BaseService {
  async getAllCharacters(userId: number) {
    const em = this.getEntityManager();

    const characters = await em.findAll(Character, {
      where: [{ user: { $eq: userId } }, { deleted: { $eq: false } }],
    });

    if (characters.length == 0) {
      throw new NotFoundError("No characters found.");
    }

    return characters;
  }

  async getCharacter(characterId: number) {
    const em = this.getEntityManager();

    const character: Character | null = await em.findOne(Character, {
      $and: [{ id: { $eq: characterId } }, { deleted: { $eq: false } }],
    });

    if (!character) {
      throw new NotFoundError("Character not found.");
    }

    return character;
  }

  async createCharacter(
    name: string,
    description: string,
    tier: number,
    user: number,
    characterTypeRef: number,
  ) {
    const em = this.getEntityManager();

    const characterTypeEnum: CharacterTypes = characterTypeRef;

    const characterData: CharacterInterface = {
      name,
      description,
      tier,
      characterType: em.getReference(CharacterType, characterTypeEnum),
      user: em.getReference(User, user),
    };

    try {
      const character: Character = em.create(Character, { ...characterData });
      await em.persistAndFlush(character);

      const inventory: Inventory = em.create(Inventory, {
        character: character,
      });
      await em.persistAndFlush(inventory);
    } catch (error) {
      throw new ServiceError("Failed to create character.");
    }
  }

  async updateCharacter(
    id: number,
    name: string,
    description: string,
    tier: number,
    characterTypeRef: number,
  ) {
    const em = this.getEntityManager();

    const character: Character | null = await em.findOne(Character, {
      $and: [{ id: { $eq: id } }],
    });

    if (!character) {
      throw new NotFoundError("Character not found.");
    }

    const characterTypeEnum: CharacterTypes = characterTypeRef;
    character.assign({
      name,
      description,
      tier,
      characterType: em.getReference(CharacterType, characterTypeEnum),
    });

    try {
      await em.persistAndFlush(character);
    } catch (error) {
      throw new ServiceError("Failed to update character.");
    }
  }

  async deleteCharacter(id: number) {
    const em = this.getEntityManager();

    const character: Character | null = await em.findOne(Character, {
      $and: [{ id: { $eq: id } }],
    });

    if (!character) {
      throw new NotFoundError("Character not found.");
    }

    try {
      character.assign({ deleted: true });

      await em.persistAndFlush(character);
    } catch (error) {
      throw new ServiceError("Failed to delete character.");
    }
  }
}
