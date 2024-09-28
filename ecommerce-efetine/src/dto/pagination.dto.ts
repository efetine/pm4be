import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

export class PaginationsDTO {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsInt()
  @ApiProperty({
    minimum: 0,
    required: false,
    default: 0,
  })
  page?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Max(20)
  @ApiProperty({
    minimum: 1,
    maximum: 20,
    required: false,
    default: 5,
  })
  limit?: number;
}
