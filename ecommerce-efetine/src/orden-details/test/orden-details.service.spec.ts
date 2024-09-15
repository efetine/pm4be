import { Test, TestingModule } from '@nestjs/testing';
import { OrdenDetailsService } from './orden-details.service';

describe('OrdenDetailsService', () => {
  let service: OrdenDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenDetailsService],
    }).compile();

    service = module.get<OrdenDetailsService>(OrdenDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
