import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule], // <-- Importa AuthModule para usar os guards
  controllers: [BooksController],
  providers: [BooksService], // <-- Sem PrismaService, Sem APP_GUARD
  exports: [BooksService],
})
export class BooksModule {}