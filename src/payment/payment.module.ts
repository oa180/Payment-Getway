import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { EmailService } from 'src/email/email.service';

@Module({
  providers: [PaymentService, EmailService],
  controllers: [PaymentController],
})
export class PaymentModule {}
