import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as UUID } from 'uuid';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = UUID();
}
