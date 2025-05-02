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
  @ApiProperty({ example: 'Utrecht', description: 'Name of the city' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class WeatherDto {
  @ApiProperty({ example: 21.3, description: 'Temperature in celsius' })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  temp!: number;

  @ApiProperty({
    example: 'clear sky',
    description: 'Description of the weather',
  })
  @IsString()
  summary!: string;
}

export class CityWithWeatherDto {
  @ApiProperty({ example: 2, description: 'City ID' })
  id!: number;

  @ApiProperty({ example: 'Utrecht', description: 'Name of the city' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    type: WeatherDto,
    nullable: true,
    description: 'Latest weather record',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => WeatherDto)
  weather?: WeatherDto | null;
}

export class WeatherDataDto {
  @ApiProperty({ example: 21.3, description: 'Temperature in celsius' })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  temp!: number;

  @ApiProperty({
    example: 'clear sky',
    description: 'Description of the weather',
  })
  @IsString()
  summary!: string;

  @ApiProperty({
    example: '2025-05-01T14:32:00.000Z',
    description: 'Date and time that the weather was recorded',
  })
  @IsDate()
  @Type(() => Date)
  recordedAt!: Date;
}

export class CityWeatherResponseDto {
  @ApiProperty({ example: 2, description: 'City ID' })
  id!: number;

  @ApiProperty({ example: 'Utrecht', description: 'Name of the city' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    type: [WeatherDataDto],
    nullable: true,
    description: 'Weather records from the past 2 days',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WeatherDataDto)
  weather?: WeatherDataDto[] | null;
}

export class CityWeatherHistoryDto {
  @ApiProperty({ example: 'Utrecht', description: 'Name of the city' })
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
