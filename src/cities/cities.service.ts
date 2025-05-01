import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCityDto } from './dto/create-cities.dto';
import axios from 'axios';

interface OpenWeatherResponse {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

type WeatherSummary = {
  temp: number;
  description: string;
};

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  private async fetchWeather(city: string): Promise<WeatherSummary> {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const { data } = await axios.get<OpenWeatherResponse>(url);
    return {
      temp: data.main.temp,
      description: data.weather[0].description,
    };
  }

  async create(dto: CreateCityDto) {
    const existing = await this.prisma.city.findUnique({
      where: { name: dto.name.toLowerCase() },
    });

    if (existing) {
      throw new ConflictException('City already exists');
    }

    // Fetch weather data
    const weather = await this.fetchWeather(dto.name);
    if (!weather) throw new Error('Failed to fetch weather');

    // Create city and store weather
    const city = await this.prisma.city.create({
      data: {
        name: dto.name.toLowerCase(),
        weather: {
          create: {
            temp: weather.temp,
            summary: weather.description,
          },
        },
      },
      include: { weather: true },
    });

    return city;
  }
}
