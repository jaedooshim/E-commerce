import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './product.dto';
import { IMessage } from '../_common/interface/message.interface';
import { ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { ParamIdDto } from '../_common/dtos/request.dto';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  /* 상품 생성 */
  @Post()
  async create(@Body() data: CreateProductDto): Promise<IMessage> {
    return await this.productService.create(data);
  }

  /* 상품 전체조회 */
  @Get()
  async findMany(): Promise<Product[]> {
    return await this.productService.findMany();
  }

  /* ID별 상품조회 */
  @Get(':id')
  async findOneById(@Param() params: ParamIdDto): Promise<Product> {
    return await this.productService.findOneById(params.id);
  }
}
