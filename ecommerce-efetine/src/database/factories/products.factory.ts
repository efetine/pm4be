import { setSeederFactory } from 'typeorm-extension';
import { Product } from '../../products/entities/product.entity';

export default setSeederFactory(Product, (faker) => {
  const product = new Product();
  product.name = faker.commerce.productName();
  product.description = faker.commerce.productDescription();
  product.price = parseFloat(faker.commerce.price());
  product.stock = faker.number.int({
    max: 100,
  });
  product.imgUrl = faker.image.url();
  product.category;

  return product;
});
