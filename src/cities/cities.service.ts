import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WeatherService } from 'src/weather/weather.service';
import {
  CityDto,
  CityWeatherHistoryDto,
  CityWeatherDto,
  CreateCityDto,
} from './cities.dto';

@Injectable()
export class CitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private weatherService: WeatherService,
  ) {}

  /**
   * Create a city by the name and the latest weather info in OpenWeatherAPI
   * @param name the name of the city
   * @returns
   */
  async createCityWithWeather(
    createCityDto: CreateCityDto,
  ): Promise<CityWeatherDto> {
    const { name } = createCityDto;

    const existing = await this.prisma.city.findUnique({
      where: { name: name.toLowerCase() },
    });

    if (existing) throw new ConflictException('City already exists');

    const weather = await this.weatherService.fetchWeather(name.toLowerCase());
    if (!weather) throw new NotFoundException('Weather info not found');

    const city = await this.prisma.city.create({
      data: {
        name: name.toLowerCase(),
        weather: {
          create: {
            temp: weather.temp,
            summary: weather.summary,
          },
        },
      },
      include: { weather: true },
    });

    return {
      id: city.id,
      name: city.name,
      weather: city.weather.length ? city.weather[0] : null,
    };
  }

  /**
   * Get all the cities with the latest weather known weather in the database.
   * @returns
   */
  async getAllCitiesWithLatestWeather(): Promise<CityWeatherDto[]> {
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
      weather: city.weather[0],
    }));
  }

  /**
   * Get all the cities with all the weather histories saved on the database.
   * @returns
   */
  async getAllCitiesWithWeatherHistory(): Promise<CityWeatherHistoryDto[]> {
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
      history: city.weather,
    }));
  }

  /**
   * Delete a city and all it's weather history saved on the database.
   * @param id the ID of the city to be deleted
   * @returns the deleted city
   */
  async deleteCityAndWeatherHistory(id: number): Promise<CityDto> {
    const city = await this.prisma.city.delete({
      where: { id },
    });

    return {
      id: city.id,
      name: city.name,
    };
  }

  /**
   * Get a single city with it's latest 2 days of weather history saved on the database.
   * @param name the name of the city
   * @returns
   */
  async getCityWithWeatherHistory(
    name: string,
  ): Promise<CityWeatherHistoryDto> {
    const city = await this.prisma.city.findUnique({
      where: { name: name.toLowerCase() },
    });

    if (!city) {
      const weather = await this.weatherService.fetchWeather(name);
      if (!weather) throw new NotFoundException('Weather info not found');

      return {
        id: 0,
        name: name,
        history: [weather],
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
      id: city.id,
      name: name,
      history: weatherRecords.map((w) => ({
        temp: w.temp,
        summary: w.summary,
        recordedAt: w.recordedAt,
      })),
    };
  }
}
