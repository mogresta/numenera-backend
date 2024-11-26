import {
  BaseEntity,
  Entity,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Source } from "./Source.entity";
import { PlanType } from "./PlanType.entity";
import { Type } from "./Type.entity";
import { PlanTypes } from "../enums/PlanType.enum";
import { Types } from "../enums/Type.enum";
import { Sources } from "../enums/Source.enum";

@Entity()
export class Item extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: "text", lazy: true })
  description!: string;

  @Property({ nullable: true, default: null })
  level?: number;

  @Property({ type: "text", nullable: true, default: null })
  forms?: string;

  @Property({ nullable: true, default: null })
  depletion?: string;

  @Property({ type: "text", nullable: true, default: null })
  material?: string;

  @Property({ type: "text", nullable: true, default: null })
  modification?: string;

  @Property({ type: "text", nullable: true, default: null })
  reproduction?: string;

  @Enum(() => Types)
  @ManyToOne(() => Type, { ref: true })
  type!: Type;

  @Enum({ items: () => PlanTypes, nullable: true })
  @ManyToOne(() => PlanType, { ref: true, nullable: true, default: null })
  planType?: PlanType;

  @Enum({ items: () => Sources, nullable: true })
  @ManyToOne(() => Source, { ref: true, nullable: true, default: null })
  source?: Source;
}

export { PlanTypes } from "../enums/PlanType.enum";
export { Types } from "../enums/Type.enum";
export { Sources } from "../enums/Source.enum";
