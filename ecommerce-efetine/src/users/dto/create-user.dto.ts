import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @MaxLength(80)
  @ApiProperty({
    example: 'Dennis Leuschke',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(3, 50)
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    example: 'DennisLeuschke.Marquardt30@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password too weak. It must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  @ApiProperty({
    example: 'ZVguKb123$%',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    example: '68805 Gerlach Centers',
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1-880-969-7587 x278',
  })
  phone: string;

  @IsString()
  @Length(3, 50)
  @MaxLength(50)
  @ApiProperty({
    example: 'Guernsey',
  })
  country: string;

  @IsString()
  @Length(5, 20)
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty({
    example: 'Kuphalboro',
  })
  city: string;
}
