import { IsUrl } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { v4 as UUID } from 'uuid';
import { Category } from './category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = UUID();

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({
    type: 'varchar',
    nullable: true,
    default:
      'https://img.freepik.com/vector-gratis/fondo-estudio-blanco-plataforma-visualizacion-podio_1017-37977.jpg',
  })
  @IsUrl()
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  // @ManyToMany(() => Order (OrdersDetail) => OrderDetail.product)
  // ordersDetail: OrdersDetail[];

  // @OneToMany(() => file, (file) => file.product)
  // @JoinTable()
  // files: fileEntity[];
}
