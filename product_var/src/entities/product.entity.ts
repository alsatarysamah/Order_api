import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Variant } from './variant.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true })
  imageURL: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[];
}
