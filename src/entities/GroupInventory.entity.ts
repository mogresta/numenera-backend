import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Character } from "./Character.entity";
import { Cypher } from "./Cypher.entity";
import { Automaton } from "./Automaton.entity";
import { Artefact } from "./Artefact.entity";
import { Installation } from "./Installation.entity";
import { Oddity } from "./Oddity.entity";
import { Plan } from "./Plan.entity";
import { Vehicle } from "./Vehicle.entity";

@Entity()
export class GroupInventory extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ nullable: true, default: null })
  character?: Character;

  @ManyToOne(() => Cypher, { ref: true, nullable: true, default: null })
  cypher?: Cypher;

  @ManyToOne(() => Automaton, { ref: true, nullable: true, default: null })
  automaton?: Automaton;

  @ManyToOne(() => Artefact, { ref: true, nullable: true, default: null })
  artefact?: Artefact;

  @ManyToOne(() => Installation, { ref: true, nullable: true, default: null })
  installation?: Installation;

  @ManyToOne(() => Oddity, { ref: true, nullable: true, default: null })
  oddity?: Oddity;

  @ManyToOne(() => Plan, { ref: true, nullable: true, default: null })
  plan?: Plan;

  @ManyToOne(() => Vehicle, { ref: true, nullable: true, default: null })
  vehicle?: Vehicle;

  @Property({ default: false, nullable: true })
  expended?: boolean;

  @Property({ default: false, nullable: true })
  loaned?: boolean;
}
