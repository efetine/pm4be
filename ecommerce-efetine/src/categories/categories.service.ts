import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}
  async create(createCategory: CreateCategoryDto) {
    return this.categoriesRepository.create(createCategory);
  }

  findAll() {
    return this.categoriesRepository.findAll();
  }

  findOne(id: Category['id']) {
    return this.categoriesRepository.findOne(id);
  }

  update(id: Category['id'], input: CreateCategoryDto) {
    return this.categoriesRepository.update(id, input);
  }

  delete(id: Category['id']) {
    return this.categoriesRepository.delete(id);
  }
}
