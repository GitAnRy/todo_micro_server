import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { PUBLIC_KEY } from "./public-auth.decorator";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          
          if (isPublic) {
            return true;
          }

        const req = context.switchToHttp().getRequest();

        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'});
        }
    }
    
}