import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
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
  @ApiProperty({
    minimum: 3,
    maximum: 50,
    example: 'Mouse',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 255)
  @MinLength(10)
  @MaxLength(255)
  @ApiProperty({
    minimum: 10,
    maximum: 255,
    example: 'Gamer Mouse',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  // @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
  //   message: 'Price must have up to 10 digits and 2 decimal places',
  // })
  @Min(0)
  @ApiProperty({
    minimum: 0,
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  @ApiProperty({
    minimum: 0,
  })
  stock: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({
    example: 'https://picsum.photos/seed/JrrxJLN4/640/480',
  })
  imgUrl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '6431e1fb-2a73-47b8-9db8-7bd7edade8d5',
  })
  categoryId: string;
}
