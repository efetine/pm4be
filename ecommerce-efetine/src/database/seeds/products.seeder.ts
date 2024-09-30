import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';

export default class ProductsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const categories = dataSource.getRepository(Category);

    const category = await categories.find({
      take: 3,
    });

    const productsFactory = factoryManager.get(Product);

    for (let index = 0; index < 6; index++) {
      let numeroAleatorio = Math.floor(Math.random() * 3);

      await productsFactory.saveMany(5, {
        category: category[numeroAleatorio],
      });
    }
  }
}
