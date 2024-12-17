import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Character } from "./Character.entity";

@Entity()
export class Inventory {
  @PrimaryKey()
  id!: number;

  @Property()
  slots!: number;

  @OneToOne()
  character!: Character;
}
