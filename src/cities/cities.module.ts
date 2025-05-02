import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { WeatherModule } from 'src/weather/weather.module';

@Module({
  imports: [WeatherModule],
  controllers: [CitiesController],
  providers: [PrismaService, CitiesService],
})
export class CitiesModule {}
