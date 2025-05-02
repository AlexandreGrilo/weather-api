import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WeatherService } from './weather.service';

@Module({
  providers: [PrismaService, WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
