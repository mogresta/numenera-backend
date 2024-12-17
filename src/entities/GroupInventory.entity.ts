import { Entity, ManyToOne, PrimaryKey } from "@mikro-orm/core";
import { Character } from "./Character.entity";
import { Cypher } from "./Cypher.entity";
import { Automaton } from "./Automaton.entity";
import { Artefact } from "./Artefact.entity";
import { Installation } from "./Installation.entity";
import { Oddity } from "./Oddity.entity";
import { Plan } from "./Plan.entity";
import { Vehicle } from "./Vehicle.entity";

@Entity()
export class GroupInventory {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  character!: Character;

  @ManyToOne({ nullable: true })
  cypher!: Cypher;

  @ManyToOne({ nullable: true })
  automaton!: Automaton;

  @ManyToOne({ nullable: true })
  artefact!: Artefact;

  @ManyToOne({ nullable: true })
  installation!: Installation;

  @ManyToOne({ nullable: true })
  oddity!: Oddity;

  @ManyToOne({ nullable: true })
  plan!: Plan;

  @ManyToOne({ nullable: true })
  vehicle!: Vehicle;
}
