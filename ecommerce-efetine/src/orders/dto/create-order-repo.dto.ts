import { OrderDetail } from '../../entities/order-details.entity';
import { User } from '../../entities/user.entity';

export class CreateOrderRepoDto {
  details: OrderDetail[];
  user: {
    id: User['id'];
  };
}
