import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Source } from "./Source.entity";
import { PlanType } from "./PlanType.entity";

@Entity()
export class Plan {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  minLevel!: number;

  @ManyToOne()
  planType!: PlanType;

  @ManyToOne()
  source!: Source;
}
