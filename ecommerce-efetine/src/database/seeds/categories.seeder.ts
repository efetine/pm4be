import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Category } from '../../categories/entities/category.entity';

export default class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const categoryFactory = factoryManager.get(Category);
    await categoryFactory.saveMany(3);
  }
}
