import { Test, TestingModule } from '@nestjs/testing';
import { ProudctService } from './proudct.service';

describe('ProudctService', () => {
  let service: ProudctService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProudctService],
    }).compile();

    service = module.get<ProudctService>(ProudctService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
