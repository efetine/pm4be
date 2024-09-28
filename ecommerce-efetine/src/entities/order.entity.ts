import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as UUID } from 'uuid';

import { OrderDetail } from './order-details.entity';
import { User } from './user.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string = UUID();

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  @ApiProperty({
    type: () => [OrderDetail],
  })
  details: OrderDetail[];

  @ManyToOne(() => User)
  @ApiProperty()
  @JoinColumn()
  @ApiProperty({
    type: () => User,
  })
  user: User;
}
