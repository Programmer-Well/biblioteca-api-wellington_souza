import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthModule } from "../auth/auth.module";


@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaService],
    exports: [UserModule, UserService]
})

export class UserModule { }