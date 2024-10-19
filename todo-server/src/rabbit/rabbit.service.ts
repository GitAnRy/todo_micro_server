import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class RabbitService {

    constructor (@Inject('AUTH_SERVICE') private rabbitClient: ClientProxy) {}

    async login(dto: CreateUserDto) {
        return this.rabbitClient.send({ cmd: 'login-order' }, dto);
    }

    async registration(dto: CreateUserDto) {
        return this.rabbitClient.send({cmd: 'registration-order'}, dto);
    }
}
