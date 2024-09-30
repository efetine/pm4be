import { hashSync } from 'bcrypt';
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../users/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email({ firstName: user.name });
  user.address = faker.location.streetAddress();
  user.city = faker.location.city();
  user.country = faker.location.country();
  user.phone = faker.phone.number();

  const password = faker.internet.password();
  const hashedPassword = hashSync(password, 15);
  user.password = hashedPassword;

  return user;
});
