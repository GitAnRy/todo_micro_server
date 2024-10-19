import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from 'src/auth/public-auth.decorator';
import { RabbitService } from 'src/rabbit/rabbit.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(@Inject() private rabbitService: RabbitService
    ) {}

    @ApiOperation({summary: `Авторизация пользователя`})
    @ApiResponse({status: 200, type: String})
    @Public()
    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.rabbitService.login(dto);
    }

    @ApiOperation({summary: `Регистрация пользователя`})
    @ApiResponse({status: 200, type: String})
    @Public()
    @Post('/registration')
    registration(@Body() dto: CreateUserDto) {
        return this.rabbitService.registration(dto);
    }
}
