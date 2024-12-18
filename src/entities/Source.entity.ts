import {
  BaseEntity,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Cypher } from "./Cypher.entity";
import { Artefact } from "./Artefact.entity";
import { Automaton } from "./Automaton.entity";
import { Installation } from "./Installation.entity";
import { Oddity } from "./Oddity.entity";
import { Plan } from "./Plan.entity";
import { Vehicle } from "./Vehicle.entity";

@Entity()
export class Source extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToMany({ mappedBy: "source", eager: true, orphanRemoval: true })
  cyphers = new Collection<Cypher>(this);

  @OneToMany({ mappedBy: "source", eager: true, orphanRemoval: true })
  artefacts = new Collection<Artefact>(this);

  @OneToMany({ mappedBy: "source", eager: true, orphanRemoval: true })
  automatons = new Collection<Automaton>(this);

  @OneToMany({ mappedBy: "source", eager: true, orphanRemoval: true })
  installations = new Collection<Installation>(this);

  @OneToMany({ mappedBy: "source", eager: true, orphanRemoval: true })
  plans = new Collection<Plan>(this);

  @OneToMany({ mappedBy: "source", eager: true, orphanRemoval: true })
  vehicles = new Collection<Vehicle>(this);
}
