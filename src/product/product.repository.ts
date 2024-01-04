import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}
  private productRepository = this.prisma.product;

  /* 상품 등록 */
  async create(data: CreateProductDto): Promise<Product> {
    return this.productRepository.create({ data });
  }

  /* 이름 찾기 */
  async findByName(name: string): Promise<Product | null> {
    return this.productRepository.findFirst({ where: { name, deletedAt: null } });
  }

  /* ID 찾기 */
  async findById(id: string): Promise<Product | null> {
    return this.productRepository.findFirst({ where: { id, deletedAt: null } });
  }
}
