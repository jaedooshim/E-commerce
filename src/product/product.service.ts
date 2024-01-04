import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { IMessage } from '../_common/interface/message.interface';
import { ProductRepository } from './product.repository';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  /* 상품 등록 */
  async create(data: CreateProductDto): Promise<IMessage> {
    await this.existName(data.name);
    await this.productRepository.create(data);
    return { message: '상품등록이 완료되었습니다.' };
  }

  /* 상품 전체조회 */
  async findMany(): Promise<Product[]> {
    return await this.productRepository.findMany();
  }

  /* ID별 상품조회 */
  async findOneById(id: string): Promise<Product> {
    return await this.isValidById(id);
  }

  /* 이름 중복검증 */
  async existName(name: string): Promise<void> {
    const product = await this.productRepository.findByName(name);
    if (product) throw new ConflictException('이미 등록된 상품의 이름입니다.');
  }

  /* ID 유효검증 */
  async isValidById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('해당하는 상품이 존재하지 않습니다.');
    return product;
  }
}
