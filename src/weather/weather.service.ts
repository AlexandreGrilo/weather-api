import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { WeatherDto } from './weather.dto';

interface OpenWeatherApiResponse {
  main: {
    dt: number;
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

@Injectable()
export class WeatherService {
  async fetchWeather(city: string): Promise<WeatherDto> {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const { data } = await axios.get<OpenWeatherApiResponse>(url);
      if (!data) throw new NotFoundException('Weather info not found');

      return {
        temp: data.main.temp,
        summary: data.weather[0].description,
        recordedAt: new Date(data.main.dt),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new BadRequestException(
          'Something went wrong fetching weather data...',
        );
      }
      throw error;
    }
  }
}
