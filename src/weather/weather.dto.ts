import { IsNumber, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    example: '2025-05-01T14:32:00.000Z',
    description: 'Date and time that the weather was recorded',
  })
  @IsDate()
  @Type(() => Date)
  recordedAt!: Date;
}
