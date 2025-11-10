import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './DTO/product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Public routes
  @Get()
  async getAll() {
    return this.productsService.findAll();
  }

  // Public routes
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  // Protected routes (Admin only)
  @UseGuards(JwtAuthGuard,AdminGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  // Protected routes (Admin only)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  // Protected routes (Admin only)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
