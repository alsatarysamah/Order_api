import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './DTO/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // GET all products
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // GET product by ID
  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // CREATE new product
  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(dto);
    return await this.productRepository.save(product);
  }

  // UPDATE existing product
  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findById(id); // throws if not found
    Object.assign(product, dto);
    return await this.productRepository.save(product);
  }

  // DELETE product
  async remove(id: string): Promise<void> {
    const product = await this.findById(id); // throws if not found
    await this.productRepository.delete(product.id);
  }
}
