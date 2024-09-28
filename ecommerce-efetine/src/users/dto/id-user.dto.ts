import { PickType } from '@nestjs/swagger';

import { User } from '../../entities/user.entity';

export class UserByIdDTO extends PickType(User, ['id'] as const) {}
