import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'Laptop' })
  name: string;

  @ApiPropertyOptional({
    description: 'Optional description of the product',
    example: 'A high-performance gaming laptop',
  })
  description?: string;


    @IsNumber({}, { message: 'price must be a number' })
    @Min(0, { message: 'price must be at least 0' })
    price: number;

  @ApiPropertyOptional({
    description: 'Image URL of the product',
    example: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
  })
  imageURL?: string;
}

export class UpdateProductDto {
  @ApiPropertyOptional({ description: 'Name of the product', example: 'Laptop' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Optional description of the product',
    example: 'A high-performance gaming laptop',
  })
  description?: string;

 @ApiPropertyOptional({
    description: 'Optional price of the product',
    example: 54,
  })
   @IsNumber({}, { message: 'price must be a number' })
    @Min(0, { message: 'price must be at least 0' })
    price: number;

  @ApiPropertyOptional({
    description: 'Image URL of the product',
    example: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
  })
  imageURL?: string;
}
