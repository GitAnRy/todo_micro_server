import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/typeorm/entities/users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor( @InjectRepository(User)
                private userRepository: Repository<User>,
                private jwtService: JwtService) {}

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }

    async registration(dto: CreateUserDto) {
        const candidate = await this.getUserByNickname(dto.nickname);

        if(candidate) {
            throw new HttpException("Пользователь с таким псевдонимом существует", HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.createUser({...dto, password: hashPassword});

        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {nickname: user.nickname, id: user.id};
        return {
            token: this.jwtService.sign(payload)
        };
    }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.getUserByNickname(dto.nickname);
        const passwordEquals = await bcrypt.compare(dto.password, user.password);

        if(user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: 'Некоректный email или пароль'});
    }

    async getUserByNickname(nick: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                nickname: nick,
            }, 
            relations: {
                progects: true,

            }
        });
        
        return user;
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = this.userRepository.save(dto);
        return user;
    }

}
