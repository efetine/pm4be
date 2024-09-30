import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  public categoriesArray = ['smartphone', 'monitor', 'keyboard', 'mouse'];
  async findAll() {
    return this.categoriesRepository.find();
  }

  async findOne(id: Category['id']) {
    const category = this.categoriesRepository.findOneBy({
      id,
    });

    return category;
  }

  async create(input: CreateCategoryDto) {
    const categoryEntity = this.categoriesRepository.create(input);
    try {
      const category = await this.categoriesRepository.save(categoryEntity);
      return category;
    } catch {
      throw new Error('Cannot create category');
    }
  }

  async delete(id: Category['id']) {
    let result = null;
    try {
      result = await this.categoriesRepository.delete(id);
    } catch {
      throw new Error('Cannot delete category');
    }

    if (result.affected === 0) {
      throw new Error('Category not found');
    }

    return;
  }

  async update(id: Category['id'], input: CreateCategoryDto) {
    let result = null;
    try {
      result = await this.categoriesRepository.update(id, input);
    } catch {
      throw new InternalServerErrorException();
    }

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return;
  }

  // async create(): Promise<void> {
  //   data?.map(async (element) => {
  //     await this.CategoriesRepository.createQueryBuilder()
  //       .insert()
  //       .into(Categories)
  //       .values({ name: element.category })
  //       .orIgnore()
  //       .execute();
  //   });
  //   return 'Create Category';
  // }
}
