import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Variant {
  @PrimaryColumn()
  id: string;

  @Column()
  product_id: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  color: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
