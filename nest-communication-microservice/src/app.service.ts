import { Injectable, Logger } from '@nestjs/common';
import { EmailCampaignEvent } from './events/EmailCampaignEvent';

@Injectable()
export class AppService {
   
  private readonly logger = new Logger(AppService.name);
  constructor(){}

  async handleEmailCampaign(data: EmailCampaignEvent){
    this.logger.debug(`COMMUNICATION SERVICE: Commiting Email Campaign for user: ${data.from}`);
    return;
  }

  handleMessageSend(body: any) {
    this.logger.debug(`COMMUNICATION SERVICE: MessagePattern for opt:message is: ${body}`);
    return body;
  }
}
