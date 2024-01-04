import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { IMessage } from '../_common/interface/message.interface';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  /* 상품 등록 */
  async create(data: CreateProductDto): Promise<IMessage> {
    await this.existName(data.name);
    await this.productRepository.create(data);
    return { message: '상품등록이 완료되었습니다.' };
  }

  /* 이름 중복검증 */
  async existName(name: string): Promise<void> {
    const product = await this.productRepository.findByName(name);
    if (product) throw new ConflictException('이미 등록된 상품의 이름입니다.');
  }
}
