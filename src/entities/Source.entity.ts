import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Source {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}
