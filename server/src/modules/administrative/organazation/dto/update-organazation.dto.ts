import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganazationDto } from './create-organazation.dto';

export class UpdateOrganazationDto extends PartialType(CreateOrganazationDto) { }
