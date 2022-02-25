import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm"
import { ulid } from "ulid"
import { Customer } from ".."
import { DbAwareColumn, resolveDbType } from "../utils/db-aware-column"

@Entity()
export class CustomerGroup {
  @PrimaryColumn()
  id: string

  @Index({ unique: true, where: "deleted_at IS NULL" })
  @Column()
  name: string

<<<<<<< HEAD
<<<<<<< HEAD
  @ManyToMany(() => Customer, (customer) => customer.groups, {
    onDelete: "CASCADE",
  })
=======
  @ManyToMany(() => Customer, { cascade: true })
>>>>>>> b16976a6 (Feat: Create customer group (#1074))
=======
  @ManyToMany(() => Customer, (customer) => customer.groups, {
    onDelete: "CASCADE",
  })
>>>>>>> 0394be36 (Feat: bulk delete customers from customer group (#1097))
  @JoinTable({
    name: "customer_group_customers",
    joinColumn: {
      name: "customer_group_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "customer_id",
      referencedColumnName: "id",
    },
  })
  customers: Customer[]

  @CreateDateColumn({ type: resolveDbType("timestamptz") })
  created_at: Date

  @UpdateDateColumn({ type: resolveDbType("timestamptz") })
  updated_at: Date

  @DeleteDateColumn({ type: resolveDbType("timestamptz") })
  deleted_at: Date

  @DbAwareColumn({ type: "jsonb", nullable: true })
  metadata: any

  @BeforeInsert()
  private beforeInsert() {
    if (this.id) {
      return
    }
    const id = ulid()
    this.id = `cgrp_${id}`
  }
}
