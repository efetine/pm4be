import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as UUID } from 'uuid';

import { IUser } from '../users/interfaces/user.interface';
import { Order } from './order.entity';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string = UUID();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  country: string;

  @Column({ type: 'text', nullable: false })
  address: string;

  @Column({ length: 50, nullable: false })
  city: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
