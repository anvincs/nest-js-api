import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

// DTO: Data Transfer Object
// DTO => Input Validation Type
// DTOs are used to define the shape of data that will be sent over the network
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Valid role required',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
// All the fields are required by default
