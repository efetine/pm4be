import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { request } from 'http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        cont request = context.switchToHttp().getRequest();
    }
}

//Debe existir un header Authorization.

//Dicho header, tiene que tener una estructura como la siguiente: Basic: <email>:<password>.

//NO validaremos por ahora que sea un email y un password válido, únicamente verificar si el header es enviado y continente un email y un password.

//Todos los endpoints de Users, salvo el POST, deben utilizar esta guarda.

//Todos los endpoints de Products, salvo el GET y el GET{id} deben utilizar esta guarda.
