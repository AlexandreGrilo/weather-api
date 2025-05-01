import { Controller, Post, Body } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-cities.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiConflictResponse,
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
}
