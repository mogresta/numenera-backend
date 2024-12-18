import {
  BaseEntity,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Plan } from "./Plan.entity";

@Entity()
export class PlanType extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToMany({ mappedBy: "planType", eager: true, orphanRemoval: true })
  plans = new Collection<Plan>(this);
}
