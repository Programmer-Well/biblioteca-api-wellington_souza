import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { BooksModule } from './app/books/books.module'; 
@Module({
  imports: [UserModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
