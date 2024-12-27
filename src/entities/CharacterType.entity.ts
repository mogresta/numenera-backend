import {
  BaseEntity,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Character } from "./Character.entity";

@Entity()
export class CharacterType extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToMany({ mappedBy: "characterType", eager: false, orphanRemoval: true })
  characters = new Collection<Character>(this);
}
