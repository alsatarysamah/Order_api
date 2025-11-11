import { Product } from 'src/entities/product.entity';
import { Variant } from 'src/entities/variant.entity';

export function mapProducts(products: Product[]) {
  return products.map((product) => {
    const sizes = Array.from(
      new Set(product.variants.map((v: Variant) => v.size).filter(Boolean)),
    );
    const colors = Array.from(
      new Set(product.variants.map((v: Variant) => v.color).filter(Boolean)),
    );

    return {
      id: product?.id,
      name: product?.name,
      imageURL: product?.imageURL,
      sizes,
      colors,
      prices:product?.price,
    };
  });
}
