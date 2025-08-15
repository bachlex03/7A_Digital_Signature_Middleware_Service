import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateSampleDto {
  @ApiProperty({
    description: 'The name of the sample',
    example: 'Sample Name',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Optional description of the sample',
    example: 'This is a sample description',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Priority level of the sample (1-10)',
    example: 5,
    minimum: 1,
    maximum: 10,
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  priority: number;

  @ApiPropertyOptional({
    description: 'Additional metadata for the sample',
    example: { category: 'test', tags: ['sample', 'demo'] },
  })
  @IsOptional()
  metadata?: Record<string, any>;
}
