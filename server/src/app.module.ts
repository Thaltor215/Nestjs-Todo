import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WeatherModule } from './weather/weather.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entities/todo.entity';

@Module({
  imports: [
    TodoModule,
    WeatherModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'db',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'postgres',
      entities: [Todo],
      synchronize: true,
      logging: true,
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
