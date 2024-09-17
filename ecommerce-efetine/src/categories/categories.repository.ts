// import { InjectRepository } from '@nestjs/typeorm';
// import { injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';

// @injectable()
// export class CategoriesRepository {
//   constructor(
//     @InjectRepository(Categories)
//     private categoriesRepository: Repository<categories>,
//   ) {}
//   async findAll() {
//     return await this.categoriesRepository.find();
//   }

//   async create() {
//     data?.map(async (element) => {
//       await this.categoriesReposiyory

//         .createQueryBuilder()
//         .insert()
//         .into(Categories)
//         .values({ name: element.category })
//         .orIgnore()
//         .execute();
//     });
//     return 'Create Category';
//   }
// }
