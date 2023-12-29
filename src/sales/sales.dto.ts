import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSalesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  desc: string;
}

export class UpdateSalesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  desc: string;
}
