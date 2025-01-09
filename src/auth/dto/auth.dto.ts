import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Role } from '../roles/role.enum';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Role, { message: 'Role must be either Admin or User' }) // Single enum value
  readonly role: Role;
}
