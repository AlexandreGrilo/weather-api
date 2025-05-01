import { Controller, Post, Body, Get } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CityWithWeatherDto, CreateCityDto } from './cities.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @ApiCreatedResponse({ description: 'City created successfully' })
  @ApiConflictResponse({ description: 'City already exists' })
  create(@Body() dto: CreateCityDto) {
    return this.citiesService.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [CityWithWeatherDto] })
  findAll(): Promise<CityWithWeatherDto[]> {
    return this.citiesService.findAll();
  }
}
