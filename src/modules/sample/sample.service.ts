import { Injectable } from '@nestjs/common';
import { CreateSampleDto } from '../../contracts/requests/sample/create-sample.request';
import { UpdateSampleDto } from '../../contracts/requests/sample/update-sample.request';
import { SampleResponseDto } from '../../contracts/responses/sample/create-sample.response';
import { Result, success, failure } from '../../libs/result';
import { Errors } from '../../libs/errors';

@Injectable()
export class SampleService {
  private samples: SampleResponseDto[] = [];
  private nextId = 1;

  create(createSampleDto: CreateSampleDto): Result<SampleResponseDto> {
    try {
      const sample: SampleResponseDto = {
        id: this.generateId(),
        ...createSampleDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return failure(Errors.Sample.CannotBeCreated);

      this.samples.push(sample);
      return success(sample);
    } catch (error) {
      return failure(Errors.Sample.CannotBeCreated);
    }
  }

  findAll(): Result<SampleResponseDto[]> {
    try {
      return success(this.samples);
    } catch (error) {
      return failure(Errors.Sample.CannotBeCreated);
    }
  }

  findOne(id: string): Result<SampleResponseDto> {
    const sample = this.samples.find((s) => s.id === id);
    if (!sample) {
      return failure(Errors.Sample.DoesNotExist);
    }
    return success(sample);
  }

  update(
    id: string,
    updateSampleDto: UpdateSampleDto,
  ): Result<SampleResponseDto> {
    const index = this.samples.findIndex((s) => s.id === id);
    if (index === -1) {
      return failure(Errors.Sample.DoesNotExist);
    }

    try {
      this.samples[index] = {
        ...this.samples[index],
        ...updateSampleDto,
        updatedAt: new Date(),
      };

      return success(this.samples[index]);
    } catch (error) {
      return failure(Errors.Sample.CannotBeUpdated);
    }
  }

  remove(id: string): Result<void> {
    const index = this.samples.findIndex((s) => s.id === id);
    if (index === -1) {
      return failure(Errors.Sample.DoesNotExist);
    }

    try {
      this.samples.splice(index, 1);
      return success(undefined);
    } catch (error) {
      return failure(Errors.Sample.CannotBeDeleted);
    }
  }

  private generateId(): string {
    return `sample_${this.nextId++}_${Date.now()}`;
  }
}
