import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService) { }

    async findAll() {

        const users = await this.prismaService.user.findMany();

       
        if (users.length === 0) {
            throw new NotFoundException("Nenhum usuário encontrado no banco!");
        }

        return users;
    }
    async findOne(id: number) {

        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new NotFoundException(`O usuário ID ${id} não foi encontrado!`);
        }

        return user;
    }

    async create(createUserDto: CreateUserDto) {
        const salt = await bcrypt.genSalt();
        createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

        return this.prismaService.user.create({
            data: createUserDto,
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {

        await this.findOne(id);

        if (updateUserDto.password) {
            const salt = await bcrypt.genSalt();
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
        }

        return this.prismaService.user.update({
            data: updateUserDto,
            where: {
                id,
            },
        });
    }

    async remove(id: number) {

        await this.findOne(id);

        return this.prismaService.user.delete({
            where: {
                id,
            },
        });
    }

}