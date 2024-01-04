import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: '상품의 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty({ message: '상품의 가격을 입력해주세요.' })
  @IsNumber()
  price: number;

  @IsNotEmpty({ message: '상품을 설명해주세요.' })
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  desc: string;

  salesId: string;
}
