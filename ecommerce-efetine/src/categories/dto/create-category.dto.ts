import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    minimum: 3,
    maximum: 50,
  })
  name: string;
}
