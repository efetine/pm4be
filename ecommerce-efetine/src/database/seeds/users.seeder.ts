import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userFactory = factoryManager.get(User);

    await userFactory.save();

    await userFactory.saveMany(5);
  }
}
