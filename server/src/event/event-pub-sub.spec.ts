import { Test, TestingModule } from '@nestjs/testing';
import { EventPubSub } from './event-pub-sub';

describe('EventPubSub', () => {
  let provider: EventPubSub;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventPubSub],
    }).compile();

    provider = module.get<EventPubSub>(EventPubSub);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
