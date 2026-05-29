import {
  IsIn,
  IsString,
} from 'class-validator';

export class ProductDto {

  @IsString()
  @IsIn(['VISA'])
  type!: string;

  @IsString()
  @IsIn(['PEN', 'USD'])
  currency!: string;
}