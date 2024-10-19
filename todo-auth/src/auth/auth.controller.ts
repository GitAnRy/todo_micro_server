import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {

    constructor(private authService: AuthService) {}

    @MessagePattern({ cmd: 'login-order' })
    login(@Payload() dto: CreateUserDto) {
        return this.authService.login(dto);
    }

    @MessagePattern({ cmd: 'registration-order' })
    registration(@Payload() dto: CreateUserDto) {
        return this.authService.registration(dto);
    }
}
