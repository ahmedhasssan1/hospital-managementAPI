import { Test, TestingModule } from '@nestjs/testing';
import { MeddicalAppointemtsService } from './meddical_appointemts.service';

describe('MeddicalAppointemtsService', () => {
  let service: MeddicalAppointemtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeddicalAppointemtsService],
    }).compile();

    service = module.get<MeddicalAppointemtsService>(MeddicalAppointemtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
