import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { Category } from '../../entities/category.entity';
import { Product } from '../../entities/product.entity';

export default class ProductsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const categories = dataSource.getRepository(Category);

    const category = await categories.find({
      take: 1,
    });

    const productsFactory = factoryManager.get(Product);

    await productsFactory.saveMany(30, {
      category: category[0],
    });
  }
}
