import { NextFunction, Request, Response } from "express";
import { Character } from "../entities/Character.entity";
import { EntityManager, RequestContext, wrap } from "@mikro-orm/core";
import CharacterInterface from "../interfaces/Character.interface";
import { Inventory } from "../entities/Inventory.entity";
import { CharacterType } from "../entities/CharacterType.entity";
import { CharacterTypes } from "../enums/CharacterType.enum";
import { User } from "../entities/User.entity";

export async function getAllCharacters(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const userId: number = req.body.user;

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  if (!userId || isNaN(Number(userId))) {
    return res.status(400).json({ message: "Invalid user ID provided" });
  }

  const user: number = Number(userId);

  const characters = await em.findAll(Character, {
    where: [{ user: { $eq: user } }, { deleted: { $eq: false } }],
  });

  if (characters.length == 0) {
    return res.status(404).json({ message: "Characters not found." });
  }

  return res.status(200).json([...characters]);
}

export async function getCharacter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = Number(req.params.id);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const character: Character | null = await em.findOne(Character, {
    $and: [{ id: { $eq: id } }, { deleted: { $eq: false } }],
  });

  if (!character) {
    return res.status(404).json({ message: "Character not found." });
  }

  return res.status(200).json({ ...character });
}

export async function createCharacter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, description } = req.body;
  const tier: number = Number(req.body.tier);
  const user: number = Number(req.body.user);
  const characterTypeRef: number = Number(req.body.characterType);
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const characterTypeEnum: CharacterTypes = Number(characterTypeRef);

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

    return res.status(200).json({ message: "Character successfully created." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Character creation error:", error });
  }
}

export async function updateCharacter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id: number = Number(req.body.id);
  const { name, description } = req.body;
  const tier: number = Number(req.body.tier);
  const characterTypeRef: number = Number(req.body.characterType);
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const character: Character | null = await em.findOne(Character, {
    $and: [{ id: { $eq: id } }],
  });

  if (!character) {
    return res.status(404).json({ message: "Character not found." });
  }

  const characterTypeEnum: CharacterTypes = Number(characterTypeRef);
  character.assign({
    name,
    description,
    tier,
    characterType: em.getReference(CharacterType, characterTypeEnum),
  });

  try {
    await em.persistAndFlush(character);

    return res.status(200).json({ message: "Character successfully updated." });
  } catch (error) {
    return res.status(500).json({ message: "Character update error: ", error });
  }
}

export async function deleteCharacter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id: number = Number(req.params.id);
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const character: Character | null = await em.findOne(Character, {
    $and: [{ id: { $eq: id } }],
  });

  if (!character) {
    return res.status(404).json({ message: "Character not found." });
  }

  try {
    character.assign({ deleted: true });

    await em.persistAndFlush(character);

    return res.status(200).json({ message: "Character successfully deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Character deletion error", error });
  }
}
