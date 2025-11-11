import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { VariantsService } from './variant.service';
import { CreateVariantDto } from './DTO/variant.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Variant } from 'src/entities/variant.entity';
import { ProductExistsGuard } from 'guards/product-exists.guard';

@ApiTags('variants')
@UseGuards(ProductExistsGuard)
@Controller(':productId/variants')
export class VariantController {
  constructor(private readonly variantsService: VariantsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all variants for a product with pagination' })
  @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async getAll(
    @Param('productId') productId: number,
    @Query('offset') offset = 0,
    @Query('limit') limit = 10,
  ): Promise<Variant[]> {
    const offsetNum = Number(offset);
    const limitNum = Number(limit) || 10;

    return this.variantsService.findAllByProductId(
      productId,
      offsetNum,
      limitNum,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get variant by ID for a specific product' })
  async getById(
    @Param('productId') productId: number,
    @Param('id') id: number,
  ) {
    return this.variantsService.findByIdAndProduct(productId, id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @Post()
  @ApiOperation({ summary: 'Create a new variant for a product (Admin only)' })
  async create(
    @Param('productId') productId: number,
    @Body() dto: CreateVariantDto,
  ) {
    return this.variantsService.create(productId, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @Put(':id')
  @ApiOperation({ summary: 'Update a variant for a product (Admin only)' })
  async update(
    @Param('productId') productId: number,
    @Param('id') id: number,
    @Body() dto: CreateVariantDto,
  ) {
    return this.variantsService.update(productId, id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a variant for a product (Admin only)' })
  async remove(
    @Param('productId') productId: number,
    @Param('id') id: number,
  ) {
    return this.variantsService.remove(productId, id);
  }
}
