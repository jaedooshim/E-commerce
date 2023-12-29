import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalesDto, UpdateSalesDto } from './sales.dto';
import { Sales } from '@prisma/client';

@Injectable()
export class SalesRepository {
  constructor(private prisma: PrismaService) {}
  private salesRepository = this.prisma.sales;

  /* 판매자 생성 */
  async create(data: CreateSalesDto): Promise<Sales> {
    return this.salesRepository.create({ data });
  }

  /* 판매자 설명 수정 */
  async update(id: string, data: UpdateSalesDto): Promise<Sales> {
    return this.salesRepository.update({ where: { id }, data });
  }

  /* 판매자 삭제 */
  async softDelete(id: string): Promise<Sales> {
    return this.salesRepository.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  /* 이름 찾기 */
  async findByName(name: string): Promise<Sales | null> {
    return this.salesRepository.findFirst({ where: { name, deletedAt: null } });
  }

  /* 전체 찾기 */
  async findMany(): Promise<Sales[]> {
    return this.salesRepository.findMany({ where: { deletedAt: null } });
  }

  /* ID 찾기 */
  async findById(id: string): Promise<Sales | null> {
    return this.salesRepository.findFirst({ where: { id, deletedAt: null } });
  }
}
