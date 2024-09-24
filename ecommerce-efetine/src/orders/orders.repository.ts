import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Creamos la orden
      const orderEntity = this.ordersRepository.create(inputOrder);
      const order = await queryRunner.manager.save(orderEntity);

      // Asignamos la orden a cada detalle de orden
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
      await queryRunner.release();
    }

    if (hasError === true) {
      throw new InternalServerErrorException();
    }
  }
}
