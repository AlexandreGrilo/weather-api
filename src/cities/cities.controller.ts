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
  CityDto,
  CityWeatherHistoryDto,
  CityWeatherDto,
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
  ApiExtraModels,
  ApiOperation,
} from '@nestjs/swagger';

@ApiExtraModels(CityDto)
@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a city',
  })
  @ApiBody({
    required: true,
    type: CreateCityDto,
    description: 'City name to be created',
  })
  @ApiCreatedResponse({
    type: CityWeatherDto,
    description: 'City created successfully',
  })
  @ApiConflictResponse({ description: 'City already exists' })
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.createCityWithWeather(createCityDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all the cities and its latest weather.',
  })
  @ApiOkResponse({ type: [CityWeatherDto] })
  getCitiesLatestWeather(): Promise<CityWeatherDto[]> {
    return this.citiesService.getAllCitiesWithLatestWeather();
  }

  @Get('weather')
  @ApiOperation({
    summary: 'Get all the cities and its weather history.',
  })
  @ApiOkResponse({ type: [CityWeatherHistoryDto] })
  async getCitiesWeatherHistory(): Promise<CityWeatherHistoryDto[]> {
    return this.citiesService.getAllCitiesWithWeatherHistory();
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a city and its weather history.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the city to delete',
  })
  @HttpCode(204)
  @ApiNotFoundResponse({ description: 'City not found' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.deleteCityAndWeatherHistory(id);
  }

  @Get(':name/weather')
  @ApiOperation({
    summary: 'Get a city by the name with last 2 days weather history.',
  })
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
    return this.citiesService.getCityWithWeatherHistory(name);
  }
}
