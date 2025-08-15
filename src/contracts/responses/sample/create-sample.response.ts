import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SampleResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the sample',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the sample',
    example: 'Sample Name',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Optional description of the sample',
    example: 'This is a sample description',
  })
  description?: string;

  @ApiProperty({
    description: 'Priority level of the sample (1-10)',
    example: 5,
  })
  priority: number;

  @ApiPropertyOptional({
    description: 'Additional metadata for the sample',
    example: { category: 'test', tags: ['sample', 'demo'] },
  })
  metadata?: Record<string, any>;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-08-15T21:54:32.123Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-08-15T21:54:32.123Z',
  })
  updatedAt: Date;
}
