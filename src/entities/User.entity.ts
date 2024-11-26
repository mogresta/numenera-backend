import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  BaseEntity,
} from "@mikro-orm/core";
import { Character } from "./Character.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  createdAt?: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @OneToMany({ mappedBy: "user", eager: true, orphanRemoval: true })
  characters = new Collection<Character>(this);
}
