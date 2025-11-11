import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Variant } from '../entities/variant.entity';
import { CreateVariantDto } from './DTO/variant.dto';

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
  ) {}

  async findAllByProductId(productId: number, offset: number, limit: number) {
    const [data, total] = await this.variantRepository.findAndCount({
      where: { product_id: productId },
      skip: offset,
      take: limit,
      order: { id: 'ASC' },
    });

    if (data.length === 0) {
      throw new NotFoundException(
        `No variants found for product with id ${productId}`,
      );
    }

    return data;
  }

  async findByIdAndProduct(productId: number, id: number): Promise<Variant> {
    const variant = await this.variantRepository.findOne({
      where: { id, product_id: productId },
    });

    if (!variant) {
      throw new NotFoundException(
        `Variant with id ${id} not found for product ${productId}`,
      );
    }
    return variant;
  }

  async create(productId: number, dto: CreateVariantDto): Promise<Variant> {
    const variant = this.variantRepository.create({
      ...dto,
      product_id: productId,
    });
    return this.variantRepository.save(variant);
  }

  // Update a variant for a specific product
  async update(
    productId: number,
    id: number,
    dto: Partial<CreateVariantDto>,
  ): Promise<Variant> {
    const variant = await this.findByIdAndProduct(productId, id);
    Object.assign(variant, dto);
    return this.variantRepository.save(variant);
  }

  async remove(productId: number, id: number): Promise<void> {
    const variant = await this.findByIdAndProduct(productId, id);
    await this.variantRepository.remove(variant);
  }
}
