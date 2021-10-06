import { Test, TestingModule } from '@nestjs/testing';
import { PinService } from './pin.service';

describe('PinService', () => {
  let service: PinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinService],
    }).compile();

    service = module.get<PinService>(PinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
