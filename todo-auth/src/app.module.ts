import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/users.model';
import { Progect } from './typeorm/entities/progects.model';
import { ToDoList } from './typeorm/entities/todo-list.model';
import { Task } from './typeorm/entities/tasks.model';
import { AuthModule } from './auth/auth.module';

//задаем настройки конфигурации приложения 
@Module({
  imports: [
    //подключаем файл env
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
    //конфигурация базы данных
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Progect, ToDoList, Task],
      synchronize: true,
      autoLoadEntities: true,
    }),
    //подключаем модули приложения
    AuthModule,
    
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
