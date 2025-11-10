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

  // Get all variants
  async findAll(): Promise<Variant[]> {
    return this.variantRepository.find({
      relations: ['product'],
    });
  }

  // Get variant by ID
  async findById(id: number): Promise<Variant> {
    const variant = await this.variantRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!variant) {
      throw new NotFoundException(`Variant with id ${id} not found`);
    }
    return variant;
  }

  // Create a new variant
  async create(dto: CreateVariantDto): Promise<Variant> {
    const variant = this.variantRepository.create(dto);
    return this.variantRepository.save(variant);
  }

  // Update a variant
  async update(id: number, dto: Partial<CreateVariantDto>): Promise<Variant> {
    const variant = await this.findById(id); 
    Object.assign(variant, dto);
    return this.variantRepository.save(variant);
  }

  // Delete a variant
  async remove(id: number): Promise<void> {
    const variant = await this.findById(id);
    await this.variantRepository.remove(variant);
  }
}
