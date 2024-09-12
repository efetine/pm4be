import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  @MaxLength(50)
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
  @MaxLength(20)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password too weak. It must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  phone: string;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  @MaxLength(50)
  country: string | undefined;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  @MaxLength(50)
  city: string | undefined;
}
