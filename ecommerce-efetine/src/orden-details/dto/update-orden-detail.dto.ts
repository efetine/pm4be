import { PartialType } from '@nestjs/swagger';
import { CreateOrdenDetailDto } from './create-orden-detail.dto';

export class UpdateOrdenDetailDto extends PartialType(CreateOrdenDetailDto) {}
