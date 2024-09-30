import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as UUID } from 'uuid';

import { OrderDetail } from '../../order-details/entities/order-details.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string = UUID();

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  @ApiProperty()
  details: OrderDetail[];

  @ManyToOne(() => User)
  @ApiProperty()
  @JoinColumn()
  @ApiProperty()
  user: User;
}
