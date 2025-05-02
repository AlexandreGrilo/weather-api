import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ example: 'Utrecht' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class WeatherDto {
  @ApiProperty({ example: 21.3 })
  @IsNumber()
  temp!: number;

  @ApiProperty({ example: 'clear sky' })
  @IsString()
  summary!: string;
}

export class CityWithWeatherDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ type: WeatherDto, nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => WeatherDto)
  weather!: WeatherDto | null;
}

export class WeatherDataDto {
  @ApiProperty({ example: 22.5 })
  @IsNumber()
  temp!: number;

  @ApiProperty({ example: 'clear sky' })
  @IsString()
  summary!: string;

  @ApiProperty({ example: '2025-05-01T14:32:00.000Z' })
  @IsDate()
  @Type(() => Date)
  recordedAt!: Date;
}

export class CityWeatherResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ type: [WeatherDataDto], nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WeatherDataDto)
  weather!: WeatherDataDto[] | null;
}

export class CityWeatherHistoryDto {
  @ApiProperty({ example: 'Utrecht' })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({
    type: [WeatherDataDto],
    description: 'Weather records from the past 2 days',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeatherDataDto)
  history!: WeatherDataDto[];
}
