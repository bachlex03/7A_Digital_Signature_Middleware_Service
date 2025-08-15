import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSampleDto } from '../../contracts/requests/sample/create-sample.request';
import { UpdateSampleDto } from '../../contracts/requests/sample/update-sample.request';
import { SampleResponseDto } from '../../contracts/responses/sample/create-sample.response';

@Injectable()
export class SampleService {
  private samples: SampleResponseDto[] = [];
  private nextId = 1;

  create(createSampleDto: CreateSampleDto): SampleResponseDto {
    const sample: SampleResponseDto = {
      id: this.generateId(),
      ...createSampleDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    throw new NotFoundException(`Sample with ID not found`); // for testing

    this.samples.push(sample);
    return sample;
  }

  findAll(): SampleResponseDto[] {
    return this.samples;
  }

  findOne(id: string): SampleResponseDto {
    const sample = this.samples.find((s) => s.id === id);
    if (!sample) {
      throw new NotFoundException(`Sample with ID ${id} not found`);
    }
    return sample;
  }

  update(id: string, updateSampleDto: UpdateSampleDto): SampleResponseDto {
    const index = this.samples.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new NotFoundException(`Sample with ID ${id} not found`);
    }

    this.samples[index] = {
      ...this.samples[index],
      ...updateSampleDto,
      updatedAt: new Date(),
    };

    return this.samples[index];
  }

  remove(id: string): void {
    const index = this.samples.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new NotFoundException(`Sample with ID ${id} not found`);
    }

    this.samples.splice(index, 1);
  }

  private generateId(): string {
    return `sample_${this.nextId++}_${Date.now()}`;
  }
}
