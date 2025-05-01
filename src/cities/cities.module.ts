import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';

@Module({
  controllers: [CitiesController],
  providers: [PrismaService, CitiesService],
})
export class CitiesModule {}
