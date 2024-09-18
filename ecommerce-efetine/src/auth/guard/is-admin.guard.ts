import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JWTPayload } from '../interfaces/jwt-payload';

interface RequestWithUser extends Request {
  user?: JWTPayload;
}

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = this.getUserHeader(request);

    if (payload === undefined || payload.role === 'USER') {
      throw new ForbiddenException();
    }

    return true;
  }

  private getUserHeader(request: RequestWithUser): JWTPayload | undefined {
    const { user } = request;

    return user;
  }
}
