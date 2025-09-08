import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles.decorator";


@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext) {

        const requiredRoles = this.reflector.getAllAndOverride<RoleGuard[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

        if (!requiredRoles) {
            return true;
        }
        
        const { user } = context.switchToHttp().getRequest();

        const rolesFilted = requiredRoles.filter(role => role === user.role)

        if (rolesFilted.length > 0) {
            return true;
        } else {
            return false;
        }

    }
}