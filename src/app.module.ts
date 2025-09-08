import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { BooksModule } from './app/books/books.module'; 
import { AuthModule } from './app/auth/auth.module';
@Module({
  imports: [UserModule, BooksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
