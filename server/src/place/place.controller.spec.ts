import { Test, TestingModule } from '@nestjs/testing';
import { PlaceController } from './place.controller';

describe('PlaceController', () => {
  let controller: PlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceController],
    }).compile();

    controller = module.get<PlaceController>(PlaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
