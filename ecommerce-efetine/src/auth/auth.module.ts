import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { APP_GUARD } from '@nestjs/core';
import { JWT_SECRET } from '../config/envs';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
