import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as UUID } from 'uuid';

@Entity({ name: 'categories' })
export class Categorie {
  @PrimaryGeneratedColumn('uuid')
  id: string = UUID();

  @Column({ length: 50, nullable: false })
  name: string;
}
