import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.quard';
import { APP_GUARD } from '@nestjs/core';
import { RabbitModule } from 'src/rabbit/rabbit.module';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }],
  imports: [
    RabbitModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    })
  ],
  exports: [
    JwtModule
  ]
})
export class AuthModule {}
