import { forwardRef, Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
imports: [forwardRef(() => AuthModule),],
controllers: [LoanController],
providers: [LoanService],
})
export class LoanModule {}