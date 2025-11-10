
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVariantDto {
  @ApiProperty({
    description: 'ID of the product this variant belongs to',
    example: 1,
  })
  @IsNumber({}, { message: 'product_id must be a number' })
  product_id: number;

  @ApiProperty({
    description: 'Size of the variant',
    example: 'M',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'size must be a string' })
  size?: string;

  @ApiProperty({
    description: 'Color of the variant',
    example: 'Red',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'color must be a string' })
  color?: string;

  @ApiProperty({
    description: 'Price of the variant',
    example: 29.99,
  })
  @IsNumber({}, { message: 'price must be a number' })
  @Min(0, { message: 'price must be at least 0' })
  price: number;

  @ApiProperty({
    description: 'Stock quantity of the variant',
    example: 100,
  })
  @IsNumber({}, { message: 'stock must be a number' })
  @Min(0, { message: 'stock must be at least 0' })
  stock: number;
}
