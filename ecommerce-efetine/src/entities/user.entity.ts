import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as UUID } from 'uuid';

import { Order } from './order.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string = UUID();

  @Column({ type: 'varchar', length: 50, nullable: false })
  @ApiProperty()
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @ApiProperty()
  email: string;

  @Column({ nullable: false })
  @ApiProperty()
  password: string;

  @Column({ nullable: false })
  @ApiProperty()
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @ApiProperty()
  country: string;

  @Column({ type: 'text', nullable: false })
  @ApiProperty()
  address: string;

  @Column({ length: 50, nullable: false })
  @ApiProperty()
  city: string;

  @Column({ default: false })
  @ApiProperty()
  admin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  @ApiProperty({
    type: () => [Order],
  })
  orders: Order[];
}
