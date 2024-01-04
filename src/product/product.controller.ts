import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './product.dto';
import { IMessage } from '../_common/interface/message.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  /* 상품 생성 */
  @Post()
  async create(@Body() data: CreateProductDto): Promise<IMessage> {
    return await this.productService.create(data);
  }
}
