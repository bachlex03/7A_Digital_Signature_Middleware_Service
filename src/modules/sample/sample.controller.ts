import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { SampleService } from './sample.service';
import { CreateSampleDto } from '../../contracts/requests/sample/create-sample.request';
import { UpdateSampleDto } from '../../contracts/requests/sample/update-sample.request';
import { SampleResponseDto } from '../../contracts/responses/sample/create-sample.response';

@ApiTags('samples')
@Controller('samples')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new sample',
    description: 'Creates a new sample with the provided data',
  })
  @ApiBody({
    type: CreateSampleDto,
    description: 'Sample data to create',
    examples: {
      basic: {
        summary: 'Basic Sample',
        description: 'A basic sample with minimal data',
        value: {
          name: 'Sample Name',
          priority: 5,
        },
      },
      detailed: {
        summary: 'Detailed Sample',
        description: 'A detailed sample with all fields',
        value: {
          name: 'Detailed Sample',
          description: 'This is a detailed sample description',
          priority: 8,
          metadata: {
            category: 'test',
            tags: ['sample', 'demo'],
          },
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Sample created successfully',
    type: SampleResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  create(@Body() createSampleDto: CreateSampleDto): SampleResponseDto {
    return this.sampleService.create(createSampleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all samples',
    description: 'Retrieves a list of all available samples',
  })
  @ApiOkResponse({
    description: 'List of samples retrieved successfully',
    type: [SampleResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findAll(): SampleResponseDto[] {
    return this.sampleService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a sample by ID',
    description: 'Retrieves a specific sample by its unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the sample',
    example: 'sample_1_1731696872123',
  })
  @ApiOkResponse({
    description: 'Sample retrieved successfully',
    type: SampleResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Sample not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findOne(@Param('id') id: string): SampleResponseDto {
    return this.sampleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a sample',
    description: 'Updates an existing sample with the provided data',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the sample to update',
    example: 'sample_1_1731696872123',
  })
  @ApiBody({
    type: UpdateSampleDto,
    description: 'Sample data to update',
    examples: {
      partial: {
        summary: 'Partial Update',
        description: 'Update only specific fields',
        value: {
          priority: 9,
          description: 'Updated description',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Sample updated successfully',
    type: SampleResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Sample not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  update(
    @Param('id') id: string,
    @Body() updateSampleDto: UpdateSampleDto,
  ): SampleResponseDto {
    return this.sampleService.update(id, updateSampleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a sample',
    description: 'Removes a sample from the system',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the sample to delete',
    example: 'sample_1_1731696872123',
  })
  @ApiResponse({
    status: 204,
    description: 'Sample deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Sample not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  remove(@Param('id') id: string): void {
    return this.sampleService.remove(id);
  }
}
