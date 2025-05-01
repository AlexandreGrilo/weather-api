import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './prisma.service';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [ScheduleModule.forRoot(), CitiesModule],
  providers: [PrismaService],
})
export class AppModule {}
