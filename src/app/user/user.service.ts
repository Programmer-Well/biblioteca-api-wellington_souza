import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { userInfo } from "os";

@Injectable()
export class UserService {

    findAll() {
        return 'Você esta listando todos os usuarios.'
    }

    findOne(id: number) {
        return `Você esta listando o usuario id: ${id}!`
    }
    create(createUserDto: CreateUserDto) {
        return createUserDto;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return {id, updateUserDto};
    }

    remove(id: number) {
        return `Você esta apagando o usuario ${id}!`
    }

}