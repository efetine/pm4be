import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as UUID } from 'uuid';

@Entity({ name: 'ordersDetails' })
export class OrdersDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = UUID();

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;
}
