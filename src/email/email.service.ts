import { Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Query } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}
  async sendPlainEmail(url: any) {
    // console.log(params);
    const params = new URLSearchParams(url.substring(url.indexOf('?')));
    const amount = params.get('amount');
    const email = params.get('email');

    const subject = 'Donation Confirmation';

    const content =
      `Dear Donator, \nYour Donation is suceessfully sent.` +
      '\n Amount: ' +
      `${amount} $`;
    const res = await this.mailService.sendMail({
      to: email,
      from: 'omaradmin@mailsac.com',
      subject,
      text: content,
    });

    if (res.accepted.length > 0) {
      return 'Thank you for your donation!\n\n  We appreciate your support. Pleace check your email, an invoice has been sent.';
    }
    return 'Donation Failed';
  }
}
