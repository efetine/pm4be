import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as UUID } from 'uuid';

import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string = UUID();

  @Column({ length: 50, nullable: false, unique: true })
  @ApiProperty()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  @ApiProperty({
    type: () => [Product],
  })
  products: Product[];
}
