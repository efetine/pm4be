import { Test, TestingModule } from '@nestjs/testing';
import { OrdenDetailsController } from './orden-details.controller';
import { OrdenDetailsService } from './orden-details.service';

describe('OrdenDetailsController', () => {
  let controller: OrdenDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenDetailsController],
      providers: [OrdenDetailsService],
    }).compile();

    controller = module.get<OrdenDetailsController>(OrdenDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
