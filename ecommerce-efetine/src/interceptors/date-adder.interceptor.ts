import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DateAdderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const now = new Date();
    const formattedDate = now.toLocaleString();

    return next.handle().pipe(
      map((data) => {
        return {
          data,
          respondedAt: formattedDate,
        };
      }),
    );
  }
}
