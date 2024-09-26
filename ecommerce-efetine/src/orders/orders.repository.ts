import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { CreateOrderRepoDto } from './dto/create-order-repo.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private dataSource: DataSource,
  ) {}
  async create(
    inputOrder: CreateOrderRepoDto,
  ): Promise<{ order: Order; total: number }> {
    let error = null;
    let total = 0;
    let order: Order | null = null;

    // el queryRunner se utiliza para ejecutar consultas y transacciones. control remoto que controlas
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productsIds = inputOrder.details.map((detail) => {
        return {
          id: detail.product.id,
        };
      });

      // Buscamos el stock de los productos
      const products = await queryRunner.manager.find(Product, {
        where: productsIds,
        select: {
          id: true,
          stock: true,
        },
      });

      inputOrder.details.forEach((detail) => {
        const product = products.find(
          (product) => product.id === detail.product.id,
        );

        if (product === undefined) {
          throw new NotFoundException();
        }

        // Validamos que cada producto tenga suficiente stock
        if (product.stock < detail.quantity) {
          throw new InternalServerErrorException(
            `Product with id ${product.id} doesn't have enought stock`,
          );
        }

        // Descontamos la cantidad de cada detalle en cada producto
        queryRunner.manager.update(Product, product.id, {
          stock: product.stock - detail.quantity,
        });
      });

      // Creamos la orden
      const orderEntity = this.ordersRepository.create(inputOrder);
      order = await queryRunner.manager.save(orderEntity);

      // Asignamos la orden a cada detalle de orden // devuelve algo nuevo.. no es destructivo
      // Este método crea una nueva lista de detalles a partir de la lista original, aplicando una función a cada elemento.
      const details = inputOrder.details.map((detail) => {
        if (order !== null) {
          detail.order = order;
        }

        return detail;
      });

      // Guardamos el detalle de orden
      await queryRunner.manager.save(details);

      // Ejecutamos la transaccion
      await queryRunner.commitTransaction();

      total = this.getTotal(order);
    } catch (err) {
      error = err;
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      // por mas que salga un try o un catch siempre se va ejecutar // Este método libera la conexión con la base de datos.
      await queryRunner.release();
    }

    if (error !== null) {
      throw error;
    }

    if (order === null) {
      throw new InternalServerErrorException();
    }

    return { order, total };
  }

  async findOne(id: Order['id']) {
    const order = await this.ordersRepository.findOne({
      where: {
        id,
      },
      relations: {
        details: {
          product: true,
        },
        user: true,
      },
      select: {
        user: {
          name: true,
        },
      },
    });

    if (order === null) throw new NotFoundException();

    const total = this.getTotal(order);

    return {
      order,
      total,
    };
  }

  private getTotal(order: Order) {
    const total = order.details.reduce((acc, detail) => {
      return acc + detail.quantity * detail.price;
    }, 0);

    return total;
  }
}
