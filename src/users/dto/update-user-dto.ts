import { CreateUserDto } from './create-user.dto';

import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
// In CreateUserDto in which all fields are required
// But UpdateUserDto doesn't require all the fields

// PartialType is used to make all the fields optional
// Declared fields are required by default
// Check CreateUserDto
