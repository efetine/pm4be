import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { v4 as UUID } from 'uuid';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = UUID();

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 80, nullable: false, unique: true })
  email: string;

  @Column({ length: 20, nullable: false })
  password: string;

  @Column({ type: 'integer', nullable: false })
  phone: number;

  @Column({ length: 50, nullable: false })
  country: string;

  @Column({ nullable: false })
  address: string;

  @Column({ length: 50, nullable: false })
  city: string;
}
