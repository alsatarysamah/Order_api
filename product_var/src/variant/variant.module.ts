import { Module } from '@nestjs/common';
import { VariantController } from './variant.controller';
import { VariantsService } from './variant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from 'src/entities/variant.entity';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Variant,Product])],
  controllers: [VariantController],
  providers: [VariantsService],
})
export class VariantModule {}
