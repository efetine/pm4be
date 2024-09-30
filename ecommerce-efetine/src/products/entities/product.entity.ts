import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as UUID } from 'uuid';

import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string = UUID();

  @Column({ length: 50, nullable: false })
  @ApiProperty()
  name: string;

  @Column({ type: 'text', nullable: false })
  @ApiProperty()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @ApiProperty()
  price: number;

  @Column({ type: 'int', nullable: false })
  @ApiProperty()
  stock: number;

  @Column({
    type: 'varchar',
    nullable: true,
    default:
      'https://img.freepik.com/vector-gratis/fondo-estudio-blanco-plataforma-visualizacion-podio_1017-37977.jpg',
  })
  @IsUrl()
  @ApiProperty()
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  @ApiProperty()
  category: Category;

  // @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.product)
  // ordersDetail: OrderDetail;

  // @OneToMany(() => file, (file) => file.product)
  // @JoinTable()
  // files: fileEntity[];
}
