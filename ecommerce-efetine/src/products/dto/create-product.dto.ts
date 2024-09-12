import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 255)
  @MinLength(10)
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message: 'Price must have up to 10 digits and 2 decimal places',
  })
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  @IsInt()
  @Min(0)
  stock: boolean;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imgUrl: string;
}
