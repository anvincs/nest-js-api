import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // for custom logger
  // const app = await NestFactory.create(AppModule, {
  //   // logger: false,  disable the default logger
  //   bufferLogs: true,  buffer logs and print them to the console when the app is ready
  // });
  // app.useLogger(app.get(MyLoggerService));  use our custom logger (MyLoggerService)

  app.enableCors(); // enable cors
  app.setGlobalPrefix('api'); // adds /api to all routes
  await app.listen(3000);
}
bootstrap();
