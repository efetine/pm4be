import { OmitType } from '@nestjs/swagger';

import { User } from '../../users/entities/user.entity';

export class UserOutput extends OmitType(User, ['password'] as const) {}
