import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSalesDto, UpdateSalesDto } from './sales.dto';
import { IMessage } from '../_common/interface/message.interface';
import { ParamIdDto } from '../_common/dtos/request.dto';
import { Sales } from '@prisma/client';

@Controller('sales')
@ApiTags('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  /* 판매자 생성 */
  @Post()
  async create(@Body() data: CreateSalesDto): Promise<IMessage> {
    return await this.salesService.create(data);
  }

  /* 판매자 수정 */
  @Put(':id')
  async update(@Param() params: ParamIdDto, @Body() update: UpdateSalesDto): Promise<IMessage> {
    return await this.salesService.update(params.id, update);
  }

  /* 판매자 삭제 */
  @Delete(':id')
  async delete(@Param() params: ParamIdDto): Promise<IMessage> {
    return await this.salesService.delete(params.id);
  }

  /* 판매자 조회 */
  @Get(':id')
  async findOneById(@Param() params: ParamIdDto): Promise<Sales> {
    return await this.salesService.findOneById(params.id);
  }

  /* 전체 조회 */
  @Get()
  async findMany(): Promise<Sales[]> {
    return await this.salesService.findMany();
  }
}
