import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as UUID } from 'uuid';

import { IUser } from '../users/interfaces/user.interface';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string = UUID();

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 80, nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ length: 50, nullable: false })
  country: string;

  @Column({ nullable: false })
  address: string;

  @Column({ length: 50, nullable: false })
  city: string;

  @Column({ default: false })
  admin: boolean;
}
