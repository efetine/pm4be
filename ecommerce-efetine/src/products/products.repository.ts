import { BadRequestException, Injectable } from '@nestjs/common';
import { IProduct } from './interfaces/products.interfaces';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { v4 as UUID } from 'uuid';
import { PaginationsDTO } from '../dto/pagination.dto';

@Injectable()
export class productsRepository {
  private products = [
    {
      id: 'd317533f-4bb8-4e14-acda-84a450346087',
      name: 'UltraBook X',
      description:
        'A lightweight ultrabook with high-speed processing and premium materials.',
      price: 1399.99,
      stock: 0,
      imgUrl: 'https://example.com/images/ultrabook-x.jpg',
    },
    {
      id: 'e11120b3-394b-4846-aac5-ba542e35cdc6',
      name: 'Noise-Cancelling Earbuds',
      description:
        'Compact wireless earbuds with immersive sound and noise-cancelling technology.',
      price: 149.99,
      stock: 0,
      imgUrl: 'https://example.com/images/noise-cancelling-earbuds.jpg',
    },
    {
      id: '9ebfc3e3-fcb0-4dd4-a653-d87a57525a92',
      name: 'Smartphone Pro Max',
      description:
        'A high-end smartphone with triple cameras and 5G connectivity.',
      price: 999.99,
      stock: 0,
      imgUrl: 'https://example.com/images/smartphone-pro-max.jpg',
    },
    {
      id: 'c024623a-7257-49f2-bb28-ec0dffa83195',
      name: 'Ergonomic Gaming Chair',
      description:
        'A comfortable gaming chair with lumbar support and adjustable armrests.',
      price: 249.99,
      stock: 0,
      imgUrl: 'https://example.com/images/gaming-chair.jpg',
    },
    {
      id: 'c4b9ae71-21c5-4794-9726-8f7990691821',
      name: 'Curved 4K Monitor',
      description:
        'A 34-inch curved 4K monitor with vibrant colors and ultra-thin bezels.',
      price: 599.99,
      stock: 0,
      imgUrl: 'https://example.com/images/curved-4k-monitor.jpg',
    },
    {
      id: '7fac3aae-24fa-42f7-8451-14071686b8ca',
      name: 'Wireless Mechanical Keyboard',
      description:
        'A wireless mechanical keyboard with RGB backlighting and silent switches.',
      price: 149.99,
      stock: 0,
      imgUrl: 'https://example.com/images/wireless-mechanical-keyboard.jpg',
    },
    {
      id: '7',
      name: 'Fitness Tracker Pro',
      description:
        'A fitness tracker with heart rate monitoring and sleep analysis.',
      price: 199.99,
      stock: 0,
      imgUrl: 'https://example.com/images/fitness-tracker-pro.jpg',
    },
    {
      id: '8',
      name: 'Waterproof Bluetooth Speaker',
      description:
        'A durable waterproof speaker with powerful bass and Bluetooth 5.0.',
      price: 99.99,
      stock: 0,
      imgUrl: 'https://example.com/images/waterproof-bluetooth-speaker.jpg',
    },
    {
      id: '9',
      name: 'Next-Gen VR Goggles',
      description:
        'A VR headset with ultra-high resolution and seamless motion tracking.',
      price: 429.99,
      stock: 0,
      imgUrl: 'https://example.com/images/next-gen-vr-goggles.jpg',
    },
    {
      id: '10',
      name: 'Solar Power Bank',
      description:
        'A portable power bank with solar charging and dual USB outputs.',
      price: 59.99,
      stock: 0,
      imgUrl: 'https://example.com/images/solar-power-bank.jpg',
    },
  ];

  async findAll(pagination: PaginationsDTO): Promise<IProduct[]> {
    return this.products;
  }

  async create(body: CreateProductDto): Promise<IProduct> {
    const newProductId = UUID();
    const newProduct = { id: newProductId, ...body };
    this.products.push(newProduct);
    return newProduct;
  }

  async findOne(id: IProduct['id']): Promise<IProduct> {
    const product = this.products.find((product) => product.id === id);

    if (!product)
      throw new BadRequestException({
        statusCode: 404,
        message: 'bad request',
      });

    return product;
  }

  async delete(id: IProduct['id']): Promise<boolean> {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1)
      throw new BadRequestException({
        statusCode: 404,
        message: 'bad request',
      });
    this.products.splice(index, 1);
    return true;
  }

  async update(id: IProduct['id'], body: UpdateProductDto): Promise<IProduct> {
    const productIndex = this.products.findIndex(
      (products) => products.id === id,
    );
    if (productIndex === -1)
      throw new BadRequestException({
        statusCode: 404,
        message: 'bad request',
      });
    return (this.products[productIndex] = {
      ...this.products[productIndex],
      ...body,
    });
  }
}
