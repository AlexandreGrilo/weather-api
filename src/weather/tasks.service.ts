import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';
import { WeatherService } from './weather.service';

@Injectable()
export class WeatherTasksService {
  private readonly logger = new Logger(WeatherTasksService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly weatherService: WeatherService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlyWeatherSync() {
    const cities = await this.prisma.city.findMany();
    this.logger.log(`Fetching weather for ${cities.length} cities...`);

    for (const city of cities) {
      try {
        const weather = await this.weatherService.fetchWeather(city.name);

        await this.prisma.weatherData.create({
          data: {
            cityId: city.id,
            temp: weather.temp,
            summary: weather.summary,
            recordedAt: new Date(),
          },
        });

        this.logger.log(`Updated weather for ${city.name}`);
      } catch (error) {
        if (error)
          this.logger.error(`Failed to update weather for ${city.name}`);
      }
    }
  }
}
