import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({ example: 'Utrecht' })
  @IsString()
  name!: string;
}
