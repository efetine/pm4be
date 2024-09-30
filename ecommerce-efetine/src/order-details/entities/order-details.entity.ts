import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as UUID } from 'uuid';

import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'orderDetails' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string = UUID();

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @ApiProperty()
  price: number;

  @Column({ type: 'int' })
  @ApiProperty()
  quantity: number;

  @ManyToOne(() => Order, {
    nullable: false,
  })
  @JoinColumn({ name: 'order_id' })
  @ApiProperty()
  order: Order;

  @ManyToOne(() => Product, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  @ApiProperty()
  product: Product;
}
