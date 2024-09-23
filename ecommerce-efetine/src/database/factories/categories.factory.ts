import { setSeederFactory } from 'typeorm-extension';
import { Category } from '../../entities/category.entity';

export default setSeederFactory(Category, (faker) => {
  const category = new Category();

  category.name = faker.commerce.department();

  return category;
});
