import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Módulos da aplicação
import { PrismaModule } from './prisma/prisma.module'; 
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { BooksModule } from './app/books/books.module';
import { LoanModule } from './app/loan/loan.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 20, 
    }]),
    PrismaModule, 
    AuthModule,
    UserModule,
    BooksModule,
    LoanModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}