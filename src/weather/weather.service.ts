import { Injectable, NotFoundException } from '@nestjs/common';
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
  summary: string;
};

@Injectable()
export class WeatherService {
  async fetchWeather(city: string): Promise<WeatherSummary> {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const { data } = await axios.get<OpenWeatherResponse>(url);
      return {
        temp: data.main.temp,
        summary: data.weather[0].description,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new NotFoundException('City not found in OpenWeatherMap');
      }
      throw error;
    }
  }
}
