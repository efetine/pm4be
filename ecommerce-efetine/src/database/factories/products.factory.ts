import { setSeederFactory } from 'typeorm-extension';
import { Product } from '../../entities/product.entity';

export default setSeederFactory(Product, (faker) => {
  const product = new Product();
  product.name = faker.commerce.productName();
  product.description = faker.commerce.productDescription();
  product.price = parseFloat(faker.commerce.price());
  product.stock = faker.number.int();
  product.imgUrl = faker.image.url();
  return product;
});
