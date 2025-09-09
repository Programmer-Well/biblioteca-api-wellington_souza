import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { BooksModule } from './app/books/books.module';
import { AuthModule } from './app/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule} from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 6000,
          limit: 10,
        },
      ],
    }),
    forwardRef(() => UserModule),
    forwardRef(() => BooksModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
