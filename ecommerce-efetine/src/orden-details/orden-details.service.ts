import { Injectable } from '@nestjs/common';
import { CreateOrdenDetailDto } from './dto/create-orden-detail.dto';
import { UpdateOrdenDetailDto } from './dto/update-orden-detail.dto';

@Injectable()
export class OrdenDetailsService {
  create(createOrdenDetailDto: CreateOrdenDetailDto) {
    return 'This action adds a new ordenDetail';
  }

  findAll() {
    return `This action returns all ordenDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordenDetail`;
  }

  update(id: number, updateOrdenDetailDto: UpdateOrdenDetailDto) {
    return `This action updates a #${id} ordenDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordenDetail`;
  }
}
