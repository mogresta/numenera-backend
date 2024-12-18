import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Source } from "./Source.entity";
import { PlanType } from "./PlanType.entity";

@Entity()
export class Plan extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  minLevel!: number;

  @ManyToOne(() => PlanType, { ref: true })
  planType!: PlanType;

  @ManyToOne(() => Source, { ref: true })
  source!: Source;
}
