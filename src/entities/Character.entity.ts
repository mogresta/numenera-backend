import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { User } from "./User.entity";

@Entity()
export class Character {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: "text" })
  description = "";

  @Property()
  tier!: number;

  @ManyToOne()
  user!: User;
}
