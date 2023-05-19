import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(
  'sk_test_51MoELVIKyDCqLTCrTSGScHAnyU4bkNNxZq6eJJky0t5Uem7zz6uhtjMrS1R3Gw75x2zzYymXFX9WwvyckNKqNGgm00aKssCNvV',
);

@Injectable()
export class PaymentService {
  constructor(private emailService: EmailService) {}

  async makeDonation(donationInfo: any) {
    const { name, email, amount } = donationInfo;
    // console.log(donationInfo);

    const paymentRes = await this.payByCard(amount, email);
    // console.log(paymentRes);
    if (paymentRes) {
      // const emailRes = await this.emailService.sendPlainEmail(email);

      // console.log(emailRes);
      return { session: paymentRes.url };
    }

    return 'Donation Failed';
  }

  async payByCard(amount: number, email: string) {
    // console.log(amount);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation Amount',
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],

      mode: 'payment',
      payment_intent_data: {
        setup_future_usage: 'on_session',
      },
      success_url:
        'http://127.0.0.1:3000/email?' + `email=${email}&amount=${amount}`,
      cancel_url: 'http://localhost:3000/order',
    });
    // console.log(session);
    return session;
  }
}
