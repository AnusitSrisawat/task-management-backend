import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional';

async function bootstrap() {
  // patchTypeORMRepositoryWithBaseRepository(); // Optional: for TypeORM transactional decorators
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('The API documentation for your awesome app')
    .setVersion('1.0')
    .addBearerAuth() // Optional: for JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 👉 Swagger available at /api


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
