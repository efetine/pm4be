import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { v4 as UUID } from 'uuid';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = UUID();

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'integer', nullable: false })
  stock: number;

  @Column()
  imgUrl: string;

  // @BeforeInsert()
  // async beforeInsert() {
  //   if (!this.imgUrl) {
  //     this.imgUrl = 'aca va la ruta real de la imagen que deseo utilizar;
  //   }
  // }
}
