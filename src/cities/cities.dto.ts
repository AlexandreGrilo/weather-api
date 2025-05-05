import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WeatherDto } from 'src/weather/weather.dto';

export class CityDto {
  @ApiProperty({ example: 2, description: 'City ID' })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  id!: number;

  @ApiProperty({ example: 'Utrecht', description: 'Name of the city' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class CreateCityDto {
  @ApiProperty({ example: 'Utrecht', description: 'Name of the city' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class CityWeatherDto extends CityDto {
  @ApiPropertyOptional({
    type: WeatherDto,
    required: false,
    description: 'Latest weather record',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => WeatherDto)
  weather?: WeatherDto | null;
}

export class CityWeatherHistoryDto extends CityDto {
  @ApiPropertyOptional({
    type: [WeatherDto],
    required: false,
    description: 'Weather records from the past 2 days',
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WeatherDto)
  history?: WeatherDto[] | null;
}
