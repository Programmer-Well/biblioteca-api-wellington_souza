import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
imports: [forwardRef(() => AuthModule),],
controllers: [BooksController],
providers: [BooksService, PrismaService, {
provide: APP_GUARD,
useClass: ThrottlerGuard
}],
exports: [],
})
export class BooksModule { }