import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
})
export class WeatherModule {}
