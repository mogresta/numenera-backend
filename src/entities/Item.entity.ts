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

  @ManyToOne(() => Type, { ref: true })
  type!: Type;

  @ManyToOne(() => PlanType, { ref: true, nullable: true, default: null })
  planType?: PlanType;

  @ManyToOne(() => Source, { ref: true, nullable: true, default: null })
  source?: Source;
}
