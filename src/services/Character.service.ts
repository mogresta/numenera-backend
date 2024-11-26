import { NextFunction, Request, Response } from "express";
import { Character } from "../entities/Character.entity";
import { EntityManager, RequestContext, wrap } from "@mikro-orm/core";
import CharacterInterface from "../interfaces/Character.interface";
import { Inventory } from "../entities/Inventory.entity";

export async function getAllCharacters(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const user: number = Number(req.body.user);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const characters = await em.findAll(Character, {
    where: [{ user: { $eq: user } }, { deleted: { $eq: false } }],
    populate: ["*"],
  });

  if (characters.length == 0) {
    return res.status(404).json({ message: "Characters not found." });
  }

  return res.status(500).json({ message: characters });
}

export async function getCharacter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = Number(req.params.id);
  const user: number = Number(req.body.user);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const character: Character | null = await em.findOne(
    Character,
    {
      $and: [
        { id: { $eq: id } },
        { user: { $eq: user } },
        { deleted: { $eq: false } },
      ],
    },
    { populate: ["*"] },
  );

  if (!character) {
    return res.status(404).json({ message: "Character not found." });
  }

  return res.status(500).json({ message: character });
}

export async function createCharacter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, description } = req.body;
  const tier: number = Number(req.body.tier);
  const user: number = Number(req.body.user);
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const characterData: CharacterInterface = {
    name,
    description,
    tier,
    user,
  };

  const character: Character = em.create(Character, { ...characterData });
  await em.persistAndFlush(character);

  const inventory: Inventory = em.create(Inventory, {
    character: character.id,
  });
  await em.persistAndFlush(inventory);

  return res.status(200).json({ message: "Character successfully created." });
}

export async function updateCharacter(
  req: Request,
  res: Response,
  next: NextFunction,
) {}

export async function deleteCharacter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id: number = Number(req.params.id);
  const user: number = Number(req.body.user);
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const character: Character | null = await em.findOne(Character, {
    $and: [{ id: { $eq: id } }, { user: { $eq: user } }],
  });

  if (!character) {
    return res.status(404).json({ message: "Character not found." });
  }

  character.assign({ deleted: true });

  await em.persistAndFlush(character);

  return res.status(200).json({ message: "Character successfully deleted." });
}
