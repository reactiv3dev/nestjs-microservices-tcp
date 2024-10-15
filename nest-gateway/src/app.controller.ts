import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailCampaignDto } from './dto/EmailCampaign.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,) {}

  @Get("/")
  getHello(): string {
    return "Microservices API Gateway"
  }

  @Post('/commit-email-campaign')
  commitCampaign(@Body() emailCampaignDto: EmailCampaignDto){
    this.appService.commitEmailCampagin(emailCampaignDto);
    return;
  }

  @Post('/send-message')
  sendMessage(@Body() body){
    return this.appService.sendMessage(body);
  }
}
