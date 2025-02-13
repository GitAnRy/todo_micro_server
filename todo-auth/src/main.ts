import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

   //Инициализируем приложение
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@rabbitmq:5672'],
        queue: 'auth_queue',
          queueOptions: {
            durable: false
          },
      }
    });

    console.log(`Microservice auth start`)
  //Запускаем сервер
  await app.listen();
}
bootstrap();
