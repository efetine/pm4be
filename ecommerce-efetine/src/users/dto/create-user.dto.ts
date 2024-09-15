import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @MaxLength(80)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(3, 50)
  @MinLength(3)
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password too weak. It must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  phone: number;

  @IsString()
  @Length(3, 50)
  @MaxLength(50)
  country: string;

  @IsString()
  @Length(5, 20)
  @MinLength(3)
  @MaxLength(20)
  city: string;
}
