import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([
      {
        name: 'short', // name of the rule
        ttl: 1000, // ttl = time to live 1000ms = 1 sec
        limit: 3, // limit each IP to 3 requests per ttl
        // 3 requests per second
      },
      {
        name: 'long',
        ttl: 60000, // ttl = time to live 60000ms = 1 min
        limit: 100, // limit each IP to 100 requests per ttl
        // 100 requests per minute
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
      // applies rate limiting to all routes
    },
  ],
})
export class AppModule {}
