import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { EmailCampaignEvent } from './events/EmailCampaignEvent';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 


  @EventPattern('commit-email-campaign')
  async handleCommitEmailCampaign(emailCampaignEvent:EmailCampaignEvent ){
    this.appService.handleEmailCampaign(emailCampaignEvent);
    return "Campaign Successfully Commited";
  }

  @MessagePattern({ opt: 'message'})
  handleMessageSend(body){
    return this.appService.handleMessageSend(body);
  }
}
