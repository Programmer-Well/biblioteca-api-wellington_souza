import { SetMetadata } from "@nestjs/common";
import { RoleGuard } from "src/guards/role.guard";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleGuard[]) => SetMetadata(ROLES_KEY, roles);