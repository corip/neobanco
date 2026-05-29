import {
  IsBoolean,
  ValidateNested,
} from 'class-validator';

import { Type }
from 'class-transformer';

import { CustomerDto }
from './customer.dto';

import { ProductDto }
from './product.dto';

export class IssueCardDto {

  @ValidateNested()
  @Type(() => CustomerDto)
  customer!: CustomerDto;

  @ValidateNested()
  @Type(() => ProductDto)
  product!: ProductDto;

  @IsBoolean()
  forceError!: boolean;
}