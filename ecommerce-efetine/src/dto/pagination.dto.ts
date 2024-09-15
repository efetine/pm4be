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
  page?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Max(20)
  limit?: number;
}
