import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WeatherService } from 'src/weather/weather.service';
import {
  CityWeatherHistoryDto,
  CityWeatherResponseDto,
  CityWithWeatherDto,
  CreateCityDto,
} from './cities.dto';

@Injectable()
export class CitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private weatherService: WeatherService,
  ) {}

  async createCity(dto: CreateCityDto) {
    const existing = await this.prisma.city.findUnique({
      where: { name: dto.name.toLowerCase() },
    });

    if (existing) throw new ConflictException('City already exists');

    const weather = await this.weatherService.fetchWeather(
      dto.name.toLowerCase(),
    );
    if (!weather) throw new NotFoundException('Weather info not found');

    const city = await this.prisma.city.create({
      data: {
        name: dto.name.toLowerCase(),
        weather: {
          create: {
            temp: weather.temp,
            summary: weather.summary,
          },
        },
      },
      include: { weather: true },
    });

    return city;
  }

  async getAllCities(): Promise<CityWithWeatherDto[]> {
    const cities = await this.prisma.city.findMany({
      include: {
        weather: {
          orderBy: { recordedAt: 'desc' },
          take: 1,
        },
      },
    });

    return cities.map((city) => ({
      id: city.id,
      name: city.name,
      weather: city.weather[0]
        ? {
            temp: city.weather[0].temp,
            summary: city.weather[0].summary,
          }
        : null,
    }));
  }

  async getAllWeather(): Promise<CityWeatherResponseDto[]> {
    const cities = await this.prisma.city.findMany({
      include: {
        weather: {
          orderBy: { recordedAt: 'desc' },
        },
      },
    });

    return cities.map((city) => ({
      id: city.id,
      name: city.name,
      weather: city.weather.map((w) => ({
        temp: w.temp,
        summary: w.summary,
        recordedAt: w.recordedAt,
      })),
    }));
  }

  async delete(id: number) {
    return this.prisma.city.delete({
      where: { id },
    });
  }

  async getCityWeatherHistory(name: string): Promise<CityWeatherHistoryDto> {
    const city = await this.prisma.city.findUnique({
      where: { name: name.toLowerCase() },
    });

    if (!city) {
      const weather = await this.weatherService.fetchWeather(name);
      if (!weather) throw new NotFoundException('Weather info not found');

      return {
        city: name,
        history: [
          {
            ...weather,
            recordedAt: new Date(),
          },
        ],
      };
    }

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const weatherRecords = await this.prisma.weatherData.findMany({
      where: {
        cityId: city.id,
        recordedAt: {
          gte: twoDaysAgo,
        },
      },
      orderBy: { recordedAt: 'desc' },
    });

    return {
      city: name,
      history: weatherRecords.map((w) => ({
        temp: w.temp,
        summary: w.summary,
        recordedAt: w.recordedAt,
      })),
    };
  }
}
