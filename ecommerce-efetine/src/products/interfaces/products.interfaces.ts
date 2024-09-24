import { Category } from '../../entities/category.entity';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  category: Category;
}
