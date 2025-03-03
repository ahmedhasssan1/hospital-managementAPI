import { Controller } from '@nestjs/common';
import { MeddicalAppointemtsService } from './meddical_appointemts.service';

@Controller('meddical-appointemts')
export class MeddicalAppointemtsController {
  constructor(private readonly meddicalAppointemtsService: MeddicalAppointemtsService) {}
}
