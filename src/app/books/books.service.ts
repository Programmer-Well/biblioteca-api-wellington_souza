import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class BooksService {

  constructor(private prismaService: PrismaService) { }

  async findAll() {

    const books = await this.prismaService.book.findMany();

    if (books.length === 0) {
      throw new NotFoundException("Nenhum livro encontrado/cadastrado no banco!");
    }

    return books;
  }

  async findOne(id: number) {
    const book = await this.prismaService.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      throw new NotFoundException(`O livro ${id} não foi encontrado.`)
    }

    return book;
  }

  async create(createBookDto: CreateBookDto) {
    return this.prismaService.book.create({
      data: createBookDto,
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOne(id);

    return this.prismaService.book.update({
      data: updateBookDto,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prismaService.book.delete({
      where: {
        id,
      },
    });
  }
}



