import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './prisma.service';
import { CitiesModule } from './cities/cities.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [ScheduleModule.forRoot(), CitiesModule, WeatherModule],
  providers: [PrismaService],
})
export class AppModule {}
