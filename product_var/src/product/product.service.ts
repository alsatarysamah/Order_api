import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './DTO/product.dto';
import { mapProducts } from './product.mapper';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // GET all products
  async findAll(): Promise<any[]> {
    const products = await this.productRepository.find({
      relations: ['variants'],
    });
    return mapProducts(products);
  }

  // GET product by ID
  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id:Number(id) } ,relations:['variants']});
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
    const product = await this.findById(id); 
    Object.assign(product, dto);
    return await this.productRepository.save(product);
  }

  // DELETE product
  async remove(id: string): Promise<void> {
    const product = await this.findById(id); 
    await this.productRepository.delete(product.id);
  }
}
