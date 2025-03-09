import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "Users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string; 

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text" })
  firstName!: string;

  @Column({ type: "text" })
  lastName!: string;

  @Column({ type: "text"})
  email!: string;

  @Column({ type: "text" })
  password!: string;

  @Column({ type: "text" })
  role!: string;
}
