import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [PaymentModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
