import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import {
  CityWeatherHistoryDto,
  CityWeatherResponseDto,
  CityWithWeatherDto,
  CreateCityDto,
} from './cities.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @ApiBody({ type: CreateCityDto })
  @ApiCreatedResponse({
    type: CityWithWeatherDto,
    description: 'City created successfully',
  })
  @ApiConflictResponse({ description: 'City already exists' })
  create(@Body() dto: CreateCityDto) {
    return this.citiesService.createCity(dto);
  }

  @Get()
  @ApiOkResponse({ type: [CityWithWeatherDto] })
  findAll(): Promise<CityWithWeatherDto[]> {
    return this.citiesService.getAllCities();
  }

  @Get('weather')
  @ApiOkResponse({ type: [CityWeatherResponseDto] })
  async getCitiesWithWeather(): Promise<CityWeatherResponseDto[]> {
    return this.citiesService.getAllWeather();
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the city to delete',
  })
  @HttpCode(204)
  @ApiNotFoundResponse({ description: 'City not found' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.delete(id);
  }

  @Get(':name/weather')
  @ApiParam({
    name: 'name',
    type: String,
    description: 'City name to fetch weather history',
  })
  @ApiOkResponse({ type: CityWeatherHistoryDto })
  @ApiNotFoundResponse({
    description: 'City not found and no weather data available',
  })
  getCityWeather(@Param('name') name: string): Promise<CityWeatherHistoryDto> {
    return this.citiesService.getCityWeatherHistory(name);
  }
}
