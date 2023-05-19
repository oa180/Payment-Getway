import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('donate')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  makeDonation(@Body() donationInfo: any) {
    return this.paymentService.makeDonation(donationInfo);
  }
}
