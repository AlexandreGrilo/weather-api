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
  summary!: string;
}

export class CityWithWeatherDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ type: WeatherDto })
  weather!: WeatherDto | null;
}

class LatestWeatherDto {
  @ApiProperty()
  @IsNumber()
  temp!: number;

  @ApiProperty()
  summary!: string;

  @ApiProperty()
  recordedAt!: Date;
}

export class CityWeatherResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: LatestWeatherDto, nullable: true })
  latestWeather!: LatestWeatherDto | null;
}
