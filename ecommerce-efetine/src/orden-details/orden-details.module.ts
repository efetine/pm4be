import { Module } from '@nestjs/common';
import { OrdenDetailsService } from './orden-details.service';
import { OrdenDetailsController } from './orden-details.controller';

@Module({
  controllers: [OrdenDetailsController],
  providers: [OrdenDetailsService],
})
export class OrdenDetailsModule {}
