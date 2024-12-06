import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class PlanType {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}
