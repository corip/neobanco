import {
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  Length,
  Min,
  IsOptional,
  IsBoolean
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class IssueCardDto {

  @ApiProperty()
  @IsString()
  @Length(8, 8)
  documentNumber!: string;

  @ApiProperty({
    example: 'DNI',
  })
  @IsEnum(['DNI'])
  documentType!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsInt()
  @Min(18)
  age!: number;

  @ApiProperty({
    example: 'VISA',
  })
  @IsEnum(['VISA'])
  type!: string;

  @ApiProperty({
    example: 'PEN',
  })
  @IsEnum(['PEN', 'USD'])
  currency!: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
@IsBoolean()
  forceFail?: boolean;
}