import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or  /users?role=INTERN (query parameters) they are optional
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe is a pipe to convert string to number
    // it will throw an error if the id(passed as string in url) is not a numeric
    return this.usersService.findOne(id);

    // without ParseIntPipe
    // return this.usersService.findOne(+id);
    // unary + operator to convert string to number
  }

  @Post() // POST /users
  create(
    @Body(ValidationPipe) // ValidationPipe will validate the input against the DTO
    user: CreateUserDto,
    // user: {
    //   name: string;
    //   email: string;
    //   role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    // },
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdate: UpdateUserDto,
    // userUpdate: {
    //   name?: string;
    //   email?: string;
    //   role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    // },
  ) {
    return this.usersService.update(id, userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
