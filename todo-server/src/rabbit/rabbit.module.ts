import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false
          },
        },

      },
    ]),
  ],
  providers: [RabbitService],
  exports: [RabbitService]
})
export class RabbitModule {}
