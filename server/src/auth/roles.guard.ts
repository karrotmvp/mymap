import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Role } from "./role.enum";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requireRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        let permission = Role.Unsigned_User
        if (requireRole === undefined) return true;
        const req = context.switchToHttp().getRequest()
        const BearerHeader: string = req.headers.authorization
        const token = BearerHeader ? BearerHeader.substring(7, BearerHeader.length) : null;
        let userObj = { userId: null }
        if (token) {
            const payload = await this.jwtService.verify(token);
            const userId = payload.sub;
            const user: User = await this.userService.readUser(userId);
            permission = user ? Role.Signed_User : Role.Unsigned_User;
            if (requireRole === Role.Admin) {
                permission = await this.userService.checkAdmin(userId) ? Role.Admin : permission;
            }
            userObj.userId = userId
        }
        req.user = userObj;
        return requireRole <= permission ? true : false
    }
}