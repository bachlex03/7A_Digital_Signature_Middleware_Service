import { PartialType } from '@nestjs/swagger';
import { CreateSampleDto } from './create-sample.request';

export class UpdateSampleDto extends PartialType(CreateSampleDto) {}
