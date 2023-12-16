import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // enable cors
  app.setGlobalPrefix('api'); // adds /api to all routes
  await app.listen(3000);
}
bootstrap();
