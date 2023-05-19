import { Body, Controller, Get, Post, Param, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get()
  sendEmail(@Req() req: any) {
    return this.emailService.sendPlainEmail(req.url);
  }
}
