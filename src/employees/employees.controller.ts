import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

// skips rate limiting for this route by applying the @SkipThrottle() decorator on the top of the route controller (@Controller('employees'))
@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name); // instantiate our custom logger (MyLoggerService) and pass the name of the class (EmployeesController.name) to it for context

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false }) // apply rate limiting for this route (@Get()) only both short(per second) and long(per minute)
  @Get()
  findAll(
    @Ip() ip: string, // get the ip address of the client
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN', // get the role query parameter. optional
  ) {
    this.logger.log(`Request for ALL EMPLOYEES\t${ip}`);
    // logs to a file only when the request is made to this route
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } }) // applies rate limiting (short) to this route (@Get(':id')) only. We override the default ttl and limit of short rule for this route.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
