import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings.js';

@Entity({ name: 'ordersDetails' })
export class OrdersDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = UUID();

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;
}
