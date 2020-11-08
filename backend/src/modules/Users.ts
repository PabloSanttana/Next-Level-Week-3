import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";

import Orphanages from "./Orphanages";

@Entity("users")
export default class Users {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @OneToMany(() => Orphanages, (orphanages) => orphanages.user_id, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "user_id" })
  orphanages: Orphanages[];
}
