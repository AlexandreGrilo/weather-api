import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WeatherService } from './weather.service';
import { WeatherTasksService } from './tasks.service';

@Module({
  providers: [PrismaService, WeatherService, WeatherTasksService],
  exports: [WeatherService],
})
export class WeatherModule {}
