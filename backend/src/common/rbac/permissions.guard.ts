import {
  Injectable,
  CanActivate,
  ExecutionContext
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard
implements CanActivate {

  constructor(
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {

    const permissions =
      this.reflector.getAllAndOverride<string[]>(
        'permissions',
        [
          context.getHandler(),
          context.getClass()
        ]
      );

    if (!permissions) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest();

    const user = request.user;

    return permissions.every(
      p => user.permissions.includes(p)
    );
  }
}
