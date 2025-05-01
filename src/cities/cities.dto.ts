import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({ example: 'Utrecht' })
  @IsString()
  name!: string;
}

class WeatherDto {
  @ApiProperty({ example: 21.3 })
  @IsNumber()
  temp!: number;

  @ApiProperty()
  @IsString()
  summary!: string;
}

export class CityWithWeatherDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ type: WeatherDto })
  weather!: WeatherDto | null;
}
