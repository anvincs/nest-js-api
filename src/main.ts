import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptoionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost); // get the http adapter from the app
  app.useGlobalFilters(new AllExceptoionsFilter(httpAdapter)); // use our custom exception filter (AllExceptoionsFilter) and pass the http adapter to it

  // for custom logger
  // import { MyLoggerService } from './my-logger/my-logger.service';
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
