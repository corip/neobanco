import {
  IsEmail,
  IsInt,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CustomerDto {

  @IsString()
  @Matches(/^[0-9]{8}$/)
  documentNumber!: string;

  @IsString()
  documentType!: string;

  @IsString()
  fullName!: string;

  @IsInt()
  @Min(18)
  age!: number;

  @IsEmail()
  email!: string;
}