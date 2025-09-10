import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService, // Usamos ConfigService para pegar o segredo de forma segura
  ) {
    super({
      // 1. Onde procurar o token na requisição
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. Não ignorar a expiração do token (muito importante para segurança)
      ignoreExpiration: false,
      // 3. A chave secreta para verificar a assinatura do token
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Este método é chamado pelo Passport DEPOIS que ele verifica com sucesso
   * que o token é válido e não expirou.
   * O 'payload' é o objeto que você colocou dentro do token quando o criou.
   */
  async validate(payload: { sub: number; email: string; role: string }) {
    // 4. Usamos o ID do usuário ('sub' é o padrão para subject) do payload
    //    para encontrar o usuário no banco de dados.
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    // Se não encontrarmos o usuário (ex: foi deletado depois que o token foi emitido),
    // a autenticação falha.
    if (!user) {
      throw new UnauthorizedException('Token inválido ou usuário não existe.');
    }

    // 5. O objeto que retornamos aqui será anexado ao objeto `request`
    //    como `req.user`. É uma boa prática remover a senha antes de retornar.
    //    O Prisma já faz isso se você não selecionar o campo 'password'.
    const { password, ...result } = user;
    return result; // Agora req.user terá { id, email, name, role, etc. }
  }
}