import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdenDetailsService } from './orden-details.service';
import { CreateOrdenDetailDto } from './dto/create-orden-detail.dto';
import { UpdateOrdenDetailDto } from './dto/update-orden-detail.dto';

@Controller('orden-details')
export class OrdenDetailsController {
  constructor(private readonly ordenDetailsService: OrdenDetailsService) {}

  @Post()
  create(@Body() createOrdenDetailDto: CreateOrdenDetailDto) {
    return this.ordenDetailsService.create(createOrdenDetailDto);
  }

  @Get()
  findAll() {
    return this.ordenDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdenDetailDto: UpdateOrdenDetailDto) {
    return this.ordenDetailsService.update(+id, updateOrdenDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenDetailsService.remove(+id);
  }
}
