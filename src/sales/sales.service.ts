import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SalesRepository } from './sales.repository';
import { CreateSalesDto, UpdateSalesDto } from './sales.dto';
import { IMessage } from '../_common/interface/message.interface';
import { Sales } from '@prisma/client';

@Injectable()
export class SalesService {
  constructor(private salesRepository: SalesRepository) {}

  /* 판매자 등록 */
  async create(data: CreateSalesDto): Promise<IMessage> {
    await this.existName(data.name);
    await this.salesRepository.create(data);
    return { message: '판매자 등록이 완료되었습니다.' };
  }

  /* 판매자 정보수정 */
  async update(id: string, data: UpdateSalesDto): Promise<IMessage> {
    await this.findOneById(id);
    // await this.existName(data.name);

    await this.salesRepository.update(id, data);
    return { message: '판매자의 정보가 수정되었습니다.' };
  }

  /* 판매자 삭제 */
  async delete(id: string): Promise<IMessage> {
    await this.isValidById(id);
    await this.salesRepository.softDelete(id);
    return { message: '판매자 삭제가 완료되었습니다.' };
  }

  /* 판매자 조회 */
  async findOneById(id: string): Promise<Sales> {
    return await this.isValidById(id);
  }

  /* 전체 조회 */
  async findMany(): Promise<Sales[]> {
    return await this.salesRepository.findMany();
  }

  /* 판매자 이름 중복검증 */
  async existName(name: string): Promise<void> {
    const sales = await this.salesRepository.findByName(name);
    if (sales) throw new ConflictException('이미 등록된 판매자 이름입니다.');
  }

  /* 판매자 유효검증 */
  async isValidById(id: string): Promise<Sales> {
    const sales = await this.salesRepository.findById(id);
    if (!sales) throw new NotFoundException('해당하는 판매자는 존재하지 않습니다.');
    return sales;
  }
}
