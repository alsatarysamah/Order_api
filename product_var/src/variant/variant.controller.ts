import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { VariantsService } from './variant.service';
import { CreateVariantDto } from './DTO/variant.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@ApiTags('variants')
@Controller('variants')
export class VariantController {
  constructor(private readonly variantsService: VariantsService) {}


  @Get()
  @ApiOperation({ summary: 'Get all variants' })
  async getAll() {
    return this.variantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get variant by ID' })
  async getById(@Param('id') id: number) {
    return this.variantsService.findById(id);
  }


  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @Post()
  @ApiOperation({ summary: 'Create a new variant (Admin only)' })
  async create(@Body() dto: CreateVariantDto) {
    return this.variantsService.create(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @Put(':id')
  @ApiOperation({ summary: 'Update a variant (Admin only)' })
  async update(@Param('id') id: number, @Body() dto: CreateVariantDto) {
    return this.variantsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a variant (Admin only)' })
  async remove(@Param('id') id: number) {
    return this.variantsService.remove(id);
  }
}
