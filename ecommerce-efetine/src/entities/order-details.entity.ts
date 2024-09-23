import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as UUID } from 'uuid';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity({ name: 'orderDetails' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = UUID();

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
