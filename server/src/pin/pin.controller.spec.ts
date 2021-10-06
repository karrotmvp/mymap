import { Test, TestingModule } from '@nestjs/testing';
import { PinController } from './pin.controller';

describe('PinController', () => {
  let controller: PinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PinController],
    }).compile();

    controller = module.get<PinController>(PinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
