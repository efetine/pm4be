import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { OrderDetail } from '../order-details/entities/order-details.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private dataSource: DataSource,
  ) {}
  async create(
    details: OrderDetail[],
    userId: User['id'],
  ): Promise<{ order: Order; total: number }> {
    let error = null;
    let total = 0;
    let newOrder: Order | null = null;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productsIds = details.map((detail) => {
        return {
          id: detail.product.id,
        };
      });

      const products = await queryRunner.manager.find(Product, {
        where: productsIds,
        select: {
          id: true,
          stock: true,
        },
      });

      details.forEach((detail) => {
        const product = products.find(
          (product) => product.id === detail.product.id,
        );

        if (product === undefined) {
          throw new NotFoundException();
        }

        if (product.stock < detail.quantity) {
          throw new InternalServerErrorException(
            `Product with id ${product.id} doesn't have enought stock`,
          );
        }

        queryRunner.manager.update(Product, product.id, {
          stock: product.stock - detail.quantity,
        });
      });

      const orderEntity = this.ordersRepository.create({
        details,
        user: {
          id: userId,
        },
      });
      const savedOrder = await queryRunner.manager.save(orderEntity);

      const mappedDetails = details.map((detail) => {
        if (savedOrder !== null) {
          detail.order = savedOrder;
        }

        return detail;
      });

      await queryRunner.manager.save(mappedDetails);

      await queryRunner.commitTransaction();

      total = this.getTotal(savedOrder);
      newOrder = savedOrder;
    } catch (err) {
      error = err;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (error !== null) {
      throw error;
    }

    if (newOrder === null) {
      throw new InternalServerErrorException();
    }

    return { order: newOrder, total };
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
