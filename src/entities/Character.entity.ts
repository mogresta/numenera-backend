import {
  BaseEntity,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { User } from "./User.entity";

@Entity()
export class Character extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: "text" })
  description = "";

  @Property()
  tier!: number;

  @ManyToOne(() => User, { ref: true })
  user!: User;

  @Property({ default: false, nullable: true })
  deleted?: boolean;
}
