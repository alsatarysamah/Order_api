import { Module } from '@nestjs/common';
import { ProudctController } from './proudct.controller';
import { ProudctService } from './proudct.service';

@Module({
  controllers: [ProudctController],
  providers: [ProudctService]
})
export class ProudctModule {}
