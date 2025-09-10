import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy'; 
import { RoleGuard } from 'src/guards/role.guard';     

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    forwardRef(() => UserModule), // Apenas aqui é necessário para o ciclo com UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RoleGuard], // Fornece TUDO de auth aqui
  exports: [AuthService, PassportModule], // Exporta o que outros módulos precisam
})
export class AuthModule {}