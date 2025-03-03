import { Test, TestingModule } from '@nestjs/testing';
import { MeddicalAppointemtsController } from './meddical_appointemts.controller';
import { MeddicalAppointemtsService } from './meddical_appointemts.service';

describe('MeddicalAppointemtsController', () => {
  let controller: MeddicalAppointemtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeddicalAppointemtsController],
      providers: [MeddicalAppointemtsService],
    }).compile();

    controller = module.get<MeddicalAppointemtsController>(MeddicalAppointemtsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
