import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderRepoDto } from './dto/create-order-repo.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private dataSource: DataSource,
  ) {}
  async create(inputOrder: CreateOrderRepoDto) {
    let hasError = false;

    // el queryRunner se utiliza para ejecutar consultas y transacciones. control remoto que controlas
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Creamos la orden
      const orderEntity = this.ordersRepository.create(inputOrder);
      const order = await queryRunner.manager.save(orderEntity);

      // Asignamos la orden a cada detalle de orden // devuelve algo nuevo.. no es destructivo
      // Este método crea una nueva lista de detalles a partir de la lista original, aplicando una función a cada elemento.
      const details = inputOrder.details.map((detail) => {
        detail.order = order;

        return detail;
      });

      // Guardamos el detalle de orden
      await queryRunner.manager.save(details);

      // Ejecutamos la transaccion
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log({ err });
      hasError = true;
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      // por mas que salga un try o un catch siempre se va ejecutar // Este método libera la conexión con la base de datos.
      await queryRunner.release();
    }

    if (hasError === true) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: Order['id']) {
    const order = this.ordersRepository.findOneBy({
      id,
    });

    if (order === null) throw new NotFoundException();

    return order;
  }
}
