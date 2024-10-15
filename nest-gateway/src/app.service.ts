import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EmailCampaignDto } from './dto/EmailCampaign.dto';
import { EmailCampaignEvent } from './events/EmailCampaignEvent';

@Injectable()
export class AppService {
   
  private readonly logger = new Logger(AppService.name);
  constructor(
    @Inject('COMMUNICATION_SERVICE') private readonly communicationClient: ClientProxy
  ){}


  async commitEmailCampagin(emailCampaginDto: EmailCampaignDto){
    this.logger.debug(`Proceeding payload to COMMUNICATION_SERVICE: ${emailCampaginDto}`)
    this.communicationClient.emit('commit-email-campaign', new EmailCampaignEvent(
      "user@email.com",
      [...emailCampaginDto.emailList],
      emailCampaginDto.emailBody
    ));
    return;
  }
  

  sendMessage(body: any) {
    this.logger.debug(`Proceeding payload to COMMUNICATION_SERVICE via MessagePatter: ${body}`)
    return this.communicationClient.send({ opt: 'message'}, body)
    
  }
}
